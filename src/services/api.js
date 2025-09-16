const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
export async function getSensorCurrent({ deviceId, sensorId, sensorType }) {
  if (deviceId != null && sensorId != null) {
    return fetchJson(`/api/devices/${deviceId}/sensors/${sensorId}/current`);
  }
  // Fallback por tipo:
  return fetchJson(`/api/sensors/${sensorType}/current`);
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
