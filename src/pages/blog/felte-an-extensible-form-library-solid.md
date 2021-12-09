---
title: "Felte: An extensible form library for Solid"
description: A flexible way to handle your forms in Solid
slug: felte-an-extensible-form-library-solid
layout: ../../layouts/PostLayout.astro
created: '2021-12-08'
imgext: png
image:
  width: 800
  height: 444
tags:
  - javascript
  - solid
  - forms
  - programming
---

Arguably one of the most common problems front-end developers need to solve is form handling. Specially in modern web applications that require instant validation and other real-time interactions with the user.  To provide the best user experience as possible, you’ll probably grab a third party form management library to help you.

In this post I am going to write about [Felte](https://felte.dev), a form management library for Solid I have been working on for the past year that aims to make the basics of form handling on the front-end as simple as possible, while still allowing for it to grow more complex as your requirements grow.

This is one of two blog posts I’m writing. This one is oriented towards Felte’s integration with [Solid](https://solidjs.com). The other one is oriented towards Felte’s integration with [Svelte](https://svelte.dev).

## Features
As mentioned above, Felte aims to make the basics of form reactivity as easy to handle as possible, while still allowing for more complex behaviours via configuration and extensibility. Its main features are:

* Single action to make your form reactive.
* Use HTML5 native elements to create your form. (Only the `name` attribute is necessary).
* Provides stores and helper functions to handle more complex use cases.
* No assumptions on your validation strategy. Use any validation library you want or write your own strategy.
* Handles addition and removal of form controls during runtime.
* Official solutions for error reporting using `reporter` packages.
* Supports validation with [yup](https://felte.dev/docs/solid/validators#using-yup), [zod](https://felte.dev/docs/solid/validators#using-zod), [superstruct](https://felte.dev/docs/solid/validators#using-superstruct) and [vest](https://felte.dev/docs/solid/validators#using-vest).
* Easily [extend its functionality](https://felte.dev/docs/solid/extending-felte).

## How does it look like?
In its most basic form, Felte only requires a single function to be imported:

```jsx
import { createForm } from '@felte/solid';

export function Form() {
  const { form } = createForm({
    onSubmit: (values) => {
      // ...
    },
  });

  return (
    <form use:form>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <input type="submit" value="Sign in" />
    </form>
  );
}
```

We set up the form by calling `createForm` with our `submit` handler. This function returns, among other utilities, an action that can be used on your form element. Now Felte will track all inputs with a `name` attribute. When submitting your form, the latest values in your inputs will be passed to your `onSubmit` function as an object. For our previous example, the shape of `values` will be:

```javascript
{
  email: '',
  password: '',
}
```

## Where can I see my data?
As you type, Felte will keep track of your user’s input in a regular Solid store. This store is returned by `createForm` as `data`, following the same shape as the values you’d receive on your `onSubmit` function.

For example, this would log your user’s email to the console as they type it:

```javascript
const { form, data } = createForm({ /* ... */ });

createEffect(() => {
  console.log(data.email);
});
```

## I might need some validation here
Of course, another common requirement of forms is validation. If we want our app to feel snappy to the user, we will want some client side validation. `createForm`’s configuration object accepts a `validate` function (which can be asynchronous). It will receive the current value of your `data` store as it changes, and it expects you to return an object with the same shape as your `data` store containing your validation messages if the form is not valid, or nothing if your form is valid. Felte will keep track of these validation messages on a store that is returned from `createForm` as `errors`:

```javascript
const { form, errors } = createForm({
  validate(values) {
    const currentErrors = {};
    if (!values.email) currentErrors.email = 'Must not be empty';
    if (!values.password) currentErrors.password = 'Must not be empty';
    return currentErrors;
  },
});

createEffect(() => {
  console.log(errors.email);
});
```

More complex validation requirements might require third party validation libraries. Felte offers first party integrations  with some popular validation libraries through its extensibility features. These integrations are offered as separate packages. I will write write more about this in the next section regarding extensibility, but you can read more about these packages in our [official documentation](https://felte.dev/docs/solid/validators).

## Handling complex scenarios via extensibility
Felte does not attempt to have the perfect solution on how to handle all scenarios regarding form management. This is why Felte offers an API to extend its functionality as your requirements grow more complex. You may have a preferred library you like to use, such as the really popular [yup](https://github.com/jquense/yup), or [Vest](https://vestjs.dev/) (which was recently talked about during [Svelte Summit](https://www.youtube.com/watch?v=X2PuiawaGV4)). Modifying Felte’s behaviour to handle these scenarios can be done via the `extend` option on `createForm`’s configuration object. More about this can be read in the [official documentation](https://felte.dev/docs/solid/extending-felte). To keep things simple for the purposes of this blog post, I am only going to write about some of the existing packages we maintain to handle some common use cases:

### Validators: Integrations with popular validation libraries
We are currently maintaining four packages to integrate Felte with some popular validation libraries: `yup`, `zod`, `superstruct` and most recently `vest`. Here we will use yup as an example, but you can read more about the rest [here](https://felte.dev/docs/solid/validators).

The package to use `yup` is on npm under the name `@felte/validator-yup`. You will need to install it alongside `yup`:

```sh
npm install --save @felte/validator-yup yup

# Or, if you use yarn

yarn add @felte/validator-yup yup
```

This validator package exports a function called `validator` which can be passed as-is to the `extend` option of `createForm`. Your validation schema can then be passed to the `validateSchema` option:

```javascript
import { validator } from '@felte/validator-yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const { form } = createForm({
  // ...
  extend: validator, // OR `extend: [validator],`
  validateSchema: schema,
  // ...
});
```

### Reporters: Displaying validation messages
Displaying your validation messages can be done by directly accessing the `errors` store returned by `createForm`. Messages won’t be available on this store until the related field is interacted with.

```jsx
import { Show } from 'solid-js';
import { createForm } from '@felte/solid';

function Form() {
  const { form, errors } = createForm({ /* ... */ });

  return (
    <form use:form>
      <label for="email">Email:</label>
      <input name="email" type="email" id="email" />
      <Show when={errors.email}>
        <span>{errors.email}</span>
      </Show>
      <button>Submit</button>
    </form>
  );
}
```

But displaying the messages is not the end of the story in most cases. For example, you might want to add an `aria-invalid` attribute to the related input. Or you simply might not like that specific syntax to handle your validation messages. Felte currently has four accompanying packages that offer different alternatives on how to display your validation messages:

* Using a Solid component, which gives the most flexibility.
* Modifying the DOM directly by adding and removing DOM elements.
* Using Tippy.js to display your messages  in a tooltip.
* Using the browser’s built-in constraint validation API, which can be less friendly to mobile users.

For brevity, I am only going to cover the first package. But you can read more about the rest [in the documentation](https://felte.dev/docs/solid/reporters).

Using a Solid component to get your validation messages can be done with the package `@felte/reporter-solid`.  You’ll need to add it to your project using your favourite package manager:

```sh
# npm
npm i -S @felte/reporter-solid

# yarn
yarn add @felte/reporter-solid
```

Then you’ll need to import both the `reporter` function to add to the `extend` property, and the `ValidationMessage` component which you will use to receive your validation messages:

```jsx
import { reporter, ValidationMessage } from '@felte/reporter-solid';
import { createForm } from '@felte/solid';

function Form() {
  const { form } = createForm({
      // ...
      extend: reporter, // or [reporter]
      // ...
    },
  })

 // We assume a single string will be passed as a validation message
 // This can be an array of strings depending on your validation strategy
  return (
    <form use:form>
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

## Next steps
You can check more about Felte in its [official website](https://felte.dev) with some functional examples. There’s also a more complex example showcasing its usage with Tippy.js and Yup available on [CodeSandbox](https://codesandbox.io/s/felte-demo-solidjs-w92uj?file=/src/main.tsx).

## Finishing thoughts
I hope this served as a good introduction to Felte, and that it is interesting enough for you to give it a try. Felte is currently in quite a useable state and I feel it’s flexible enough for most use cases.  I am also open to help and suggestions so feel free to open an issue or make a pull request on [GitHub](https://github.com/pablo-abc/felte).
