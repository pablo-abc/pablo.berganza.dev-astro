---
title: "Felte: An extensible form library for Svelte"
description: A flexible way to handle your forms in Svelte
slug: felte-an-extensible-form-library-svelte
created: '2021-12-08'
published: true
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

> This article has been updated to showcase Felte 1.0

Arguably one of the most common problems front-end developers need to solve is form handling. Specially in modern web applications that require instant validation and other real-time interactions with the user.  To provide the best user experience as possible, you’ll probably grab a third party form management library to help you.

In this post I am going to write about [Felte](https://felte.dev), a form management library for Svelte I have been working on for the past year that aims to make the basics of form handling on the front-end as simple as possible, while still allowing for it to grow more complex as your requirements grow.

This is one of three blog posts related to Felte. This one is oriented towards Felte’s integration with [Svelte](https://svelte.dev). The other two are oriented towards Felte’s integration with [Solid](https://solidjs.com) and [React](https://reactjs.org).

## Features
As mentioned above, Felte aims to make the basics of form reactivity as easy to handle as possible, while still allowing for more complex behaviours via configuration and extensibility. Its main features are:

* Single action to make your form reactive.
* Use HTML5 native elements to create your form. (Only the `name` attribute is necessary).
* Provides stores and helper functions to handle more complex use cases.
* No assumptions on your validation strategy. Use any validation library you want or write your own strategy.
* Handles addition and removal of form controls during runtime.
* Official solutions for error reporting using `reporter` packages.
* Supports validation with [yup](https://felte.dev/docs/svelte/validators#using-yup), [zod](https://felte.dev/docs/svelte/validators#using-zod), [superstruct](https://felte.dev/docs/svelte/validators#using-superstruct) and [vest](https://felte.dev/docs/svelte/validators#using-vest).
* Easily [extend its functionality](https://felte.dev/docs/svelte/extending-felte).

## How does it look like?
In its most basic form, Felte only requires a single function to be imported:

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

We set up the form by calling `createForm` with our `submit` handler. This function returns, among other utilities, an action that can be used on your form element. Now Felte will track all inputs with a `name` attribute. When submitting your form, the latest values in your inputs will be passed to your `onSubmit` function as an object. For our previous example, the shape of `values` will be:

```javascript
{
  email: '',
  password: '',
}
```

## Where can I see my data?
As you type, Felte will keep track of your user’s input in a regular writable Svelte store. This store is returned by `createForm` as `data`, following the same shape as the values you’d receive on your `onSubmit` function.

For example, this would log your user’s email to the console as they type it:

```javascript
const { form, data } = createForm({ /* ... */ });

// We use a reactive statement to log everytime our data store changes.
// We access the value of our store by prefixing it with `$`.
$: console.log($data.email);
```

## I might need some validation here
Of course, another common requirement of forms is validation. If we want our app to feel snappy to the user, we will want some client side validation. `createForm`’s configuration object accepts a `validate` function (which can be asynchronous). It will receive the current value of your `data` store as it changes, and it expects you to return an object with the same shape as your `data` store containing your validation messages if the form is not valid, or nothing if your form is valid. Felte will keep track of these validation messages on a writable store that is returned from `createForm` as `errors`:

```javascript
const { form, errors } = createForm({
  validate(values) {
    const currentErrors = {};
    if (!values.email) currentErrors.email = 'Must not be empty';
    if (!values.password) currentErrors.password = 'Must not be empty';
    return currentErrors;
  },
});

$: console.log($errors);
```

More complex validation requirements might require third party validation libraries. Felte offers first party integrations with some popular validation libraries through its extensibility features. These integrations are offered as separate packages. I will write write more about this in the next section regarding extensibility, but you can read more about these packages in our [official documentation](https://felte.dev/docs/svelte/validators).

## Handling complex scenarios via extensibility
Felte does not attempt to have the perfect solution on how to handle all scenarios regarding form management. This is why Felte offers an API to extend its functionality as your requirements grow more complex. You may have a preferred library you like to use, such as the really popular [yup](https://github.com/jquense/yup), or [Vest](https://vestjs.dev/) (which was recently talked about during [Svelte Summit](https://www.youtube.com/watch?v=X2PuiawaGV4)). Or you might find it tedious to display your validation messages using `if` statements. Modifying Felte’s behaviour to handle these scenarios can be done via the `extend` option on `createForm`’s configuration object. More about this can be read in the [official documentation](https://felte.dev/docs/svelte/extending-felte). To keep things simple for the purposes of this blog post, I am only going to write about the existing packages we maintain to handle some common use cases:

### Validators: Integrations with popular validation libraries
We are currently maintaining four packages to integrate Felte with some popular validation libraries: `yup`, `zod`, `superstruct` and most recently `vest`. Here I will use yup as an example, but you can read more about the rest [here](https://felte.dev/docs/svelte/validators).

The package to use `yup` is on npm under the name `@felte/validator-yup`. You will need to install it alongside `yup`:

```bash
npm install --save @felte/validator-yup yup

# Or, if you use yarn

yarn add @felte/validator-yup yup
```

This validator package exports a function called `validator` which you can call with your validation schema and pass its result to the `extend` option of `createForm`:

```javascript
import { validator } from '@felte/validator-yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const { form } = createForm({
  // ...
  extend: validator({ schema }), // OR `extend: [validator({ schema })],`
  // ...
});
```

### Reporters: Displaying validation messages
Displaying your validation messages can be done by directly accessing the `errors` store returned by `createForm`. Messages won’t be available on this store until the related field is interacted with.

```html
<script>
  const { form, errors } = createForm({ /* ... */ });
</script>

<form use:form>
  <label for=email>Email:</label>
  <input name=email id=email type=email>
  {#if $errors.email}
    <span>{$errors.email}</span>
  {/if}
  <button>Submit</button>
</form>
```

> If a specific field has an error, Felte assigns an `aria-invalid=true` attribute to the appropriate input.

But you might not like that specific syntax to handle your validation messages. Felte currently also has four accompanying packages that offer different alternatives on how to display your validation messages:

* Using a Svelte component, which gives the most flexibility and would allow you to have access to your validation messages deep within the component tree without needing to pass the `errors` store around.
* Modifying the DOM directly by adding and removing DOM elements.
* Using Tippy.js to display your messages  in a tooltip.
* Using the browser’s built-in constraint validation API, which can be less friendly to mobile users.

For brevity, I am only going to write about the first package. But you can read more about the rest [in the documentation](https://felte.dev/docs/svelte/reporters).

Using a Svelte component to get your validation messages can be done with the package `@felte/reporter-svelte`.  You’ll need to add it to your project using your favourite package manager:

```bash
# npm
npm i -S @felte/reporter-svelte

# yarn
yarn add @felte/reporter-svelte
```

Then you’ll need to import both the `svelteReporter` function to add to the `extend` property, and the `ValidationMessage` component which you will use to receive your validation messages:

```html
<script>
  import { svelteReporter, ValidationMessage } from '@felte/reporter-svelte';
  import { createForm } from 'felte';

  const { form } = createForm({
      // ...
      extend: svelteReporter,
      // ...
    },
  })
</script>

<form use:form>
  <input id="email" type="text" name="email">
  <ValidationMessage for="email" let:messages={message}>
    <!-- We assume a single string will be passed as a validation message -->
    <!-- This can be an array of strings depending on your validation strategy -->
    <span>{message}</span>
    <!-- Shown when there's no validation messages -->
    <span slot="placeholder">Please type a valid email.</span>
  </ValidationMessage>
  <input type="password" name="password">
  <ValidationMessage for="password" let:messages={message}>
    <!-- If not slot is used, you'll need to handle empty messages -->
    <span>{message || ''}</span>
  </ValidationMessage>
  <input type="submit" value="Sign in">
</form>
```

## Next steps
You can check more about Felte in its [official website](https://felte.dev) with some functional examples. There’s also a more complex example showcasing its usage with Tippy.js and Yup available on [CodeSandbox](https://codesandbox.io/s/felte-v1-demo-svelte-0egr6?file=/App.svelte).

## Finishing thoughts
I hope this served as a good introduction to Felte, and that it is interesting enough for you to give it a try. Felte is currently in quite a useable state and I feel it’s flexible enough for most use cases.  I am also open to help and suggestions so feel free to open an issue or make a pull request on [GitHub](https://github.com/pablo-abc/felte).
