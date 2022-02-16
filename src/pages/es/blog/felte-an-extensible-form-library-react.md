---
title: "Felte: Manejo de formularios en React"
description: Una forma flexible de manejar tus formularios en React
slug: felte-an-extensible-form-library-react
layout: ../../../layouts/PostLayout.astro
created: '2022-02-14'
imgext: png
lang: es
image:
  width: 800
  height: 444
tags:
  - javascript
  - react
  - forms
  - programación
---

Posiblemente uno de los problemas más comunes que desarrolladores front-end deben resolver es manejo de formularios. Especialmente en aplicaciones web modernas que requieren validaciones instantáneas y otras interacciones en tiempo real con el usuario. Para proveer la mejor experiencia de usuario posible, probablemente uses una librería de terceros para manejo de formularios que te ayude a resolver esto.

En esta publicación escribiré sobre [Felte](https://felte.dev), una librería de manejo de formularios para React en la que he estado trabajando durante este año que busca hacer las bases del manejo de formularios en el cliente lo más simple posible, pero que permite extenderse a medida que la complejidad de tus requisitos crezca.

Esta es una de tres publicaciones relacionadas con Felte. Esta está orientada a la integración de Felte con [React](https://reactjs.org). Las otras están orientadas a la integración con [Svelte](https://svelte.dev) y con [Solid](https://solidjs.com).

## Características
Como mencioné anteriormente, Felte busca hacer que las bases de la reactivada de formularios tan fácil de manejar como sea posible, a su vez permitiendo complejidad extra a través de configuración y extensibilidad. Sus principales características son:

* Una sola función para hacer tu formulario reactivo.
* Usa elementos nativos de HTML5 para crear tu formulario. Solo necesitando el atributo `name`.
* Re-renders mínimos. Ninguno si tu componente no necesita los valores de tu formulario dentro de este.
* Provee stores y otras utilidades para manejar casos de uso más complejos.
* No asume nada sobre tu estrategia de validación. Puedes usar tu librería de validación preferida o escribe tu propia estrategia.
* Maneja mutaciones del DOM en tiempo de ejecución.
* Soluciones oficiales para manejar reporte de errores en validación.
* Validación con [yup](https://felte.dev/docs/react/validators#using-yup), [zod](https://felte.dev/docs/react/validators#using-zod), [superstruct](https://felte.dev/docs/react/validators#using-superstruct) y [vest](https://felte.dev/docs/react/validators#using-vest).
* Puedes [extender su funcionalidad](https://felte.dev/docs/react/extending-felte) fácilmente.

## ¿Cómo se ve?
En su forma más sencilla, Felte solo requiere que se importe una sola función:

```jsx
import { useForm } from '@felte/react';

export function Form() {
  const { form } = useForm({
    onSubmit: (values) => {
      // ...
    },
  });

  return (
    <form ref={form}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <input type="submit" value="Sign in" />
    </form>
  );
}
```

En el ejemplo anterior configuramos el formulario llamando a `useForm` con nuestra función `onSubmit` que se ejecutará al momento de enviar nuestro formulario. Esta función retorna, junto con otras utilidades, una función que puede ser usada en nuestro elemento `form`. Con esto, Felte observará todos los inputs del formulario con un atributo `name`. Cuando envíes tu formulario, los valores más recientes serán pasados a tu función `onSubmit` como un objeto. En nuestro ejemplo anterior, la forma de `values` se verá así:

```javascript
{
  email: '',
  password: '',
}
```

## ¿Dónde puedo ver los valores de mis inputs?
Mientras escribe, Felte llevará un registro de tus `input` en un observable que contiene los datos de tu formulario en la misma forma en que los recibirías en tu función `onSubmit`. Este observable es manipulado por Felte y su valor puede ser obtenido llamando la función `data` retornada por `useForm`; no hay necesidad de que manejes observables en tu código. Nos referiremos a estas funciones como `accessors` de ahora en adelante. Cuando este accessor es llamado sin ningún argumento (`data()`), retornará todos los valores de tu formulario en un objeto. Esto también hará que tu componente se "subscriba" a todos los cambios de tu formulario, haciendo que tu componente haga re-render en cada cambio. Estos `accessors` pueden recibir un argumento, ya sea una funcíon para seleccionar un valor, o una string refiriendose a la ubicación del valor en el objeto. Usando un argumento puedes limitar a que tu componente se subscriba solo a las propiedades que necesita.

Por ejemplo, esto imprimiría el email de tu usuario en la consola a medida que escriban:

```javascript
// Dentro de un componente
const { form, data } = useForm({ /* ... */ });

// Utilizando una función
console.log(data(($data) => $data.email));

// Utilizando un string
console.log(data('email'));
```

## Tal vez necesite algo de validación
Claro, otro requisite común en formularios es validación. Si queremos que nuestra aplicación se sienta rápida, querremos algo de validación del lado del cliente. La configuración de `useForm` acepta una función en su propiedad `validate` (que puede ser asíncrona). Esta función recibirá el valor más reciente de `data` a medida que cambie y espera que devuelvas un objeto con la misma estructura conteniendo tus mensajes de validación si tu formulario no es válido, o nada si tu formulario es válido. Felte llevará un registro de todos estos mensajes de validación en un accessor devuelto por `useForm` llamado `errors`:

```javascript
const { form, errors } = useForm({
  validate(values) {
    const currentErrors = {};
    if (!values.email) currentErrors.email = 'Must not be empty';
    if (!values.password) currentErrors.password = 'Must not be empty';
    return currentErrors;
  },
});

console.log(errors(($errors) => $errors.email));
```

Requisitos más complejos pueden necesitar librerías de terceros para validación. Felte provee integraciones de primera parte con algunas librerías de validación populares gracias a su extensibilidad. Estas integraciones se ofrecen como librerías separadas. Escribiré más sobre esto en la siguiente sección relacionada con extensibilidad, pero puedes leer más de esto en la [documentación oficial](https://felte.dev/docs/react/validators) (inglés).

## Manejando escenarios complejos a través de extensibilidad
Felte no asume conocer la solución perfecta para manejar todos los escenarios relacionados con el manejo de formularios. Es por esto que Felte ofrece un API para extender su funcionalidad a medida que tus requerimientos crezcan. Tal vez tienes una librería de validación favorita, como la muy popular librería [yup](https://github.com/jquense/yup), o [Vest](https://vestjs.dev/)  (del cual se habló en el último [Svelte Summit](https://www.youtube.com/watch?v=X2PuiawaGV4)). Modificar el funcionamiento de Felte para manejar estos escenarios es posible a través de la opción `extend` de `useForm`. Más sobre esto se puede leer en la [documentación oficial](https://felte.dev/docs/react/extending-felte) (inglés). Para mantener esta publicación sencilla, solo escribiré sobre las librerías existentes que mantenemos para manejar casos de uso comunes:

### Validators: Integraciones con librerías de validación populares
Actualmente mantenemos cuatro paquetes para integrar Felte con algunas librerías de validación: `yup`, `zod`, `superstruct`  y recientemente: `vest`.  Usaremos yup como un ejemplo, pero puedes leer más sobre el resto [aquí](https://felte.dev/docs/react/validators) (inglés).

Nuestro paquete para usar `yup` se encuentra en npm bajo el nombre `@felte/validator-yup`. Necesitarás instalarlo junto a `yup`:

```bash
npm install --save @felte/validator-yup yup

# O, si usas yarn

yarn add @felte/validator-yup yup
```

Esta librería exporta una función llamada `validator` que puede ser pasada a la opción `extend` de `useForm`. Tu esquema de validación puede ser pasado en la opción `validateSchema`:

```javascript
import { validator } from '@felte/validator-yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const { form } = useForm({
  // ...
  extend: validator, // O `extend: [validator],`
  validateSchema: schema,
  // ...
});
```

### Reporters: Mostrando mensajes de validación
Mostrar tus mensajes de validación puede ser hecho directamente accediendo al store `errors` devuelto por `useForm`. Estos mensajes no estarán disponibles en el store hasta que se haya interactuado con el campo al que se refiera.

```jsx
import { useForm } from '@felte/react';

function Form() {
  const { form, errors } = useForm({ /* ... */ });

  return (
    <form ref={form}>
      <label htmlFor="email">Email:</label>
      <input name="email" type="email" id="email" />
      {!!errors('email') && (
        <span>{errors('email')}</span>
      )}
      <button>Submit</button>
    </form>
  );
}
```

> Si un input específico tiene un error, Felte asignará el atributo `aria-invalid=true` al input apropiado.

Pero tal vez no te guste la sintaxis anterior para manejar los mensajes de validación. Actualmente Felte también tiene cuatro librerías que ofrecen diferentes alternativas para mostrar tus mensajes de validación:

* Utilizando un componente de React, la opción más flexible, que permite además acceder a tus mensajes de validación sin necesidad de pasar `errors` a tus componentes hijos.
* Modificando el DOM directamente añadiendo o removiendo elementos.
* Utilizando Tippy.js para mostrar tus mensajes en un tooltip.
* Utilizando el “constraint validation API” del navegador, que puede ser menos amigable a usuarios en dispositivos móviles.

Para mantener todo breve, solo escribiré sobre la primera librería mencionada. Pero puedes leer más sobre el resto [en la documentación](https://felte.dev/docs/react/reporters) (inglés).

Utilizar un componente de React para obtener tus mensajes de validación puede hacerse con la librería `@felte/reporter-react`. Necesitarás añadir esta librería a tu proyecto con tu administrador de paquetes preferido:

```bash
# npm
npm i -S @felte/reporter-react

# yarn
yarn add @felte/reporter-react
```

Luego necesitarás importar la función  `reporter` para pasarla a la propiedad `extend`, y el componente `ValidationMessage` que usarás para obtener tus mensajes de validación:

```jsx
import { reporter, ValidationMessage } from '@felte/reporter-react';
import { useForm } from '@felte/react';

function Form() {
  const { form } = useForm({
      // ...
      extend: reporter, // o [reporter]
      // ...
    },
  })

 // Asumimos que un único string será pasado
 // Esto puede ser un arreglo de strings dependiendo de tu estrategia de validación
  return (
    <form ref={form}>
      <input id="email" type="text" name="email" />
      <ValidationMessage for="email">
        {(message) => <span>{message}</span>}
      </ValidationMessage>
      <input type="password" name="password" />
      <ValidationMessage for="password">
        {(message) => <span>{message}</span>}
      </ValidationMessage>
      <input type="submit" value="Sign in" />
    </form>
  );
}
```

## Siguientes pasos
Puedes leer más sobre Felte en su [sitio oficial](https://felte.dev) (inglés), incluye un par de ejemplos de su uso. Además puedes ver un ejemplo más complejo de su uso, utilizando Tippy.js y Yup, en [CodeSandbox](https://codesandbox.io/s/felte-demo-solidjs-w92uj?file=/src/main.tsx).

## Palabras finales
Espero que esto haya servido como una buena introducción a Felte, y que haya sido lo suficientemente interesante como para que quieras probarlo. Felte ya es lo suficientemente funcional para ser usado y siento que es lo suficientemente flexible para manejar la mayor parte de casos de uso. También estoy abierto a recibir ayuda o sugerencias. Siéntete libre de abrir un issue o un pull request en  [GitHub](https://github.com/pablo-abc/felte).

La documentación de Felte actualmente solo se encuentra en inglés, algo de ayuda [traduciendo la documentación](https://github.com/pablo-abc/felte/tree/main/packages/site/markdown/docs) sería muy apreciado.
