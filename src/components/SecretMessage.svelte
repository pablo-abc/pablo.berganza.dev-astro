<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let mounted = false

  onMount(() => {
    mounted = true
  })
</script>
{#if mounted}
<div transition:fade={{ delay: 2000 }} class="secret-message">
  <img transition:fade={{ delay: 2500 }} src="/assets/codeine-min.png" alt="" />
  <h1>Will you be my valentine?</h1>
  <p transition:fade={{ delay: 3000 }}>(Invitation may be accepted by means of hugs or kisses)</p>
</div>
{/if}

<style>
  .secret-message {
    color: #555;
    font-family: 'Overpass', sans-serif;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 5rem;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .secret-message img {
    max-width: 60%;
  }
</style>
