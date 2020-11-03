import { stateObj } from "@/store"

export function saveToLs (key: string, value: object): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function initStorage (): any {
  Object.keys(stateObj).forEach((key): any => {
    const data = localStorage.getItem(key)
    if (data) {
      this.$store.commit('setState', { key, data: JSON.parse(data) })
    }
  })
}

