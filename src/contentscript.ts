import { getButton } from './htmlUtils'
import { incrementRate, decrementRate } from './playbackRate'
import { obtainRate } from './rateManager'

const YT_CONTROL_DIV_CLASS = '.ytp-left-controls'
const LABEL = 'timelapser-label'

let controls: HTMLDivElement | null
let label: HTMLDivElement | null
let rate = 1

window.addEventListener('yt-navigate-finish', () => {
  console.log('New page loaded')

  if (fetchElements() < 0) return

  setupControlElements()
})

const fetchElements = (): number => {
  controls = document.querySelector(YT_CONTROL_DIV_CLASS)
  if (!controls) {
    console.error('Control elements not found!')
    return -1
  }

  return 0
}

const setupControlElements = () => {
  rate = obtainRate()
  const btnLeft = getButton('<b><</b>', clickDecrement)
  const btnRight = getButton('<b>></b>', clickIncrement)
  const resetBtn = getButton('<b>RESET</b>', clickReset)
  label = document.createElement('div')
  label.innerHTML = rate.toString()
  label.id = LABEL
  console.log(label.id)
  controls?.appendChild(btnLeft)
  controls?.appendChild(label)
  controls?.appendChild(btnRight)
  controls?.appendChild(resetBtn)
}

const clickDecrement = () => {
  const newRate = decrementRate(rate)
  rate = newRate
  updateRate(newRate)
}

const clickIncrement = () => {
  const newRate = incrementRate(rate)
  rate = newRate

  updateRate(newRate)
}

const clickReset = () => {
  rate = 1
  updateRate(1)
}

const updateRate = (newRate: number) => {
  const video = document.querySelector('video')
  if (!video) {
    console.error('No video element found')
    return
  }

  video.playbackRate = newRate
  if (!label) {
    console.error('Label not found')
    return
  }

  label.innerHTML = newRate.toString()
}
