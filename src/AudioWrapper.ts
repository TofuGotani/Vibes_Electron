import {Howl} from "howler";

export default class AudioWrapper {
  static audio: Howl;
  static jdVoice: Howl;
  private static _speedRate: number;
  private static _count = 0;
  private static _typeCounts: number[] = [];
  private static _sum = 0;
  private static _ave = 0;



  static set speedRate(value: number) {
    this._speedRate = value;
  }

  static get typeCounts(): number[] {
    return this._typeCounts;
  }

  static set typeCounts(value: number[]) {
    this._typeCounts = value;
  }

  static get count(): number {
    return this._count;
  }

  static set count(value: number) {
    this._count = value;
  }

  static get sum(): number {
    return this._sum;
  }

  static set sum(value: number) {
    this._sum = value;
  }

  static get ave(): number {
    return this._ave;
  }

  static set ave(value: number) {
    this._ave = value;
  }


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
    setInt();
  }

  static speedChange(variation: number): void {
    //AudioWrapper._speedRate += variation;
    AudioWrapper.audio.rate(AudioWrapper._speedRate);
  }

  static countUp(): void {
    AudioWrapper._count++;
  }
}
export const setInt = () => {
  setInterval(
    calculationAverage, 1000
  )
}

const calculationAverage = () => {
  AudioWrapper.typeCounts.push(AudioWrapper.count);
  AudioWrapper.sum = 0;
  AudioWrapper.count = 0;
  while (AudioWrapper.typeCounts.length > 30) {
    AudioWrapper.typeCounts = AudioWrapper.typeCounts.slice(1);
  }
  AudioWrapper.typeCounts.forEach(value => {AudioWrapper.sum += value})
  AudioWrapper.ave = AudioWrapper.sum / AudioWrapper.typeCounts.length;
  AudioWrapper.speedRate = 1 + (AudioWrapper.ave * 0.20)
  AudioWrapper.speedChange(0)
}
