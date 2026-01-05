"use client";
import { useEffect, useState } from "react";
import Cursor from "@/app/_utils/ui/Cursor";
import Tab from "@/app/_utils/ui/Tab";

const options: { text: string; link: string }[] = [
  {
    text: "About",
    link: "#about",
  },

  {
    text: "Home",
    link: "#home",
  },

  {
    text: "Contact",
    link: "#contact",
  },
];

export default function NavBar() {
  const [hash, setHash] = useState<string>("");
  const [bounds, setBounds] = useState<{
    left: number;
    width: number;
    opacity: number;
    height: number;
  }>();

  useEffect(() => {
    (() => (window.location.hash ? setHash(window.location.hash) : setHash("#home")))();

    const hashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", hashChange);

    return () => window.removeEventListener("hashchange", hashChange);
  }, []);

  return (
    <div className="w-full flex justify-center items-center p-2">
      <ul className="h-full w-fit flex relative border-3 rounded-full">
        <Cursor bounds={bounds} key={"cursor"} />

        {options.map((option, index) => (
          <Tab option={option} key={index} setBounds={setBounds} defaultLink={hash} />
        ))}
      </ul>
    </div>
  );
}
