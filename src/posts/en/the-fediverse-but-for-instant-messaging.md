---
title: 'The Fediverse, but for instant messaging'
description: 'Matrix, XMPP and Snikket'
published: true
created: '2024-02-06'
imgext: jpg
fediId: '111887033766953959'
image:
  width: 3024
  height: 1701
tags:
  - fediverse
  - matrix
  - selfhosting
  - xmpp
---

I’ve lately felt a sense of joy and hope seeing how, at least part of the world, is embracing federated technologies. And the amount of people joining these kinds of services is slowly growing. The Fediverse, mainly through Mastodon, has 10 million users and 1 million monthly active users according to [FediDB](https://fedidb.org) at the time of writing this post.

My account in the instance I maintain at [@pablo@sivar.cafe](https://sivar.cafe/@pablo) is quickly becoming my main microblogging platform. And I’ve met some wonderful people thanks to it!

But microblogging is not the only federated service out there. E-mail being the biggest out there for one-to-one or one-to-many communication.

For more instantaneous communication, some alternatives to Mastodon such as [Misskey](https://misskey-hub.net/en/) and its forks implemented real-time messaging capabilities. It allowed you to chat with people within or outside of your own server. But in this scenario I always felt that adding this functionality can increase the maintenance burden considerably for both the people hosting these services and the people responsible to actually maintain the code itself. Newer versions of Misskey removed the chat feature, although I’m unsure why. And more recent forks from it also don’t have it, including probably the current most actively developed fork: [Sharkey](https://joinsharkey.org).

So is there any other alternative for instant messaging that’s self-host able and federated?

## Matrix

[Matrix](https://matrix.org/) is an open protocol that describes a way to have secure, instant communication in a decentralised manner. The flagship instance being matrix.org has also the largest user base.

Matrix provides its users with:
- End to end encryption in both 1-to-1 messaging and groups.
- Public and private group chats/rooms
- Public and private “Spaces”, which is a way to group several rooms into a single community.
Among other things that I probably don’t even know about yet.

Its reference implementation server is [Synapse](https://github.com/element-hq/synapse). It’s written in Python which has led to much criticism due to being resource intensive. But it’s the only server that currently implements the whole spec. There’s also [Dendrite](https://github.com/matrix-org/dendrite), described as a “second generation” Matrix home server written in Go. It was supposed to solve the resource consumption concerns but, as far as I can tell, effort is now being put into optimising Synapse while leaving Dendrite for more specific use-cases. (Would love a correction if my assumption is wrong!).

While it’s an open protocol, the implementations are owned by Element: a for-profit organisation. And [they’ve done some changes in order to better reach profitability](https://element.io/blog/element-to-adopt-agplv3/).

I’ve been experimenting with a third-party implementation of the Matrix protocol: [Conduit](https://conduit.rs). It’s written in Rust (of course). And it’s super easy to host (with a single binary). The only complaints I’ve had are:
- Registrations can either be completely enabled, completely disabled or requiring a registration token set statically during configuration. No ‘one-time use’ tokens or invitation links.
- SSO is not supported yet (although there’s an open PR with an implementation for it) which is something I wanted to exclusively allow users of my [Mastodon instance](https://sivar.cafe) to access it.
- It uses RocksDB by default which is completely foreign to me and not sure if it’s even inspectable like an SQL database. Although I understand RocksDB does improve performance a lot?

Regardless I’m hopeful for Conduit and will continue hosting a small instance with it for now!

## XMPP

While reading about Matrix, I found people talking about XMPP as an alternative for a self-hosted, federated instant messaging platform. Personally at first I thought it was a bit of a joke. XMPP was that old protocol that I heard about when I was still a student. I remember using [Pidgin](https://pidgin.im/) to set up my multiple messaging accounts at the time.

But, of course, XMPP was probably _the_ original federated instant messaging protocol. And as far as I understand, still in use today by the big players (although in locked up versions of it). While there’s definitely a smaller development community, and less hype, than with Matrix. There is a passionate community and continuous effort towards making XMPP more and more approachable.

This fantastic [presentation by DenshiVideo on YouTube](https://www.youtube.com/watch?v=GurbaZzwYvU) convinced me to look more into XMPP.

From my observations, there’s two major server implementations for XMPP:
- [ejabberd](https://www.ejabberd.im/): A server written in Erlang which makes it insanely scalable.
- [Prosody](https://prosody.im/):  A server written in Lua, aiming for ease of set up and simplicity.

For my own usage, ejabberd already felt a bit overwhelming. Being a [NeoVim](https://neovim.io/) user I’m _way_ more comfortable with Lua so I started to read a bit on how to set-up Prosody. This let me to find out about [Snikket](https://snikket.org).

### Snikket

Started by one of the Prosody developers, [Snikket](https://snikket.org) is an all-in-one solution to host your own XMPP server with a focus on small to medium groups. It’s light, efficient and super simple to host by yourself (or let the folks at Snikket host it for you). Some of its features:
- End to end encryption using [OMEMO](https://webencrypt.org/omemo/)
- Onboarding flow for new users.
- Invitation-only. You need to generate invitation links for your users.
- Dedicated apps for iOS and Android built to support the features Snikket specifically supports.
- Tweaks that just make it way easier to use as an end-user.

Besides some minor things (e.g. port numbers), Snikket doesn’t give you any access to the configuration of Prosody. This is, in my opinion, a good thing. Not overwhelming the host with configuration options and giving sane defaults is a perfect way to get people to host their own, smaller, instances. The less you have to _think_ about it the better. Hosting basically implies just:
- Getting a domain name
- Point it toward your VPS
- Create a configuration file with just your admin email and domain.
- Install dependencies (Docker, Docker Compose, etc).
- Download their docker-compose file
- `docker compose up -d`

And that’s it! Snikket will even take care of getting SSL certificates for you (using Certbot).

I’m currently running a Snikket instance alongside the Conduit instance I mentioned before. In both I’ve already joined some public channels/groups. Snikket is barely using any resources in comparison with Conduit!

## Conclusion

In my opinion, Snikket should be _the_ example for self hosted federated servers that aim for decentralisation. The more effort and resources needed by an individual in order to host a service, the less likely smaller servers will appear in the wild. With more complex software such as Matrix, or even Mastodon, it feels like the effort to host is only worth it if you’re planning the instance to eventually grow. Snikket tells you to just spend an hour or two setting it up and suddenly you and your friends will have access to a secure service for your personal messaging, plus access to a wider decentralised network of XMPP users and channels.
