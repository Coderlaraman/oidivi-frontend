'use client';

import React, { useState } from 'react';
import styles from '../../styles/HoneyCombEffect.module.css';
import clsx from 'clsx';

interface HoneycombEffectProps {
    mode?: 'light' | 'dark'
}

export default function HoneycombEffect({ mode = 'light' }: HoneycombEffectProps) {
    // Estado para la posición del mouse
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Manejador del movimiento del mouse
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        // Calculamos la posición relativa dentro del contenedor
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
    };

    // Definimos cuántas columnas y filas tendrá nuestro "colmenar"
    const columns = 80;
    const rows = 60;
    // Tamaño aproximado de cada hexágono (ajustado para mayor tamaño)
    const hexWidth = 90;
    const hexHeight = 85;

    // Creamos un arreglo con las posiciones de cada hexágono
    const hexPositions = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            // Alternamos la posición en x en filas pares/impares
            const xOffset = row % 2 === 0 ? 0 : hexWidth * 0.5;
            const xPos = col * hexWidth + xOffset;
            // Para la posición en y, cada fila se separa por ~75% del alto
            const yPos = row * (hexHeight * 0.75);
            hexPositions.push({ xPos, yPos });
        }
    }

    return (
        <div
            className={clsx(
                styles.honeycombContainer,
                mode === 'dark' ? styles.darkMode : styles.lightMode
            )}
            onMouseMove={handleMouseMove}
        >
            {hexPositions.map((pos, index) => {
                // Calculamos la distancia desde el mouse al centro del hexágono
                const dx = mousePos.x - (pos.xPos + hexWidth / 2);
                const dy = mousePos.y - (pos.yPos + hexHeight / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Definimos una distancia máxima para el efecto
                const maxDist = 150; // Ajusta según la intensidad que quieras
                // Calculamos una proporción (0 a 1) según la distancia
                const distRatio = dist < maxDist ? (1 - dist / maxDist) : 0;

                // Ajustamos la escala de 1 a 1.3, según la proximidad
                const scale = 1 + 0.5 * distRatio;
                // Ajustamos la sombra 
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
                            className={clsx(
                                styles.shape,
                                mode === 'dark' ? styles.darkHex : styles.lightHex
                            )}
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