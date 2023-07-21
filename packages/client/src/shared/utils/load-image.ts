export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      resolve(image)
    }
  })
}
