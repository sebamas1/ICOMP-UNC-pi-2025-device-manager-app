// "" es válido (mismo origen vía Ingress, p. ej. http://app.local + rutas /api/...).
const API_BASE_URL =
  window.__RUNTIME_CONFIG__?.API_BASE_URL ?? "http://localhost:8080";

async function fetchJson(path, options = {}) {
  console.log(`Fetching ${API_BASE_URL}${path}...`);
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

// --- Sensores de un device ---
export async function getDeviceSensors(deviceId) {
  // GET /devices/:deviceId/sensors
  return fetchJson(`/api/devices/${deviceId}/sensors`);
}

// --- Historia de medidas (preferir por deviceId + sensorId) ---
export async function getSensorHistory({ deviceId, sensorId, sensorType, limit = 50 }) {
  // Si tu API expone endpoints por sensorId (recomendado):
  if (deviceId != null && sensorId != null) {
    return fetchJson(`/api/devices/${deviceId}/sensors/${sensorId}/history?limit=${limit}`);
  }
  // Fallback por tipo (si aún lo necesitás):
  return fetchJson(`/api/sensors/${sensorType}/history?limit=${limit}`);
}

// --- Medición actual ---
export async function getSensorCurrent({ deviceId, sensorId }) {
  if (deviceId != null && sensorId != null) {
    const sensor = await fetchJson(`/api/devices/${deviceId}/sensors/${sensorId}`);
    return { timestamp: new Date().toISOString(), value: sensor.value, source: sensor.type };
  }
}

// --- Estado general del dispositivo ---
export async function getDeviceStatus(id) {
  // GET /devices/:id/status
  console.log('Getting device status for device id', id);
  return fetchJson(`/api/devices/${id}/status`);
}

// --- Healthcheck explícito ---
export async function healthcheck() {
  // Intentá primero /devices/health y hacé fallback a /health
  try {
    return await fetchJson('/api/devices/health');
  } catch {
    return fetchJson('/api/health');
  }
}

export async function getDevices() {
  // GET /devices
  return fetchJson('/api/devices');
}
