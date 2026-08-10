import OrbitSlider from "./OrbitSlider";

const images = Array.from({ length: 10 }, (_, i) => `/orbit/${i + 1}.jpg`);

const titles = [
  "Silent Bloom", "Tin Vessel", "Iris Study", "The Observer", "Soft Static",
  "Blue Descent", "Still Life No.7", "Nape", "Voltage", "Distant Wall",
];

export default function Page() {
  return <OrbitSlider images={images} titles={titles} />;
}