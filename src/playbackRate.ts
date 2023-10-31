import { MINIMAL_SPEED, MAXIMAL_SPEED } from './consts'

export const changeSpeed = (newSpeed: number): number => {
  newSpeed = Math.round(newSpeed)
  if (newSpeed < MINIMAL_SPEED) return MINIMAL_SPEED
  else if (newSpeed > MAXIMAL_SPEED) return MAXIMAL_SPEED
  return newSpeed
}

export const obtainRateFromVideo = (): number => {
  const video = document.querySelector('video')
  if (!video) {
    console.error('No video element found')
    return 1
  }

  return video.playbackRate | 1
}
