<script lang="ts">
import { districts } from '../stores/districts'
import {
  ALL_CATEGORY,
  ALL_RANK,
  currentAdcode,
  currentCategory,
  currentRank,
  searchText,
} from '../stores/filters'
import { hospitals } from '../stores/hospitals'
import type { Hospital } from '../types'

interface SearchResult {
  value: string
  text: string
}

let searchResults = $derived.by<SearchResult[]>(() => {
  const text = $searchText
  const list = $hospitals.list || []

  if (!text) return []

  return list
    .filter((item) => {
      return item.name.includes(text) || String(item.code).includes(text)
    })
    .slice(0, 10)
    .map((item) => ({ value: String(item.code), text: item.name }))
})

function handleSearch(e: Event) {
  searchText.set((e.target as HTMLInputElement).value)
}

function handleSelect(code: string) {
  const item = ($hospitals.list || []).find(
    (h: Hospital) => h.code === Number(code),
  )
  if (item) {
    searchText.set(item.name)
  }
}
</script>

<form class="my-2.5 rounded-md border border-gray-300 bg-white p-2.5">
  <div class="mb-2.5 last:mb-0">
    <label for="district" class="mb-[5px] block text-sm font-medium text-gray-700">地区</label>
    <select
      id="district"
      bind:value={$currentAdcode}
      class="w-full rounded border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {#each $districts.list as district (district.adcode)}
        <option value={district.adcode}>{district.name}</option>
      {/each}
    </select>
  </div>

  <div class="mb-2.5 last:mb-0">
    <label for="rank" class="mb-[5px] block text-sm font-medium text-gray-700">评级</label>
    <select
      id="rank"
      bind:value={$currentRank}
      class="w-full rounded border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {#each ALL_RANK as rank}
        <option value={rank}>{rank}</option>
      {/each}
    </select>
  </div>

  <div class="mb-2.5 last:mb-0">
    <label for="category" class="mb-[5px] block text-sm font-medium text-gray-700">分类</label>
    <select
      id="category"
      bind:value={$currentCategory}
      class="w-full rounded border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      {#each ALL_CATEGORY as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  <div class="mb-2.5 last:mb-0">
    <label for="search" class="mb-[5px] block text-sm font-medium text-gray-700">名称搜索</label>
    <input
      id="search"
      type="text"
      placeholder="搜索医院名称或代码"
      value={$searchText}
      oninput={handleSearch}
      class="w-full rounded border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    />
    {#if searchResults.length > 0}
      <div class="mt-[5px] max-h-[200px] overflow-y-auto rounded border border-gray-300 bg-white" role="listbox">
        {#each searchResults as result (result.value)}
          <div
            class="hover:bg-gray-100 cursor-pointer p-2 text-[13px]"
            role="option"
            aria-selected="false"
            tabindex="0"
            onclick={() => handleSelect(result.value)}
            onkeydown={(e) => e.key === 'Enter' && handleSelect(result.value)}
          >
            {result.text}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</form>
