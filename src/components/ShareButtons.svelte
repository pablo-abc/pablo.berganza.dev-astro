<script>
  import Icon from './FaIcon.svelte';
  import ShareButton from './ShareButton.svelte'
  import { faRedditSquare, faLinkedin, faTwitterSquare, faFacebookSquare, faGetPocket } from '@fortawesome/free-brands-svg-icons'
  export let blog = {}
  export let lang = 'en'
  export let host;
  const encoded = encodeURI(`${host}${lang === 'en' ? '' : 'es/'}${blog.slug}`);
</script>

<ul class=share-buttons>
  <li>
    {#if lang === 'en'}
      Share this:
    {:else}
      Compártelo:
    {/if}
  </li>
  <li>
    <ShareButton
      href={'https://www.facebook.com/sharer/sharer.php?u=' +
      encoded + '&quote=' +
      blog.description}
      title="Share on Facebook"
      >
      <Icon icon={faFacebookSquare} />
    </ShareButton>
  </li>
  <li>
    <ShareButton
      href={'https://twitter.com/intent/tweet?source=' +
      encoded + '&text=' +
      blog.description + ':%20' +
      encoded + '&via=Pablo_ABC'}
      title="Tweet"
      >
      <Icon icon={faTwitterSquare} />
    </ShareButton>
  </li>
  <li>
    <ShareButton
      href={'https://getpocket.com/save?url=' +
      encoded + '&title=' +
      blog.title}
      title="Add to Pocket"
      >
      <Icon icon={faGetPocket} />
    </ShareButton>
  </li>
  <li>
    <ShareButton
      href={'http://www.reddit.com/submit?url=' +
      encoded + '&title=' +
      blog.title}
      title="Submit to Reddit"
      >
      <Icon icon={faRedditSquare} />
    </ShareButton>
  </li>
  <li>
    <ShareButton
      href={'http://www.linkedin.com/shareArticle?mini=true&url=' +
      encoded + '&title=' +
      blog.title +
      '&summary=' + blog.description +
      '&source=' + encoded}
      title="Share on LinkedIn"
      >
      <Icon icon={faLinkedin} />
    </ShareButton>
  </li>
</ul>

<style>
  ul.share-buttons {
      width: 100%;
      margin: 0 auto;
      color: var(--base-font-color);
      font-weight: 550;
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
  }

  ul.share-buttons li :global(a) {
      margin: 10px;
      font-size: 2em;
  }
</style>
