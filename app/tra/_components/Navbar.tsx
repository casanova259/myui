import Link from "next/link";
import { CSSProperties } from "react";

const Navbar = () => {
  return (
    <nav
      className="navbar"
      style={{ viewTransitionName: "navbar" } as CSSProperties}
    >
      <div className="navbar-logo">
        <div className="navbar-item">
          <Link href="/">FELT</Link>
        </div>
      </div>
      <div className="navbar-items">
        <div className="navbar-item">
          <Link href="/">Work</Link>
        </div>
        <div className="navbar-item">
          <Link href="/studio">Studio</Link>
        </div>
        <div className="navbar-item">
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;