export function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    window.innerHeight === screen.height
  );
}
