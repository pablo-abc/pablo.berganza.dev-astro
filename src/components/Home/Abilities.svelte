<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  export let lang = 'en';
  const abilities = [
    ['https://cdn.svgporn.com/logos/javascript.svg', 'JavaScript'],
    ['https://cdn.svgporn.com/logos/typescript-icon.svg', 'TypeScript'],
    ['https://cdn.svgporn.com/logos/clojure.svg', 'Clojure'],
    ['/assets/abilities/cljs-white.svg', 'ClojureScript'],
    ['https://cdn.svgporn.com/logos/python.svg', 'Python'],
    ['https://cdn.svgporn.com/logos/docker.svg', 'Docker'],
    ['/assets/abilities/nestjs.svg', 'NestJS'],
    ['/assets/abilities/react.svg', 'React'],
    ['/assets/abilities/svelte.svg', 'Svelte'],
  ];
  let index = 0;
  let interval;

  onMount(() => {
    interval = setInterval(() => {
      if (index === abilities.length - 1) index = 0;
      else index += 1;
    }, 2000);
  });
  onDestroy(() => clearInterval(interval));

  const abString = abilities.map(ab => ab[1]).join(', ');

  let label = lang === 'en'
      ? `I have experience with: ${abString}`
      : `Tengo experiencia con: ${abString}`;
</script>

<div aria-label="{label}">
  {#key index}
  <img aria-hidden="true" transition:fade src="{abilities[index][0]}" alt="" />
  {/key}
</div>

<style>
  div {
    position: relative;
    width: 100%;
    height: 100%;
  }
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
