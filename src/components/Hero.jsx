// import gsap from "gsap";
import { useRef, useState } from "react";
import { Link } from "react-scroll";
import TypewriterTitles from "./TypewriterTiles";
import gsap from "gsap";

const NavLinkStyle =
  "w-fit text-end text-transparent hover:text-[rgb(245,245,245)] uppercase";

const NavLinks = ["about", "projects", "skills", "certificate", "contact"];

const Hero = () => {
  const audioRefs = useRef([
    new Audio("/audio/track1.mp3"),
    new Audio("/audio/track2.mp3"),
    new Audio("/audio/track3.mp3"),
    new Audio("/audio/track4.mp3"),
    new Audio("/audio/track5.mp3"),
  ]);
  const [image, setImage] = useState(null);
  const heroImage = useRef(null);
  const heroContainer = useRef(null);

  const handleMouseMove = (e) => {
    if (heroImage.current) {
      if (
        e.clientX < 100 ||
        e.clientX > window.innerWidth - 290 ||
        e.clientY < 100 ||
        e.clientY > window.innerHeight - 50
      ) {
        gsap.to(heroImage.current, {
          x: e.clientX - 100,
          y: e.clientY - 100,
          duration: 0,
          opacity: 0,
        });
      } else {
        gsap.to(heroImage.current, {
          x: e.clientX - 100,
          y: e.clientY - 100,
          duration: 1,
          opacity: 1,
        });
      }
    }
  };

  const playAudio = (index) => {
    audioRefs.current[index].play();
  };

  const stopAudio = (index) => {
    const audio = audioRefs.current[index];
    audio.pause();
    audio.currentTime = 0;
  };

  const handleMouseEnter = (i) => {
    setImage(`/images/image${i}.jpg`);
    playAudio(i);
  };

  return (
    <div
      name="hero"
      className="h-screen w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-end bg-black pl-0 sm:pl-5 md:pl-10 lg:pl-20 py-20 gap-y-20 sm:gap-y-0 sm:py-0 overflow-hidden lg:pt-0"
      ref={heroContainer}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={() => setImage(null)}
    >
      <div className="w-[100%] sm:w-fit h-fit sm:h-screen flex flex-col-reverse sm:flex-col justify-center sm:justify-around gap-y-3 lg:gap-y-5 z-[1] pl-5 lg:pl-10 sm:pl-0">
        <div className="hidden sm:inline text-[1.5em] sm:text-[2em] md:text-[2.5em] lg:text-[3em]">
          coder,
          <br />
          developer,
          <br />
          <span>Technologist:</span>
        </div>
        <div className="inline sm:hidden">
          <TypewriterTitles />
        </div>
        <div className="text-[3em] sm:text-[2em] md:text-[2.5em] lg:text-[3em] font-semibold uppercase leading-tight lg:leading-normal">
          Chaman
          <br />
          Chaudhary
        </div>
      </div>
      <nav className="h-[100%] sm:h-fit flex flex-col items-end gap-y-5 rotate-90 text-[3.5rem] md:text-[5rem] lg:text-8xl leading-none font-semibold z-[1]">
        {NavLinks.slice()
          .reverse()
          .map((link, idx) => (
            <Link
              key={idx}
              smooth={true}
              to={link}
              duration={400}
              style={{ WebkitTextStroke: "2px rgb(245,245,245)" }}
              className={NavLinkStyle}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => stopAudio(idx)}
            >
              {link}
            </Link>
          ))}
      </nav>
      {image && (
        <img
          ref={heroImage}
          src={image}
          className="absolute w-[24rem] top-0 left-0 z-0 opacity-0"
        ></img>
      )}
    </div>
  );
};

export default Hero;
