import { motion } from "framer-motion";
import { Html } from "@react-three/drei";
import "./Interface.css";
import { useEffect, useState } from "react";

const Section = ({ children }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.2,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const skills = [
  { title: "React / React Native", level: 80 },
  { title: "Nodejs", level: 75 },
  { title: "Threejs / React Three Fiber", level: 50 },
  { title: "Typescript", level: 40 },
  { title: "Python", level: 70 },
];

const languages = [
  { title: "🇬🇧 English", level: 100 },
  { title: "🇪🇸 Spanish", level: 85 },
  { title: "🇱🇧 Arabic", level: 25 },
];

export const Interface = () => {
  return (
    <div className="interface">
      <SkillsSection />
    </div>
  );
};

export const SkillsSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Html
      className="skills"
      position={[0, isMobile ? 2 : 0, 0]}
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: isMobile ? "0 6vw" : "0 8vw",

        width: "100vw",
        overflowY: isMobile ? "auto" : "visible",
        pointerEvents: "none",
      }}
    >
      <Section className="skills__section">
        <motion.div
          className="skills__div"
          whileInView="visible"
          animate={{ display: "flex" }}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "2rem" : "8vw",
            alignItems: "flex-start",
            width: isMobile ? "100%" : "90vw",
            pointerEvents: "none",
          }}
        >
          <div
            className="skills__box1"
            style={{ width: isMobile ? "100%" : "auto" }}
          >
            <h2 className="skills__title">Skills</h2>

            <div>
              {skills.map((skill, index) => (
                <div className="skills__name" key={index}>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                  >
                    {skill.title}
                    <span className="skills__percent">{skill.level}%</span>
                  </motion.h3>

                  <div className="skills__bar">
                    <motion.div
                      className="skills__progress"
                      style={{ width: `${skill.level}%` }}
                      initial={{ scaleX: 0, originX: 0 }}
                      variants={{
                        visible: {
                          scaleX: 1,
                          transition: {
                            duration: 1,
                            delay: 1 + index * 0.2,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="other">
              Also: MySQL · REST APIs · Agile · OAuth · GitHub · Salsa Dancing
              💃
            </p>
          </div>

          <div
            className="skills_box2"
            style={{ width: isMobile ? "100%" : "auto" }}
          >
            <h2 className="skills__title">Languages</h2>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                gap: isMobile ? "0.5rem" : "1.2rem",
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              {languages.map((lng, index) => (
                <div
                  className="lang__pill"
                  key={index}
                  style={
                    isMobile
                      ? {
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.5rem 0.8rem",
                          minWidth: "auto",
                          flex: "1",
                          gap: "0.2rem",
                        }
                      : {}
                  }
                >
                  <motion.span
                    className="lang__name"
                    style={isMobile ? { fontSize: "0.8rem" } : {}}
                    initial={{ opacity: 0 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: { duration: 1, delay: 2 + index * 0.2 },
                      },
                    }}
                  >
                    {lng.title}
                  </motion.span>
                  <motion.span
                    className="lang__level"
                    style={isMobile ? { fontSize: "0.65rem" } : {}}
                    initial={{ opacity: 0 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: { duration: 1, delay: 2 + index * 0.2 },
                      },
                    }}
                  >
                    {lng.level === 100
                      ? "Native"
                      : lng.level >= 80
                      ? "Fluent"
                      : "Conversational"}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>
    </Html>
  );
};
