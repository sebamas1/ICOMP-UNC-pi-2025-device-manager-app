import { useCallback, useEffect, useState } from 'react'
import { getDeviceStatus, healthcheck } from '../services/api.js'

export function useDeviceStatus() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const s = await getDeviceStatus()
      setStatus(s)
    } finally {
      setLoading(false)
    }
  }, [])

  const check = useCallback(async () => {
    setLoading(true)
    try {
      const res = await healthcheck()
      // Re-consultar estado luego del healthcheck
      const s = await getDeviceStatus()
      setStatus(s ?? { online: res?.ok === true })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { status, loading, healthcheck: check }
}
