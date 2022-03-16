---
title: "Anunciando Felte 1.0: Una librería de formularios para Svelte, Solid y React"
description: Después de más de un año de trabajo, ¡v1 está aquí!
created: '2022-02-14'
published: true
imgext: png
lang: es
image:
  width: 800
  height: 444
crosspost:
  devto: "https://dev.to/pabloabc/announcing-felte-10-a-form-library-for-svelte-solid-and-react-5ble"
  hashnode: "https://hn.berganza.dev/announcing-felte-10-a-form-library-for-svelte-solid-and-react"
tags:
  - javascript
  - forms
  - webdev
---

Después de más de un año de trabajo, estoy orgulloso de poder anunciar el lanzamiento de la versión 1.0 de [Felte](https://felte.dev).

Felte es una librería extendible para manejo de formularios que puede ser utilizada con  [Svelte](https://svelte.dev), [Solid](https://solidjs.com) y (a partir de ahora) [React](https://reactjs.org). Su principal característica es que no necesita el uso de componentes estilo `Form` o `Field` para funcionar. En su forma más básica, solo necesita una referencia a tu elemento `<form>` para que se subscriba a las interacciones del usuario en tu formulario.

Originalmente empecé a trabajar en Felte debido a que quería una librería para manejo de formularios que no hiciera complejo agregar estilos a los componentes que usara como inputs. A medida que trabajé más, empezó a convertirse en un paquete mucho más flexible que te permitía usar [tu librería de validación preferida](https://felte.dev/docs/svelte/validators) y [mostrar tus mensajes de validación como prefieras](https://felte.dev/docs/svelte/reporters). Cuando se anunció la versión 1.0.0 de SolidJS, [publiqué una versión compatible](https://www.npmjs.com/package/@felte/solid) que comparte la mayor parte del código con el [paquete original](https://www.npmjs.com/package/felte). Y ahora, más de un año después del primer commit, la versión 1.0.0 ha sido lanzada ¡junto a [una nueva versión para React](https://www.npmjs.com/package/@felte/react)! Esta versión incluye muchas mejoras en la API principal, nuevas features y una API más consistente entre las tres versiones.

## Uso
Las tres versiones de Felte se usan de una forma muy parecida. Y tienen un mismo concepto: llamas una función para preparar tu formulario, y le provees una referencia a tu elemento `<form>`. Las diferencias entre versiones son debido a la forma en que cada framework maneja reactividad. Por ejemplo, en Svelte, Felte retorna `stores` que pueden ser accedidas agregando un `$` antes del nombre. En React y Solid, Felte retorna funciones que te ayudan a subscribirte a tu formulario o a valores específicos de él.

A continuación un ejemplo básico de como se ve cada versión:

### Svelte
El paquete para Svelte puede ser encontrado en npm como [`felte`](https://www.npmjs.com/package/felte).

```html
<script>
  import { createForm } from 'felte'

  const { form } = createForm({
    onSubmit: async (values) => {
      /* llamada a un api */
    },
  })
</script>

<!-- `form` es un action -->
<form use:form>
  <input type=text name=email>
  <input type=password name=password>
  <button type=submit>Sign In</button>
</form>
```

### Solid
El paquete para Solid puede ser encontrado en npm como [`@felte/solid`](https://www.npmjs.com/package/@felte/solid).

```jsx
import { createForm } from '@felte/solid';

function Form() {
  const { form } = createForm({
    onSubmit: async (values) => {
      /* llamada a un api */
    },
  })

	// `form` es un action
  return (
    <form use:form>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### React
El paquete para React puede ser encontrado en npm como [`@felte/react`](https://www.npmjs.com/package/@felte/react).

```jsx
import { useForm } from '@felte/react';

function Form() {
  const { form } = useForm({
    onSubmit: async (values) => {
      /* llamada a un api */
    },
  })

	// `form` es un ref
  return (
    <form ref={form}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## Novedades
La versión 1.0 viene con muchas novedades y mejoras:
* Validaciones retrasadas (debounced). Previamente si soportábamos validaciones asíncronas, pero no forma de retrasarlas para no ejecutarlas muy seguido. Esto hacía que usar validaciones que llamara a servicios externos no sea muy recomendado.
* Las validaciones asíncronas pueden solo ser necesarias para ciertos campos de tu formulario. Mostrar una señal en los campos que están siendo validados es una característica que puede ser deseada en ciertos casos. Por esto, Felte ahora retorna una nueva store `isValidating` que indica si validaciones están corriendo. Junto con otra store `interacted` que contiene el `name` del último campo con el que el usuario ha interactuado.
* Usar campos no nativos en tu formulario uno era tan sencillo previamente, requiriendo usar los “helpers” retornados por Felte para actualizar tus valores. Felte ahora exporta una nueva función: `createField` (o `useField` en el caso de React) que puede ser usada para campos a los que no puedes asignarle un atributo `name`, o que no usen elementos nativos (como un `div` con `contenteditable`). Te ayuda a hacer que campos no nativos puedan ser encontrados por Felte.
* Mejor soporte para arreglos de campos con nuevas funciones de ayuda: `addField`, `unsetField`, `moveField` y `swapFields`.
* No necesitas tener un `onSubmit` en la configuración de Felte. Si no declaras un `onSubmit`, Felte va a enviar tus valores como `application/x-www-form-urlencoded` o `multipart/form-data` utilizando los atributos `action`, `method` y `enctype` de tu elemento `<form>`.

## Breaking changes
Siendo cambios mayores, actualizar de 0.x a 1.0 trae cambios que que pueden irrumpir tu código actual. Si estabas usando la versión 0.x de Felte, puedes revisar la [guía para migración en Svelte](https://felte.dev/docs/svelte/migrating) o la [guía para migración en Solid](https://felte.dev/docs/solid/migrating).

## Más información
He ido atrás para actualizar mis publicaciones originales sobre Felte y agregué un artículo para la versión de React. Puedes encontrarlas aquí:

* [Felte: Manejo de formularios en Svelte](https://pablo.berganza.dev/es/blog/felte-an-extensible-form-library-svelte/)
* [Felte: Manejo de formularios en Solid](https://pablo.berganza.dev/es/blog/felte-an-extensible-form-library-solid/)
* [Felte: Manejo de formularios en React](https://pablo.berganza.dev/es/blog/felte-an-extensible-form-library-react/)

## Palabras finales
He puesto mucho trabajo en este proyecto y estoy muy agradecido a los contribuyentes que han ayudado a hacer que Felte crezca tanto! Espero que este nuevo lanzamiento pueda ser útil a todos ustedes!
