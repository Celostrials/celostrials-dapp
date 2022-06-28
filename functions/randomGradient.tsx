const colors = ["purple", "green", "orange", "blue", "red", "pink"]

const randomIndex = () => {
  const index = Math.floor(Math.random() * 10) % colors.length
  return index
}

const getColorB = (a: any) => {
  let b = colors[randomIndex()]
  do {
    b = colors[randomIndex()]
  } while (b === a)
  return b
}

export const RandomGradient = () => {
  const colorA = colors[randomIndex()]
  const colorB = getColorB(colorA)

  const gradient =
    "linear(to-br, " + colorA + "Alpha.100, " + colorB + "Alpha.100)"
  return gradient
}
