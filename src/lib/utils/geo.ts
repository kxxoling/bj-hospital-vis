import { gcj02towgs84 } from 'coordtransform'

export function lnglat([lng, lat]: [number | string, number | string]): [
  number,
  number,
] {
  return gcj02towgs84(Number(lng), Number(lat))
}
