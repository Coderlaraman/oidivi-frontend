"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "../../styles/DynamicBackground.module.css";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function DynamicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Manejo del tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Inicialización de partículas
  const initParticles = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newParticles: Particle[] = [];
    const particleCount = Math.min(Math.floor(dimensions.width / 25), 100);
    const speedMultiplier = dimensions.width < 768 ? 0.8 : 1.6;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2.5 + 1.5,
        speedX: (Math.random() - 0.5) * speedMultiplier,
        speedY: (Math.random() - 0.5) * speedMultiplier,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    setParticles(newParticles);
  }, [dimensions]);

  // Re-inicializar partículas al cambiar el tamaño de la ventana
  useEffect(() => {
    initParticles();
  }, [initParticles]);

  // Animación de partículas
  useEffect(() => {
    if (particles.length === 0) return;

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;

          if (newX > dimensions.width || newX < 0) {
            p.speedX *= -1;
            newX = p.x + p.speedX;
          }

          if (newY > dimensions.height || newY < 0) {
            p.speedY *= -1;
            newY = p.y + p.speedY;
          }

          if (isHovering) {
            const dx = mousePosition.x - newX;
            const dy = mousePosition.y - newY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              const attractionForce = 0.1;
              newX += (dx / distance) * attractionForce;
              newY += (dy / distance) * attractionForce;
            }
          }

          return { ...p, x: newX, y: newY };
        })
      );
    };

    const animationId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationId);
  }, [particles, mousePosition, isHovering, dimensions]);

  // Manejador de movimiento del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={styles.backgroundContainer}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.gradientOverlay}></div>
      {particles.map((particle, index) => (
        <div
          key={index}
          className={styles.particle}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
      <div className={styles.gridOverlay}></div>
    </div>
  );
}
