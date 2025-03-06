### Especificaciones del Sistema OiDiVi Helper

#### 1️⃣ Usuarios y Roles

- Se identifican dos tipos de usuarios principales:
  - Usuarios comunes: Buscan servicios y contratan helpers.
  - Helpers: Ofrecen sus servicios en la plataforma.
- Todo usuario nuevo registrado debe recibir automáticamente los roles **client** y **helper**.
- Implementación de verificación de identidad mediante correo electrónico, número de teléfono o ambos.
- Ubicación basada en ZIP code, permitiendo a los usuarios y helpers operar en regiones específicas.

#### 2️⃣ Publicación y Contratación de Servicios

- Los usuarios pueden publicar ofertas de servicios detalladas, indicando:
  - Descripción del trabajo a realizar.
  - Ubicación y requisitos específicos.
  - Fecha y presupuesto estimado.
- Los helpers pueden aceptar ofertas y comunicarse con el usuario antes de cerrar un trato.
- Funcionalidad de visibilidad para controlar la privacidad de las ofertas.
- El sistema debe ofrecer una interfaz amigable para la publicación, con validación de datos obligatorios.

#### 3️⃣ Búsqueda y Filtrado Avanzado

- Búsqueda mediante:
  - Texto libre.
  - Filtros avanzados por ubicación (ZIP code), categoría de servicio, calificación y precio.
- Google Maps API para mostrar ubicaciones de helpers cercanos.
- Radio de búsqueda dinámico basado en la distancia entre usuario y helper.
- Soporte para tres idiomas: Inglés, Español y Francés.

#### 4️⃣ Comunicación entre Usuarios

- Sistema de mensajería instantánea con envío de archivos adjuntos.
- Notificaciones push para mensajes nuevos, confirmaciones de servicio y actualizaciones.
- Encriptación de los mensajes para garantizar la privacidad.

#### 5️⃣ Gestión de Pagos y Facturación

- Integración con pasarelas de pago seguras (Stripe, PayPal, etc.).
- Pagos directos desde la plataforma con generación automática de facturas electrónicas.
- Sistema de retención de pagos hasta la confirmación de servicio satisfactorio.
- Soporte para múltiples divisas.

#### 6️⃣ Calificación y Reputación

- Sistema de calificación de 1 a 5 estrellas.
- Reseñas escritas para retroalimentación sobre helpers y clientes.
- Cálculo automático de reputación basado en calificaciones y comentarios obtenidos.

#### 7️⃣ Seguridad y Privacidad

- Protección de datos conforme a normativas internacionales de privacidad (GDPR, CCPA).
- Autenticación robusta con verificación de identidad.
- Verificación manual de perfiles de helpers para evitar fraudes.
- Encriptación de datos sensibles en la base de datos.

#### 8️⃣ Aplicación Web y Móvil

- Plataforma web responsiva con soporte para tres tamaños de dispositivos.
- Aplicación móvil sincronizada con la web en tiempo real.
- Modo offline para revisar información sin conexión.
- Soporte para modo oscuro.
- Paleta de colores: **Rojo, Negro y Blanco**.

#### 9️⃣ API Context

- Archivo `ApiContext.txt` ubicado en la raíz del proyecto.
- Proporciona el contexto necesario para gestionar las llamadas a la API externa.
- Debe documentar los endpoints, métodos HTTP y parámetros necesarios.

#### 🔑 Buenas Prácticas

- Arquitectura modular y escalable.
- UX/UI profesional y eficiente con Framer Motion para animaciones.
- Validaciones estrictas en formularios.
- Traducciones multilingües con i18n.
- Pruebas automatizadas unitarias e integración.
- Monitorización con herramientas de métricas.

#### 📌 Package.json Base

```json
{
  "name": "oidivi-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.7.2",
    "@fortawesome/free-solid-svg-icons": "^6.7.2",
    "@fortawesome/react-fontawesome": "^0.2.2",
    "axios": "^1.8.1",
    "framer-motion": "^12.4.7",
    "next": "15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0",
    "sweetalert2": "^11.17.2",
    "tailwindcss": "^4.0.9"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.2.0",
    "eslint-config-prettier": "^10.0.2",
    "typescript": "^5"
  }
}
```

