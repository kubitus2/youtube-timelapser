import {
  YT_CONTROL_DIV_CLASS,
  LEFT_BTN,
  RIGHT_BTN,
  LABEL,
  RESET_BTN,
} from './consts'
import { changeSpeed, obtainRateFromVideo } from './playbackRate'
import { getButton, appendElements, getSpan } from './htmlUtils'

class PlaybackController {
  private controls: HTMLDivElement | null = null
  private label: HTMLSpanElement | null = null
  private addedElements: HTMLElement[] = []
  private rate = 1

  public start() {
    window.addEventListener('yt-navigate-finish', this.onPageLoad.bind(this))
    this.setKeybindings()
  }

  private setKeybindings() {
    const onKeypressed = (e: KeyboardEvent) => {
      if (e.key === 'r') {
        this.clickReset()
      } else if (e.key === ',') {
        this.clickDecrement()
      } else if (e.key === '.') {
        this.clickIncrement()
      }
    }

    document.addEventListener('keyup', onKeypressed.bind(this))
  }

  private setupControlElements(): void {
    this.rate = obtainRateFromVideo()

    const btnLeft = getButton(
      LEFT_BTN,
      '<b><</b>',
      this.clickDecrement.bind(this)
    )
    const btnRight = getButton(
      RIGHT_BTN,
      '<b>></b>',
      this.clickIncrement.bind(this)
    )
    const resetBtn = getButton(
      RESET_BTN,
      '<b>RESET</b>',
      this.clickReset.bind(this)
    )

    const spanResponse = getSpan(LABEL, this.rate.toString())

    this.label = spanResponse.element
    if (!spanResponse.present) {
      this.addedElements = [btnLeft, spanResponse.element, btnRight, resetBtn]
      appendElements(this.addedElements, this.controls!)
    }
  }

  private fetchElements(): number {
    this.controls = document.querySelector(YT_CONTROL_DIV_CLASS)
    if (!this.controls) {
      console.error('Control elements container not found!')
      return -1
    }

    return 0
  }

  private clickDecrement() {
    const newRate = changeSpeed(this.rate - 1)
    this.rate = newRate
    this.updateRate(newRate)
  }

  private clickIncrement() {
    const newRate = changeSpeed(this.rate + 1)
    this.rate = newRate

    this.updateRate(newRate)
  }

  private clickReset() {
    this.rate = 1
    this.updateRate(1)
  }

  private updateRate(newRate: number) {
    const video = document.querySelector('video')

    if (!video) {
      console.error('No video element found')
      return
    }

    video.playbackRate = newRate
    if (!this.label) {
      console.error('Label not found')
      return
    }

    this.label.innerHTML = newRate.toString()
  }

  private onPageLoad(): void {
    console.log('New page loaded')

    if (this.fetchElements() >= 0) {
      this.setupControlElements()
    }
  }
}

const controller = new PlaybackController()
controller.start()
