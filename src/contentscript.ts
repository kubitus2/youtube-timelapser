import { getButton, appendElements, getSpan } from './htmlUtils'
import { incrementRate, decrementRate } from './playbackRate'
import { obtainRate } from './rateManager'

const YT_CONTROL_DIV_CLASS = '.ytp-left-controls'
const LABEL = 'timelapser-label'
const LEFT_BTN = 'left-btn'
const RIGHT_BTN = 'right-btn'
const RESET_BTN = 'reset-btn'

let controls: HTMLDivElement | null
let label: HTMLSpanElement | null
let rate = 1

let addedElements: HTMLElement[] = []

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

  const btnLeft = getButton(LEFT_BTN, '<b><</b>', clickDecrement)
  const btnRight = getButton(RIGHT_BTN, '<b>></b>', clickIncrement)
  const resetBtn = getButton(RESET_BTN, '<b>RESET</b>', clickReset)

  const spanResponse = getSpan(LABEL, rate.toString())

  label = spanResponse.element
  if (!spanResponse.present) {
    console.log(spanResponse.element)
    addedElements = [btnLeft, spanResponse.element, btnRight, resetBtn]
    appendElements(addedElements, controls!)
  }
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
