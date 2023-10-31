import { changeSpeed } from '../playbackRate'

describe('New rate should check range before returning', () => {
  test('Rate withing range should return the same value', () => {
    expect(changeSpeed(3)).toBe(3)
  })
  test('Rate below range should return 1', () => {
    expect(changeSpeed(-5)).toBe(1)
  })
  test('Rate above range should return max', () => {
    expect(changeSpeed(215)).toBe(15)
  })
})

describe('Rate is modified', () => {
  test('Rate is increased', () => {
    const a = 2
    expect(changeSpeed(a + 1)).toBe(3)
  })
  test('Rate is decreased', () => {
    const a = 2
    expect(changeSpeed(a - 1)).toBe(1)
  })
})
