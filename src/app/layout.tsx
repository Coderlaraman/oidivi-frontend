// app/layout.tsx
import React from 'react';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Página de Inicio con Logo y Fondo Interactivo</title>

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
