import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    img: "/images/2.png",
    title: "LocalLingo",
    desc: "Language learning platform with country-based matching, multi-language chat, and Spanish, Arabic, and Malay support.",
    tags: ["React", "Node.js", "MySQL"],
    link: "https://locallingo.netlify.app/",
    featured: true,
  },
  {
    img: "/images/4.png",
    title: "3D Racing Game",
    tags: ["Three.js", "WebGL", "R3F"],
    link: "https://spaceflight.netlify.app/",
  },
  {
    img: "/images/2.png",
    title: "This Portfolio",
    tags: ["R3F", "Drei", "React Spring"],
    link: "#",
  },
];

export function Items() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Html
      position={[0, isMobile ? 6 : 0, 0]}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "8vh",
        padding: "8vh 8vw 5rem",
        pointerEvents: "none",
        left: isMobile ? "-30vw" : "0",
        boxSizing: "border-box",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? "100%" : "55vw",
          pointerEvents: "all",
        }}
      >
        <h2
          style={{
            fontFamily: "'Dela Gothic One', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "#f0f0f0",
            marginBottom: "0.75rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Projects
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "1rem" : "2rem",
            alignItems: "stretch",
            marginTop: "1.5rem",
          }}
        >
          <div
            style={{
              flex: isMobile ? "unset" : "1.4",
              width: isMobile ? "100%" : "auto",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(232,69,60,0.25)",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() =>
              window.open(featured.link, "_blank", "noopener,noreferrer")
            }
          >
            <img
              src={featured.img}
              alt={featured.title}
              style={{
                width: "100%",
                height: isMobile ? "140px" : "200px",
                objectFit: "cover",
                display: "block",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            />

            <div style={{ padding: isMobile ? "1rem" : "1.5rem" }}>
              <h3
                style={{
                  fontFamily: "'Dela Gothic One', sans-serif",
                  fontSize: isMobile ? "1.1rem" : "1.4rem",
                  color: "#f0f0f0",
                  marginBottom: "0.6rem",
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  fontSize: isMobile ? "0.8rem" : "0.85rem",
                  color: "#888",
                  lineHeight: "1.7",
                  marginBottom: "1rem",
                }}
              >
                {featured.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  flexWrap: "wrap",
                  marginBottom: "1.2rem",
                }}
              >
                {featured.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "4px",
                      background: "rgba(232,69,60,0.12)",
                      color: "#e8453c",
                      border: "1px solid rgba(232,69,60,0.25)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(featured.link, "_blank", "noopener,noreferrer");
                }}
                style={{
                  padding: "0.5rem 1.2rem",
                  border: "1px solid #e8453c",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "#e8453c",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                View project →
              </button>
            </div>
          </div>

          <div
            style={{
              flex: isMobile ? "unset" : "1",
              width: isMobile ? "100%" : "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            {rest.map((project, i) => (
              <div
                key={i}
                onClick={() =>
                  project.link !== "#" &&
                  window.open(project.link, "_blank", "noopener,noreferrer")
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: isMobile ? "0.9rem 1rem" : "1rem 1.2rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  cursor: project.link !== "#" ? "pointer" : "default",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#f0f0f0",
                      marginBottom: "0.2rem",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {project.title}
                  </div>

                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#666",
                    }}
                  >
                    {project.tags.join(" · ")}
                  </div>
                </div>

                <span
                  style={{
                    marginLeft: "auto",
                    color: "#555",
                    fontSize: "1rem",
                  }}
                >
                  →
                </span>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: isMobile ? "0.9rem 1rem" : "1rem 1.2rem",
                border: "1px dashed rgba(255,255,255,0.08)",
                borderRadius: "12px",
                opacity: 0.4,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                +
              </div>

              <div style={{ fontSize: "0.85rem", color: "#555" }}>
                More coming soon
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Html>
  );
}
