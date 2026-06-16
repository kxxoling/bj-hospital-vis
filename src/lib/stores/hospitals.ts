import { writable } from 'svelte/store'
import type { Hospital, HospitalRow, HospitalState } from '../types'
import { lnglat } from '../utils/geo'
import { request } from '../utils/request'

function createHospitalStore() {
  const { subscribe, set, update } = writable<HospitalState>({
    list: [],
    filtered: [],
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
        update((s) => ({ ...s, list, filtered: list }))
      } finally {
        update((s) => ({ ...s, loading: false }))
      }
    },
  }
}

export const hospitals = createHospitalStore()
