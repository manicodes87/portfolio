"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const options: { text: string; link: string }[] = [
  {
    text: "About",
    link: "#about",
  },

  {
    text: "Welcome",
    link: "#welcome",
  },
];

export default function NavBar() {
  const [hash, setHash] = useState<string>("");
  const linkRefs = useRef<HTMLLIElement[]>([] as HTMLLIElement[]);
  const [active, setActive] = useState<HTMLLIElement | null>();
  const parentElement = useRef<HTMLDivElement | null>({} as HTMLDivElement);
  const [bounds, setBounds] = useState<{
    left: number;
    top: number;
  } | null>();

  useEffect(() => {
    (() => setHash(window.location.hash))();
    const onHashChange = () => setHash(window.location.hash);

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const moveUnderline = (ev: React.MouseEvent<HTMLLIElement>) => {
    setActive(ev.currentTarget);
  };

  useEffect(() => {
    if (!parentElement.current || !active) return;
    const left = active.offsetLeft
    const top = active.offsetTop + active.offsetHeight
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBounds({ left, top });
  }, [parentElement, active]);

  useEffect(() => {
    linkRefs.current.forEach((link) => {
      console.log(link.id, hash);
      if (link.id === hash) link.click();
    });
  }, [linkRefs, hash]);

  return (
    <div className="max-h-20 h-[20%]" ref={parentElement}>
      <ul className="relative w-full h-full flex justify-center items-center">
        <motion.div
          layoutId="underline"
          className="absolute z-5 h-1 bg-foreground rounded-full"
          initial={{
            opacity: 0,
            width: active?.getBoundingClientRect().width
          }}
          animate={{
            top: bounds?.top,
            left: bounds?.left,
            width: active?.offsetWidth,
            opacity: 1,
          }}
          transition={{
            opacity: { duration: 1 },
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />

        {options.map((option, index) => (
          <li
            key={option.link + "Key"}
            className="m-5"
            onClick={moveUnderline}
            id={option.link}
            ref={(el) => {
              if (el) linkRefs.current[index] = el;
            }}
          >
            <a href={option.link} className="text-xl font-bold z-10">
              {option.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
