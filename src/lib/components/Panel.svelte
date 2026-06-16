<script lang="ts">
import { NO_NEED_PRE_SELECT_CODE_MAP } from '../stores/filters'
import { filteredHospitals } from '../stores/hospitals'
import type { Hospital } from '../types'
import FilterForm from './FilterForm.svelte'

let _showPanel = $state(true)

const CATEGORY_SPECIAL = '对外专科'
const CATEGORY_CHINESE = '对外中医'

let filteredList = $derived<Hospital[]>($filteredHospitals || [])
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

<button
  class="hover:bg-gray-100 absolute left-2.5 top-[70px] z-10 cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm"
  onclick={() => (_showPanel = !_showPanel)}
>
  {_showPanel ? '◀' : '▶'}
</button>

{#if _showPanel}
  <div
    class="absolute left-2.5 top-[70px] z-[5] w-80 max-h-[calc(100vh-80px)] overflow-hidden rounded-md border border-gray-300 bg-gray-200/90"
  >
    <div class="max-h-[calc(100vh-80px)] overflow-y-auto p-2.5">
      <h2 class="my-2.5 text-center text-xl font-bold">医院筛选</h2>

      <FilterForm />

      <div class="my-2.5 rounded-md border border-gray-300 bg-white p-2.5">
        <h3 class="mb-2.5 text-base">Info</h3>
        <p class="my-1">当前共 {filteredList.length} 家医院</p>
        <p class="my-1">
          当前共 {noNeedPreSelectList.length + specialList.length + chineseList.length} 家无需定点医院
        </p>

        <div class="my-1.5">
          <details>
            <summary class="hover:bg-gray-200 cursor-pointer rounded-[3px] bg-gray-100 p-[5px]">
              A类 ({noNeedPreSelectList.length})
            </summary>
            <ul
              class="my-[5px] max-h-[200px] list-none overflow-y-auto rounded-[3px] border border-gray-200 bg-white p-[5px]"
            >
              {#each noNeedPreSelectList as item (item.code)}
                <li class="hover:bg-gray-100 px-[5px] py-[3px] text-[13px]">{item.name}</li>
              {/each}
            </ul>
          </details>
        </div>

        <div class="my-1.5">
          <details>
            <summary class="hover:bg-gray-200 cursor-pointer rounded-[3px] bg-gray-100 p-[5px]">
              对外专科 ({specialList.length})
            </summary>
            <ul
              class="my-[5px] max-h-[200px] list-none overflow-y-auto rounded-[3px] border border-gray-200 bg-white p-[5px]"
            >
              {#each specialList as item (item.code)}
                <li class="hover:bg-gray-100 px-[5px] py-[3px] text-[13px]">{item.name}</li>
              {/each}
            </ul>
          </details>
        </div>

        <div class="my-1.5">
          <details>
            <summary class="hover:bg-gray-200 cursor-pointer rounded-[3px] bg-gray-100 p-[5px]">
              对外中医 ({chineseList.length})
            </summary>
            <ul
              class="my-[5px] max-h-[200px] list-none overflow-y-auto rounded-[3px] border border-gray-200 bg-white p-[5px]"
            >
              {#each chineseList as item (item.code)}
                <li class="hover:bg-gray-100 px-[5px] py-[3px] text-[13px]">{item.name}</li>
              {/each}
            </ul>
          </details>
        </div>
      </div>
    </div>
  </div>
{/if}
