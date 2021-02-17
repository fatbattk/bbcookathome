import { CSSProperties, useEffect, useRef } from 'react';
import { confetti } from 'dom-confetti';
import styles from '@/styles/Confetti.module.scss';
import type * as type from '@/types';

const defaultOptions: type.ConfettiConfig = {
  image: './bb1.png',
  width: '90px',
  height: '90px',
  angle: 90,
  duration: 2188, // ms
  elementCount: 8,
  startVelocity: 33,
};

export default function Confetti({ options, x, y }: type.ConfettiProps) {
  const confettiOptions: type.ConfettiConfig = {
    ...defaultOptions,
    ...options,
  };
  const cssPosition: CSSProperties = {
    left: `${x}px`,
    top: `${y}px`,
  };
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => confetti(container.current, confettiOptions), []);

  return (
    <div
      className={styles.container}
      style={cssPosition}
      ref={container}
    ></div>
  );
}
