import { createTools } from '../src/lib/tools'

export function generateToolkit() {
  // Use the global fetch so that nock can intercept the requests
  return createTools({ request: { fetch: globalThis.fetch } })
}
