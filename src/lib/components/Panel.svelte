<script lang="ts">
import { NO_NEED_PRE_SELECT_CODE_MAP } from '../stores/filters'
import { hospitals } from '../stores/hospitals'
import type { Hospital } from '../types'
import FilterForm from './FilterForm.svelte'

let _showPanel = $state(true)

const CATEGORY_SPECIAL = '对外专科'
const CATEGORY_CHINESE = '对外中医'

let filteredList = $derived<Hospital[]>($hospitals.filtered || [])
let noNeedPreSelectList = $derived(
  filteredList.filter((item) => NO_NEED_PRE_SELECT_CODE_MAP[item.code]),
)
let specialList = $derived(
  filteredList.filter((item) => item.category === CATEGORY_SPECIAL),
)
let chineseList = $derived(
  filteredList.filter((item) => item.category === CATEGORY_CHINESE),
)
</script>

<button class="toggle-btn" onclick={() => (_showPanel = !_showPanel)}>
  {_showPanel ? '◀' : '▶'}
</button>

{#if _showPanel}
  <div class="panel">
    <div class="panel-inner">
      <h2 class="title">医院筛选</h2>

      <FilterForm />

      <div class="info-card">
        <h3>Info</h3>
        <p>当前共 {filteredList.length} 家医院</p>
        <p>
          当前共 {noNeedPreSelectList.length + specialList.length + chineseList.length} 家无需定点医院
        </p>

        <div class="dropdown-section">
          <details>
            <summary>A类 ({noNeedPreSelectList.length})</summary>
            <ul>
              {#each noNeedPreSelectList as item (item.code)}
                <li>{item.name}</li>
              {/each}
            </ul>
          </details>
        </div>

        <div class="dropdown-section">
          <details>
            <summary>对外专科 ({specialList.length})</summary>
            <ul>
              {#each specialList as item (item.code)}
                <li>{item.name}</li>
              {/each}
            </ul>
          </details>
        </div>

        <div class="dropdown-section">
          <details>
            <summary>对外中医 ({chineseList.length})</summary>
            <ul>
              {#each chineseList as item (item.code)}
                <li>{item.name}</li>
              {/each}
            </ul>
          </details>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .toggle-btn {
    position: absolute;
    left: 10px;
    top: 70px;
    z-index: 10;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
  }

  .toggle-btn:hover {
    background: #f0f0f0;
  }

  .panel {
    position: absolute;
    left: 10px;
    top: 70px;
    width: 320px;
    max-height: calc(100vh - 80px);
    background: rgba(238, 238, 238, 0.9);
    border-radius: 5px;
    border: 1px solid #ccc;
    z-index: 5;
    overflow: hidden;
  }

  .panel-inner {
    max-height: calc(100vh - 80px);
    overflow-y: auto;
    padding: 10px;
  }

  .title {
    text-align: center;
    margin: 10px 0;
    font-size: 20px;
    font-weight: bold;
  }

  .info-card {
    margin: 10px 0;
    padding: 10px;
    background: white;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .info-card h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
  }

  .info-card p {
    margin: 5px 0;
  }

  .dropdown-section {
    margin: 5px 0;
  }

  details summary {
    cursor: pointer;
    padding: 5px;
    background: #f5f5f5;
    border-radius: 3px;
  }

  details summary:hover {
    background: #e8e8e8;
  }

  ul {
    list-style: none;
    padding: 5px;
    margin: 5px 0;
    max-height: 200px;
    overflow-y: auto;
    background: white;
    border: 1px solid #eee;
    border-radius: 3px;
  }

  li {
    padding: 3px 5px;
    font-size: 13px;
  }

  li:hover {
    background: #f0f0f0;
  }
</style>
