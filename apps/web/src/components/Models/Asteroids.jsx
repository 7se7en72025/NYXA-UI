import { Asteroid } from "./Asteroid";

const COUNT = 7;

export default function Asteroids() {
  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => (
        <Asteroid key={i} />
      ))}
    </>
  );
}
