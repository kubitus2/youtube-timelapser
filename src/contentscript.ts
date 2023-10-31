import {
  YT_CONTROL_DIV_CLASS,
  LEFT_BTN,
  RIGHT_BTN,
  LABEL,
  RESET_BTN,
} from './consts'
import {
  incrementRate,
  decrementRate,
  obtainRateFromVideo,
} from './playbackRate'
import { getButton, appendElements, getSpan } from './htmlUtils'

class PlaybackController {
  private controls: HTMLDivElement | null = null
  private label: HTMLSpanElement | null = null
  private addedElements: HTMLElement[] = []
  private rate = 1

  public start() {
    window.addEventListener('yt-navigate-finish', this.onPageLoad.bind(this))
  }

  /*private onRPressed = (e: KeyboardEvent) => {
    if (e.key === 'r' && e.key === 'r') {
      console.log('r')
      this.clickReset()
    }
  }*/

  private setupControlElements(): void {
    this.clearControlElements()
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

    //document.addEventListener('keyup', this.onRPressed.bind(this))

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
      console.error('Control elements not found!')
      return -1
    }

    return 0
  }

  private clickDecrement() {
    const newRate = decrementRate(this.rate)
    this.rate = newRate
    this.updateRate(newRate)
  }

  private clickIncrement() {
    const newRate = incrementRate(this.rate)
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

  private clearControlElements(): void {
    this.addedElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    })
    this.addedElements = []
  }
}

const controller = new PlaybackController()
controller.start()
