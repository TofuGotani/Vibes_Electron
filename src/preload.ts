// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { ipcRenderer } from 'electron';
import AudioWrapper from './AudioWrapper';
import { Pixi } from './effect/pixi';
import JdManager from './JdManager';

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions] ?? '');
  }

  let pixi: Pixi | null = null;

  ipcRenderer.on('notification', (event, message) => {
    if (pixi === null) pixi = new Pixi();
    AudioWrapper.countUp();
    if ('enter' === message) {
      pixi.thunder();
    } else {
      pixi.fireworks();
    }
  });
});

AudioWrapper.init();
AudioWrapper.audio.play();

JdManager.init();
