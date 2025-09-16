import { useEffect, useState, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import SensorPanel from '../components/SensorPanel.jsx';
import DeviceStatusCard from '../components/DeviceStatusCard.jsx';

import { getDevices, getDeviceSensors } from '../services/api.js';
import { useDeviceStatus } from '../hooks/useDeviceStatus.js';
import { useSensorData } from '../hooks/useSensorData.js';

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState(null);

  const [sensors, setSensors] = useState([]);
  const [loadingSensors, setLoadingSensors] = useState(true);
  const [error, setError] = useState(null);

  // cargar devices al inicio
  useEffect(() => {
    getDevices().then(list => {
      setDevices(list);
      if (list.length > 0) {
        setDeviceId(list[0].id); // por defecto el primero
      }
    });
  }, []);

  const device = useDeviceStatus(deviceId);

  const loadSensors = useCallback(async () => {
    if (!deviceId) return;
    setLoadingSensors(true);
    setError(null);
    try {
      const list = await getDeviceSensors(deviceId);
      setSensors(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e);
      setSensors([]);
    } finally {
      setLoadingSensors(false);
    }
  }, [deviceId]);

  useEffect(() => {
    loadSensors();
  }, [loadSensors]);

  return (
    <Stack spacing={3}>
      {/* Dropdown de devices */}
      <FormControl fullWidth>
        <InputLabel id="device-select-label">Dispositivo</InputLabel>
        <Select
          labelId="device-select-label"
          value={deviceId ?? ''}
          label="Dispositivo"
          onChange={(e) => setDeviceId(e.target.value)}
        >
          {devices.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.name} ({d.status})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {deviceId && (
        <>
          <DeviceStatusCard
            status={device.status}
            onHealthcheck={device.healthcheck}
            loading={device.loading}
          />

          <Grid container spacing={3}>
            {loadingSensors && (
              <Grid xs={12}>Cargando sensores…</Grid>
            )}
            {error && (
              <Grid xs={12}>
                Error cargando sensores: {String(error.message || error)}
              </Grid>
            )}
            {!loadingSensors && sensors.length === 0 && (
              <Grid xs={12}>No hay sensores para este dispositivo.</Grid>
            )}

            {sensors.map((s) => (
              <Grid key={s.id} xs={12} md={6} lg={4}>
                <SensorPanelContainer deviceId={deviceId} sensor={s} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
}

// Contenedor por sensor: acá sí usamos el hook (uno por componente)
function SensorPanelContainer({ deviceId, sensor }) {
  const data = useSensorData({
    deviceId,
    sensorId: sensor.id,
    sensorType: sensor.type
  });

  return (
    <SensorPanel
      title={sensor.name || sensor.type}
      unit={inferUnit(sensor.type)}
      sensorType={sensor.type}
      readings={data.readings}
      onFetchCurrent={data.fetchCurrent}
      onRefreshHistory={data.fetchHistory}
      loading={data.loading}
    />
  );
}

// Heurística simple para la unidad
function inferUnit(type) {
  const t = (type || '').toLowerCase();
  if (t.includes('temp')) return '°C';
  if (t.includes('humid')) return '%';
  if (t.includes('press')) return 'hPa';
  if (t.includes('light')) return 'lx';
  return '';
}
