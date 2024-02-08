<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  const possibleColors = ["#FF8DC7", "#FFACC7", "#FFDDD2", "#FFB9B9"] as const
  let currentColor: null | typeof possibleColors[number] = null;
  let position = {
    x: 0,
    y: 0
  }
  let delay = 0;

  onMount(() => {
    const randomNumber = Math.floor(Math.random() * possibleColors.length);
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const randomX = Math.floor(Math.random() * viewportWidth);
    const randomY = Math.floor(Math.random() * viewportHeight);
    delay = Math.floor(Math.random() * 2000);
    position = { x: randomX, y: randomY };
    currentColor = possibleColors[randomNumber];
  })
</script>
{#if currentColor}
  <div transition:fade={{ delay }} class=heart style="--background-color: {currentColor}; --x: {position.x}px; --y: {position.y}px" />
{/if}
<style>
      .heart {
        background-color: var(--background-color);;
        display: inline-block;
        height: 30px;
        margin: 0 10px;
        position: absolute;
        transform: rotate(-45deg);
        top: var(--y);
        left: var(--x);
        width: 30px;
        margin: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      }

      .heart:before,
      .heart:after {
        content: '';
        background-color: var(--background-color);
        border-radius: 50%;
        height: 30px;
        position: absolute;
        width: 30px;
      }

      .heart:before {
        top: -15px;
        left: 0;
      }

      .heart:after {
        left: 15px;
        top: 0;
      }
</style>
