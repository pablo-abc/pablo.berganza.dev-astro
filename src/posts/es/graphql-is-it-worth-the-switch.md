---
title: 'GraphQL: ¿Vale la pena el cambio?'
description: Una agradable alternativa a APIs REST con una increíble experiencia de desarrollo
created: '2019-06-11'
published: true
image:
  width: 800
  height: 600
lang: es
tags:
    - graphql
    - rest
    - api
---

Este último año trabajando como desarrollador web he estado, básicamente, respirando [REST](https://es.wikipedia.org/wiki/Transferencia_de_Estado_Representacional) todos los días. Aunque no es tanto tiempo, ha sido más que suficiente para apreciar la simplicidad sobre SOAP, y para odiar los momentos en que los requerimientos del cliente o otras situaciones te fuerzan a escribir endpoints que no son [RESTful](https://restfulapi.net/rest-architectural-constraints/). Aunque REST es ya un estándar para crear APIs web modernas, hace un par de años ha habido un competidor del cual no me había forzado a investigar todavía: [GraphQL](https://graphql.org). Pero eso ha cambiado y ya he experimentado un poco implementándolo en el cliente y en el servidor.

Según [graphql.org](https://graphql.org), "GraphQL es un lenguage de consulta para APIs y un sistema en tiempo de ejecución para cumplir esas consultas con tu información existente". Un servidor que esté implementando la especificación de GraphQL debería poder recibir una consulta enviada por el cliente, conteniendo una descripción de la infromación específica que el cliente necesita, y debería poder proveer ésta información así como el cliente la pidió.

Pero antes de hablar más sobre GraphQL, veamos qué es tan bueno sobre REST.

## REST

REST es un estilo de arquitectura que define una serie de reglas para construir servicios web. Cuando alguien habla de un API que sigue la arquitectura propuesta por REST, suelen referirse a un servidor que se comunica con el cliente por medio del protocolo HTTP. El cliente se aprovecha de los distintos métodos HTTP (GET, POST, PUT, PATCH, DELETE) para hacer consultas a direcciones en el API que representan recursos.

Algunos ejemplos de endpoints REST son:

```http
GET http://api.example.com/accounts

GET http://api.example.com/accounts/8326

GET http://api.example.com/accounts/8326/posts

GET http://api.example.com/posts/4123/comments
```

Dependiendo de qué método se utilice para llamar al endpoint, se aplicará una distinta operación al recursos.

| MÉTODO | ENDPOINT       | DESCRIPCIÓN                               | ESTADO DE RESPUESTA |
|--------|----------------|-------------------------------------------|---------------------|
| GET    | /resources     | Obtener una lista de elementos            | 200                 |
| GET    | /resources/:id | Obtener un solo elemento                  | 200, 404            |
| POST   | /resources     | Crear un elemento                         | 201, 400            |
| PUT    | /resources/:id | Modificar un elemento completo            | 200, 400            |
| PATCH  | /resources/:id | Modificar campos específicos del elemento | 200, 400            |
| DELETE | /resources/:id | Eliminar un elemento                      | 204, 200, 404       |

Esto nos da una limpia y predecible interfaz para operar sobre los recursos en el servidor.

Como se ve en los endpoints del ejemplo anterior, los endpoints en una arquitectura REST pueden seguir una estructura jerárquica. Por ejemplo, si se hiciera una consulta con el método POST al endpoint `/accounts/8326/posts`, ésto debería significar que se está creando una publicación (post) que pertenece a la cuenta (account) con id 8326.

He hablado sobre como un API REST debe verse para el cliente, pero éstas características no son suficientes para que una API pueda ser considerada una API REST. Para poder ser clasificada como tal, debe seguir las siguientes seis reglas:

  * **Interfaz uniforme**: Una API REST debe tener una interfaz bien definida y consistente. Esta interfaz debe seguirse casi religiosamente en todos los recursos expuestos por el API. Debe tener consistentes convenciones de nombramiento, formato de datos, etc.
  * **Cliente-servidor**: Debe haber una separación clara entre cliente y servidor.
  * **Sin estado**: Todas las interacciones del cliente con el servidor no deben contener estado. Esto significa que el servidor debe asumir que toda consulta hecha a éste es completamente nueva, sin conocimiento alguno de estados anteriores del cliente.
  * **Cacheable**: Si un endpoint REST es suficientemente estable, este podría ser puesto en cache, ya sea en el cliente o servidor. Los endpoints que puedan ser puestos en el cache deben explícitamente indicar esto.
  * **Sistema en capas**: La arquitectura del sistema puede estar en capaz, es decir, el cliente puede estar interactuando con distintos servidores comportándose como que si estuviera interactuando diréctamente con el API REST.
  * **Código a pedido**: Esta es la única regla opcional de la arquitectura REST. Indica que, cuando sea necesario, un endpoint REST puede retornar código ejecutable como respuesta a una consulta del cliente.

Éstas reglas nos traen varios beneficios:

  * Una interfaz uniforme permite que el cliente pueda navegar intuitivamente tu API cuando empiecen a acostumbrarse a este.
  * Una interfaz bien definida hace más fácil la organización del código del sevidor en base a recursos.
  * Una arquitectura cliente-servidor permite a ambos, el cliente y el servidor, poder evolucionar independientemente.
  * Al no mantener estado del cliente un servidor tiene, teóricamente, una escalabilidad ilimitada. Puede replicarse indefinidamente cuando se requieran altos recursos sin afectar la interacción con el cliente.
  * Mantener un cache de algunos endpoints ayuda a reducir la carga del servidor.
  * Un sistema en capas permite al cliente pasar por intermediarios (ej. por motivos de autenticación) mientras sigue interactuando de la misma forma con el servidor.

Aunque el formato de dato más usado en APIs REST es JSON, si es necesario se puede utilizar otros formatos (ej. XML). Además, aunque la mayoría de APIs REST disponibles públicamente son servidas a través del protocolo HTTP, un API REST podría ser servida por un protocolo distinto.

Como se puede ver, una API REST desarrollada propiamente viene con muchos beneficios, pero también hay unas cuantas desventajas:

  * Cómo no hay un estándar único definido sobre como se debe comportar un API REST (además de las seis reglas mencionadas), muchas decisiones del diseño quedan a responsabilidad del desarrollador. Esto significa que no se podrá interactuar necesariamente de la misma forma con dos distintas APIs REST.
  * A menos que filtros hayan sido implementados en el servidor, un endpoint REST puede returnar mucha más información de la que el cliente necesita.
  * Debido a que los endpoints REST son divididos por recursos, para poder popular completamente una vista del cliente es probable que se necesite hacer varias consultas al servidor.
  * La consistencia es difícil. El equipo de desarrollo debe tratar activamente de mantener la consistencia, esto significa más esfuerzo a la hora de desarrollar. Es fácil agregar inconsistencias al servidor.
  * Fechas límite, requerimientos del cliente, etc. pueden llevar a romper algunas de las reglas de REST. Esto podría llevar a una mezcla de distintas arquitecturas (ej. RPC).

  Esto muestra que construir una verdadera API REST no es tarea fácil. Hay varios agujeros en los que el equipo de desarrollo puede caer, haciendo que el resultado final no sea una API REST, y que se pierdan algunos de los beneficios proporcionados por el cumplimiento de las reglas de REST.

  Entonces, ¿qué nos ofrece GraphQL?

## GraphQL

Como se ha dicho antes, GraphQL es descrito como un lenguaje de consultas para APIs. A diferencia de REST, GraphQL define un solo endpoint que acepta toda las operaciones hacia el servidor en un parámetro llamado "query". Las consultas son generalmente echas utilizando el método POST en el endpoint de GraphQL, pero la especificación permite utilizar el método GET para operaciones de solo lectura.

Hay dos tipos de llamadas que puedes hacer a un API GraphQL: consultas y mutaciones. Una consulta se ve de la siguiente forma:

```javascript
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

Esto significa que debe haber un esquema de tipo consulta con el nombre "post" definido en el servidor. Esta consulta está pidiendo el id, título, contenido, el id del autor y el correo del autor de la publicación con id "1". Si es encontrada, la respuesta seguirá la misma estructura descrita en la consulta. Una consulta de GraphQL es análoga a realizar una llamada con GET a un endpoint REST.

Una mutación en GraphQL se ve de la siguiente forma:

```javascript
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

Esto asume que hay un esquema de tipo mutación llamado "createAccount" definido en el servidor. Esta mutación está pidiéndole al servidor que cree una cuenta con el email y la contraseña especificadas, y al terminar la creación que retorne su id y su email.

GraphQL no debería considerarse un estilo de arquitectura. Es, más bien, una serie de herramientas que facilitan el desarrollo de APIs tipo RPC (ya que estás llamando funciones en el servidor). Aún así, una API GraphQL comparte varias características con un API REST:

  * Hay una clara separación entre cliente y servidor.
  * El servidor no mantiene un estado.
  * Aunque la mayoría de APIs GraphQL son servidas sobre HTTP, podría ser servida sobre un protocolo distinto.

A parte de esto, un API GraphQL tiene otras ventajas sobre un API REST:

  * Una interfaz consistente con el cliente, ya que la comunicación cliente-servidor se hace utilizando un lenguage de consulta ya definido.
  * La documentación es auto-generada. Cuando los esquemas son definidos, estos está disponibles para que el cliente las vea. También es posible agregar "docstrings" a los esquemas para poder explicarlos más a fondo.
  * Las herramientas disponibles proveen una muy agradable experiencia de desarrollo. Herramientas como Graphiql y GraphQL Playground pueden hacer explorar los esquemas de un API GraphQL muy fácil, y muchas librerías para el cliente, como Apollo, pueden proveer otras herramientas para agregar funcionalidad al cliente.
  * Desde el momento en que los esquemas son definidos hay un contrato entre el cliente y el servidor. Los esquemas incluyen las propiedades y los tipos de datos esperados en entrada y salida. Más propiedades pueden ser agregadas después al esquema, pero no se recomienda remover propiedades que ya están definidas.
  * La barrera de entrada para diseñar un API GraphQL comparada a un API REST es mucho más baja.
  * Ya hay una vasta cantidad de implementaciones de la exacta especificación de GraphQL en la mayoría de lenguages de programación grandes, esto permite una interacción consistente entre distintas APIs GraphQL.
  * Reduce considerablemente la cantidad de llamadas al servidor, ya que toda la información puede ser pedida, potencialmente, con una sola llamada.

Pero obviamente no hay solo ventajas en el mundo de GraphQL. Estamos perdiendo algunas de las ventajas proveídas por la arquitectura REST cuando implementamos un API GraphQL, y además hay otras desventajas:

  * Aunque es generalmente servida sobre HTTP, se pierde muchos beneficios proporcionados por dicho protocolo como caching, limitación de peticiones, etc. Esto reduce su escalabilidad potencialmente.
  * Un API GraphQL es potencialmente menos eficiente que un API REST. Debido a la impredecible complejidad de las llamadas hechas al servidor, es probable que un solo llamado al servidor implique operaciones N+1.
  * Al ser publicada en el 2015 (y al iniciar desarrollo en el 2012) se puede argumentar que el cosistema todavía no es maduro y hay posibilidad para considerables cambios en el futuro.
  * Para aplicaciones sencillas las llamadas pueden hacerse utilizando fetch API o librerías como Axios. Pero si la aplicación crece, una librería de GraphQL (como Apollo Client) puede ser necesitada. Esto aumentaría el tamaño del bundle de JavaScript.
  * Puede aumentar considerablemente la complejidad del código del servidor cuando optimizaciones son requeridas.
  * GraphQL suele retornar siempre un estado de 200. Como se pueden enviar varias consultas/mutaciones en un solo llamado, y algunas de estas pueden tener éxito y otras fallar de distinta forma, el manejo de errores puede volverse complicado del lado del cliente.

Hay varias otras características en la especificación de GraphQL sobre las que no escribí, como fragments, consultas y mutaciones nombradas, variables, etc. Así que puedes revisar [graphql.org](https://graphql.org) para aprender más sobre esto si te ha interesado.

## Conclusión

Entonces, ¿vale la pena el cambio? Cómo todo debate entre tecnologías, la respuesta es si y no. Hay casos de uso para ambos, GraphQL y REST. Por ejemplo, una API GraphQL puede ser útil cuando el desarrollo necesita iniciar antes que los requerimientos del cliente estén propiamente definidos, y puede ayudar a mantener un API consistente sin mucho esfuerzo. Al final, siempre se debe evaluar las ventajas y desventajas, y elegir la herramienta adecuada para el trabajo.
