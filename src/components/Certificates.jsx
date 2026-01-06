import { useRef, useState } from "react";
import { Certificates } from "../assets/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Certificate = () => {
  const [currentCertificate, setCurrentCertificate] = useState(null);
  const imageRef = useRef(null);
  const certificateContainer = useRef(null);

  const handleMouseEnter = (certificate) => {
    setCurrentCertificate(certificate);
  };

  const handleMouseLeave = () => {
    setCurrentCertificate(null);
  };

  useGSAP(() => {
    if (!currentCertificate) return;
    gsap.to(imageRef.current, {
      x: currentCertificate.x,
      y: currentCertificate.y,
      rotate: currentCertificate.rotate,
      duration: 1,
      opacity: 1,
      ease: "sine.out",
    });
  }, [currentCertificate]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".certificates", {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      scrollTrigger: {
        trigger: certificateContainer.current,
        start: "top 15%",
      },
    });
  }, []);

  return (
    <div
      className="parentContainer relative h-screen w-full flex flex-col mt-40"
      ref={certificateContainer}
      name="certificate"
    >
      {currentCertificate && (
        <img
          ref={imageRef}
          src={currentCertificate.image}
          width="250px"
          className="absolute z-[1] pointer-events-none opacity-0"
          alt={currentCertificate.name}
        />
      )}
      <div className="text-center font-semibold text-6xl heading opacity-100 mt-5">
        Certificates
      </div>
      <div className="h-full flex flex-col justify-center items-center px-60">
        {Certificates.map((certificate, idx) => (
          <div
            key={idx}
            onMouseEnter={() => handleMouseEnter(certificate)}
            onMouseLeave={handleMouseLeave}
            className={`certificates w-full text-center py-7 space-x-10 hover:bg-white/10 hover:backdrop-blur-lg ${
              idx > 0 && "border-t border-white"
            }`}
          >
            <span className="text-5xl text-end">{certificate.name}</span>
            <span className="text-xl font-light text-start">
              {certificate.by}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificate;
