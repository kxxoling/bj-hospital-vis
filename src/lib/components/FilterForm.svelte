<script>
import { districts } from '../stores/districts.js'
import {
  ALL_CATEGORY,
  ALL_RANK,
  currentAdcode,
  currentCategory,
  currentRank,
  searchText,
} from '../stores/filters.js'
import { hospitals } from '../stores/hospitals.js'

let searchResults = $derived.by(() => {
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

function handleSearch(e) {
  searchText.set(e.target.value)
}

function handleSelect(code) {
  const item = ($hospitals.list || []).find((h) => h.code === Number(code))
  if (item) {
    searchText.set(item.name)
  }
}

$effect(() => {
  const list = $hospitals.list || []
  const rank = $currentRank
  const category = $currentCategory

  let filtered = list

  if (rank !== '全部') {
    filtered = filtered.filter((item) => item.rank === rank)
  }

  if (category !== '全部') {
    filtered = filtered.filter((item) => item.category === category)
  }

  hospitals.update((s) => ({ ...s, filtered }))
})
</script>

<form class="filter-form">
  <div class="form-item">
    <label for="district">地区</label>
    <select id="district" bind:value={$currentAdcode}>
      {#each $districts.list as district (district.adcode)}
        <option value={district.adcode}>{district.name}</option>
      {/each}
    </select>
  </div>

  <div class="form-item">
    <label for="rank">评级</label>
    <select id="rank" bind:value={$currentRank}>
      {#each ALL_RANK as rank}
        <option value={rank}>{rank}</option>
      {/each}
    </select>
  </div>

  <div class="form-item">
    <label for="category">分类</label>
    <select id="category" bind:value={$currentCategory}>
      {#each ALL_CATEGORY as cat}
        <option value={cat}>{cat}</option>
      {/each}
    </select>
  </div>

  <div class="form-item">
    <label for="search">名称搜索</label>
    <input
      id="search"
      type="text"
      placeholder="搜索医院名称或代码"
      value={$searchText}
      oninput={handleSearch}
    />
    {#if searchResults.length > 0}
      <div class="search-results" role="listbox">
        {#each searchResults as result (result.value)}
          <div
            class="search-item"
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

<style>
  .filter-form {
    margin: 10px 0;
    padding: 10px;
    background: white;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .form-item {
    margin-bottom: 10px;
  }

  .form-item:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  select,
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  select:focus,
  input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .search-results {
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    background: white;
  }

  .search-item {
    padding: 8px;
    cursor: pointer;
    font-size: 13px;
  }

  .search-item:hover {
    background: #f0f0f0;
  }
</style>
