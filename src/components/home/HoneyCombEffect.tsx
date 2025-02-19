// // app/components/home/HoneyCombEffect.tsx
// 'use client';
// import React, { useState } from 'react';
// import styles from '../../styles/HoneyCombEffect.module.css';
// import clsx from 'clsx';

// export default function HoneycombEffect() {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setMousePos({ x, y });
//   };

//   const columns = 80;
//   const rows = 60;
//   const hexWidth = 90;
//   const hexHeight = 85;

//   const hexPositions = [];
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < columns; col++) {
//       const xOffset = row % 2 === 0 ? 0 : hexWidth * 0.5;
//       const xPos = col * hexWidth + xOffset;
//       const yPos = row * (hexHeight * 0.75);
//       hexPositions.push({ xPos, yPos });
//     }
//   }

//   return (
//     <div
//       className={styles.honeycombContainer}
//       onMouseMove={handleMouseMove}
//     >
//       {hexPositions.map((pos, index) => {
//         // Calculamos la distancia del mouse al centro del hexágono
//         const dx = mousePos.x - (pos.xPos + hexWidth / 2);
//         const dy = mousePos.y - (pos.yPos + hexHeight / 2);
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const maxDist = 150; // Distancia máxima para el efecto
//         const distRatio = dist < maxDist ? (1 - dist / maxDist) : 0;
//         const scale = 1 + 0.5 * distRatio;
//         const boxShadow = `0 0 ${15 * distRatio}px rgba(0, 0, 0, 0.4)`;

//         return (
//           <div
//             key={index}
//             className={styles.hex}
//             style={{
//               left: pos.xPos,
//               top: pos.yPos,
//             }}
//           >
//             <div
//               className={clsx(styles.shape, styles.hexShape)}
//               style={{
//                 transform: `scale(${scale})`,
//                 boxShadow: boxShadow,
//               }}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }


'use client';

import React, { useState, useMemo } from 'react';
import styles from '../../styles/HoneyCombEffect.module.css';
import clsx from 'clsx';

// Constantes para la configuración del panal
const COLUMNS = 80;
const ROWS = 60;
const HEX_WIDTH = 90;
const HEX_HEIGHT = 85;
const MAX_DISTANCE = 150;
const SCALE_FACTOR = 0.5;
const SHADOW_INTENSITY = 15;

// Generación de posiciones de hexágonos (fuera del componente para evitar recálculos)
const generateHexPositions = () => {
  const positions = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const xOffset = row % 2 === 0 ? 0 : HEX_WIDTH * 0.5;
      const xPos = col * HEX_WIDTH + xOffset;
      const yPos = row * (HEX_HEIGHT * 0.75);
      positions.push({ xPos, yPos });
    }
  }
  return positions;
};

const hexPositions = generateHexPositions();

// Interfaz para la posición del mouse
interface MousePosition {
  x: number;
  y: number;
}

export default function HoneycombEffect() {
  // Estado para la posición del mouse
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  // Manejador de movimiento del mouse con tipado explícito
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Cálculo memorizado de los hexágonos
  const hexagons = useMemo(() => {
    return hexPositions.map((pos, index) => {
      // Cálculo de la distancia entre el mouse y el centro del hexágono
      const dx = mousePos.x - (pos.xPos + HEX_WIDTH / 2);
      const dy = mousePos.y - (pos.yPos + HEX_HEIGHT / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Cálculo del ratio de distancia y efectos visuales
      const distRatio = dist < MAX_DISTANCE ? (1 - dist / MAX_DISTANCE) : 0;
      const scale = 1 + SCALE_FACTOR * distRatio;
      const boxShadow = `0 0 ${SHADOW_INTENSITY * distRatio}px rgba(0, 0, 0, 0.4)`;

      return (
        <div
          key={index}
          className={styles.hex}
          style={{
            left: `${pos.xPos}px`,
            top: `${pos.yPos}px`,
          }}
        >
          <div
            className={clsx(styles.shape, styles.hexShape)}
            style={{
              transform: `scale(${scale})`,
              boxShadow: boxShadow,
              transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
            }}
          />
        </div>
      );
    });
  }, [mousePos.x, mousePos.y]);

  return (
    <div
      className={styles.honeycombContainer}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {hexagons}
    </div>
  );
}