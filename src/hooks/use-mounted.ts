import * as React from "react"

const subscribeNoop = () => () => {}

/**
 * True only after client hydration. Use this to gate rendering that depends
 * on browser-only state (theme, localStorage) so the server-rendered HTML
 * matches the client's first paint and React doesn't warn about a
 * hydration mismatch.
 */
export function useMounted(): boolean {
  return React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  )
}
