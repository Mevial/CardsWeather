import { useEffect, useLayoutEffect, useRef } from 'react'

function useInterval(callback: () => void, delay: number | null, off: boolean) {
    const savedCallback = useRef(callback)

    // Remember the latest callback if it changes.
    useLayoutEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!off && delay !== 0) {
            return
        }

        // @ts-ignore
        const id = setInterval(() => savedCallback.current(), delay,off)

        return () => clearInterval(id)
    }, [delay,off])
}

export default useInterval
