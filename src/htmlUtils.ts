export const getButton = (label: string, func: () => void) => {
  const btn = document.createElement('button')
  btn.innerHTML = label
  btn.onclick = func

  btn.classList.add('button')

  return btn
}

export const getSpan = (id: string, innerText: string) => {
  const span = document.createElement('span')
  span.innerHTML = innerText
  span.id = innerText

  return span
}

export const appendElements = (elements: Element[], parent = document.body) => {
  elements.forEach(element => {
    parent.appendChild(element)
  })
}
