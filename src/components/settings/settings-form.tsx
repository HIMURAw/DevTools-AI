"use client"

import { useTheme } from "next-themes"
import { MonitorIcon, MoonIcon, RotateCcwIcon, SunIcon } from "lucide-react"

import { useSettingsStore } from "@/lib/store/settings-store"
import { AI_MODELS } from "@/config/models"
import {
  MAX_TOKENS_MAX,
  MAX_TOKENS_MIN,
  MAX_TOKENS_STEP,
  TEMPERATURE_MAX,
  TEMPERATURE_MIN,
  TEMPERATURE_STEP,
} from "@/constants/limits"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const themeOptions = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
]

export function SettingsForm() {
  const { theme, setTheme } = useTheme()
  const model = useSettingsStore((state) => state.model)
  const temperature = useSettingsStore((state) => state.temperature)
  const maxTokens = useSettingsStore((state) => state.maxTokens)
  const setModel = useSettingsStore((state) => state.setModel)
  const setTemperature = useSettingsStore((state) => state.setTemperature)
  const setMaxTokens = useSettingsStore((state) => state.setMaxTokens)
  const resetSettings = useSettingsStore((state) => state.reset)

  return (
    <div className="flex flex-col gap-8">
      <section className="glass-card flex flex-col gap-4 rounded-2xl p-5">
        <div>
          <h2 className="text-sm font-medium">Theme</h2>
          <p className="text-muted-foreground text-sm">
            Choose how DevTools AI looks on this device.
          </p>
        </div>
        <div className="flex gap-2">
          {themeOptions.map((option) => {
            const Icon = option.icon
            const active = theme === option.value
            return (
              <Button
                key={option.value}
                type="button"
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme(option.value)}
                className={cn(active && "bg-gradient-brand text-white")}
              >
                <Icon className="size-3.5" />
                {option.label}
              </Button>
            )
          })}
        </div>
      </section>

      <section className="glass-card flex flex-col gap-4 rounded-2xl p-5">
        <div>
          <h2 className="text-sm font-medium">Model</h2>
          <p className="text-muted-foreground text-sm">
            Used for every tool. Only free OpenRouter models are listed.
          </p>
        </div>
        <Select
          value={model}
          onValueChange={(value) => value && setModel(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_MODELS.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-xs">
          {AI_MODELS.find((option) => option.id === model)?.description}
        </p>
      </section>

      <section className="glass-card flex flex-col gap-6 rounded-2xl p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="temperature">Temperature</Label>
            <span className="text-muted-foreground text-sm tabular-nums">
              {temperature.toFixed(1)}
            </span>
          </div>
          <Slider
            id="temperature"
            value={[temperature]}
            onValueChange={(value) =>
              setTemperature(Array.isArray(value) ? value[0] : value)
            }
            min={TEMPERATURE_MIN}
            max={TEMPERATURE_MAX}
            step={TEMPERATURE_STEP}
          />
          <p className="text-muted-foreground text-xs">
            Lower is more focused and deterministic. Higher is more creative and
            varied.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="max-tokens">Max tokens</Label>
            <span className="text-muted-foreground text-sm tabular-nums">
              {maxTokens}
            </span>
          </div>
          <Slider
            id="max-tokens"
            value={[maxTokens]}
            onValueChange={(value) =>
              setMaxTokens(Array.isArray(value) ? value[0] : value)
            }
            min={MAX_TOKENS_MIN}
            max={MAX_TOKENS_MAX}
            step={MAX_TOKENS_STEP}
          />
          <p className="text-muted-foreground text-xs">
            The maximum length of a response. Lower values respond faster.
          </p>
        </div>
      </section>

      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetSettings}
        >
          <RotateCcwIcon className="size-3.5" />
          Reset to defaults
        </Button>
      </div>
    </div>
  )
}
