import type { ConfettiConfig } from 'dom-confetti';
import type { HowlOptions } from 'howler/dist/howler.core.min.js';

export interface Booms {
  expires: number;
  x: number;
  y: number;
}

export interface ConfettiProps {
  options: ConfettiConfig;
  x: number;
  y: number;
}
export interface SoundEffectProps {
  options: HowlOptions;
}

export type { ConfettiConfig };
export type { HowlOptions };
