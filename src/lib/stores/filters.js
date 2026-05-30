import { writable } from 'svelte/store'

export const currentAdcode = writable('110000')
export const currentRank = writable('全部')
export const currentCategory = writable('全部')
export const searchText = writable('')

export const ALL_RANK = ['全部', '未评级', '三级', '二级', '一级']
export const ALL_CATEGORY = [
  '全部',
  '对外专科',
  '对外中医',
  '对内',
  '对外综合',
  '社区卫生站',
  '村卫生室',
]

export const NO_NEED_PRE_SELECT_CODE = [
  1110003, 1110001, 4110001, 4110002, 2110003, 2110002, 8110010, 2110001,
  4151001, 5110001, 1110002, 7110001, 1151002, 3110001, 8110002, 4110013,
  11110003, 24110001, 7110004,
]

export const NO_NEED_PRE_SELECT_CODE_MAP = NO_NEED_PRE_SELECT_CODE.reduce(
  (ret, code) => {
    ret[code] = true
    return ret
  },
  {},
)
