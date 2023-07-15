export type Options = {
  clear?: (params: Params) => void
  update: (params: Params) => void
  render: (params: Params) => void
}

export type Params = {
  timestamp: number
  pTimeStamp: number
  diff: number
  fps: number
  secondPart: number
  stopAnimation: () => void
}

export const animate = (options: Options) => {
  const { clear, update, render } = options
  let pTimeStamp = 0
  let isPlaying = true

  requestAnimationFrame(tick)

  const stopAnimation = () => {
    isPlaying = false
  }

  function tick(timestamp: number) {
    if (isPlaying) {
      requestAnimationFrame(tick)
    }

    const diff = timestamp - pTimeStamp
    pTimeStamp = timestamp
    const fps = 1000 / diff
    const secondPart = diff / 1000
    const params = {
      timestamp,
      pTimeStamp,
      diff,
      fps,
      secondPart,
      stopAnimation,
    }

    update(params)
    clear?.(params)
    render(params)
  }
}
