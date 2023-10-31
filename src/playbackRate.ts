import { MINIMAL_SPEED, MAXIMAL_SPEED } from './consts'

export const changeSpeed = (newSpeed: number): number => {
  return Math.max(MINIMAL_SPEED, Math.min(MAXIMAL_SPEED, Math.round(newSpeed)))
}

export const obtainRateFromVideo = (): number => {
  const video = document.querySelector('video')
  if (!video) {
    console.error('No video element found')
    return 1
  }

  return video.playbackRate | 1
}
