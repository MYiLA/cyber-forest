export const getCursorPosition = (
  canvas: HTMLCanvasElement,
  event: React.MouseEvent<HTMLCanvasElement>
) => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  return {
    x,
    y,
  }
}
