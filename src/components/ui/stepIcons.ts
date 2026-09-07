import { BulbIcon, PaletteIcon, DropperIcon, RocketIcon } from './Icons'

export const stepIcons = {
  bulb: BulbIcon,
  palette: PaletteIcon,
  dropper: DropperIcon,
  rocket: RocketIcon,
} as const

export type StepIconName = keyof typeof stepIcons
