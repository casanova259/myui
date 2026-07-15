'use client';

import { HiArrowRight, HiShoppingCart } from "react-icons/hi";

// Structure-only pass for now — className conversion + JSX-valid tags.
// Styling (styles.css) and the reveal animation (script.js -> GSAP) come next.

export default function TrueKindHero() {
    return (
        <>
            <div className="loader">
                <div className="overlay">
                    <div className="block"></div>
                    <div className="block"></div>
                </div>

                <div className="intro-logo">
                    <div className="word" id="word-1">
                        <h1><span>Kind</span></h1>
                    </div>
                    <div className="word" id="word-2">
                        <h1>Root</h1>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>

                <div className="counter">
                    <div className="count">
                        <div className="digit"><h1>0</h1></div>
                        <div className="digit"><h1>0</h1></div>
                    </div>
                    <div className="count">
                        <div className="digit"><h1>2</h1></div>
                        <div className="digit"><h1>7</h1></div>
                    </div>
                    <div className="count">
                        <div className="digit"><h1>6</h1></div>
                        <div className="digit"><h1>5</h1></div>
                    </div>
                    <div className="count">
                        <div className="digit"><h1>9</h1></div>
                        <div className="digit"><h1>8</h1></div>
                    </div>
                    <div className="count">
                        <div className="digit"><h1>9</h1></div>
                        <div className="digit"><h1>9</h1></div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="hero-img">
                    <img src="/hero-img.jpg" alt="" />
                </div>

                <div className="nav">
                    <div className="logo">
                        <a href="#">KindRoot</a>
                    </div>
                    <div className="nav-links">
                        <a href="#">Rituals</a>
                        <a href="#">Our Roots</a>
                        <a href="#">Lookbook</a>
                        <a href="#">Stories</a>
                    </div>
                    <div className="btn">
                        <a href="#"><HiShoppingCart></HiShoppingCart></a>
                    </div>
                </div>
            </div>

            <div className="header">
                <div className="hero-copy">
                    <div className="line">
                        <h1><span>Rooted</span> in care,</h1>
                    </div>
                    <div className="line">
                        <h1>grown with <span>kindness</span></h1>
                    </div>
                    <div className="line">
                        <p>Skincare that stays true to nature and to you</p>
                    </div>
                </div>

                <div className="cta">
                    <div className="cta-label">
                        <p>View all products</p>
                    </div>
                    <div className="cta-icon">
                        <HiArrowRight></HiArrowRight>
                    </div>
                </div>
            </div>
        </>
    );
}