<script>
 import { onMount } from 'svelte';
  export let href;
  export let title;
  export let dynamic = false;

  let host = '';

  $: shareHref = href.replace('{host}', host);

  let dialog = null;

  function onClick(e) {
    if (dynamic) {
      e.preventDefault();
      dialog.showModal();
    }
  }

  function onSubmit() {
    localStorage.setItem('fedi-share-host', host);
    window.open(shareHref, '_blank', 'noreferrer,noopener');
    dialog.close();
  }

  onMount(() => {
    host = localStorage.getItem('fedi-share-host') ?? '';
    document.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  });
</script>

<a {href} on:click={onClick} target="_blank" {title} rel="noopener noreferrer">
  <slot></slot>
  <span class="sr-only">{title}</span>
</a>

<dialog bind:this={dialog}>
  <div class="content">
    <h1>{title}</h1>
    <form on:submit|preventDefault={onSubmit}>
      <label>
        <span>Instance:</span>
        <input required type="text" bind:value={host} placeholder="mastodon.social" />
      </label>
      <div class="button-group">
        <button type="button" on:click={() => dialog.close()}>Cancel</button>
        <button type="submit">Share</button>
      </div>
    </form>
  </div>
</dialog>

<style>
  .sr-only {
    position: absolute;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }

  dialog {
    margin: auto;
    background-color: var(--background-color);
    border-color: var(--color-primary-0);
    border-radius: 10px;
  }

  dialog .content {
    padding: 1rem;
  }

  dialog h1 {
    font-size: 1rem; 
    color: var(--color-heading);
  }

  dialog label {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
  }

  button {
    border-radius: 10px;
  }

  button[type="button"] {
    border: 2px solid var(--color-heading);
    color: var(--color-heading);
    padding: 0.5rem 1rem;
  }

  button[type="submit"] {
    border: 2px solid transparent;
    background-color: var(--color-heading);
    color: var(--background-color);
    padding: 0.5rem 1rem;
  }

  button:hover {
    border-color: var(--color-primary-0);
    background-color: var(--color-primary-0);
    color: var(--background-color);
  }

  button:active {
    border-color: var(--color-primary-1);
    background-color: var(--color-primary-1);
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
</style>
