import { describe, it, expect } from 'bun:test'
import { getHospitalName } from '../../crawler/util'

describe('crawler util', () => {
  it('getHospitalName', () => {
    let name = '北京大学第三医院、北京大学第三临床医学院'
    let result = getHospitalName(name)
    expect(result).toContain('北京大学第三医院')
    expect(result).toContain('北京大学第三临床医学院')

    name =
      '北京市中关村医院（中国科学院中关村医院）、北京市海淀区老年康复医院、海淀区中关村社区卫生服务中心'
    result = getHospitalName(name)
    expect(result).toContain('北京市中关村医院')
    expect(result).toContain('中国科学院中关村医院')
    expect(result).toContain('北京市海淀区老年康复医院')

    name =
      '北京市海淀区妇幼保健院（北京市海淀区妇幼保健计划生育服务中心、北京市海淀区海淀社区卫生服务中心）'
    result = getHospitalName(name)
    expect(result).toContain('北京市海淀区妇幼保健院')
    expect(result).toContain('北京市海淀区妇幼保健计划生育服务中心')
    expect(result).toContain('北京市海淀区海淀社区卫生服务中心')
  })
})
