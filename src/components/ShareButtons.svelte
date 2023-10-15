<script>
  import Icon from './FaIcon.svelte';
  import ShareButton from './ShareButton.svelte'
  import { faRedditSquare, faLinkedin, faTwitterSquare, faFacebookSquare, faGetPocket, faMastodon } from '@fortawesome/free-brands-svg-icons'
  export let blog = {}
  export let lang = 'en'
  export let host;
  const encoded = encodeURI(`${host}${lang === 'en' ? '' : 'es/'}${blog.slug}`);
  $: details = blog.frontmatter ?? {};
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
      details.description}
      title="Share on Facebook"
      >
      <Icon icon={faFacebookSquare} />
    </ShareButton>
  </li>
  <li>
    <ShareButton
      href={'https://twitter.com/intent/tweet?source=' +
      encoded + '&text=' +
      details.description + ':%20' +
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
      details.title}
      title="Add to Pocket"
      >
      <Icon icon={faGetPocket} />
    </ShareButton>
  </li>
  <li>
    <ShareButton
      href={'http://www.reddit.com/submit?url=' +
      encoded + '&title=' +
      details.title}
      title="Submit to Reddit"
      >
      <Icon icon={faRedditSquare} />
    </ShareButton>
  </li>
  <li>
    <ShareButton
      href={'http://www.linkedin.com/shareArticle?mini=true&url=' +
      encoded + '&title=' +
      details.title +
      '&summary=' + details.description +
      '&source=' + encoded}
      title="Share on LinkedIn"
      >
      <Icon icon={faLinkedin} />
    </ShareButton>
  </li>
  <li>
    <share-on-fedi placement="top" aria-label="Share on Mastodon">
      <Icon icon={faMastodon} title="Share on Mastodon" />
    </share-on-fedi>
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

  share-on-fedi::part(trigger) {
    color: var(--color-link);
    font-size: 2em;
    margin-bottom: 5px;
  }

  share-on-fedi::part(dialog) {
    border: 2px solid var(--color-heading);
    border-radius: 10px;
    background-color: var(--background-color);
  }

  share-on-fedi::part(close-button) {
    font-weight: 700;
    border: 2px solid var(--color-heading);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    background: transparent;
    cursor: pointer;
    color: var(--base-font-color);
  }

  share-on-fedi::part(button):not(:disabled):hover {
    border-color: var(--color-primary-0);
    background-color: var(--color-primary-0);
    color: var(--background-color);
  }

  share-on-fedi::part(button):not(:disabled):active {
    border-color: var(--color-primary-1);
    background-color: var(--color-primary-1);
  }

  share-on-fedi::part(share-button) {
    font-weight: 700;
    border: 2px solid transparent;
    border-radius: 10px;
    background-color: var(--color-heading);
    color: var(--background-color);
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  share-on-fedi::part(button):disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
