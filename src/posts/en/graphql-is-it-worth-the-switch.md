---
title: 'GraphQL: Is it worth the switch?'
description: A nice alternative to REST APIs with a fantastic developer experience
created: '2019-06-11'
published: true
image:
  width: 800
  height: 600
tags:
    - graphql
    - rest
    - api
    - webdev
---

This past year working as a web developer I’ve been basically breathing [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) everyday. While it is not that much time, it has been more than enough to appreciate the simplicity over SOAP, and to loathe the moments in which client requirements or other situations force you to write endpoints that are not [RESTful](https://restfulapi.net/rest-architectural-constraints/). While REST is a standard already for making modern web APIs, for quite a while there has been a new kid on the block that I hadn’t pushed myself to learn about: [GraphQL](https://graphql.org). But that has changed now and I have been experimenting quite a bit using it on the client and on the server.

According to [graphql.org](https://graphql.org), “GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data”. A server implementing the GraphQL specification should be able to receive a query sent by the client, containing a description of the specific data the client needs, and it should be able to provide this data as the client asked.

But before talking more about GraphQL, let's start by checking what's so great about REST.

## REST

REST is an architectural style that defines a set of constraint to build web services. When someone speaks about an API that follows the REST architecture, they usually mean a server that communicates with the client via HTTP. The client leverages the different HTTP methods (GET, POST, PUT, PATCH, DELETE) to send requests to URIs in the API that represent resources.

Some examples of REST endpoints can be:

```http
GET http://api.example.com/accounts

GET http://api.example.com/accounts/8326

GET http://api.example.com/accounts/8326/posts

GET http://api.example.com/posts/4123/comments
```

Depending on which method is used to call the endpoint, a different operation will be applied to the resource.

| METHOD | ENDPOINT       | DESCRIPTION                          | RESPONSE STATUS |
|--------|----------------|--------------------------------------|-----------------|
| GET    | /resources     | Retrieve a list of elements          | 200             |
| GET    | /resources/:id | Retrieve a single element            | 200, 404        |
| POST   | /resources     | Create an element                    | 201, 400        |
| PUT    | /resources/:id | Update a whole element               | 200, 400        |
| PATCH  | /resources/:id | Update specific fields of an element | 200, 400        |
| DELETE | /resources/:id | Delete an element                    | 204, 200, 404   |

This gives us a clean and predictable interface on which we can operate on the resources on the server.

As you saw in the endpoints examples above, REST endpoints can follow a hierarchical structure. Say, if you perform a POST operation on the endpoint `/accounts/8326/posts`, it should mean you are creating a post that belongs to the account with the id 8326.

I've talked about how a REST API looks like to the client, but the characteristics described before are not enough for an API to be considered a REST API. In order to be classified as such, it should follow six constraints:

  * **Uniform interface**: A REST API must have a well defined and consistent interface. This interface must be followed almost religiously in all resources exposed by the API. It must have consistent naming conventions, data format, etc.
  * **Client-server**: There must be a clear separation between client and server.
  * **Stateless**: All client interactions with the server must be stateless. That means the server must assume each request made to it is completely new, without any knowledge of previous states of the client.
  * **Cacheable**: If a REST endpoint is stable enough it could be cached, be it in the server or in the client. Cacheable endpoints must explicitly state they are so.
  * **Layered system**: A system architecture can be layered, meaning the client might be interacting with different servers but still acting as if its interacting directly with the REST API.
  * **Code on demand**: This is the only optional constraint of the REST architecture. It means, when needed, a REST endpoint may return executable code as a response from a client's request.

This constraints all bring some benefits to the table:

  * A uniform interface allows clients to intuitively navigate on your API when they start to get used to id.
  * A well defined interface makes it easier to organize your code based on resources.
  * A client-server architecture allows each, the client and the server, to evolve independently.
  * A stateless server allows for theoretically unlimited scalability. Since the server should not be aware of the client's state, in high loads a server can be replicated without worries.
  * Cacheable endpoints help reduce the load on the server.
  * A layered system allows the client to pass by many intermediaries (e.g. authorization) while still interacting the same way with the server.

Although the most common data format a REST API works with is JSON, if needed, a REST API may work with different ones (e.g. XML). Also, although most REST APIs available publicly are served over HTTP, a REST API can theoretically be served over a different protocol.

As you can see, a properly developed REST API comes with many benefits, but there's also some caveats on all this:

  * Since there's no clear standard (besides the six constraints) on how a REST API should behave, there's a lot of design choices that are up to the developer. This means that you won't necessarilly be able to interact with two REST APIs the same way.
  * Unless proper filters are implemented on the server, a REST endpoint may return a lot more information than the client needs.
  * Since REST endpoints are clearly divided by resources, in order to populate the information needed in a client view the client might need to do many requests to the server.
  * Consistency is hard. The developing team must actively try to maintain consistency which means more effort when developing. It's easy to add inconsistencies to the server.
  * Deadlines, client requirements, etc. might push you to break some of the REST constraints which might end up on a mix of various architectures (e.g. RPC).

This shows that building a proper REST API is not an easy task. There are some pitfalls on which the developing team might fall making the final result not being a REST API, losing some of the benefits provided by the REST constraints.

So what does GraphQL bring to the table?

## GraphQL

As said before, GraphQL is described as a query language for APIs. Unlike REST, GraphQL defines a single endpoint that accepts all operations to the server by sending a parameter called "query" alongside the request. Requests are generally done via a POST request to the GraphQL endpoint, but the specification allows for GET requests as long as it is read only.

There are two types of requests you can make to a GraphQL API: queries or mutations. A query request may look like this:

```graphql
{
  post(id:"1") {
    id
    title
    content
    author {
      id
      email
    }
}
```

This means there should be a schema of the type "query" with the name "post" defined in the server. This query is asking for the id, title, content, author's id and author's email of the post with id "1". If found, the response will follow the same structure described in the query. A GraphQL query would be analogous to performing a GET request on a REST API endpoint.

A GraphQL mutation may look like this:

```graphql
mutation {
  createAccount(
    email:"pablo@berganza.dev"
    password:"super secure password"
  ) {
    id
    email
  }
}
```

This assumes that there is a schema of the type "mutation" named "createAccount" defined in the server. This mutation is asking the server to create an account with the specified email and password, and following its creation to return its id and email.

GraphQL shouldn't be considered an architectural style. It is more like a collection of tools that facilitate the development of an RPC style API (since you're always calling remote procedures). Even though, a GraphQL API shares some similarities with a REST API:

  * There's a clear separation between client and server.
  * The server should be stateless.
  * Even though most GraphQL APIs are served over HTTP, it could be served over a different protocol.

Apart from that, a GraphQL API has other advantages over a REST API:

  * A highly consistent interface to the client since the client-server communication is done using an already well defined query language.
  * It's self documenting. When schemas are defined, they can also be available for the client to see. It is also possible to include docstrings to the schemas in order to explain them more thoroughly.
  * The tooling available provides an enjoyable developer experience. Tools like Graphiql and GraphQL playground can make exploring the schemas on a GraphQL API really easy, and some client-side libraries such as Apollo can provide a lot of other tools to add functionality to the client.
  * Since the moment the schemas are defined, there's a contract between client and server. Schemas must include the properties and data types expected on input and response. Properties may also be added later to the schema, and it is usually not recommended to remove properties.
  * The entry barrier for designing a GraphQL API compared to a proper REST API is much lower.
  * There are many server-side implementations for most of the major programming languages that follow the exact GraphQL specification, so the interaction with different GraphQL APIs should remain consistent.
  * Reduces considerably the requests to the server, since all information can be potentially requested with a single request.

But, of course, there are not only advantages in the GraphQL world. We're losing some of the advantages provided by REST architecture when implementing a GraphQL API, and there's also some other caveats to it:

  * Even though it is generally served over HTTP, it loses many of the benefits provided by it such as caching, rate limiting, etc. This reduces its potential scalability.
  * A GraphQL API is potentially less efficient than a REST API. Due to the unpredictable complexity of the requests made to the server, a single request to the server can turn into N+1 operations.
  * Being published on 2015 (and starting to being developed in 2012) it could be argued that the ecosystem is still not mature and there's a possibility for considerable changes.
  * For simple applications, requests can be made using the fetch API or libraries like Axios. But, if the application grows, a GraphQL library (such as Apollo Client) might be needed, which would increase the resulting bundle size.
  * It can considerably increase the server's code complexity when optimizations are needed.
  * GraphQL generally always returns a 200 status. Since many queries/mutations might be sent in a single request, and some of them may succeed or fail for various reasons, error management can become complicated on the client side.

I didn't talk about many othe features on the GraphQL specification, such as fragments, named queries and mutations, variables, etc. So make sure to check [graphql.org](https://graphql.org) in order to learn more about it if you're interested.

## Conclusion

So, is it worth the switch? As with every debate between two competing technologies: yes and no. There are use cases for both REST and GraphQL. For example, a GraphQL API may be useful when developing needs to start before client requirements are properly established, and it may help keep a consistent API when without much effort. In the end, you always have to evaluate each of their advantages and disadvantages and choose the appropriate one for the job.
