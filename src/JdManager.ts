import AudioWrapper from "./AudioWrapper";

export default class JdManager {
  private static isPrintingJd = false;
  private static container: HTMLElement | null;
  private static img: HTMLImageElement;
  private static typeStarted = false;

  static init(): void {
    setInterval(() => {
      console.log("interval");
      // 10文字より多くタイピングしてからおじさん待機
      if (!JdManager.typeStarted && 10 < AudioWrapper.sum){
        JdManager.typeStarted = true;
      }

      if (JdManager.typeStarted && AudioWrapper.sum === 0) {
        JdManager.container = document.getElementById("img-container");
        JdManager.img = document.createElement("img");
        JdManager.img.src = "../assets/JD_DoIt.gif";
        JdManager.img.width = screen.width;
        JdManager.img.alt = "JD";
        if (JdManager.container) {
          JdManager.container.appendChild(JdManager.img);
          AudioWrapper.jdVoice.play();
          JdManager.typeStarted = false;
          JdManager.isPrintingJd = true;
        }

      }
      else if (JdManager.isPrintingJd && AudioWrapper.sum !== 0) {
        if (JdManager.container) {
          JdManager.container.removeChild(JdManager.img);
          AudioWrapper.jdVoice.stop();
          JdManager.isPrintingJd = false;
        }
      }
    }, 1000);
  }
}
