<script lang="ts">
import { onMount } from 'svelte'
import Header from './lib/components/Header.svelte'
import MapView from './lib/components/Map.svelte'
import Panel from './lib/components/Panel.svelte'
import { districts } from './lib/stores/districts'
import { hospitals } from './lib/stores/hospitals'

let _loading = $state(true)

onMount(async () => {
  try {
    await Promise.all([hospitals.load(), districts.load()])
  } finally {
    _loading = false
  }
})
</script>

<div id="app" class="relative flex h-screen w-full flex-col">
  <Header />
  <main class="relative w-full flex-1">
    <MapView />
    <Panel />
  </main>
  {#if _loading}
    <div class="fixed inset-0 z-[1000] flex items-center justify-center bg-white/80">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-primary"></div>
    </div>
  {/if}
</div>
