import Appsignal from '@appsignal/javascript';
import { plugin } from '@appsignal/plugin-path-decorator';

export const appsignal = new Appsignal({
  key: import.meta.env.VITE_APPSIGNAL_KEY as string,
  // eslint-disable-next-line no-undef
  revision: __APP_VERSION__,
});

appsignal.use(plugin());
