import {Howl} from "howler";

export default class AudioWrapper {
  static audio: Howl;
  static jdVoice: Howl;
  private static _speedRate: number;

  static init(): void {
    AudioWrapper._speedRate = 1;
    AudioWrapper.audio = new Howl({
      src: ["../assets/buchi_agari.mp3"],
      loop: true
    });
    AudioWrapper.jdVoice = new Howl({
      src: ["../assets/justDoIt.wav"],
      loop: true
    });
  }
}
