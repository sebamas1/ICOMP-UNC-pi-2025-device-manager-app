import { useCallback, useEffect, useState } from 'react'
import { getSensorHistory, getSensorCurrent } from '../services/api.js'

export function useSensorData(sensorType) {
  const [readings, setReadings] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getSensorHistory(sensorType)
      const sorted = (data ?? []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setReadings(sorted)
    } finally {
      setLoading(false)
    }
  }, [sensorType])

  const fetchCurrent = useCallback(async () => {
    setLoading(true)
    try {
      const cur = await getSensorCurrent(sensorType)
      if (cur) {
        setReadings(prev => [{ timestamp: cur.timestamp ?? new Date().toISOString(), value: cur.value, source: 'API' }, ...prev])
      }
    } finally {
      setLoading(false)
    }
  }, [sensorType])

  useEffect(() => { fetchHistory() }, [fetchHistory])

  return { readings, loading, fetchHistory, fetchCurrent }
}
