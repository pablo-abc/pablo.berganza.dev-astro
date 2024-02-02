---
title: 'Svelte: mi nueva obsesión'
description: Le di una oportunidad a Svelte y terminé reescribiendo todo mi sitio
created: '2020-04-20'
published: true
image:
  width: 800
  height: 450
lang: es
tags:
  - svelte
  - javascript
  - webdev
---

Admito que soy la clase de persona que se obsesiona inmediatamente con algo si es nuevo e interesante. Así es como empecé con [Clojure](https://clojure.org), [Rust](https://www.rust-lang.org/), y con el tema de hoy: [Svelte](https://svelte.dev/).

Svelte no es un nuevo lenguaje que estoy aprendiendo, como fue con Rust y Clojure. Es un framework de JavaScript para crear single-page applications (SPA). Como React, Vue o Angular. Su sintáxis puede recordar a Vue, pero tiene una diferencia fundamental con el framework típico. Svelte no tiene un tiempo de ejecución y, a diferencia del resto, no es empaquetado con el resto de tu código. Svelte es un compilador. Compila tus componentes en código reactivo de JavaScript que modifica el DOM directamente. Producirá un paquete más pequeño y eficiente.

## ¿Cómo se ve?

Svelte intenta mantenerse lo más cercano posible a HTML semánticamente correcto. Esto significa que un simple editor de HTML funcionaría para editar un componente de Svelte.

Por ejemplo, el componente más minimalista podría verse así:

```html
<p>Hello world!</p>
```

¡Eso es todo! Has creado un componente de Svelte válido que el compilador entenderá.

## ¿Cómo hacerlo reactivo?

Claro, si fueras a escribir componentes así, estarías mejor escribiendo puro HTML. La razón por la que usas un framework de JavaScript es por que necesitas una manera de manejar la reactividad en tu aplicación web. Para esto necesitamos una manera de añadir JavaScript a nuestro componente. Cómo lo harías con puro HTML, código JavaScript puede ser agregado dentro de una etiqueta `script`:

```html
<script>
  console.log('Hello world!');
</script>
```

Para agregar “estado” a nuestro componente solo necesitamos declarar una variable de JavaScript:

```html
<script>
  let message = 'Hello world!';
</script>
```

Éstas variables pueden ser usadas dentro de la plantilla mediante llaves. Esto es similar a como lo hace Vue.

```html
<script>
  let messsage = 'Hello world!';
</script>

<p>{message}</p>
```

La variable `message` es reactiva. Si fuera a cambiar por una razón (e.g. un evento), el contenido de la etiqueta `p` sería actualizado inmediatamente. Por ejemplo, podemos crear un input que actualice el contenido de `message`.

La plantilla de un componente de Svelte no debe ser un solo elemento, así que podemos solo agregar una etiqueta `input` después de `p`.

```html
<script>
  let message = 'Hello world!';

  function onInput(event) {
    message = event.target.value;
  }
</script>

<p>{message}</p>

<input value="{message}" on:input="{onInput}" />
```

Esto se terminaría viendo así:

<iframe src="https://pablo-abc.github.io/pablo.berganza.dev-examples/svelte-basic-text-input/"></iframe>

Pero esto todavía es muy complicado. Svelte nos provee directivas “mágicas” para hacer ciertas operaciones más fáciles. La directiva `bind` ayuda a enlazar datos de manera bidireccional.

```html
<script>
  let message = 'Hello world!';
</script>

<p>{message}</p>

<input bind:value="{message}" />
```

¡Esto generaría un resultado igual al anterior!

> Svelte solo maneja reactividad al encontrar una asignación. Esto significa que métodos para arreglos, como `push` y `pop`, no provocaría actualizaciones en los componentes.

Svelte también provee bloques estilo [Handlebars](https://handlebarsjs.com/) para manejar renderización condicional, asincronía y bucles dentro de las plantillas.

## ¿Qué hay de los estilos?

Svelte provee una manera de agregar estilos limitados a tus componentes. Como se puede esperar, esto se hace por medio de la etiqueta `style`. Svelte asignará clases únicas a cada elemento del componente durante la compilación. Puedes usar CSS válido dentro de la etiqueta, pero un plugin para rollup/webpack puede ser usado para aceptar tu variante favorita (e.g. SASS).

```html
<h1>Hello world!</h1>

<style>
  h1 {
    color: purple;
  }
</style>
```

En tiempo de compilación se le asignará una clase generada por Svelte a la etiqueta `h1` y un selector CSS para esta clase será agregado al `h1` en `style`.

Si necesitas que el selector sea global, puedes envolverlo en `:global(...)`. Para el ejemplo anterior, si reemplazáramos `h1` por `:global(h1)`, se aplicaría el estilo globalmente a todos los elementos `h1` del proyecto. Esto es muy útil si tu proyecto contiene HTML generado dinámicamente que no es controlado por Svelte. Ya que Svelte no será capaz de asignar clases a los elementos dentro de este. Algo como `div :global(h1)` seleccionaría todos los `h1` dentro de todos los `div` del componente. Esto puede ser usado para garantizar que el estilo se mantenga limitado al componente.

Claro, siempre puedes tener un archivo CSS global para manejar estilos comunes en todos los componentes.

## Un ejemplo más completo

Una simple aplicación para manejar un listado de cosas por hacer podría verse así:

```html
<script>
  let todos = [],
    value = '';
  let filter = 'all';
  // El $: le dice a Svelte que la declaración sea reactiva.
  // En este caso, la asignación a "filtered" se ejecutará
  // siempre que "todos" cambie.
  $: filtered = todos.filter((todo) => {
    if (filter === 'checked') return todo.checked;
    if (filter === 'unchecked') return !todo.checked;
    return todo;
  });
  function addTodo() {
    if (!value) return;
    todos = [...todos, { value, id: Date.now(), checked: false }];
    value = '';
  }
</script>

<form>
  <label for="all">
    <input type="radio" id="all" value="all" bind:group="{filter}" />
    All
  </label>
  <label for="checked">
    <input type="radio" id="checked" value="checked" bind:group="{filter}" />
    Checked
  </label>
  <label for="unchecked">
    <input
      type="radio"
      id="unchecked"
      value="unchecked"
      bind:group="{filter}"
    />
    Unchecked
  </label>
</form>
<form on:submit|preventDefault="{addTodo}">
  <input bind:value />
  <button type="submit">Add Todo</button>
</form>
<ul>
  {#each filtered as todo, i (todo.id)}
  <li>
    <input id="{todo.id}" bind:checked="{todo.checked}" type="checkbox" />
    {todo.value}
  </li>
  {/each}
</ul>

<style>
  label {
    display: inline-block;
    margin: 0 10px;
  }
  li {
    list-style: none;
  }
</style>
```

<iframe height="315px" src="https://pablo-abc.github.io/pablo.berganza.dev-examples/svelte-basic-todo-app/"></iframe>

Este ejemplo usa algunas características de las que no hablé, pero el [tutorial oficial](https://svelte.dev/tutorial/basics 'Tutorial oficial de Svelte') es fantástico si estás interesado en aprender más.

## Otras características

Svelte también nos provee otras características útiles como:

- Transiciones y animaciones incorporadas.
- Acceder fácilmente al head, window y body del documento.
- Ciclos de vida para los componentes.
- Almacenamiento global.
- Compatibilidad con renderización del lado del servidor.
- Los componentes pueden ser exportados como Web Components.

## ¿Por qué reescribir todo el sitio?

Anteriormente mi sitio fue hecho utilizando [Perun](https://perun.io). Es un generador de sitios estáticos muy útil para Clojure que tiene mucha flexibilidad, ya que cada paso de la generación puede ser interceptado. Pero había ciertos aspectos de la generación que era difícil cambiar o tenían poca documentación. (No estoy criticando a Perun. Es una herramienta excelente. Solo quería más libertad).

Perun genera puro HTML sin nada de JavaScript. Si necesitas JavaScript, debe ser inyectado manualmente. Cada página es generada por una función escrita en Clojure que retorna HTML. A menos que hayas instalado paquetes extra, no hay soporte integrado para estilos limitados a componentes. Y, como el generador corre sobre la JVM, la generación del sitio era algo lenta.

Este sitio no fue escrito solo con Svelte. Usa [Sapper](https://sapper.svelte.dev). Sapper es un framework para Svelte inspirado en [Next.JS](https://nextjs.org) que permite crear aplicaciones web renderizadas del lado del servidor. También puede exportar un sitio estático como lo hace Next.JS. Esto te da mucha más libertad sobre cómo es generado el sitio, requiriendo un poco más de código. Por ejemplo, así como lo hice con Perun, el contenido de cada publicación viene de un archivo markdown. Pero con Sapper tuve que escribir manualmente el proceso que lee el markdown y genera el HTML. Esto me permitió usar librarías con las que tengo más familiaridad, como [Marked](https://github.com/markedjs/marked) para parsear el markdown y [Highlight.js](https://highlightjs.org/) para estilizar el código.

El sitio resultante funciona como una SPA y tiene algunas características que no pude hacer previamente, algunas de ellas:

- Estilizar código de GraphQL.
- Agregar ejemplos funcionales (cómo los anteriores).
- Navegar por todo el sitio sin necesidad de refrescar la página.
- Carga diferida de imágenes.
- Agregar elementos externos a las publicaciones, cómo videos de YouTube.

También ayudó a mejorar la experiencia de desarrollo como:

- Componentes reutilizables.
- Estilos CSS limitados a componentes. Esto ayudó con varios dolores de cabeza debido a mi falta de conocimiento en CSS.
- Generación mucho más rápida de los archivos estáticos.
- Fácilmente añadir elementos interactivos al sitio. (Tal vez agregue un buscador para publicaciones en algún momento).
- Es fácil seguir una estructura de código mantenible.

Una desventaja de usar Svelte es que no posee soporte para TypeScript (aunque se está trabajando en ello).
Otra desventaja es que Sapper todavía está en desarrollo temprano, no recomendaría usarlo para algún proyecto serio. Aunque Svelte sí se encuentra en un estado listo para producción.
También tiene un ecosistema mucho más pequeño comparado a otros frameworks más populares.

## Conclusión

Aún tomando en cuenta las desventajas que mencioné anteriormente, trabajar con Svelte/Sapper ha sido muy disfrutable. En menos de 20 horas de trabajo combinado logré reescribir todo mi sitio. Svelte es una opción excelente para crear aplicaciones eficientes, y su sintaxis es más fácil de comprender que la de otros frameworks. Definitivamente no debe ser considerado un framework “de juguete” y recomiendo que lo añadas a tus habilidades.

Como un pequeño extra, aquí está la charla que me emocionó acerca de Svelte. Recomiendo que cualquiera con un poco de interés en Svelte lo vea. (Está en inglés).

<div class="yt-vid">
    <yt-vid alt="Rethinking Reactivity - Rich Harris" src="https://www.youtube-nocookie.com/embed/AdNJ3fydeao" allowfullscreen></yt-vid>
</div>
