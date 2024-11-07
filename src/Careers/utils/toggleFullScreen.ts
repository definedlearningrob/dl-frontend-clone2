//helper Types
type ElementRequestMethods = {
  mozRequestFullScreen(): Promise<void>;
  webkitRequestFullScreen(): Promise<void>;
  msRequestFullscreen(): Promise<void>;
};
type DocumentExitMethods = {
  mozCancelFullScreen(): Promise<void>;
  webkitExitFullscreen(): Promise<void>;
  msExitFullscreen(): Promise<void>;
};

type DocumentFullscreenElement = {
  mozFullScreenElement: Element | null;
  webkitFullscreenElement: Element | null;
  msFullscreenElement: Element | null;
};

// desired Types
type HTMLElementWithPrefixes = HTMLElement & ElementRequestMethods;
type DocumentWithExits = Document & DocumentExitMethods & DocumentFullscreenElement;

export const toggleFullScreen = (customElement?: HTMLElement) => {
  const document = window.document as DocumentWithExits;
  const documentElement = (customElement || document.documentElement) as HTMLElementWithPrefixes;

  const requestFullScreen =
    documentElement.requestFullscreen ||
    documentElement.mozRequestFullScreen ||
    documentElement.webkitRequestFullScreen ||
    documentElement.msRequestFullscreen;

  const cancelFullScreen =
    document.exitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen;

  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    requestFullScreen.call(documentElement);
  } else {
    cancelFullScreen.call(document);
  }
};
