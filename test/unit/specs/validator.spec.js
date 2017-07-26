import Validator from '@/idCardValidator'
import areaNumber from '@/areaNumber'

const v = new Validator(areaNumber)

describe('basicFormat', () => {
  it('字符串验证', () => {
    expect(v.basicFormat(110105197109235829))
      .to.equal(false)
    expect(v.basicFormat('110105197109235829'))
      .to.equal(true)
  })

  it('18位验证', () => {
    expect(v.basicFormat('110105197109235829'))
      .to.equal(true)
    expect(v.basicFormat('11010519710923582'))
      .to.equal(false)
  })

  it('15位验证', () => {
    expect(v.basicFormat('320311770706001'))
      .to.equal(true)
    expect(v.basicFormat('32031177070600'))
      .to.equal(false)
  })
})

describe('id18Format', () => {
  it('18位格式验证', () => {
    expect(v.id18Format('110105197109235829'))
      .to.equal(true)
    expect(v.id18Format('11010519710923582x'))
      .to.equal(false)
  })
})

describe('id15Format', () => {
  it('18位格式验证', () => {
    expect(v.id15Format('32031177070600'))
      .to.equal(true)
    expect(v.id15Format('3203117707060e'))
      .to.equal(false)
  })
})

describe('validateArea', () => {
  it('地区码验证', () => {
    expect(v.validateArea('32031177070600', v.areaNumber))
      .to.equal(true)
    expect(v.validateArea('12031177070600', v.areaNumber))
      .to.equal(false)
  })
})

describe('validateBirth', () => {
  it('生日验证', () => {
    expect(v.validateBirth('32031177070600'))
      .to.equal(true)
    expect(v.validateBirth('12031177220600'))
      .to.equal(false)
  })
})

describe('validateBit', () => {
  it('校验码验证', () => {
    expect(v.validateBit('110105197109235829'))
      .to.equal(true)
    expect(v.validateBit('110105197109235821'))
      .to.equal(false)
  })
})

describe('weight', () => {
  it('weight', () => {
    expect(v.weight(3))
      .to.exist
  })
})

describe('info', () => {
  it('身份证号包含的信息', () => {
    v.validate('130503670401001')
    expect(v.info.address)
      .to.equal('桥西区')
  })
})
