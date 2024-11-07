import { RevealJS } from '@gregcello/revealjs-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useExpandSidebar from '@dc/hooks/useExpandSidebar';
import taskPresentationQuery, {
  TTaskPresentationData,
  TTaskPresentationVariables,
} from '@dc/graphql/user/queries/taskPresentation';
import PresentationPreviewSlides from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/PresentationPreviewSlides';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';
import 'reveal.js/dist/theme/black.css';

import styles from './PresentationPrint.module.sass';

const AdminTasksPresentationBuilderPresentationPrint = () => {
  const { setHideHeader } = useExpandSidebar();
  const { toggleIsHidden } = useNavigation();
  const { taskId } = useParams<{ taskId: string }>();

  useEffect(() => {
    toggleIsHidden(true);
    setHideHeader(true);

    return () => {
      toggleIsHidden(false);
      setHideHeader(false);
    };
  }, []);

  return (
    <div className={styles.presentationPrintPreview}>
      <SharedDataLoader<TTaskPresentationData, TTaskPresentationVariables>
        options={{ fetchPolicy: 'no-cache', variables: { id: taskId } }}
        query={taskPresentationQuery}>
        {({ task }: TTaskPresentationData) => (
          <RevealJS
            autoPlayMedia={false}
            keyboard={false}
            overview={false}
            showNotes={true}
            slideNumber={true}>
            <PresentationPreviewSlides presentation={task.presentation} />
          </RevealJS>
        )}
      </SharedDataLoader>
    </div>
  );
};

export default AdminTasksPresentationBuilderPresentationPrint;
