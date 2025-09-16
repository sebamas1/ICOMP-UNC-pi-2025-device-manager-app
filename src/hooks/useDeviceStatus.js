import { useCallback, useEffect, useState } from 'react'
import { getDeviceStatus, healthcheck } from '../services/api.js'

export function useDeviceStatus(deviceId) {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const s = await getDeviceStatus(deviceId)
      setStatus(s)
    } finally {
      setLoading(false)
    }
  }, [deviceId])

  const check = useCallback(async () => {
    setLoading(true)
    try {
      const res = await healthcheck()
      const s = await getDeviceStatus(deviceId)
      setStatus(s ?? { online: res?.ok === true })
    } finally {
      setLoading(false)
    }
  }, [deviceId])

  useEffect(() => { load() }, [load])

  return { status, loading, healthcheck: check }
}
