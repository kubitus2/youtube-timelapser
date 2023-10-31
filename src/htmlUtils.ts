export const getButton = (label: string, func: () => void) => {
  const btn = document.createElement('button')
  btn.innerHTML = label
  btn.onclick = func

  btn.classList.add('button')

  return btn
}
