import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

import useQueryParams from '@shared/hooks/useQueryParams';

// NOTE keys of RESOURCE_TYPENAME are same as resource name from URL or `type` query param in case of lesson items
const RESOURCE_TYPENAME = {
  assignment: 'assignment',
  attachment: 'attachment',
  lessons: 'lesson',
  externalPresentation: 'externalPresentation',
  products: 'product',
  researchlink: 'researchlink',
  rubrics: 'rubric',
  tasks: 'task',
  text: 'text',
  tracks: 'track',
  units: 'unit',
  video: 'video',
  vocabulary: 'vocabulary',
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const FormContext = createContext();

export function FormProvider(props) {
  const [recordToArchive, setRecordToArchive] = useState(null);
  const [recordToShow, setRecordToShow] = useState(null);
  const [recordToRestore, setRecordToRestore] = useState(null);
  const [recordToDuplicate, setRecordToDuplicate] = useState(null);

  return (
    <FormContext.Provider
      value={[
        recordToArchive,
        recordToShow,
        recordToRestore,
        recordToDuplicate,
        setRecordToArchive,
        setRecordToShow,
        setRecordToRestore,
        setRecordToDuplicate,
      ]}>
      {props.children}
    </FormContext.Provider>
  );
}

function useForm() {
  const [
    recordToArchive,
    recordToShow,
    recordToRestore,
    recordToDuplicate,
    setRecordToArchive,
    setRecordToShow,
    setRecordToRestore,
    setRecordToDuplicate,
  ] = useContext(FormContext);
  const {
    params: { archiveId, type },
  } = useQueryParams();

  useEffect(() => {
    if (archiveId) {
      const resource = window.location.href.split('?')[0].split('/').pop();

      setRecordToArchive({
        id: archiveId,
        __typename: RESOURCE_TYPENAME[type || resource],
      });
    }
  }, []);

  return {
    recordToArchive,
    recordToShow,
    recordToRestore,
    recordToDuplicate,
    setRecordToArchive,
    setRecordToShow,
    setRecordToRestore,
    setRecordToDuplicate,
  };
}

export default useForm;
