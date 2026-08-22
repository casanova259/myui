type CardProps = {
  index: number;
};

export default function Card({ index }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-number">
          Element {(index + 1).toString().padStart(2, "0")}
        </div>
        <div>
          <div className="card-brand">Codrops</div>
          <div className="card-year">2025</div>
        </div>
      </div>
      <div className="card-footer">Marquee</div>
    </div>
  );
}