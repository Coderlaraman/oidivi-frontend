// app/page.tsx
'use client'

import { useState } from 'react'
import HoneycombEffect from '../components/home/HoneyCombEffect'

export default function Home() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <main style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Botón para alternar entre claro/oscuro */}
      <button
        onClick={toggleMode}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 2,
          padding: '0.5rem 1rem',
          backgroundColor: mode === 'light' ? '#333' : '#eee',
          color: mode === 'light' ? '#fff' : '#333',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Cambiar a {mode === 'light' ? 'Oscuro' : 'Claro'}
      </button>

      {/* Componente con el fondo de colmena y efecto 3D */}
      <HoneycombEffect mode={mode} />

      {/* Ejemplo de Logo/Texto en el centro */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 1,
        color: mode === 'light' ? '#333' : '#f2f2f2'
      }}>
        <img
          src="/idivi-helper-logo.png"
          alt="IDIVI HELPER Logo"
          style={{ maxWidth: '200px', marginBottom: '1rem' }}
        />
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>IDIVI HELPER</h1>
      </div>
    </main>
  )
}
