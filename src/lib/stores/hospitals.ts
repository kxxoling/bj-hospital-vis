import { derived, writable } from 'svelte/store'
import type { Hospital, HospitalRow, HospitalState } from '../types'
import { lnglat } from '../utils/geo'
import { request } from '../utils/request'
import { currentCategory, currentRank } from './filters'

function createHospitalStore() {
  const { subscribe, set, update } = writable<HospitalState>({
    list: [],
    loading: false,
  })

  return {
    subscribe,
    set,
    update,
    load: async () => {
      update((s) => ({ ...s, loading: true }))
      try {
        const json = await request.get<HospitalRow[]>(
          `${import.meta.env.BASE_URL}data/hospital-with-geo.json`,
        )
        const list: Hospital[] = json.map((row) => {
          const [code, name, lng, lat, rank, category] = row
          const [wgsLng, wgsLat] = lnglat([lng, lat])
          return { code, name, lng: wgsLng, lat: wgsLat, rank, category }
        })
        update((s) => ({ ...s, list }))
      } finally {
        update((s) => ({ ...s, loading: false }))
      }
    },
  }
}

export const hospitals = createHospitalStore()

export const filteredHospitals = derived(
  [hospitals, currentRank, currentCategory],
  ([$hospitals, $rank, $category]) => {
    let list = $hospitals.list
    if ($rank !== '全部') {
      list = list.filter((item) => item.rank === $rank)
    }
    if ($category !== '全部') {
      list = list.filter((item) => item.category === $category)
    }
    return list
  },
)
