import WebSocket from 'ws';
import { BrowserWindow } from 'electron';

const WebSocketManager = (path: string, window: BrowserWindow) => {
  const tryLimit = 10; // チャレンジ回数(要検討)
  const pendingTime = 1000; //ms
  let tryCnt = 0;
  const connect: () => void = () => {
    const ws = new WebSocket(path);
    ws.onopen = function() {
      //open したら接続試行回数を0にする
      tryCnt = 0;
      console.log('open');
    };

    ws.onmessage = (messageEvent) => {
      window.webContents.send('notification', messageEvent.data as string);
      console.log(messageEvent.data as string);
    };

    ws.onclose = (closeEvent) => {
      console.log(
        `${tryCnt + 1}/${tryLimit}`, `Socket is closed. Reconnect will be attempted in ${pendingTime} milli second.`,
        closeEvent.reason
      );
      if (tryCnt < tryLimit) {
        setTimeout(function() {
          connect();
        }, pendingTime);
        tryCnt += 1;
      } else {
        throw 'Can\'t establish a connection ! Please Start Python Server';
      }
    };

    ws.onerror = (err) => {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      ws.close();
    };
  };
  //最初の接続を試みる
  connect();
};

export default WebSocketManager;
