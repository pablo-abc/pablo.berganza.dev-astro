---
title: "Felte: An extensible form library for Svelte and Solid"
description: Create your forms as you would any valid HTML5 form!
layout: ../../layouts/PostLayout.astro
created: '2021-09-01'
imgext: png
image:
  width: 800
  height: 444
tags:
  - javascript
  - svelte
  - forms
  - programming
---

For the past few months I've invested most of my free time dedicated to create a form management library for Svelte (and more recently, [Solid](https://solidjs.com)). After this much work I'm happy to announce it to the masses in hope you'll find it useful and enjoyable. This library is [Felte](https://felte.dev) and if you'll allow me to borrow some of your time, I'd love to give you an introduction to it.

> In order to simplify writing, this blog post will assume you're using Svelte. But the features are the same for Solid.

## Features

Felte aims to solve a lot of the common issues you'll find yourself into when managing forms in Svelte, hoping to make common use cases as frictionless as possible while still allowing for more complex use cases via configuration an extensible functionality. Its main features are:

- Single action to make your form reactive.
- Use HTML5 native elements to create your form. (Only the `name` attribute is necessary).
- Provides stores and helper functions to handle more complex use cases.
- No assumptions on your validation strategy. Use any validation library you want or write your own strategy.
- Handles addition and removal of form controls during runtime.
- Official solutions for error reporting using `reporter` packages.
- Supports validation with [yup](./packages/validator-yup/README.md), [zod](./packages/validator-zod/README.md) and [superstruct](./packages/validator-superstruct/README.md).
- Easily [extend its functionality](https://felte.dev/docs#extending-felte).

Felte is also well tested. Currently at [98% code coverage](https://app.codecov.io/gh/pablo-abc/felte) and constantly working on improving test quality.

If this is enough to pike a bit of your interest, you may start [looking at the documentation](https://felte.dev/docs).

## How does it look?

A really simple use case might look like this:

```html
<script>
  import { createForm } from 'felte'

  const { form } = createForm({
    onSubmit: async (values) => {
      /* call to an api */
    },
  })
</script>

<form use:form>
  <input type=text name=email>
  <input type=password name=password>
  <input type=submit value="Sign in">
</form>
```

And here is where it shows what I mean by a "single action to make your form reactive". If we look at the template, the only difference from a plain HTML form is the `use:form` directive. As long as your inputs have a `name` attribute, Felte will handle them.

## How do I access my form's values?

Besides your values being passed to the `onSubmit` function defined in `createForm`, you may access them via a Svelte store also returned by `createForm` named `data`. This store will be updated in real time.

```javascript
const { form, data } = createForm({ /*...*/ });
```

`createForm` also returns two others stores useful when implementing validation: `errors` and `touched`. `errors` will contain the current validation errors and `touched` defines which fields should already be validated by Felte. More on this later.

## How do I handle validation?

In its most rudimentary way, you may pass a `validate` function to Felte's `createForm`, here you may validate your form's values and return an object in the same shape as your data containing the validation messages, if appropriate. Felte also provides a way to handle server-side errors on submit, you can read more about validation in the [validation section of the documentation](https://felte.dev/docs/validation).

```javascript
const { form } = createForm({
  // ...
  validate: (values) => {
    const errors = {}
    if (!values.email || isEmail(values.email)) {
      errors.email = 'Must be a valid email';
    }
    if (!values.password) errors.password = [
      'Must not be empty',
      'Must be over 8 characters',
    ];
    if (values.password && values.password.length < 8) {
      errors.password = ['Must be over 8 characters'];
    }
    return errors;
  },
  // ...
});
```

If you're a fan of validation libraries such as `Yup`, `Zod` or `Superstruct`; Felte also provides "official" adapters for them as separate packages called [`validators`](https://felte.dev/docs/validators).

## What about displaying my validation messages?

This is the feature that sparked the initial interest for developing Felte. Displaying errors is a common and, sometimes, really repetitive task. Felte provides official packages to handle this called [`reporters`](https://felte.dev/docs/reporters). Currently there are four packages which provide the following way to handle displaying your validation messages:

- Using Tippy.js popovers.
- Mutating the DOM directly in places specified by the developer.
- Providing a Svelte component which passes the validation messages as props back to you.
- Using the constraint validation API.

The simplest example would be using Tippy.js. Besides needing to install it as a peer dependency, it's basically plug and play.

```javascript
import reporter from '@felte/reporter-tippy';
import { createForm } from 'felte';

const { form } = createForm({
  // ...
  extend: reporter(),
  // ...
});
```

Assuming you have a validation strategy, this is all you'd need to do in order to display your errors to your users!

## More complex use cases

There's more that Felte provides that I may not be able to explain as well as I'd like to in a blog post. I have a created a [Codesandbox demo](https://codesandbox.io/s/felte-demo-wce2h?file=/App.svelte) showcasing validation and error reporting using `yup` and `tippy`. I've also spent a lot of work making the [documentation site](https://felte.dev/docs) as clear as possible for newcomers.

## Is it production ready?

Felte's status is quite useable already, and for my use-cases it's been more than enough. At the moment of writing Felte is currently in version `0.8.0`, still pre-1.0.0, since I'm sure more complex use-cases may appear when more people start to use it. If you're willing to give it a try, do know that I am definitely open to suggestions. I'm completely dedicated to be able to deliver a great DX and UX.

## A little bit more on why Felte

Forms are an integral part of most modern applications, from a really simple sign-in form, to multi-step forms with complex validation requirements. You can create forms easily using just HTML5, and it would work perfectly but... now you usually expect more from forms of the web. You usually expect real time validation of inputs, complex validation requirements, validations from the server while you type, etc. This is why there are so many form management libraries for so many different frameworks. If you have a bit of experience with React you might have heard of some of the "big boys" in this regard: [`Formik`](https://formik.org/) and [`React Hook Form`](https://react-hook-form.com/).

In the world of Svelte you'll find many libraries with their own solutions for managing forms. Some of them usually export components akin to the ones used in Formik such as `Form`, `Field`, `ErrorMessage`, etc. This didn't sit too well with me and my way of working. My biggest personal issue is how to style these components. In order to style third party components in Svelte you would need to relay on styling using global styles with `:global()` or expect the library author to expose a way to style its components, most likely via passing CSS variables.

Another approach you may find is the library providing you with helper functions such as `handleChange`, `handleInput`, `handleBlur`, among others. This would let the library manage the reactivity of the form via events, but it might end up making your HTML quite "ugly".

> Keep in mind this all comes from a personal preference. And there are many other alternative libraries that don't take this approach.

## The ideal form management library

When I think of an ideal form management library in Svelte I mean I want it to handle the following:

- **Reactivity**: It should provide a way to "listen" to the values in the form and allow you to read this values and react to their changes in real-time.
- **Validation**: It should provide a way to validate your inputs as they're being filled. As well as a way to validate your data asynchronously.
- **Error handling**: It should provide a way to get the current validation errors for you to handle and/or display to your users. It should also provide a way to handle any errors returned from the server on submit.
- **Little boilerplate**: Writing a form shouldn't feel more complex than writing a simple HTML5 form.
- **Easy styling**: If possible it should work without needing to import components from the library, or it should provide a simple and well documented way to style its components.

A form management library's purpose is to handle the form reactively, usually providing ways to handle real-time validation, validation errors and form submitting. It shouldn't try to provide any default styling since this tends to change greatly depending on your requirements.

## The found solution

Svelte provides a built-in way to operate on top of native HTML elements with what it calls `actions`. These are functions that receive the node you want to handle and lifecycle functions within it.

```html
<div use:action />
```

Here `action` is a function that will get the HTML element as its first argument, inside the definition of said function you may add event listeners, remove them on unmount, mutate attributes or even mutate the DOM. This opens a door for libraries to export these "actions" in order to handle common behaviour using vanilla JavaScript. These inspired some libraries to use a single action applied to your `<form>` element to handle all reactivity regarding your form. In an ideal scenario this would mean that the developer may write their forms as they please using plain HTML or even their own Svelte components and the only requirement to make it be handled by the library would be to add an `use:form` directive. **Felte** is one of these libraries.

## Embracing vanilla JavaScript

The unlikely advantage (and complexity) of making the whole library rely on a single action is that basically all of Felte's code is vanilla JavaScript. This means that the whole codebase uses mainly native DOM events to handle reactivity, some reporters use direct DOM mutations to display errors, and integration with other vanilla JavaScript libraries is incredibly easy. Besides all of this, most of the codebase can be _tested_ without relying on Svelte at all. Felte listens to common native DOM events and reacts to them by updating internal Svelte stores (which Felte treats as just observables).

A fun thing also happened due to this. A few months after I had a working version of Felte, version 1.0.0 of [SolidJS](https://solidjs.com) was released. Out of curiosity I started checking their docs and noticed that they have a _really_ similar way of tapping into native HTML elements via the _use_ keyword. This prompted me to try to create a a Solid project, install Felte and Svelte as dependencies (Svelte just to use their stores) and try to build a form with it. To my surprise, it basically worked out of the box. With a bit of work to remove Svelte as a dependency, and a light wrapper to make the API more friendly to Solid users, `@felte/solid` was released. Now `Felte` depends on the `@felte/core` package, which can potentially be used as a base to build wrappers for other JavaScript frameworks.

## Extensibility

Originally, Felte was being marketed as an "almost zero config form library" with integrated validation. After some thought during the development of the initial prototype it was concluded that due to personal preference, or business requirements, there's no single best solution as to how to handle and validate forms. So, the scope of what `Felte` does got heavily reduced to just worrying about handling the _reactivity_ of your forms and offering a nice API over which you can expand based on your requirements and preferences. For example, when validating a form you might prefer to use an already battle tested validation library such as `yup`, or maybe `zod`. You may also have different requirements on how to _display_ validation messages returned from your validation library; either using popovers, error messages under your inputs, or probably displaying a summary of errors. For this, there is a single configuration option on `createForm`: `extend`. This option accepts either a function or an array of function which will allow you to _hook_ into the lifecycle of Felte and modify its behaviour. In order to showcase this feature, I've released some "extender" packages that help with common issues:

### Validators

These offer a way to integrate popular validation libraries with Felte. As the moment of writing this post there are three officially supported ones:

- `@felte/validator-yup`: a package that helps you integrate [`yup`](https://github.com/jquense/yup) with Felte.
- `@felte/validator-zod`: a package that helps you integrate [`zod`](https://github.com/colinhacks/zod) with Felte.
- `@felte/validator-superstruct`: a package that helps you integrate [`superstruct`](https://docs.superstructjs.org) with Felte.


### Reporters

As mentioned above, this is the feature that sparked the initial interest to develop Felte. These packages provide ready-built ways to display your validation messages for your end user:

- `@felte/reporter-svelte`: A package that allows you to display validation messages using custom Svelte components (if using Svelte as a framework).
- `@felte/reporter-solid`: A package that allows you to display validation messages using custom Solid components (if using Solid as a framework).
- `@felte/reporter-tippy`: A package that allows you to display validation messages using [Tippy.JS](https://atomiks.github.io/tippyjs/) popovers.
- `@felte/reporter-dom`: A package that mutates the DOM directly to display your validation messages where you specify.
- `@felte/reporter-cvapi`: A package that displays your error messages using the browser's built-in [constraint validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation).

> The `extend` API can definitely cover more use-cases and I expect for more packages to pop-up in the future.
