# DeviceManager (React + Vite + MUI)

Dashboard simple para visualizar y consultar datos de un **ESP32** con sensores (temperatura y humedad).

- **React 18** (funcional)
- **Vite** (JS)
- **React Router v6**
- **Material UI** con una paleta **blanca con verde muy suave**
- Estructura por páginas, componentes, hooks y servicios
- Buenas prácticas: separación de responsabilidades, hooks para datos, UI desacoplada de llamadas

## Requisitos
- Node.js 18+
- npm 9+

## Variables de entorno
Copiá `.env.example` a `.env` y ajustá la URL base de la API:
```env
VITE_API_BASE_URL=http://localhost:5000/device-manager-api
```

## Scripts
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview  # sirve /dist en http://localhost:3000
```

## Endpoints esperados del backend (ejemplo)
- `GET /sensors/temperature/history?limit=50` -> `[{ timestamp, value }]`
- `GET /sensors/temperature/current` -> `{ timestamp, value }`
- `GET /sensors/humidity/history?limit=50` -> idem
- `GET /sensors/humidity/current` -> idem
- `GET /device/status` -> `{ online, ip, uptime, lastSeen }`
- `GET /health` -> `{ ok: true }`

> Podés cambiar la ruta base de la API con `VITE_API_BASE_URL`.

## Estructura
```
src/
├─ components/
│  ├─ AppHeader.jsx
│  ├─ DeviceStatusCard.jsx
│  └─ SensorPanel.jsx
├─ hooks/
│  ├─ useDeviceStatus.js
│  └─ useSensorData.js
├─ pages/
│  ├─ Dashboard.jsx
│  ├─ Sensors.jsx
│  └─ NotFound.jsx
├─ services/
│  └─ api.js
├─ utils/
│  └─ format.js
├─ App.jsx
├─ main.jsx
├─ index.css
└─ theme.js
```

## Notas de diseño
- Functional components y hooks.
- Listas ordenadas **nuevo → viejo**.
- Botones de acción en cada panel: **Historial** y **Leer ahora** (llaman a la API).
- Tarjeta de **Estado del micro** con botón **Healthcheck**.
