/**
 * Generate a unique ID using the Web Crypto API.
 * @returns {string}
 */
export function generateId() {
  return crypto.randomUUID()
}
