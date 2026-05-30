import { gcj02ToWgs84 } from 'coordtransform'

export function lnglat([lng, lat]) {
  return gcj02ToWgs84(Number(lng), Number(lat))
}
