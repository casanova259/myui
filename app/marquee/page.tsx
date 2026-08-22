import MarqueeAlongPath from "./_components/MarqueeAlongPath";
import Card from "./_components/card";

const path =
  "M0 186.219C138.5 186.219 305.5 194.719 305.5 49.7188C305.5 -113.652 -75 186.219 484.5 186.219H587.5";

export default function Page() {
  return (
    <MarqueeAlongPath path={path} baseVelocity={5} repeat={4}>
      {[...Array(5)].map((_, i) => (
        <Card key={i} index={i} />
      ))}
    </MarqueeAlongPath>
  );
}