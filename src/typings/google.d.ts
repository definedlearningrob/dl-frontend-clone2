export type GoogleInterface = {
  picker: {
    PickerBuilder: {
      new (): {
        addView: (view: unknown) => this;
        setOAuthToken: (token: string) => this;
        setDeveloperKey: (key: string) => this;
        setCallback: (callback: (data: unknown) => void) => this;
        build: () => unknown;
        setVisible: (visible: boolean) => void;
      };
    };
    ViewId: {
      DOCS: string;
    };
  };
  accounts?: {
    oauth2: {
      initTokenClient: (options: {
        //eslint-disable-next-line camelcase
        client_id: string;
        scope: string;
        //eslint-disable-next-line camelcase
        error_callback: (error: unknown) => void;
        callback: (resp: unknown) => void;
      }) => unknown;
    };
  };
};

export type GoogleAPIInterface = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  load: (apiName: string, callback?: (...args: any[]) => void) => void;
};
