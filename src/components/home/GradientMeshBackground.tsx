'use client';

import { useRef, useEffect } from 'react';
import styles from '../../styles/GradientMeshBackground.module.css';

interface GradientMeshBackgroundProps {
  mousePos: { x: number; y: number };
  isDarkMode: boolean;
}

export default function GradientMeshBackground({
  mousePos,
  isDarkMode,
}: GradientMeshBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Definir la función drawGradientMesh ANTES de handleResize
    // Función para dibujar la malla de gradiente
    const drawGradientMesh = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colores para modo claro y oscuro
      const colors = isDarkMode
        ? [
            'rgba(30, 41, 59, 0.8)', // slate-800
            'rgba(15, 23, 42, 0.8)', // slate-900
            'rgba(23, 37, 84, 0.8)', // indigo-900
            'rgba(17, 24, 39, 0.8)', // gray-900
          ]
        : [
            'rgba(241, 245, 249, 0.8)', // slate-100
            'rgba(226, 232, 240, 0.8)', // slate-200
            'rgba(224, 231, 255, 0.8)', // indigo-100
            'rgba(243, 244, 246, 0.8)', // gray-100
          ];

      // Crear puntos de control para la malla
      const gridSize = 6;
      const cellWidth = window.innerWidth / gridSize;
      const cellHeight = window.innerHeight / gridSize;

      // Influencia del mouse en el movimiento de los puntos
      const mouseInfluenceX = mousePos.x * 40 - 20; // -20 a 20
      const mouseInfluenceY = mousePos.y * 40 - 20; // -20 a 20

      // Dibujar cada celda de la malla con gradientes
      for (let x = 0; x <= gridSize; x++) {
        for (let y = 0; y <= gridSize; y++) {
          // Posición base
          const baseX = x * cellWidth;
          const baseY = y * cellHeight;

          // Añadir variación basada en la posición del mouse
          const distFromMouseX = Math.abs(x / gridSize - mousePos.x);
          const distFromMouseY = Math.abs(y / gridSize - mousePos.y);
          const distFactor = Math.sqrt(
            distFromMouseX * distFromMouseX + distFromMouseY * distFromMouseY
          );
          const influence = Math.max(0, 1 - distFactor) * 2;

          // Crear un gradiente radial para cada celda
          const gradient = ctx.createRadialGradient(
            baseX + mouseInfluenceX * influence,
            baseY + mouseInfluenceY * influence,
            0,
            baseX,
            baseY,
            cellWidth * 1.5
          );

          // Asignar colores al gradiente
          const colorIndex = (x + y) % colors.length;
          gradient.addColorStop(0, colors[colorIndex]);
          gradient.addColorStop(1, colors[(colorIndex + 1) % colors.length]);

          // Dibujar la celda
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(baseX, baseY, cellWidth * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Añadir un filtro de desenfoque para suavizar
      ctx.filter = 'blur(80px)';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
    };

    // Ahora definimos handleResize DESPUÉS de drawGradientMesh
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Ahora podemos llamar a drawGradientMesh con seguridad
      drawGradientMesh();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Inicializar el tamaño

    // Animación
    let animationId: number;
    const animate = () => {
      drawGradientMesh();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos, isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.gradientCanvas}
      aria-hidden="true"
    />
  );
}
