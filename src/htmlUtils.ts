interface LabelResponse {
  present: boolean
  element: HTMLElement
}

export const getButton = (id: string, label: string, func: () => void) => {
  const prevBtn = document.querySelector(`#${id}`)
  if (prevBtn) {
    return prevBtn as HTMLElement
  }
  const btn = document.createElement('button')
  btn.innerHTML = label
  btn.onclick = func
  btn.id = id

  btn.classList.add('button')

  return btn
}

export const getSpan = (id: string, innerText: string): LabelResponse => {
  const prevLabel = document.querySelector(`#${id}`)
  console.log(prevLabel)
  if (prevLabel) {
    return { present: true, element: prevLabel as HTMLElement }
  }
  const span = document.createElement('span')
  span.innerHTML = innerText
  span.id = innerText

  return { present: false, element: span }
}

export const appendElements = (elements: Element[], parent = document.body) => {
  elements.forEach(element => {
    parent.appendChild(element)
  })
}
