import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SkillIcons } from "../assets/data";

const Skills = () => {
  const containerRef = useRef(null);
  const skillContainer = useRef(null);
  const itemsRef = useRef([]);
  const size = 120;

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = itemsRef.current;
    const container = containerRef.current;
    const wrapper = skillContainer.current;

    const viewportCenter = window.innerWidth / 2;

    const firstItemOffset =
      viewportCenter - items[0].offsetLeft - items[0].offsetWidth / 2;

    const lastItemOffset =
      viewportCenter -
      items[items.length - 1].offsetLeft -
      items[items.length - 1].offsetWidth / 2;

    gsap.fromTo(
      wrapper,
      { x: firstItemOffset },
      {
        x: lastItemOffset,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: () => {
            items.forEach((item) => {
              const rect = item.getBoundingClientRect();
              const itemCenter = rect.left + rect.width / 2;
              const distance = Math.abs(viewportCenter - itemCenter);

              const scale = gsap.utils.clamp(
                0.85,
                1.8, // 🔥 bigger center scale
                1.8 - distance / 240, // smoother falloff
              );

              gsap.to(item.querySelector(".icon-wrapper"), {
                scale,
                duration: 0.2,
                overwrite: true,
              });

              gsap.to(item.querySelector(".skill-name"), {
                opacity: scale > 1.15 ? 1 : 0,
                y: scale > 1.15 ? 0 : 10,
                duration: 0.2,
                overwrite: true,
              });
            });
          },
        },
      },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full text-[#e6e6e6] overflow-hidden flex flex-col mt-40"
    >
      <h2 className="uppercase text-center text-6xl font-semibold mt-6">
        Skills
      </h2>

      <div className="flex flex-1 items-center justify-start_">
        <div
          ref={skillContainer}
          className="flex items-center gap-x-[96px] will-change-transform"
        >
          {SkillIcons.map((icon, idx) => {
            const updatedSvg = icon.svg.replace(
              "<svg",
              `<svg width="${size}" height="${size}"`,
            );

            return (
              <div
                key={idx}
                ref={(el) => (itemsRef.current[idx] = el)}
                className="flex flex-col items-center flex-shrink-0 w-[200px]"
              >
                <div className="icon-wrapper">
                  <div dangerouslySetInnerHTML={{ __html: updatedSvg }} />
                </div>

                <span className="skill-name mt-10 text-xl font-bold uppercase tracking-widest opacity-0">
                  {icon.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
