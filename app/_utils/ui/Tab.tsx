import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export default function Tab({
  option,
  setBounds,
  defaultLink,
}: {
  option: {
    text: string;
    link: string;
  };
  setBounds: Dispatch<
    SetStateAction<
      | {
          left: number;
          width: number;
          opacity: number;
          height: number;
        }
      | undefined
    >
  >;
  defaultLink: string;
}) {
  const ref = useRef<HTMLLIElement | null>(null);

  const click = () => {
    if (!ref.current) return;

    const clientBounds = ref.current.getBoundingClientRect();
    setBounds({
      left: ref.current.offsetLeft,
      height: clientBounds.height,
      width: clientBounds.width,
      opacity: 1,
    });
  };

  useEffect(() => {
    if (defaultLink === option.link) click();
  }, [defaultLink]);

  return (
    <li
      ref={ref}
      key={option.link + "Key"}
      className="px-6 py-2 m-2 z-10 mix-blend-difference text-background"
      onClick={click}
      id={option.link}
    >
      <a href={option.link} className="text-xl font-bold">
        {option.text}
      </a>
    </li>
  );
}
