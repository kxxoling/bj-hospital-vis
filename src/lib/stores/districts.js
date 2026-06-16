import { writable } from 'svelte/store'
import { lnglat } from '../utils/geo.js'
import { request } from '../utils/request.js'

function createDistrictStore() {
  const { subscribe, set, update } = writable({
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
        const arr = await request.get(
          `${import.meta.env.BASE_URL}data/district.json`,
        )

        for (const item of arr) {
          const { polyline } = item
          const lines = polyline.split('|')

          const toPolygon = (line) => [
            line.split(';').map((p) => {
              let [lng, lat] = p.split(',')
              ;[lng, lat] = lnglat([lng, lat])
              return [lng, lat]
            }),
          ]

          item.polygon = {
            type: 'MultiPolygon',
            coordinates: [...lines.map(toPolygon)],
          }
        }

        update((s) => ({ ...s, list: arr }))
      } finally {
        update((s) => ({ ...s, loading: false }))
      }
    },
  }
}

export const districts = createDistrictStore()
