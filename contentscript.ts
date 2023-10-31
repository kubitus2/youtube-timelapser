window.addEventListener('yt-navigate-finish', () => {
  console.log('new page loaded')

  const controls = document.querySelector('.ytp-left-controls')
  console.table(controls)

  const btnLeft = getButton('<b><</b>')
  const btnRight = getButton('<b>></b>')
  controls?.appendChild(btnLeft)
  controls?.appendChild(document.createTextNode('abc'))
  controls?.appendChild(btnRight)
})

const getButton = (innerHtml: string): HTMLButtonElement => {
  const btn = document.createElement('button')
  btn.innerHTML = innerHtml
  btn.onclick = clickBtn
  btn.classList.add('button')

  return btn
}

const clickBtn = () => {
  alert('clicked')
}
