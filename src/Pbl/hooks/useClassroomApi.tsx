import { useEffect, useState } from 'react';
import loadScript from 'load-script';

import { GOOGLE_CLASSROOM_URL } from '@pbl/resources/constants';
import { TShareResourceMutationData } from '@pbl/graphql/user/mutations/shareResource';

type TSharedResource = TShareResourceMutationData['shareResource']['sharedResource'];

const useClassroomApi = (sharedResource?: TSharedResource) => {
  const [classroomLoaded, setClassroomLoaded] = useState(false);

  const isClassroomReady = Boolean(classroomLoaded && sharedResource);

  useEffect(() => loadScript(GOOGLE_CLASSROOM_URL, () => setClassroomLoaded(true)), []);

  useEffect(() => {
    //@ts-ignore
    if (isClassroomReady && window.gapi) {
      //@ts-ignore - typescript doesn't know about the google classroom api
      window.___gcfg = { parsetags: 'explicit' };
      //@ts-ignore
      window.gapi.sharetoclassroom.render('widget-div', {
        //eslint-disable-next-line no-undef
        url: `${import.meta.env.VITE_PBL_FRONTEND_HOST}/shared?code=${sharedResource!.code}`,
        size: 24,
      });
    }
  }, [isClassroomReady]);

  return { isClassroomReady };
};

export default useClassroomApi;
