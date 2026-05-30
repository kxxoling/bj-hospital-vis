<script>
import { onMount } from 'svelte'
import Header from './lib/components/Header.svelte'
import MapView from './lib/components/Map.svelte'
import Panel from './lib/components/Panel.svelte'
import { districts } from './lib/stores/districts.js'
import { hospitals } from './lib/stores/hospitals.js'

let _loading = $state(true)

onMount(async () => {
  try {
    await Promise.all([hospitals.load(), districts.load()])
  } finally {
    _loading = false
  }
})
</script>

<div id="app">
  <Header />
  <main>
    <MapView />
    <Panel />
  </main>
  {#if _loading}
    <div class="loading-mask">
      <div class="loading-spinner"></div>
    </div>
  {/if}
</div>

<style>
  #app {
    position: relative;
    width: 100%;
    height: 100vh;
  }

  main {
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);
  }

  .loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
