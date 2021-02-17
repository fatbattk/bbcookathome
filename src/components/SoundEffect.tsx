// only need to import Howler core. howler package has core distribution listed
// in "files". https://stackoverflow.com/a/34457998
import { Howl } from 'howler/dist/howler.core.min.js';
import type * as type from '@/types';

let sound: Howl;
// init here so once only.
const initAudio = (options: type.HowlOptions): void => {
  sound = new Howl(options);
};

export default function SoundEffect({ options }: type.SoundEffectProps) {
  !sound && initAudio(options);
  // interrupt previous sound during rapid triggers.
  sound.stop();
  sound.play();

  return <></>;
}
