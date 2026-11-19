import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const CUBE_FACES = [
  {
    id: "face-1",
    theme: "light",
    tag: "01 / STUDIO",
    title: "MINIMAL OBJECTS",
    subtitle: "Interactive Product Showcase",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "face-2",
    theme: "dark",
    tag: "02 / ARCHIVE",
    title: "DRAG & SCROLL",
    subtitle: "Editorial Grid Exploration",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "face-3",
    theme: "light",
    tag: "03 / SYSTEM",
    title: "SPATIAL UI",
    subtitle: "Motion & WebGL Studies",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "face-4",
    theme: "dark",
    tag: "04 / SELECTED",
    title: "DIGITAL CRAFT",
    subtitle: "Creative Direction & Dev",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
  },
];

export default function App() {
  const mainRef = useRef(null);
  const cubeSectionRef = useRef(null);
  const cubeRef = useRef(null);
  const bgTextTopRef = useRef(null);
  const bgTextBottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth 3D cube rotation + subtle background text parallax on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cubeSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.fromTo(
        cubeRef.current,
        { rotateY: -35, rotateX: -2 },
        { rotateY: 325, rotateX: 2, ease: "none" },
        0
      )
        .fromTo(
          bgTextTopRef.current,
          { xPercent: -8 },
          { xPercent: 8, ease: "none" },
          0
        )
        .fromTo(
          bgTextBottomRef.current,
          { xPercent: 8 },
          { xPercent: -8, ease: "none" },
          0
        );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="page-shell">
      {/* SECTION 1: ABOVE SECTION */}
      <section className="section-above">
        <header className="top-hud">
          <span>PORTFOLIO&apos;26</span>
          <span>DESIGN + DEV</span>
          <span>CONTACT</span>
        </header>

        <div className="above-center">
          <p className="eyebrow">DIGITAL EXPERIENCES &amp; MOTION</p>
          <h1 className="hero-heading">
            CRAFTING INTERACTIVE INTERFACES WITH PRECISION
          </h1>
        </div>

        <div className="scroll-cue">
          <span>SCROLL TO EXPLORE</span>
          <span className="cue-line" />
        </div>
      </section>

      {/* SECTION 2: 3D CUBE + BACKGROUND TYPOGRAPHY */}
      <section ref={cubeSectionRef} className="section-cube-track">
        <div className="cube-sticky-viewport">
          {/* Giant low-contrast background typography */}
          <div className="cube-bg-typography" aria-hidden="true">
            <span ref={bgTextTopRef} className="bg-word">
              ELSEWHERE
            </span>
            <span ref={bgTextBottomRef} className="bg-word">
              PORTFOLIO
            </span>
          </div>

          {/* 3D Perspective Stage */}
          <div className="cube-scene">
            <div ref={cubeRef} className="cube-object">
              {CUBE_FACES.map((face, index) => (
                <article
                  key={face.id}
                  className={`cube-face cube-face--${index + 1} cube-face--${
                    face.theme
                  }`}
                >
                  <div className="face-inner">
                    <span className="face-tag">{face.tag}</span>

                    <div className="face-card">
                      <img
                        src={face.image}
                        alt={face.title}
                        className="face-image"
                        loading="lazy"
                      />
                      <div className="face-card-meta">
                        <h2>{face.title}</h2>
                        <p>{face.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Caption anchored near bottom of cube viewport */}
          <p className="cube-caption">
            FOCUSED ON WEB EXPERIENCE, 3D MOTION &amp; INTERACTIVE DESIGN.
          </p>
        </div>
      </section>

      {/* SECTION 3: BELOW SECTION */}
      <section className="section-below">
        <div className="below-content">
          <p className="eyebrow">NEXT CHAPTER</p>
          <h2 className="below-heading">SELECTED PROJECTS</h2>
          <p className="below-copy">
            A curated archive of creative development, spatial interfaces, and
            bespoke digital builds.
          </p>
        </div>
      </section>
    </main>
  );
}
