// app/page.tsx
'use client'

import HoneycombEffect from '../components/home/HoneyCombEffect'
import Navbar from '../components/layout/Navbar'

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Navbar />
      <HoneycombEffect />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1,
          color: '#333'
        }}
      >
        <img
          src="/images/logo.png"
          alt="OIDIVI HELPER Logo"
          style={{ maxWidth: '450px', marginBottom: '1rem' }}
        />
        <h1 className='text-3xl font-bold text-red-500 dark:text-gray-200'>
          {/* Slogan OiDiVi Helper */}
        </h1>
      </div>
    </main>
  )
}
