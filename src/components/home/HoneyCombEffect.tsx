// app/components/home/HoneyCombEffect.tsx
'use client';
import React, { useState } from 'react';
import styles from '../../styles/HoneyCombEffect.module.css';
import clsx from 'clsx';

export default function HoneycombEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const columns = 80;
  const rows = 60;
  const hexWidth = 90;
  const hexHeight = 85;

  const hexPositions = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const xOffset = row % 2 === 0 ? 0 : hexWidth * 0.5;
      const xPos = col * hexWidth + xOffset;
      const yPos = row * (hexHeight * 0.75);
      hexPositions.push({ xPos, yPos });
    }
  }

  return (
    <div
      className={styles.honeycombContainer}
      onMouseMove={handleMouseMove}
    >
      {hexPositions.map((pos, index) => {
        // Calculamos la distancia del mouse al centro del hexágono
        const dx = mousePos.x - (pos.xPos + hexWidth / 2);
        const dy = mousePos.y - (pos.yPos + hexHeight / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150; // Distancia máxima para el efecto
        const distRatio = dist < maxDist ? (1 - dist / maxDist) : 0;
        const scale = 1 + 0.5 * distRatio;
        const boxShadow = `0 0 ${15 * distRatio}px rgba(0, 0, 0, 0.4)`;

        return (
          <div
            key={index}
            className={styles.hex}
            style={{
              left: pos.xPos,
              top: pos.yPos,
            }}
          >
            <div
              className={clsx(styles.shape, styles.hexShape)}
              style={{
                transform: `scale(${scale})`,
                boxShadow: boxShadow,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
