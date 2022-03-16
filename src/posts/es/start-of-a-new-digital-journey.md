---
title: Inicio de un nuevo viaje digital
description: Cómo me compliqué la vida al intentar crear mi sitio web desde cero
created: '2019-03-18'
published: true
image:
  width: 800
  height: 600
tags:
    - clojure
    - webdev
    - tecnología
lang: es
---

Para bien o para mal, la mayor parte de mi vida digital ha seguido una mentalidad de "hazlo tu mismo". Una ventaja de esto es que he logrado aprender el funcionamiento de varias tecnologías desde un nivel más profundo. Por otro lado, nunca logré terminar ninguno de mis proyectos personales debido a esto (después de todo, en la mayor parte de casos estaba intentando reinventar la rueda).

El primer proyecto que intenté crear fue un periódico digital (hace 5 ó 6 años). Debido a que quería sentir que estaba en control de lo que hacía, ignoré varios frameworks como Symfony o Laravel, y WordPress definitivamente no era una opción en mi mente. De forma testaruda empecé a trabajar utilizando solo PHP puro, incluso manejando las rutas desde cero. Creo que es obvio por qué este proyecto nunca logró ser terminado.

Supongo que esto me dio una lección muy importante, una lección que puede ser encontrada constantemente en muchos foros de tecnología (o StackOverflow): No reinventes la rueda. Tanto esfuerzo con poco que ganar (en aquel entonces) mató parte de la motivación que tenía para trabajar en mis propios proyectos. Desde entonces he aprendido una variedad de frameworks (conseguir un trabajo como desarrollador a tiempo completo ayudó a impulsar esto). Frameworks como [LoopbackJS](https://loopback.io) y [NestJS](https://nestjs.com) han sido parte de mi vida durante este último año laboral, y frameworks de front-end como [ReactJS](https://reactjs.org) y [VueJS](https://vuejs.org) se han tomado la mayor parte de mi tiempo libre. Pero no fue hasta que descubrí cierto lenguaje de programación, llamado [Clojure](https://clojure.org), que el deseo de crear mis propios proyectos despertó de nuevo.

## Lenguaje de programación: Clojure

Clojure puede sentirse como un lenguaje muy poco atractivo para muchos desarrolladores; después de todo, es un Lisp. Esto significa muchos `(muchos (muchos (muchos paréntesis)))`. Pero desde que los descubrí cuando recibí una clase de programación funcional en mi universidad, siempre he tenido un lugar en mi corazón para ellos. Además, Clojure tiene acceso al poder entero de la [JVM](https://clojure.org/reference/java_interop); ha sido una solución para [ya muchas compañías](https://clojure.org/community/companies); se enfoca más en el paradigma funcional que otros Lisps; y es, en mi opinión personal, un lenguaje de programación muy divertido para aprender, con una comunidad amigable detrás de él.

Para tener una probada de él, esta es la (no tan elegante) función que genera la página actual:

```clojure
(defn blog [{:keys [entry meta]}]
  (render
   (:title entry) (add-language meta entry) entry
   [:article#blog
    [:header.title
     [:h1 (:title entry)]
     [:p.introduction (:introduction entry)]]
    [:div.ttr-created
     [:span.ttr [:i.far.fa-clock] " " (:ttr entry) " min"]
     [:span.created [:i.far.fa-calendar-alt] " " (:created entry)]]
    (let [content (:content entry)]
      [:section.content content])
    [:section.content
     (share-buttons meta entry)]]))
```

Hay otra variante de Clojure que transpila/compila a JavaScript, llamada [ClojureScript](https://clojurescript.org), que ya tenía planeado utilizar para el front-end de mi futuro proyecto.

Entonces ya tenía el lenguaje de programación para mi próximo proyecto y, cómo todavía no tenía un sitio web personal, decidí que eso mismo sea.

## Inicio de un sitio web personal

Ya tenía un listado de simples características que mi sitio debería tener:

- Una página de presentación: Debido a que la página debería servir como mi tarjeta de presentación.
- Un blog: Para compartir mis pensamientos y experimentos personales.
- Una página de contacto: ;) ;)

El plan era hacer un servidor con Clojure que se encargaría de manejar todas las publicaciones del blog y otra información relevante. Esta información sería guardada en una base de datos de PostgreSQL. El servidor estaría conectado a una aplicación web desarrollada con ClojureScript. Ya sabía que esta arquitectura era exagerada para un simple sitio web, pero sentía que era la perfecta forma de aprender todo lo que pudiera de Clojure, ClojureScript, y sus ecosistemas. Por la emoción, ignoré por completo todas las dificultades que vendrían en el futuro a la hora de mantener el sitio web. Después de considerarlo seriamente (y al darme cuenta de la pesadilla a la que me estaría metiendo) decidí empezar a buscar alternativas. Aun así, logré hacerlo funcionar (más o menos) sin un CMS. El cadáver del sitio original todavía puede ser encontrado en mi [GitHub](https://github.com/pablo-abc/old-personal-site) si alguien está interesado. Precaución: no es bonito.

## Generadores de sitios estáticos

Sin necesidad de buscar mucho me encontré con el concepto de "generadores de sitios estáticos". Estos son herramientas que toman contenido de distintas fuentes (archivos markdown, en el caso de esta página) y generan sus respectivos archivos HTML para generar la página. Estos archivos pueden ser alojados en servicios tales como [GitHub Pages](https://pages.github.com) o [Netlify](https://www.netlify.com). Si ya tienes experiencia con Git, manejar tu sitio implica solamente manejar un repositorio.

Los generadores más populares que encontré fueron:

- [Jekyll](https://jekyllrb.com): Generador basado en Ruby.
- [GatsbyJS](https://www.gatsbyjs.org): Cómo implica su nombre, es un generador basado en JavaScript (React). Probablemente el más impresionante debido a sus características.
- [Hugo](https://gohugo.io): Un generador basado en Go. Se enorgullece de ser el más rápido de todos.

Inicialmente utilicé GatsbyJS para generar el sitio, cómo a que ya conocía un poco de ReactJS esta parecía la opción más obvia. Sin embargo, mientras lo empezaba a hacer, me di cuenta de que no estaba disfrutando mucho el proceso. En mi opinión, la felicidad del desarrollador debería ser el objetivo principal en un proyecto personal, y no estaba disfrutando esto así como estaba disfrutando el uso de Clojure previamente. De esta forma encontré a [Perun](https://perun.io).

## Perun.io

Perun.io es un generador de sitios estáticos que utiliza a su ventaja la herramienta de construcción [Boot](https://boot-clj.com) para generar los archivos HTML de las fuentes especificadas. La documentación es un poco escasa (solo hay dos guías actualmente en su sitio principal) pero es suficiente para ayudarte a empezar si ya sabes algo de Clojure.

Aun que sus características son notablemente menos que las de GatsbyJS, fueron más que suficientes para mis propósitos. Perun.io provee una colección de funciones (tareas de Boot) que puedes concatenar para manipular y organizar el contenido de tu sitio estático. Cada función tiene un objetivo específico lo que da mucha libertad para controlar exactamente como funcionará el sitio web. Agregar una versión en inglés y en español a este sitio fue muy fácil, por ejemplo. Además, escribir HTML utilizando [Hiccup](https://github.com/weavejester/hiccup) se siente mucho más intuitivo que utilizando JSX de React.

## Conclusión

La mayor parte del tiempo, una solución a tus problemas ya fue diseñada por alguien más. No tiene mucho sentido tomar la ruta de "hazlo tu mismo" cuando ya existe una solución probada por cientos de usuarios, e intentar crear tu propia solución normalmente solo genera frustración. Al final, logré terminar este hermoso (más o menos) sitio web utilizando las herramientas que otros ya habían desarrollado, mientras todavía disfrutaba todo el proceso.
