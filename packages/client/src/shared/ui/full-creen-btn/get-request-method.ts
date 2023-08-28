/* eslint-disable */
export const getRequestMethod = () =>
  document.documentElement.requestFullscreen ||
  // @ts-ignore
  document.documentElement.webkitRequestFullscreen ||
  // @ts-ignore
  document.documentElement.webkitRequestFullScreen ||
  // @ts-ignore
  document.documentElement.mozRequestFullScreen ||
  // @ts-ignore
  document.documentElement.msRequestFullscreen;
