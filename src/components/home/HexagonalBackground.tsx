'use client';
import React, { useEffect, useState, useCallback } from 'react';
import './HexagonalBackground.css';

interface Hexagon {
    id: number;
    x: number;
    y: number;
    isHovered: boolean;
}

const HexagonalBackground: React.FC = () => {
    const [hexagons, setHexagons] = useState<Hexagon[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Constantes para el tamaño y espaciado de los hexágonos
    const HEX_WIDTH = 110;
    const HEX_HEIGHT = 125;
    const HORIZONTAL_SPACING = HEX_WIDTH;
    const VERTICAL_SPACING = 95;

    const createHexagons = useCallback(() => {
        const newHexagons: Hexagon[] = [];
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculamos cuántos hexágonos necesitamos para cubrir la pantalla
        const cols = Math.ceil(windowWidth / HORIZONTAL_SPACING) + 1;
        const rows = Math.ceil(windowHeight / VERTICAL_SPACING) + 1;

        for (let row = 0; row < rows; row++) {
            const isOddRow = row % 2 === 1;
            const xOffset = isOddRow ? HEX_WIDTH / 2 : 0;

            for (let col = 0; col < cols; col++) {
                newHexagons.push({
                    id: row * cols + col,
                    x: col * HORIZONTAL_SPACING + xOffset,
                    y: row * VERTICAL_SPACING,
                    isHovered: false,
                });
            }
        }

        setHexagons(newHexagons);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        setMousePosition({ x: mouseX, y: mouseY });

        // Actualizar el estado de hover de los hexágonos
        setHexagons((prevHexagons) =>
            prevHexagons.map((hex) => {
                const distance = Math.sqrt(
                    Math.pow(mouseX - (hex.x + HEX_WIDTH / 2), 2) +
                    Math.pow(mouseY - (hex.y + HEX_HEIGHT / 2), 2)
                );
                return {
                    ...hex,
                    isHovered: distance < 120, // Radio de influencia del mouse
                };
            })
        );
    }, []);

    useEffect(() => {
        createHexagons();
        window.addEventListener('resize', createHexagons);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', createHexagons);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [createHexagons, handleMouseMove]);

    return (
        <div className="hexagonal-background fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
            {hexagons.map((hexagon) => (
                <div
                    key={hexagon.id}
                    style={{
                        position: 'absolute',
                        left: `${hexagon.x}px`,
                        top: `${hexagon.y}px`,
                        width: `${HEX_WIDTH}px`,
                        height: `${HEX_HEIGHT}px`,
                        transform: `scale(${hexagon.isHovered ? 1.3 : 1})`,
                        transition: 'transform 0.3s ease-out, background-color 0.3s ease-out',
                    }}
                    className={`hexagon ${Math.random() > 0.7 ? 'animate-pulse' : ''} ${hexagon.isHovered ? 'bg-blue-500/30' : 'bg-white/10'
                        }`}
                />
            ))}
        </div>
    );
};

export default HexagonalBackground;