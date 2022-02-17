---
title: "You don't really need Apollo"
description: Small project? Learning GraphQL? Apollo might be an overkill
slug: you-dont-need-apollo
created: '2020-06-08'
published: true
image:
  width: 800
  height: 600
tags:
  - javascript
  - graphql
  - react
  - programming
---

The first time I tried [GraphQL](https://graphql.org) was when I would still have considered myself as just a back-end developer. About two years ago I gave myself the opportunity to learn it thanks to [NestJS](https://nestjs.com)'s support for it and I totally felt in love with it. The fact that it's basically self-documenting and the fact that you can ask for exactly the data you want with just one request made me feel that working with a GraphQL API as a front-end developer would feel really enjoyable.

## Road to front-end GraphQL

I wanted to try to make something on the front-end side with this new knowledge, to get a better feel of it. By that time I was still learning the ropes on front-end with [React](https://reactjs.org) (last time I did front-end, jQuery was the thing to use). So, naturally, I duckduckgo'ed `graphql react` and the first thing I found was [Apollo](https://www.apollographql.com). Apollo is a great tool that offers many features; you can even manage your whole application's state with it. But it did feel a bit _heavy_ for someone who's just trying to learn how to use GraphQL, or for any small project in that sense. I will admit that it was really naive of me, but at the time I really thought: _woah, so GraphQL is really only suitable for pretty big apps_. Regardless, I kept on doing my experiments with Apollo. As I suspected I spent a lot of my time learning how to use Apollo, which is not bad _per se_, but of course it would feel daunting for anyone learning.

Sometime about last year I found [urql](https://formidable.com/open-source/urql/) which aims to be a lighter alternative to Apollo. I found this really appealing. And it was great. A simpler API and fewer features meant less time spent on the documentation and more time to actually build something with it. But it still felt pretty heavy for my use cases. Although right now I would probably choose urql over Apollo for a serious project, since I do feel Apollo tries to do too much for my taste.

Even though I haven't worked professionally with GraphQL yet, I've kept on using it for my personal projects. Still, I kept on feeling that the entry point for any front-end developer learning it was quite high. If you duckduckgo (or google) `react graphql` your top results will be Apollo and [howtographql.com](https://www.howtographql.com). If you go to the latter, you'll see that both Apollo and urql are listed as the _beginner's choice_. This I feel is an artificially high entry point for a beginner.

## What's the alternative?

What are the minimum requirements for making a request to a GraphQL API from the browser? Well... just the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API. After all, you only need to make an HTTP POST request to the GraphQL endpoint. It only needs to contain a query/mutation in the body as a string and, optionally, the variables if they're needed for the query. It doesn't _need_ to be a POST request, and it can have an `application/graphql` MIME type; but, to keep things simple, a POST request with an `application/json` MIME type should always work.

```javascript
fetch(`${API}/graphql`, {
  method: 'post',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    query: `...`,
    variables: {
      ...
    },
  })
}).then(r => r.json())
```

You can turn this into a more reusable function with something like this:

```javascript
async function gqlFetcher(query, variables) {
  const { data, errors } = await fetch(`${API}/graphql`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  }).then(r => r.json())
  if (errors) throw errors
  return data
}
```

A GraphQL server returns a 200 response even if it contains errors, so you generally only need to check if the response contains an `errors` property. This is still an optimistic way of handling it, since you're not accounting for other kinds of errors such as network errors that can return 4xx or 5xx responses. For the purposes of this post we'll leave it like this.

## Some nicer ergonomics

This approach does make you lose the nice interface that Apollo and urql provide you. You can, of course, create your own hooks that provide a friendlier interface; however, I prefer to use Vercel's [swr](https://github.com/vercel/swr) hook. This hook works for any kind of remote data fetching; it works by first returning data from the cache, then sending the fetch request, and finally returning the newly received data. It provides a nice interface for handling your data inside your component while keeping your UI, as they describe it, fast and reactive. The `gqlFetcher` function we made earlier is already compatible with the `useSWR` hook, so no additional work is required.

```javascript
import useSWR from 'swr'

const gqlQuery = `...`

function Component() {
  // gqlFetcher is the same function we defined earlier
  const { data, error } = useSWR(gqlQuery, gqlFetcher)

  if (error) return <div>{/*...*/}</div> // JSX with error data
  if (!data) return <div>Loading...</div> // Loading component
  return <div>{/*...*/}</div> // JSX with returned data
}
```

In order to pass multiple arguments to the `fetcher` function, the swr hook allows you to pass an array as the first argument.

```javascript
const gqlQuery = `...`
const gqlVariables = {
  // ...
}

function Component() {
  const { data, error } = useSWR([gqlQuery, gqlVariables], gqlFetcher)
  // ...
}
```

> `useSWR` uses the first argument as a `key` that serves to uniquely identify the request. If an array is passed, `swr` shallowly compares each element and, if any of them has changed, it revalidates the request.

## Existing tooling

If you don't feel like creating your own wrapper over `fetch`, you can use [graphql-request](https://github.com/prisma-labs/graphql-request). This is also a wrapper over the `fetch` API for making GraphQL requests that doesn't need much work to start using it. It already handles errors nicely and is isomorphic by default (which some people might not like). The `swr` GitHub page already provides an example using this.

```javascript
import { request } from 'graphql-request'

const API = 'https://api.graph.cool/simple/v1/movies'
const fetcher = query => request(API, query)

function App () {
  const { data, error } = useSWR(
    `{
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }`,
    fetcher
  )
  // ...
}
```

## Conclusion

It feels there's an artificially high entry level for front-end developers who want to get into the GraphQL world. The fact that Apollo and urql are shown as _beginner_ choices for learning GraphQL can make developers feel like these kinds of tools are actually _required_ to work with a GraphQL API. This is, in fact, not the case; you **can** build a fully capable web application with just the `fetch` API and some other small libraries for extra features. I can't think of any small project that would actually require all the features that these big libraries have to offer. To clarify: I'm not saying you shouldn't use these tools if you want to; I'm saying you don't need to feel they're _required_ to build what you want.
