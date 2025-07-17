import { useEffect, useRef } from 'react'

export const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay: number
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = (...args: unknown[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return debouncedCallback
}
