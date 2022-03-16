---
title: "Shadow DOM, Firefox and contenteditable"
description: Making focus work correctly on contenteditable elements when using the shadow DOM
created: '2022-03-16'
published: true
imgext: png
image:
  width: 1534
  height: 812
tags:
  - javascript
  - webcomponents
  - firefox
  - webdev
---

> This is more of a short note about some experiments when working with web components that I’m publishing as a reference for future me (or other people that experience the same issue).

I’ve been experimenting with web components in order to build a wrapper for [Felte](https://felte.dev)  that can easily be used with vanilla JS. One of Felte’s features is the ability to use custom field components that are not based on the browser’s native inputs (`input`, `textarea`, `select`). The example I show is a div with an attribute `[contenteditable=“true”]`. While testing this experiment I found some weird behaviour coming from Firefox: while I could perfectly click each field and type of it, if I tried to use the form only using the keyboard (tabbing to each field) the _focus_ moved but trying to type would always result in the text being added to the first field I focused.

Another confusing behaviour is that, even if you can type on the element when _clicking_ on the element itself, the care is not displayed at all. So there’s no visual cue indicating the user that the element itself is editable. Currently, there’s an [open issue on bugzilla that seems to be exactly this](https://bugzilla.mozilla.org/show_bug.cgi?id=1496769).

This behaviour is, of course, unacceptable. Specially since forms (and web applications in general) should be accessible to keyboard users. In order for [the demo I was working on](https://codesandbox.io/s/github/pablo-abc/felte/tree/main/examples/lit/custom-field) to function correctly I went to look for an immediate solution. After some research I found that the solution that works more consistently for me is to _not_ add `[contenteditable]` to the fields on render and, instead, add event listeners that dynamically add the attribute on focus and remove it on blur:

```javascript
function handleFocus(e) {
  e.target.setAttribute('contenteditable', '');
}

function handleBlur(e) {
  e.target.removeAttribute('contenteditable');
}

// We query the shadowRoot of the element that contains
// our `contenteditable` fields
element.shadowRoot
  .querySelectorAll('div[role="textbox"]')
  .forEach((el) => {
    el.addEventListener('focusin', handleFocus);
    el.addEventListener('focusout', handleBlur);
  });
```

Or better yet, in order to make it more easy to reuse, make a custom element that behaves like this:

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
    // Make the element focusable
    this.setAttribute('tabindex', '0');
    // Assign a role for assistive technologies
    this.setAttribute('role', 'textbox');
    // Some default styles
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

This way you can use `<my-field></my-field>` as a `[contenteditable]` “div”!

Keep in mind that this article only worries about making focus work correctly on a `[contenteditable]` element. There's more things that you should consider when doing something like this which would depend on your use-case.
