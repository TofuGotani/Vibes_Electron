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

  const pixi = new Pixi();

  ipcRenderer.on('notification', (event, message) => {
    const stringJSON = new TextDecoder().decode(message);
    const parsedJSON = JSON.parse(stringJSON);
    const key = parsedJSON['key'];

    if (key !== '') {
      AudioWrapper.countUp();
      if (key === 'enter') {
        pixi.thunder();
      } else if (key === 'tab' || key === 'space') {
        pixi.particle();
      } else {
        pixi.fireworks();
      }
    }

    if (parsedJSON['praise']['isPraise']) {
      pixi.praise(parsedJSON['praise']['text']);
    }
  });
  AudioWrapper.init();
  AudioWrapper.audio.play();

  JdManager.init();
});


