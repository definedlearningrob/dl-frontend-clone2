import type { BablicInterface } from './bablic';
import type { GoogleAPIInterface, GoogleInterface } from './google';
import type { HelpScountBeaconInterface } from './helpscout';

export {};
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReadSpeaker?: Record<string, any>;
    Beacon?: HelpScountBeaconInterface;
    bablic?: BablicInterface;
    google?: GoogleInterface;
    gapi?: GoogleAPIInterface;
    rsConf?: Record<string, unknown>;
  }
}

window.ReadSpeaker = window.ReadSpeaker || {};
