import { proxy } from "valtio";

const state = proxy({
  camera: null,
  scrollContainer: null,
  activeSection: 0,
  targetSection: 0,
  isMoving: false,
  isHamOpen: false,
});

export default state;
