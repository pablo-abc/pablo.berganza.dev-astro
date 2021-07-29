---
title: En realidad no necesitas Apollo
description: ¿Proyecto hobby? ¿Aprendiendo GraphQL? Tal vez te estás complicando con Apollo
slug: you-dont-need-apollo
layout: ../../../layouts/PostLayout.astro
created: '2020-06-08'
image:
  width: 800
  height: 600
lang: es
tags:
  - javascript
  - graphql
  - react
  - programacion
---

La primera vez que probé [GraphQL](https://graphql.org) fue cuando todavía me hubiera considerado solamente un desarrollador back-end. Hace aproximadamente dos años me di la oportunidad de aprenderlo gracias al soporte de [NestJS](https://nestjs.com) y me enamoré completamente de él. El hecho de que la documentación se genere automáticamente, y que puedes pedir exactamente la información que necesites con una sola petición, me hizo sentir que trabajar con un API GraphQL como un desarrollador front-end sería muy placentero.

## El camino hacia GraphQL en el front-end

Me había motivado para crear algo del lado del front-end con este nuevo conocimiento. Para ese entonces, todavía estaba acostumbrándome al desarrollo en front-end con [React](https://reactjs.org) (la última vez que había hecho algo en front-end, jQuery seguía siendo la herramienta a utilizar). Naturalmente, busqué `graphql react` en DuckDuckGo y lo primero que encontré fue [Apollo](https://www.apollographql.com). Apollo es una herramienta increíble que ofrece muchas utilidades; incluso puedes manejar el estado de tu aplicación con ella. Pero, esta herramienta si se sentía algo _pesada_ para alguien que solo está intentando aprender como usar GraphQL, o para cualquier proyecto pequeño en ese sentido. Admito que fui algo ingenuo, pero en ese momento si pensé: _wow, GraphQL solamente sería útil para proyectos muy grandes_. Aun así continué realizando mis experimentos con Apollo. Como era de esperar, pasé gran parte del tiempo leyendo como usar Apollo; algo que no es malo en sí, pero si se sentiría abrumador para alguien aprendiendo.

En algún momento el año pasado encontré [urql](https://formidable.com/open-source/urql/), que busca ser una alternativa más liviana a Apollo, y fue increíble. Un API más simple, y menos utilidades, significaba que requería menos tiempo leyendo la documentación y más tiempo construyendo lo que necesitaba. Pero siempre se sentía algo pesado para mis casos de uso. Aun así, en estos momentos escogería urql sobre Apollo para un proyecto serio, ya que si siento que Apollo intenta hacer demasiado para mi gusto.

Actualmente no he trabajado profesionalmente en ningún proyecto que utilice GraphQL, pero he seguido utilizándolo para mis proyectos personales. Sin embargo, durante ese tiempo no podía evitar seguir sintiendo que el punto de entrada era algo alto para cualquier desarrollador front-end que quisiera aprenderlo. Si buscas en DuckDuckGo (o Google) `react graphql`, tus primeros resultados serán Apollo y [howtographql.com](https://www.howtographql.com). Si ingresas a este último, verás que Apollo y urql son listados como la _opción para principiantes_. Siento que esto es un punto de entrada artificialmente alto para un principiante.

## ¿Cuál es la alternativa?

¿Cuáles son los requisitos mínimos para hacer una petición a un API GraphQL desde el navegador? Pues... solamente el API [fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API). Después de todo, solo necesitas hacer una petición HTTP POST al endpoint de GraphQL. Esta solo necesita contener una query/mutación en el `body` como una cadena de texto; opcionalmente las variables, si son necesarias para la query. No _necesita_ ser una petición POST, y puede tener un tipo MIME `application/graphql`, pero una petición POST con un tipo MIME `application/json` debería funcionar siempre para mantenerlo sencillo.

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

Puedes transformar esto en una función más reutilizable así:

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

Un servidor GraphQL responde con 200 aunque contenga errores. Generalmente solo debes revisar si la respuesta contiene una propiedad `errors`. Esta sigue siendo una manera optimista de manejar la petición, ya que no se está tomando en cuenta otros tipos de errores que sí pueden retornar 4xx o 5xx. Para el objetivo de esta publicación lo dejaremos así.

## Mejor ergonomía

Este método hace que pierdas la cómoda interfaz que Apollo y urql proveen. Siempre puedes crear tus propios hooks que provean una interfaz más amigable, sin embargo, he preferido usar el hook [swr](https://github.com/vercel/swr) de Vercel. Este hook funciona para cualquier petición de datos remotos. Su funcionamiento consiste en retornar primero la data del cache, luego hace la petición, y finalmente retorna la nueva información recibida. Provee una interfaz amigable para manejar la información dentro de tus componentes mientras mantienen tu UI, como ellos mismos lo describen, rápido y reactivo. La función `gqlFetcher` que hicimos antes ya es compatible con el hook `useSWR`, no se requiere trabajo adicional para hacerlo funcionar.

```javascript
import useSWR from 'swr'

const gqlQuery = `...`

function Component() {
  // gqlFetcher es la misma función que se definió antes
  const { data, error } = useSWR(gqlQuery, gqlFetcher)

  if (error) return <div>{/*...*/}</div> // JSX con la info del error
  if (!data) return <div>Loading...</div> // Componente de "Loading"
  return <div>{/*...*/}</div> // JSX con la info recibida
}
```

Para pasar múltiples argumentos a la función `fetcher`, `useSWR` permite pasar un arreglo como primer argumento.

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

> `useSWR` utiliza el primer argumento como una `llave` que sirve para identificar la petición. Si es un arreglo, `swr` compara superficialmente cada elemento y, si alguno de ellos ha cambiado, revalida la petición.

## Herramientas existentes

Si no quieres crear tu propio wrapper sobre `fetch`, puedes usar [graphql-request](https://github.com/prisma-labs/graphql-request). Es un wrapper sobre el API `fetch` para realizar peticiones a un servidor GraphQL que no requiere de mucho trabajo para empezar a utilizarlo. Ya tiene un buen manejo de errores y es isomórfica por defecto (algo que tal vez no le guste a algunas personas). La página de GitHub de `swr` ya muestra un ejemplo con esta herramienta.

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

## Conclusión

Siento que hay un punto de entrada artificialmente alto para desarrolladores front-end que quieren entrar al mundo de GraphQL. El hecho de que Apollo y urql sean mostrados como opciones para _principiantes_ puede hacer sentir que estas herramientas son _necesarias_ para trabajar con un API GraphQL. Esto no es cierto. **Sí** puedes construir una aplicación completa utilizando solamente `fetch`, tal vez agregando otras pequeñas librerías para utilidades extras. No puedo imaginar algún proyecto hobby que pueda necesitar todas las utilidades proveídas por estas grandes librerías. Clarificando: no estoy diciendo que no debas usar estas librerías si quieres, sino que no debes sentir que estás librerías son _necesarias_ para construir lo que quieres.
