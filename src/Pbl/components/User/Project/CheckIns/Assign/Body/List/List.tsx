import { useField } from 'formik';

import { TLibraryCheckin } from '@pbl/graphql/user/queries/checkInQuestions';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import styles from './List.module.sass';

type CheckinsAssignListProps = {
  questions: TLibraryCheckin[];
};

const CheckinsAssingList = ({ questions }: CheckinsAssignListProps) => {
  const [field, , helpers] = useField<string[]>('questionIds');

  const handleQuestionSelect = (questionId: string) => {
    if (field.value.includes(questionId)) {
      const newValue = field.value.filter((id) => id !== questionId);

      helpers.setValue(newValue);
    } else {
      helpers.setValue([...field.value, questionId]);
    }
  };

  const isChecked = (questionId: string) => field.value.includes(questionId);

  return (
    <ul className={styles.list}>
      {questions.map((item) => (
        <li
          key={item.id}
          className={styles.listItem}
          role='button'
          onClick={() => handleQuestionSelect(item.id)}>
          <SharedCheckbox
            checked={isChecked(item.id)}
            className={styles.checkbox}
            id={item.id}
            labelOnClick={(e) => e.stopPropagation()}
            onChange={() => handleQuestionSelect(item.id)}
          />
          <span>{item.question}</span>
        </li>
      ))}
    </ul>
  );
};

export default CheckinsAssingList;
