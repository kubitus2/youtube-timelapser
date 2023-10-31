type LabelResponse = {
  present: boolean
  element: HTMLElement
}

/**
 * Creates a button element with the specified ID, label, and click event handler function.
 *
 * @param {string} id - The unique ID for the button element.
 * @param {string} label - The text content of the button.
 * @param {function} func - The function to be executed when the button is clicked.
 * @returns {HTMLElement} The created button element.
 */
export const getButton = (
  id: string,
  label: string,
  func: () => void
): HTMLElement => {
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

/**
 * Creates a span element with the specified ID and inner text content or retrieves an existing span element by ID.
 *
 * @param {string} id - The unique ID for the span element.
 * @param {string} innerText - The text content of the span element.
 * @returns {LabelResponse} An object representing the response with a flag indicating whether the element is already present
 * and the span element itself.
 */

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

/**
 * Appends an array of elements to a specified parent element or the document body by default.
 *
 * @param {Element[]} elements - An array of elements to be appended.
 * @param {HTMLElement} [parent=document.body] - The parent element to which the elements will be appended. Defaults to the document body.
 */
export const appendElements = (
  elements: Element[],
  parent: HTMLElement = document.body
) => {
  elements.forEach(element => {
    parent.appendChild(element)
  })
}
