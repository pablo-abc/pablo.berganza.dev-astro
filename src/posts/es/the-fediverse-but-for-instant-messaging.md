---
title: 'El Fediverso, pero para mensajería instantánea'
description: 'Matrix, XMPP y Snikket'
published: true
created: '2024-02-06'
imgext: jpg
fediId: '111887039324700917'
image:
  width: 3024
  height: 1701
tags:
  - fediverse
  - matrix
  - selfhosting
  - xmpp
---

Últimamente he sentido un poco de felicidad al ver como, por lo menos parte del mundo, está tomando interés en las tecnologías federadas. Y al ver como la cantidad de personas uniéndose a éstos servicios sigue creciendo. El Fediverso, principalmente por Mastodon, tiene 10 millones de usuarios y 1 millón de usuarios activos cada mes, según [FediDB](https://fedidb.org), al momento de escribir este artículo.

Mi cuenta en la instancia que estoy manteniendo, [@pablo@sivar.cafe](https://sivar.cafe/@pablo), se está convirtiendo rápidamente en mi plataforma principal para microblogging. Y he conocido personas increíbles gracias a ello!

Pero microblogging no es el único uso para el que existen plataformas federadas. E-mail siento el servicio más grande para comunicación uno-a-uno y uno-a-muchos.

Para comunicación más instantáneas, algunas alternativas a Mastodon, como  [Misskey](https://misskey-hub.net/en/)  y sus forks, implementaron funciones para mensajería instantánea. Te permitía hablar con gente dentro o fuera de tu servidor. Pero en este caso siempre sentí que la funcionalidad agregaba la complejidad y peso para quienes mantienen el proyecto, ya sea alojando una instancia, o manteniendo el código del proyecto en si. Versiones más recientes de Misskey removieron la funcionalidad de chat, aunque no estoy seguro del motivo. Y forks más recientes de Misskey tampoco ofrecen esta funcionalidad, incluyendo el fork más activamente mantenido por ahora:  [Sharkey](https://joinsharkey.org).

Entonces, ¿hay alguna otra alternative para mensajería instantánea que puedas alojar tu mismo y sea federada?

## Matrix

[Matrix](https://matrix.org/)  es un protocolo abierto que describe una forma para tener comunicación segura e instantánea de forma descentralizada. La instancia principal siendo matrix.org, la cual también tiene la mayor cantidad de usuarios.

Matrix provee a sus usuarios con:
- Cifrado de extremo a extremo (E2EE) en chats 1-a-1 y grupos.
- Grupos/cuartos públicos y privados.
- “Espacios” públicos y privado, siendo estos una forma de organizar varios cuartos dentro de una comunidad.
Entre otras cosas que probablemente desconozco todavía.

El server de referencia es [Synapse](https://github.com/element-hq/synapse). Está escrito en Python, lo cual ha traído críticas debido a consumir muchos recursos. Pero es el único servidor que implementa toda la especificación de Matrix. [Dendrite](https://github.com/matrix-org/dendrite) es otra implementación, descrito como una “segunda generación” para un servidor de Matrix, escrito en Go. El objetivo era resolver el problema de consumo de recursos. Pero entiendo que el esfuerzo de los desarrolladoras ha cambiado a enfocarse en optimizar Synapse y dejando a Dendrite para casos de uso más específicos. (Si mi suposición es incorrecta, ¡apreciaría una correción!).

Aunque es un protocolo abierto, las implementaciones que describí son posesión de Element: una organización con ánimo de lucro. Y [han realizado cambios para llegar a ser rentables](https://element.io/blog/element-to-adopt-agplv3/).

He estado experimentando con una implementación de terceros llamada [Conduit](https://conduit.rs). Está escrita en Rust y es increíblemente sencilla de alojar en tu servidor (es un solo binario). Las únicas quejas que he tenido son:
- Los registros pueden ser solo completamente activados, completamente activados, o necesitando un token para registrarse que es configurado al iniciar el servidor. No existen tokens de un solo uso o links para invitar usuarios.
- No soporta SSO (aunque hay un PR abierto con una implementación). Esto es algo que yo quería para darle acceso exclusivo a los usuarios de mi [instancia en Mastodon](https://sivar.cafe).
- Usa RocksDB por defecto, para el que no tengo experiencia en absoluta. Y entiendo que no es tan manipulable e inspeccionadle como una base de datos SQL. Aunque, ¿entiendo que ayuda mucho a que uso pocos recursos?

De todos modos tengo esperanzas en Conduit y mantendré una instancia pequeña por ahora!

## XMPP

Mientras leía sobre Matrix, encontré personas hablando acerca de XMPP como una alternativa para una plataforma federada de mensajería instantánea. Personalmente, al principio lo tomé un poco de broma. XMPP era es protocolo viejo del que habían escuchado cuando era un estudiante. Recuerdo usar [Pidgin](https://pidgin.im/) para configurar las múltiples cuentas de mensajería que tenía en aquel entonces.

Pero claro. XMPP fue, probablemente, _el_ protocolo original de mensajería instantánea federada. Y, según entiendo, todavía usado por los jugadores más grandes (aun que de una forma privada). Aunque definitivamente la comunidad es mucho más pequeña, y hay mucho menos Hype, que en Matrix; la comunidad que existe es muy apasionada y hay un esfuerzo continuo para hacer que el protocolo XMPP sea más y más accesible.

Esta [presentación fantástica por DenshiVideo en YouTube \(inglés\)](https://www.youtube.com/watch?v=GurbaZzwYvU)me convenció a investigar un poco más.

Según mis observaciones, hay dos principales servidores para XMPP:
- [ejabberd](https://www.ejabberd.im/): Un servidor escrito en Erlang, lo que lo hace increíblemente escaladle.
- [Prosody](https://prosody.im/):  Un servidor escritoire en Lua, buscando ser fácil de instalar y simplicidad.

Para mi uso propio, ejabberd se sentía un poco abrumador. Siendo un usuario de [NeoVim](https://neovim.io) estoy _mucho_ mas familiarizado con Lua. Así que empecé a leer como instalar un servidor de Prosody. Esta lectura hizo que encontrara a [Snikket](https://snikket.org)

### Snikket

Empezado por uno de los desarrolladores de Prosody, [Snikket](https://snikket.org) es una solución todo-en-uno para alojar tu propio servidor XMPP. Está enfocada en grupos medianos a pequeños. Es liviana, eficiente y súper fácil de alojar por ti mismo (o puedes pedir que Snikket lo aloje por ti). Algunas de sus características:
- Encriptación de extremo a extremo usando [OMEMO](https://webencrypt.org/omemo/).
- Introducción e instrucciones para nuevos usuarios.
- Puedes ingresar solo con invitación. Debes generar links de invitación para tus usuarios.
- Aplicaciones dedicadas para iOS y Android desarrolladas para soportar las funciones de Snikket.
- Cambios en la configuración que hacen que la plataforma sea más fácil de usar para tus usuarios.

Además de algunas opciones pequeñas (como números de puertos), Snikket no te deja acceder a casi ninguna configuración de Prosody. Esto es, en mi opinión, algo bueno. Al no abrumar con configuraciones y al dar configuración por defecto decente, es más sencillo que alguien quiera alojar su propia instancia. Entre menos tengas que _pensar_, mejor. Alojar en tu instancia solo requiere:
- Conseguir un dominio
- Apuntarlo a tu VPS
- Crear un archivo de configuración, solamente contiene tu dominio y e-mail del administrador.
- Instalar dependencias (Docker, Docker Compose, etc).
- Descargar su archivo docker-compose.
- `docker compose up -d`

Y eso es todo! Snikket se encargará incluso de generar los certificados SSL (usando Certbot).

Actualmente estoy alojando una instancia de Snikket junto a la instancia de Conduit que mencioné anteriormente. En ambas me he unido a algunos grupos/canales públicos. Snikket no usa casi nada de recursos a comparación de Conduit!

## Conclusión

En mi opinión, Snikket debe ser _el_ ejemplo para servidores federados cuyo objetivo sea ser descentralizados. Entre más esfuerzo y recursos necesite un individuo para alojar un servidor, es menos probable que aparezcan servidores pequeños. Entre más complicado el software, como Matrix o incluso Mastodon, más se siente como que solo vale la pena el esfuerzo si esperas que tu instancia sea relativamente grande. Y es más probable que usuarios terminen inscribiéndose en instancias más grandes. Snikket te dice que solo debes tomarte una o dos horas configurando tu servidor y de repente tu y tus amigos tendrán acceso a un servicio seguro de mensajería instantánea que, además, está conectado a una red descentralizadas de usuarios y canales en XMPP.
