---
title: "Shadow DOM, Firefox y contenteditable"
description: Haciendo que el focus funcione correctamente en Firefox usando el shadow DOM
created: '2022-03-16'
published: true
imgext: png
lang: es
image:
  width: 1534
  height: 812
tags:
  - javascript
  - firefox
  - webcomponents
  - webdev
---

 Esta es más una nota sobre unos experimentos que estaba realizando con web components que estoy publicando como referencia para mi yo futuro (u otras personas que encuentren el mismo problema).

He estado experimentando un poco con Web Components para hacer un paquete para [Felte](https://felte.dev) que pueda ser usado con vanilla JS. Una de las funcionalidades de Felte es permitirte usar campos que no están basados en los elementos nativos del browser como campos de tu formulario (`input`, `textarea`, `select`). El ejemplo que uso para mostrar esta funcionalidad es con `divs` con un atributo `[contenteditable=“true”]`. Mientras experimentaba encontré un comportamiento extraño en Firefox: aun que podía hacer click a cada campo para escribir en ellos, si intentaba usar el formulario solo con el teclado y moverme con `tab` al siguiente campo, el _focus_ se movía correctamente al siguiente campo pero al intentar escribir el texto era agregado al primer campo al que había hecho focus.

Otro comportamiento confuso es que, aun que si podía usar el mouse para moverme a otro campo, el cursor de texto no aparecía en el campo. Esto significa que no había un indicador visual de que el campo en si es editable. Actualmente [hay un issue abierto en bugzilla que parece ser exactamente esto](https://bugzilla.mozilla.org/show_bug.cgi?id=1496769).

Este comportamiento no es aceptable. Especialmente ya que las aplicaciones web deben ser accesible para usuarios que navegan solo con el teclado. Para que [el demo en el que estaba trabajando](https://codesandbox.io/s/github/pablo-abc/felte/tree/main/examples/lit/custom-field) funcione correctamente, me puse a investigar por una solución inmediata. La solución que encontré que funcionaba de forma consistente para mi es remover completamente el atributo `[contenteditable]` , y dinámicamente agregarlo cuando se haga focus al elemento y removerlo cuando se haga blur:

```javascript
function handleFocus(e) {
  e.target.setAttribute('contenteditable', '');
}

function handleBlur(e) {
  e.target.removeAttribute('contenteditable');
}

// Buscamos los elementos con `contenteditable` en el
// sadow root del elemento que los contiene
element.shadowRoot
  .querySelectorAll('div[role="textbox"]')
  .forEach((el) => {
    el.addEventListener('focusin', handleFocus);
    el.addEventListener('focusout', handleBlur);
  });
```

O mejor aún, para hacer una solución más reusable, hacer un custom element que se comporte de esta forma:

```javascript
function handleFocus(e) {
  e.target.setAttribute('contenteditable', '');
}

function handleBlur(e) {
  e.target.removeAttribute('contenteditable');
}

export class MyField extends HTMLElement {
  constructor() {
    super();
    // Hacer que se le pueda dar focus al elemento
    this.setAttribute('tabindex', '0');
    // Asignar un rol para tecnologías asistivas
    this.setAttribute('role', 'textbox');
    // Estilos por defecto
    this.style.display = 'block';
    this.style.cursor = 'text';
  }

  connectedCallback() {
    this.addEventListener('focusin', handleFocus);
    this.addEventListener('focusout', handleBlur);
  }

  disconnectedCallback() {
    this.removeEventListener('focusin', handleFocus);
    this.removeEventListener('focusout', handleBlur);
  }
}

customElements.define('my-field', MyField);
```

De esta forma puedes usar `<my-field></my-field>` como un “div” `[contenteditable]` donde sea!

Ten en mente que este artículo solo se preocupa en hacer que el "focus" en elementos con `[contenteditable]` funcione bien. Hay otras cosas que considerar a la hora de utilizar algo así que dependerán del caso de uso.
