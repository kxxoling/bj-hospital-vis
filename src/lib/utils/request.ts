export const request = {
  get: async <T = unknown>(url: string): Promise<T> => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return res.json() as Promise<T>
  },
}
