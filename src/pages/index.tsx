import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ComponentType, useState } from 'react';
import styles from '@/styles/Base.module.scss';
import type * as type from '@/types';

const metaTitle: string = '@BBcookathome - ig';
const metaDescription: string =
  'We offer super syok Ready2Eat Dishes and idiot-proof DIY set meals with FREE delivery in Klang Valley.';
const metaAuthor: string = 'FatBat';
const heading: string = '@BBcookathome';
const easterEgg: string = 'Hi Beej~!!!';
const confettiOption: type.ConfettiConfig = { duration: 2099 };
const soundOptions: type.HowlOptions = { src: ['gold.webm', 'gold.mp3'] };
// lazy load components.
const DynamicConfetti: ComponentType<type.ConfettiProps> = dynamic(
  () => import('@/components/Confetti'),
  {
    ssr: false,
  }
);
const DynamicSoundEffect: ComponentType<type.SoundEffectProps> = dynamic(
  () => import('@/components/SoundEffect'),
  {
    ssr: false,
  }
);

export default function Base(props) {
  const [upUsTheBooms, setUpUsTheBooms] = useState([]);

  const cleanExpired = (ms: number): type.Booms[] =>
    upUsTheBooms.filter((o) => ms < o.expires);
  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const now: number = Date.now();
    const expiryBuffer: number = 222;
    setUpUsTheBooms([
      ...cleanExpired(now),
      {
        expires: now + confettiOption.duration + expiryBuffer,
        x: e.pageX,
        y: e.pageY,
      },
    ]);
    easterEgg.length && console.log(easterEgg);
  };

  return (
    <>
      <Head>
        {metaTitle !== '' && <title>{metaTitle}</title>}
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no"
        />
        {metaDescription !== '' && (
          <meta name="description" content={metaDescription} />
        )}
        {metaAuthor !== '' && <meta name="author" content={metaAuthor} />}
      </Head>

      <main className={styles.container} onClick={clickHandler}>
        <p className={styles.prompt}>click anywhere</p>
        {/* skipping next/image cause no support when static exporting */}
        <picture>
          <source srcSet="bbcsSmall.webp" type="image/webp" />
          <img
            src="bbcsSmall.png"
            alt="BBchoysan"
            className={styles.heroLogo}
            width={150}
            height={150}
          />
        </picture>
        <h1 className={styles.heroTitle}>{heading}</h1>
        {upUsTheBooms.length > 0 && (
          <DynamicSoundEffect options={soundOptions} />
        )}
        {upUsTheBooms.length > 0 &&
          upUsTheBooms.map((o) => (
            <DynamicConfetti
              key={o.expires}
              x={o.x}
              y={o.y}
              options={confettiOption}
            />
          ))}
      </main>
    </>
  );
}
