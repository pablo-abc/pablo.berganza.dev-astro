<script>
  import { onMount } from 'svelte'
  export let src
  let mounted = false
  export let lang = 'en';
  onMount(() => {
    mounted = true
  })
</script>

<label for="commento-textarea-root" class="visuallyhidden">
  {#if lang === 'en'}
    Comment
  {:else}
    Comentario
  {/if}
</label>
<div id="commento"></div>

{#if mounted}
  <script {src}></script>
{/if}

<style>
  .visuallyhidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
  }

  div {
      border-top: 2px solid var(--color-primary-1);
      padding-top: 20px;
  }

  div :global(.commento-submit-button) {
      background: var(--color-secondary-2-3) !important;
      transition: color 0.1s;
  }

  div :global(.commento-submit-button:hover) {
      background: var(--color-secondary-2-1) !important;
  }

  div :global(.commento-email-button) {
      color: var(--color-secondary-2-3) !important;
      height: 50px !important;
  }

  div :global(.commento-login-link) {
      color: var(--color-secondary-2-3) !important;
  }

  div :global(.commento-login-box) {
      background: #FFF7FB !important;
  }

  div :global(*) {
      font-family: 'Overpass', 'Helvetica Neue', Verdana, Helvetica, Arial, sans-serif !important;
      color: var(--base-font-color) !important;
  }

  div :global(.commento-button), div :global(.commento-avatar) {
      color: #FFF2F8 !important;
  }

  div :global(.commento-sort-policy-buttons-container .commento-sort-policy-buttons .commento-sort-policy-button-selected) {
      color: var(--color-secondary-2-3) !important;
  }

  div :global(.commento-option-button) {
      background: #A18795 !important;
  }

  div :global(.commento-upvoted), div :global(.commento-downvoted) {
      background: var(--color-secondary-2-3) !important;
  }

  div :global(.commento-option-remove) {
      background: #e03131 !important;
  }
</style>
