const MINIMAL_SPEED = 1
const MAXIMAL_SPEED = 15

export const changeSpeed = (newSpeed: number): number => {
  newSpeed = Math.round(newSpeed)
  if (newSpeed < MINIMAL_SPEED) return MINIMAL_SPEED
  else if (newSpeed > MAXIMAL_SPEED) return MAXIMAL_SPEED
  return newSpeed
}

export const incrementRate = (rate: number): number => {
  return changeSpeed(rate + 1)
}

export const decrementRate = (rate: number): number => {
  return changeSpeed(rate - 1)
}
