const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/device-manager-api'

async function fetchJson(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.status === 204 ? null : res.json()
}

// Historia de medidas
export async function getSensorHistory(sensorType) {
  // GET /sensors/:sensorType/history?limit=50
  return fetchJson(`/sensors/${sensorType}/history?limit=50`)
}

// Medición actual
export async function getSensorCurrent(sensorType) {
  // GET /sensors/:sensorType/current
  return fetchJson(`/sensors/${sensorType}/current`)
}

// Estado general del dispositivo
export async function getDeviceStatus() {
  // GET /device/status
  return fetchJson('/device/status')
}

// Healthcheck explícito
export async function healthcheck() {
  // GET /health
  return fetchJson('/health')
}
