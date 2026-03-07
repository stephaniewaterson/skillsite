import { Children } from "react";
import { motion } from "framer-motion";
import { useStore } from "../Store/Store";
import { Html } from "@react-three/drei";
import "./Overlay.scss";

const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: "auto",
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: 0 },
};

const isMobile = window.innerWidth <= 767;

function List({ children, openOverlay }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate={openOverlay ? "show" : "hidden"}
    >
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  );
}

export function Overlay() {
  const state = useStore();
  return (
    <>
      <Html>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div className="info">
            <h3>
              <span
                className="accent"
                style={{ fontSize: isMobile ? "2.25rem" : "3rem" }}
              >
                Developer
              </span>
            </h3>

            <h4
              className="accent_2"
              style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
            >
              London
            </h4>
            <div className="icon"></div>
          </div>
        </div>
      </Html>
    </>
  );
}
