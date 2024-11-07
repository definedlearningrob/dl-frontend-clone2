export type BablicInterface = {
  on: (eventName: string, callback: () => void) => void;
  getLocale: () => string;
  locales: { key: string }[];
  redirectTo: (locale: string) => void;
  widget: {
    show: () => void;
    hide: () => void;
  };
};
