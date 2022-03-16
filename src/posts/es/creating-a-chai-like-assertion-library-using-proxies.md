---
title: "Creando una librería de aserciones estilo Chai usando proxies"
description: Mostrando un divertido proyecto que construí para uvu
published: true
created: '2022-02-19'
imgext: png
image:
  width: 1136
  height: 852
crosspost:
  devto: "https://dev.to/pabloabc/creating-a-chai-like-assertion-library-using-proxies-1ol7"
  hashnode: "https://hn.berganza.dev/creating-a-chai-like-assertion-library-using-proxies"
tags:
  - javascript
  - testing
  - uvu
  - webdev
---

Durante las últimas semanas he tomado el (probablemente inútil) trabajo de migrar [Felte](https://felte.dev) de usar Jest a usar [uvu](https://github.com/lukeed/uvu). Esta labor es tediosa de por sí, pero uno de los detalles que dificultan la transición es que Jest espera que hagas tus tests con una sintaxis estilo `expect(…).toBe*`; mientras que uvu te da total libertad sobre cómo realizar tus tests. Aunque uvu ofrece un paquete oficial `uvu/assert` que  te permite realizar tus tests estilo `assert.is(value, expected)`.

Aunque esto funciona perfectamente bien, y es posible mover todos mis tests a usar el tipo de validaciones que `uvu/assert` ofrece, me gusta la forma descriptiva de los t esta de Jest. Para poder mantener una forma similar de realizar mis tests, decidí usar [ChaiJS](https://chaijs.com): una librería de aserciones que es principalmente usada con [mocha](https://mochajs.org). Chai ofrece aserciones estilo `expect` que son, debatiblemente, más descriptivas que las que Jest ofrece. En lugar de escribir `expect(…).toBe(true)`, con Chai escribirías `expect(…).to.be.true`. En la mayor parte de casos pude usar un “search and replace” para migrar.

Este setup funciona perfectamente bien. Pero hay unos cuantos pequeños detalles: Los errores lanzados por las aserciones son _un poquito_ distintos a los esperados por uvu. Esto significa que en algunos casos uvu muestra detalles o mensajes de error que no son muy relevantes al test que falló. O que uvu muestra diffs comparando `undefined` con `undefined`. Como un buen desarrollador con demasiado tiempo libre, decidí escribir [mi propia librería de aserciones](https://xkcd.com/927/) sobre las aserciones proveídas por uvu: [uvu-expect](https://github.com/pablo-abc/uvu-expect). A continuación explicaré más o menos como lo hice.

## La función “expect”
El principal requisito de nuestra librería de aserciones es una función `expect` que debe recibir el velor que esperas validar.

```javascript
export function expect(value) {
  // corre tus asercions aquí
}
```

Si quisiéramos mantener una API similar a la de Jest, esta función podría retornar un objeto con funciones.

```javascript
export function expect(value) {
  return {
    toBe(expected) {
      if (expected !== value) {
        throw new Error('Expected values to be strictly equal');
      }
    },
  };
}
```

Pero usando Chai, me encantó la sintáxis que ofrece. Por esto, decidí usar proxies para lograr tener una API similar. Para lograrlo, podríamos empezar permitiendo encadenar palabras arbitrarias después de nuestra llamada a `expect`. Para simplificar el desarrollo, decidí no restringir las posibles palabras que se pueden encadenar.

**Proxy** es un objeto de JavaScript con el que puedes "envolver" otro objeto para poder interceptar y modificar su funcionalidad. En nuestro caso lo usaremos para modificar el comportamiento de nuestro objeto cuando _accedemos_ a una de sus propiedades.

```javascript
export function expect(value) {
  const proxy = new Proxy(
    // El target que querémos envolver en el proxy.
    // Por ahora solo es un objeto vacío.
    {},
    {
      get() {
        // Acceder a cualquier propiedad retorna el mismo
        // proxy nuevamente.
        return proxy;
      },
    }
  );
  return proxy;
}

expect().this.does.nothing.but.also.does.not.crash;
```

Ahora vamos a permitir que _cualquier_ palabra encadenada pueda ser llamada como una función.

```javascript
export function expect(value) {
  const proxy = new Proxy(
    {},
    {
      get(_, outerProp) {
        // En lugar de retornar el proxy directamente,
        // retornamos un nuevo proxy que envuelve una
        // función.
        return new Proxy(() => proxy, {
          get(_, innerProp) {
            // Si la función no es llamada y accedemos a
            // una propiedad directamente, accederemos a la
            // misma propiedad en el proxy original.
            return proxy[innerProp];
          },
        });
      },
    }
  );
  return proxy;
}

expect().this.does.nothing().but.also.does.not.crash();
```

Con esto, ya tenemos lo básico para la sintaxis que buscamos soportar. Ahora necesitamos lograr darle _significado_ a algunas propiedades. Por ejemplo, tal vez queramos que algo como `expect(…).to.be.null` revise si el value pasado a `expect` sea null o no.

## Dándole significado a nuestras propiedades
Podríamos revisar directamente el nombre de la propiedad siendo accedida y utilizar esto para decidir que validaciones correr. Por ejemplo, para tener una validación que revise si el valor recibido es `null`:

```javascript
// Para mantenerlo breve, ignoraremos el hecho de que
// las propiedades de nuestro proxy también pueden ser
// funciones.
export function expect(value) {
  const proxy = new Proxy(
    {},
    {
      get(_, prop) {
        // `prop` es el nombre de la propiedad siendo
        // accedida.
        switch (prop) {
          case 'null':
            if (value !== null) {
              throw new Error('Expected value to be null');
            }
            break;
        }
        return proxy;
      },
    }
  );
  return proxy;
}

expect(null).to.be.null;
try {
  expect('not null').to.be.null;
} catch (err) {
  console.log(err.message); // => "Expected value to be null"
}
```

Esto puede hacer que nuestra función `expect` sea algo difícil de mantener. Y agregar nuevas propiedades no será tan fácil a medida que la librería crezca. Para hacerlo más mantenible, vamos a manejar esto de una forma un poco diferente.

## Definiendo propiedades
En lugar de envolver un objeto vacío en nuestro proxy, vamos a envolver un objeto que contiene las propiedades a las que queremos darle significado.

```javascript
const properties = {
  // ...
};

export function expect(value) {
  const proxy = new Proxy(properties, {
    get(target, outerProp) {
      // `target` es el mismo objeto `properties`
      console.log(target);
      return new Proxy(() => proxy, {
        get(_, innerProp) {
          return proxy[innerProp];
        },
      });
    },
  });
  return proxy;
}
```

Decidí definir cada propiedad como un objeto que contiene dos funciones: `onAccess`, que se ejecuta cuando una propiedad es accedida; y `onCall`, que se ejecuta cuando una propiedad se llama como una función. Por ejemplo, nuestra propiedad para `null` podría verse así:

```javascript
const isNull = {
  onAccess(actual) {
    if (actual !== null) {
      throw new Error('Expected value to be null');
    }
  },
};
```

También podríamos definir una propiedad para validar que dos valores sean estrictamente iguales:

```javascript
const isEqual = {
  onCall(actual, expected) {
    if (actual !== expected) {
      throw new Error('Expected values to be strictly equal');
    }
  },
};
```

Ahora podemos modificar nuestra función `expect` para que llame las funciones de estas propiedades cuando estén disponibles:

```javascript
// Añadimos las propiedades que definimos
// anteriormente a nuestro objeto `properties`.
const properties = {
  null: isNull,
  equal: isEqual,
};

export function expect(value) {
  const proxy = new Proxy(properties, {
    get(target, outerProp) {
      const property = target[outerProp];
		// Ejecutamos `onAccess` cuando esté disponible.
      property?.onAccess?.(value);
      return new Proxy(
        (...args) => {
			// Ejecutamos `onCall` cuando esté disponible.
          property?.onCall?.(value, ...args);
          return proxy;
        },
        {
          get(_, innerProp) {
            return proxy[innerProp];
          },
        }
      );
    },
  });
  return proxy;
}

expect(null).to.be.null;
expect('a').to.equal('a');
```

¡Ahora tenemos una muy básica librería de aserciones! Y puede ser extendida fácilmente agregando propiedades a nuestro objeto `properties`.

Hay un pequeño detalle que todavía no podemos manejar con nuestra implementación actual: negar aserciones. Necesitamos implementar una forma para modificar el comportamiento de aserciones futuras.

## Negando aserciones
Para lograr manejar esto, necesitamos una forma de comunicarle a nuestras propiedades que la aserción siendo realizada ha sido negada. Para esto, cambiaremos un poco como definimos nuestras propiedades. En lugar de recibir el valor siendo validado como primer argumento, vamos a recibir un objeto `context` que contendrá nuestro valor siendo validado en la propiedad `actual`, y una nueva propiedad `negated` que contendrá un booleano indicando si la aserción ha sido negada. La definición de nuestras propiedades para `equal` y `null` ahora se verán así:

```javascript
const isNull = {
  onAccess(context) {
    if (!context.negated && context.actual !== null) {
      throw new Error('Expected value to be null');
    }
    if (context.negated && context.actual === null) {
      throw new Error('Expected value not to be null');
    }
  },
};

const isEqual = {
  onCall(context, expected) {
    if (!context.negated && context.actual !== expected) {
      throw new Error('Expected values to be strictly equal');
    }
    if (context.negated && context.actual === expected) {
      throw new Error('Expected values not to be strictly equal');
    }
  },
};
```

Y podemos agregar una nueva propiedad para negar nuestras aserciones:

```javascript
const isNot = {
  onAccess(context) {
    // Cambiamos el valor de `negated` a `true`
    // para que futuras aserciones tengan conocimiento
    // de esto.
    context.negated = true;
  },
};
```

Y nuestra función `expect` tendrá que llamar cada handler con un objeto `context` en lugar del valor siendo validado:

```javascript
const properties = {
  null: isNull,
  equal: isEqual,
  not: isNot,
};

export function expect(value) {
  // Nuestro objeto `context`
  const context = {
    actual: value,
    negated: false,
  };
  const proxy = new Proxy(properties, {
    get(target, outerProp) {
      const property = target[outerProp];
      property?.onAccess?.(context);
      return new Proxy(
        (...args) => {
          property?.onCall?.(context, ...args);
          return proxy;
        },
        {
          get(_, innerProp) {
            return proxy[innerProp];
          },
        }
      );
    },
  });
  return proxy;
}

expect('a').to.not.equal('b');
```

Esta técnica puede ser usada para comunicar más detalles a nuestras aserciones futuras.

## Evitar lanzar errores normales
Para hacer que los ejemplos sean mas sencillos, estuvimos lanzando errores normales (`throw new Error(…)`). Ya que queremos que esta librería sea usada con un test runner, sería mejor lanzar algo como un [`AssertionError`](https://nodejs.org/api/assert.html#class-assertassertionerror) de Node; o, en el caso de uvu, su error `Assertion`. Esto nos daría mucha más información si una aserción falla. Y puede ser recibido por Node o test runners para mostrar mejores mensajes y diffs.

## Conclusión
Esta es una explicación muy simplificada sobre como hice [uvu-expect](https://github.com/pablo-abc/uvu-expect). `uvu-expect` tiene muchas más funcionalidades y validaciones como:

* `.resolves` y `.rejects` para realizar aserciones en promesas.
* Posibilidad de crear plugins usando la función `extend`. Así fue como cree un plugin llamado [uvu-expect-dom](https://github.com/pablo-abc/uvu-expect-dom) que ofrece aserciones similares a `@testing-library/jest-dom`.
* Aserciones sobre funciones “mock”. Compatible con [sinonjs](https://sinonjs.org) y [tinyspy](https://github.com/Aslemammad/tinyspy).

El objetivo era tener por lo menos las funcionalidades que uso de Jest. Puedes leer más sobre esta librería en su README. Escribí documentación sobre todo ahí, incluso como crear tus propios plugins.

Esto fue un proyecto muy divertido para construir y explicar. Y ha funcionado muy bien con nuestros [tests en Felte](https://github.com/pablo-abc/felte/blob/main/packages/common/tests/utils.spec.ts).
