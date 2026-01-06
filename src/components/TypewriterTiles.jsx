import { useEffect, useState } from "react";

const TypewriterTitles = () => {
  const titles = ["Coder", "Developer", "Technologist"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    let typingSpeed = 120;

    if (isDeleting) typingSpeed = 50;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentTitle.slice(0, prev.length + 1)
      );

      if (!isDeleting && displayedText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  return (
    <div className="inline sm:hidden text-[2em] font-semibold h-[1.2em]">
      {displayedText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypewriterTitles;
