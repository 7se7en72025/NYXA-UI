import { Asteroid } from "./Asteroid";

const COUNT = 7;

export default function Asteroids() {
  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static list, fixed length and order, never reordered
        <Asteroid key={i} />
      ))}
    </>
  );
}
