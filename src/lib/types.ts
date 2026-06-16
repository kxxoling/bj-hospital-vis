export interface Hospital {
  code: number
  name: string
  lng: number
  lat: number
  rank: string
  category: string
}

export type HospitalRow = [
  code: number,
  name: string,
  lng: number,
  lat: number,
  rank: string,
  category: string,
]

export interface HospitalState {
  list: Hospital[]
  loading: boolean
}

export interface MultiPolygon {
  type: 'MultiPolygon'
  coordinates: number[][][][]
}

export interface District {
  adcode: string
  name: string
  polyline: string
  polygon?: MultiPolygon
  [key: string]: unknown
}

export interface DistrictState {
  list: District[]
  loading: boolean
}
