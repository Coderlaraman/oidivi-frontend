// components/home/DynamicBackground.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from '../../styles/DynamicBackground.module.css'

// Definición del tipo para las partículas
interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number
}

export default function DynamicBackground() {
    const [particles, setParticles] = useState<Particle[]>([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [isHovering, setIsHovering] = useState(false)

    // Inicialización de partículas
    const initParticles = useCallback(() => {
        const newParticles: Particle[] = []
        const particleCount = Math.min(Math.floor(window.innerWidth / 25), 100)

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                // Aumentamos el tamaño de las partículas (antes era 0.5-2.0, ahora es 1.5-4.0)
                size: Math.random() * 2.5 + 1.5,
                // Aumentamos la velocidad de las partículas (antes era -0.25 a 0.25, ahora es -0.8 a 0.8)
                speedX: (Math.random() - 0.5) * 1.6,
                speedY: (Math.random() - 0.5) * 1.6,
                opacity: Math.random() * 0.5 + 0.2
            })
        }

        setParticles(newParticles)
    }, [])

    // Efecto para inicializar partículas y manejar redimensionamiento
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
            initParticles()
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [initParticles])

    // Efecto para animar partículas
    useEffect(() => {
        if (particles.length === 0) return

        const animateParticles = () => {
            setParticles(prevParticles =>
                prevParticles.map(p => {
                    let newX = p.x + p.speedX
                    let newY = p.y + p.speedY

                    // Rebote en los bordes
                    if (newX > window.innerWidth || newX < 0) {
                        p.speedX *= -1
                        newX = p.x + p.speedX
                    }

                    if (newY > window.innerHeight || newY < 0) {
                        p.speedY *= -1
                        newY = p.y + p.speedY
                    }

                    // Atracción al mouse si está sobre el elemento
                    if (isHovering) {
                        const dx = mousePosition.x - newX
                        const dy = mousePosition.y - newY
                        const distance = Math.sqrt(dx * dx + dy * dy)

                        if (distance < 200) {
                            // Aumentamos la fuerza de atracción para mayor interactividad
                            const attractionForce = 0.1
                            newX += (dx / distance) * attractionForce
                            newY += (dy / distance) * attractionForce
                        }
                    }

                    return {
                        ...p,
                        x: newX,
                        y: newY
                    }
                })
            )
        }

        const animationId = requestAnimationFrame(animateParticles)
        return () => cancelAnimationFrame(animationId)
    }, [particles, mousePosition, isHovering])

    // Manejadores de eventos de mouse
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

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
                        opacity: particle.opacity
                    }}
                />
            ))}

            <div className={styles.gridOverlay}></div>
        </div>
    )
}