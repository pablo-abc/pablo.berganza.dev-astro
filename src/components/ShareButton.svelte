<script>
  export let href;
  export let title;
</script>

<a {href} target="_blank" {title} rel="noopener noreferrer">
  <slot></slot>
  <span class="sr-only">{title}</span>
</a>

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
</style>
