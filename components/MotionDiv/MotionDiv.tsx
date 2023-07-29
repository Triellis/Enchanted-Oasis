import { motion } from "framer-motion";

export default function MotionDiv(props: any) {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return <div {...props}></div>;
  } else {
    return <motion.div {...props}></motion.div>;
  }
}
