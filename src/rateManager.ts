const STORAGE_KEY = 'timelapser.rate'

export const obtainRate = (): number => {
  const video = document.querySelector('video')
  if (!video) {
    console.error('No video element found')
    return 1
  }

  return video.playbackRate | 1
}

export const saveRateToStorage = (rate: number) => {
  sessionStorage.setItem(STORAGE_KEY, rate.toString())
}

export const loadRateFromStorage = (): number => {
  try {
    const storageValue = sessionStorage.getItem(STORAGE_KEY)

    if (!storageValue) {
      console.log('No previous rate value stored. Putting default.')
      return 1
    }

    const rate = Number.parseInt(storageValue)
    return rate
  } catch (error) {
    console.error(error)
    return 1
  }
}
