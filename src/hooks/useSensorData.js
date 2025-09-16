import { useCallback, useEffect, useState } from 'react';
import { getSensorCurrent, getSensorHistory } from '../services/api.js';

export function useSensorData({ deviceId, sensorId, sensorType }) {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    const data = await getSensorHistory({ deviceId, sensorId, sensorType });
    setReadings(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [deviceId, sensorId, sensorType]);

  const fetchCurrent = useCallback(async () => {
    const curr = await getSensorCurrent({ deviceId, sensorId, sensorType });
    setReadings(prev => (Array.isArray(prev) ? [curr, ...prev].slice(0, 50) : [curr]));
  }, [deviceId, sensorId, sensorType]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { readings, loading, fetchHistory, fetchCurrent };
}
