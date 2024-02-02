---
title: 'Announcing Felte 1.0: A form library for Svelte, Solid and React'
description: After more than a year of work, v1 is here!
created: '2022-02-14'
published: true
imgext: png
image:
  width: 800
  height: 444
crosspost:
  devto: 'https://dev.to/pabloabc/announcing-felte-10-a-form-library-for-svelte-solid-and-react-5ble'
  hashnode: 'https://hn.berganza.dev/announcing-felte-10-a-form-library-for-svelte-solid-and-react'
tags:
  - javascript
  - forms
  - webdev
---

After more than a year of work, I am proud to announce the release of version 1.0.0 of [Felte](https://felte.dev)!

Felte is an extensible form management library for [Svelte](https://svelte.dev), [Solid](https://solidjs.com) and (as of today) [React](https://reactjs.org). The main characteristic of it is that it does not require any sort of `Field` or `Form` components to work. In its most basic form it only requires you to provide it your HTML form element so it can subscribe to your user’s interaction with your form.

I originally started working on Felte wanting a form library for Svelte that would not make it complex to style my input components. As I worked more on it, it began growing into a much more flexible package that allowed you to validate your form using [your preferred validation library](https://felte.dev/docs/svelte/validators) and [display your validation messages as you preferred](https://felte.dev/docs/svelte/reporters). After the release of version 1.0.0 of SolidJS, I released a [version for it as well](https://www.npmjs.com/package/@felte/solid) that shares most of its internals with the original [Felte package](https://www.npmjs.com/package/felte). And now, more than a year after the first commit, version 1.0.0 has been released alongside [a new version for React](https://www.npmjs.com/package/@felte/react)! This includes many improvements in the core API, new features and a more consistent API between all three versions.

## Usage

All three versions of Felte have a very similar API, and a similar concept: you call a function to set up your form. Then you give Felte a reference to your HTML form element. The variations in its API come mostly from how each framework handles reactivity. For example, with Svelte, Felte returns stores that contain your data which you can access by prefixing the stores with `$`. With Solid and React it returns functions that will let you subscribe to all of your form’s data or specific values of it.

On its most basic form, you only need to use `form`, a property returned from Felte that will let it subscribe to all interactions that happen in your form.

Here’s a basic example of how each version looks like:

### Svelte

The package for Svelte is available on npm as [`felte`](https://www.npmjs.com/package/felte).

```html
<script>
  import { createForm } from 'felte';

  const { form } = createForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  });
</script>

<!-- `form` is an action -->
<form use:form>
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Sign In</button>
</form>
```

### Solid

The package for Solid is available on npm as [`@felte/solid`](https://www.npmjs.com/package/@felte/solid).

```jsx
import { createForm } from '@felte/solid';

function Form() {
  const { form } = createForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  });

  // `form` is an action
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

The package for React is available on npm as [`@felte/react`](https://www.npmjs.com/package/@felte/react).

```jsx
import { useForm } from '@felte/react';

function Form() {
  const { form } = useForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  });

  // `form` is a ref
  return (
    <form ref={form}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## New features

Version 1 comes with a lot of improvements and features:

- Debounced validation is now supported. Previously we only supported asynchronous validation, but offered no way to debounce them. This meant using Felte’s validation for calls to an API would not be recommended unless you debounced it yourself, or did them only on submission.
- Asynchronous and debounced validations might apply to only a few fields. Showing loaders for the field’s that are validating is a nice feature to have for your users. This is why Felte now offer’s a way to check if validations are currently running via the new `isValidating` store. And a way to check which is the last field your users interact with using the new `interacted` store.
- Using custom form controls was not so straightforward. Requiring to use helper functions to update your stores. Felte now exports a new function: `createField` (`useField` for React) to be used with custom fields where you can’t directly provide a `name`, or with fields that don’t use native HTML controls at all (such as a `contenteditable` elements). It helps you make your custom fields “discoverable” to Felte.
- Better support for field arrays with new helper functions to handle them: `addField`, `unsetField`, `moveField` and `swapFields`.
- You no longer always need to have an `onSubmit` handler. If no `onSubmit` is declared, Felte will submit your values as either `application/x-www-form-urlencoded` or `multipart/form-data` using the `action`, `method` and `enctype` attributes of your `<form>` element.

## Breaking changes

This being a major version release, there are some breaking changes. If you were previously using Felte v0.x, you can check [the migration guide for Svelte](https://felte.dev/docs/svelte/migrating), or [the migration guide for Solid](https://felte.dev/docs/solid/migrating).

## Read more

I’ve gone back to update my original introductory posts about Felte, as well as added a new one about React to the series. You can check them out here:

- [Felte: an extensible form library for Svelte](https://pablo.berganza.dev/blog/felte-an-extensible-form-library-svelte/)
- [Felte: an extensible form library for Solid](https://pablo.berganza.dev/blog/felte-an-extensible-form-library-solid/)
- [Felte: an extensible form library for React](https://pablo.berganza.dev/blog/felte-an-extensible-form-library-react/)

## Final words

I’ve put a lot of work on this project, and I’m really grateful to the contributors that helped Felte grow as much as it did! I hope that this release can be useful to all of you!
