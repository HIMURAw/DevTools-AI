import { create } from "zustand"
import { persist } from "zustand/middleware"

import { DEFAULT_MODEL_ID } from "@/config/models"
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "@/constants/limits"
import { STORAGE_KEYS } from "@/constants/storage-keys"

interface SettingsValues {
  model: string
  temperature: number
  maxTokens: number
}

interface SettingsState extends SettingsValues {
  setModel: (model: string) => void
  setTemperature: (temperature: number) => void
  setMaxTokens: (maxTokens: number) => void
  reset: () => void
}

const defaults: SettingsValues = {
  model: DEFAULT_MODEL_ID,
  temperature: DEFAULT_TEMPERATURE,
  maxTokens: DEFAULT_MAX_TOKENS,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      setModel: (model) => set({ model }),
      setTemperature: (temperature) => set({ temperature }),
      setMaxTokens: (maxTokens) => set({ maxTokens }),
      reset: () => set(defaults),
    }),
    { name: STORAGE_KEYS.settings }
  )
)
