import { writable } from 'svelte/store'
import { lnglat } from '../utils/geo.js'
import { request } from '../utils/request.js'

function createHospitalStore() {
  const { subscribe, set, update } = writable({
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
        const json = await request.get(
          `${import.meta.env.BASE_URL}data/hospital-with-geo.json`,
        )
        const list = json.map((row) => {
          let [code, name, lng, lat, rank, category] = row
          ;[lng, lat] = lnglat([lng, lat])
          return { code, name, lng, lat, rank, category }
        })
        update((s) => ({ ...s, list, filtered: list }))
      } finally {
        update((s) => ({ ...s, loading: false }))
      }
    },
  }
}

export const hospitals = createHospitalStore()
