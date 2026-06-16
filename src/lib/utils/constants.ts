import type { StyleSpecification } from 'maplibre-gl'

export const MAP_CENTER: [number, number] = [
  116.42610785602722, 39.91191408461194,
]
export const MAP_ZOOM = 12
export const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
    },
  ],
}

export const NO_NEED_PRE_SELECT: string[] = [
  '中国医学科学院北京协和医院',
  '首都医科大学附属北京同仁医院',
  '首都医科大学宣武医院',
  '首都医科大学附属北京友谊医院',
  '北京大学第一医院',
  '北京大学人民医院',
  '北京大学第三医院',
  '北京积水潭医院',
  '中国中医科学院广安门医院',
  '首都医科大学附属北京朝阳医院',
  '中日友好医院',
  '北京大学首钢医院',
  '首都医科大学附属北京中医医院',
  '首都医科大学附属北京天坛医院',
  '北京世纪坛医院',
  '北京市健宫医院',
  '北京市房山区良乡医院',
  '北京市大兴区人民医院',
  '北京市石景山医院',
]
