<script lang="ts">
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import { onMount } from 'svelte'
import { districts } from '../stores/districts'
import { currentAdcode } from '../stores/filters'
import { hospitals } from '../stores/hospitals'
import type { Hospital } from '../types'
import { MAP_CENTER, MAP_STYLE, MAP_ZOOM } from '../utils/constants'

let mapElement = $state<HTMLDivElement>()
let map = $state<mapboxgl.Map>()
let currentItem = $state<Hospital | null>(null)
let popup = $state<mapboxgl.Popup | null>(null)

onMount(() => {
  if (!mapElement) return
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || ''

  map = new mapboxgl.Map({
    container: mapElement,
    style: MAP_STYLE,
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    attributionControl: false,
  })

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
  map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')

  map.on('load', () => {
    addHospitalLayer()
    addDistrictLayer()
  })

  return () => {
    map?.remove()
  }
})

function addHospitalLayer() {
  if (!map) return
  map.addSource('hospitals', {
    type: 'geojson',
    data: getHospitalGeoJSON(),
  })

  map.addLayer({
    id: 'hospital-points',
    type: 'circle',
    source: 'hospitals',
    paint: {
      'circle-color': '#ff0000',
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        5,
        10,
        6,
        18,
        15,
      ],
    },
  })

  map.on('mouseenter', 'hospital-points', (e) => {
    if (!map) return
    map.getCanvas().style.cursor = 'pointer'
    if (e.features && e.features.length > 0) {
      currentItem = { ...(e.features[0].properties as Hospital) }
      showPopup()
    }
  })

  map.on('mouseleave', 'hospital-points', () => {
    if (!map) return
    map.getCanvas().style.cursor = ''
    currentItem = null
    hidePopup()
  })
}

function addDistrictLayer() {
  if (!map) return
  map.addSource('districts', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  })

  map.addLayer({
    id: 'district-fill',
    type: 'fill',
    source: 'districts',
    paint: {
      'fill-color': 'green',
      'fill-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        0.1,
        10,
        0.1,
        18,
        0.05,
      ],
    },
  })

  map.addLayer({
    id: 'district-border',
    type: 'line',
    source: 'districts',
    paint: {
      'line-color': 'purple',
      'line-width': 1,
    },
  })
}

function getHospitalGeoJSON(): GeoJSON.FeatureCollection {
  const list = $hospitals.filtered || []
  return {
    type: 'FeatureCollection',
    features: list.map((item) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [item.lng, item.lat],
      },
      properties: { ...item },
    })),
  }
}

function showPopup() {
  if (!currentItem || !map) return

  if (popup) {
    popup.remove()
  }

  const content = document.createElement('div')
  content.innerHTML = `
      <div style="min-width: 300px; padding: 10px;">
        <h3 style="margin: 0 0 10px 0;">${currentItem.name}</h3>
        <p>代码: ${currentItem.code}</p>
        <p>评级: ${currentItem.rank}</p>
        <p>分类: ${currentItem.category}</p>
      </div>
    `

  popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([currentItem.lng, currentItem.lat])
    .setDOMContent(content)
    .addTo(map)
}

function hidePopup() {
  if (popup) {
    popup.remove()
    popup = null
  }
}

$effect(() => {
  if (map?.getSource('hospitals')) {
    ;(map.getSource('hospitals') as mapboxgl.GeoJSONSource).setData(
      getHospitalGeoJSON(),
    )
  }
})

$effect(() => {
  const district = $districts.list.find((d) => d.adcode === $currentAdcode)
  const polygon = district?.polygon
  if (map?.getSource('districts') && polygon) {
    ;(map.getSource('districts') as mapboxgl.GeoJSONSource).setData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: polygon,
          properties: {},
        },
      ],
    })

    const bbox = turf.bbox(polygon)
    map.fitBounds(bbox as unknown as mapboxgl.LngLatBoundsLike, {
      animate: false,
      padding: { left: 350, bottom: 50, right: 0, top: 0 },
    })
  }
})
</script>

<div bind:this={mapElement} class="map"></div>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
