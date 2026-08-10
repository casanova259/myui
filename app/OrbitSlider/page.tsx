import OrbitSlider from "./OrbitSlider";

const images = Array.from({ length: 10 }, (_, i) => `/orbit/${i + 1}.jpg`);

const titles = [
  "Four Hands",
  "Quiet Interlude",
  "Canopy Spiral",
  "Field of Light",
  "Break in the Storm",
  "Northern Swell",
  "Paper Flight",
  "Crimson Cranes",
  "Between Hands",
  "Last Light",
];

export default function Page() {
  return <OrbitSlider images={images} titles={titles} />;
}