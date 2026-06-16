import { writable } from 'svelte/store'
import type { District, DistrictState, MultiPolygon } from '../types'
import { lnglat } from '../utils/geo'
import { request } from '../utils/request'

function createDistrictStore() {
  const { subscribe, set, update } = writable<DistrictState>({
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
        const arr = await request.get<District[]>(
          `${import.meta.env.BASE_URL}data/district.json`,
        )

        for (const item of arr) {
          const { polyline } = item
          const lines = polyline.split('|')

          const toRing = (line: string): number[][] =>
            line.split(';').map((p) => {
              const [rawLng, rawLat] = p.split(',')
              const [lng, lat] = lnglat([rawLng, rawLat])
              return [lng, lat]
            })

          const polygon: MultiPolygon = {
            type: 'MultiPolygon',
            coordinates: lines.map((line) => [toRing(line)]),
          }
          item.polygon = polygon
        }

        update((s) => ({ ...s, list: arr }))
      } finally {
        update((s) => ({ ...s, loading: false }))
      }
    },
  }
}

export const districts = createDistrictStore()
