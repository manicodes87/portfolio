import { motion } from "framer-motion";

export default function Cursor({
  bounds,
}: {
  bounds:
    | {
        left: number;
        width: number;
        opacity: number;
      }
    | undefined;
}) {
  return (
    <motion.li
      layoutId="underline"
      className="absolute z-5 bg-foreground rounded-full top-0 my-2"
      animate={bounds}
      initial={{
        opacity: 0,
      }}
      transition={{
        opacity: { duration: 0.5, ease: "anticipate" },
        type: "spring",
        stiffness: 500,
        damping: 50,
      }}
    />
  );
}
