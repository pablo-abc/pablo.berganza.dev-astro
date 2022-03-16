---
title: Start of a New Digital Journey
description: How I made my life difficult by trying to create my website from scratch
created: '2019-03-18'
published: true
image:
  width: 800
  height: 600
tags:
    - clojure
    - webdev
    - tech
---

For better or for worse, most of my digital life has followed a DIY path. One advantage of this DIY approach is that I got to learn how a lot of technologies work on a deeper level. On the other hand, I never managed to finish any of my personal projects because of this (after all, in most cases I was just trying to reinvent the wheel).

The first project I tried to make was a digital newspaper (around 5-6 years ago). Since I wanted to feel like I was in control of what I was doing I ignored frameworks such as Symfony or Laravel, and WordPress was a definite no-no on my mind. So my stubborn self began working on it using plain PHP, even managing routes from scratch. You can obviously see why this project ended up in the shelf forever.

I guess this taught me a really important lesson, a lesson that is repeated all the time on any tech forum (or StackOverflow): Do not reinvent the wheel. So much effort with no reward (at the moment) killed some motivation I had to work on my personal stuff. Since then, I've learned a variety of frameworks (getting a job as a full time web developer helped push that). Frameworks such as [LoopbackJS](https://loopback.io) and [NestJS](https://nestjs.com) have been part of my life for the past professional year, and front-end frameworks such as [ReactJS](https://reactjs.org) and [VueJS](https://vuejs.org) have taken up most of my free time. But it wasn't until I discovered a certain programming language called [Clojure](https://clojure.org) that the desire to make my own stuff sparked again.

## The Clojure Programming Language

Clojure might feel like a turn off for many developers; after all, it is a Lisp, which means many `(many (many (many parentheses)))`. But, since I discovered them back in a functional programming class at my university, I've always felt like I had a soft spot for them. Besides, Clojure has access to the entire power of the [JVM](https://clojure.org/reference/java_interop); it is a "production ready" solution for [many companies already](https://clojure.org/community/companies); it focuses more on the functional paradigm than many other Lisps; and it is, in my personal opinion, a really fun programming language to learn with a friendly community behind it.

For a taste of it, this is the (not so elegant) function that renders the current page:

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

There's another variant of Clojure that transpiles/compiles to JavaScript, called [ClojureScript](https://clojurescript.org) that I had already planned to use for the front-end.

So I got my language of choice for my next personal project and, since I didn't have a personal website, I decided for it to be just that.

## Start of a Personal Website

I had a really simple set of features that my website should have:

- A landing page: Since this would serve as my presentation card.
- A blog: To share my thoughts and personal experiments.
- A contact page: ;) ;)

The plan was to make a back-end Clojure server which would contain all my blog posts and relevant info on a PostgreSQL database, connected to a frond-end ClojureScript application. I knew it was a complete overkill just to make a simple website, but it was the perfect time for me to learn all that I could about Clojure, ClojureScript, and their ecosystems. From all the excitement I completely ignored the difficulties that would come in the future regarding maintenance of the website. After serious consideration (and realizing the nightmare I would get myself into) I decided to start looking for alternatives, even though I managed to make the original site to sort of work without a CMS. The corpse of this original site can still be found on my [GitHub](https://github.com/pablo-abc/old-personal-site) if anyone is interested. Warning: It's not pretty.

While this time it wasn't due to a DIY mentality, from the beginning I had chosen the wrong set of tools for my specific problems. And this ended up making everything more difficult than it should have been.

## Static Site Generators

Without looking too much I found the concept of "static site generators". These are tools that take content from different sources (markdown files, in the case of this page) and generates the corresponding HTML files. These files can then be hosted on services such as [GitHub Pages](https://pages.github.com) or [Netlify](https://www.netlify.com). If you are already familiar with Git, managing the sites content implies just managing the files on a repository.

The most popular static site generators I found were:

- [Jekyll](https://jekyllrb.com): Ruby based static site generator.
- [GatsbyJS](https://www.gatsbyjs.org): As its name implies, a JavaScript (React) based generator. Probably the most impressive one for its set of features.
- [Hugo](https://gohugo.io): A Go based generator, that prides itself on being the fastest of the bunch.

At first, I started making this site using GatsbyJS, since I already knew my bit of ReactJS it seemed like the obvious choice. But as I started to make it I found myself not enjoying it that much. You see, developer happiness should be the main objective for a personal project, and I was not enjoying this as much as I did using Clojure previously. That's how I found [Perun](https://perun.io).

## Perun.io

Perun.io is a Clojure based static site generator that takes advantage of [Boot](https://boot-clj.com) build tool to generate the HTML files from the specified sources. Its documentation is quite sparse (there are only two guides on its main website) but as of now it is more than enough to get you started if you already know a bit of Clojure.

While its features are noticeably less than those of GatsbyJS, they were more than enough for my purposes. Perun.io gives you a set of functions (Boot tasks) that you can pipe to manipulate and organize the content of your static website. Each function has a very specific task which gives you a lot of freedom to control exactly how your site will behave. Adding a Spanish and an English version of my site was a breeze, for example. Besides, writting HTML in [Hiccup](https://github.com/weavejester/hiccup) is much more intuitive than using React's JSX.

## Conclusion

Most of the times, a solution for a problem you have already exists. It is of no use trying to go the DIY route when there's already a battle tested solution out there, and trying to make your own solution can end up in frustration. In the end I managed to finish this beautiful-ish website by using tools that had already solved most of my problems, while still managing to enjoy developing all of it.
