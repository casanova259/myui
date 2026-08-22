import MarqueeAlongPath from "./_components/MarqueeAlongPath";
import Card from "./_components/card";

const path =
  "M0 279.3285C207.75 279.3285 458.25 292.0785 458.25 74.5782C458.25 -170.478 -112.5 279.3285 726.75 279.3285H881.25";

export default function Page() {
  return (
    <MarqueeAlongPath path={path} baseVelocity={5} repeat={4}>
      {[...Array(5)].map((_, i) => (
        <Card key={i} index={i} />
      ))}
    </MarqueeAlongPath>
  );
}