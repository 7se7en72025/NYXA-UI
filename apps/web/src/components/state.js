import { proxy } from "valtio";

const state = proxy({
  activeSection: 0,
  targetSection: 0,
  isMoving: false,
  isHamOpen: false,
});

export default state;

let _camera = null;
let _scrollContainer = null;

export function setCamera(c) { _camera = c; }
export function getCamera() { return _camera; }
export function setScrollContainer(el) { _scrollContainer = el; }
export function getScrollContainer() { return _scrollContainer; }
