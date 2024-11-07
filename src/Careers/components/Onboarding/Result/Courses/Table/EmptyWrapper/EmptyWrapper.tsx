import SharedEmptyContainerPlaceholder from '@dc/shared/EmptyContainerPlaceholder/EmptyContainerPlaceholder';

import styles from './EmptyWrapper.module.sass';

type Props = {
  className?: string;
  message: string;
};

const OnboardingResultCoursesTableEmptyWrapper = ({ className, message }: Props) => (
  <tbody className={styles.tableBody}>
    <tr>
      <td>
        <SharedEmptyContainerPlaceholder className={className} message={message} />
      </td>
    </tr>
  </tbody>
);

export default OnboardingResultCoursesTableEmptyWrapper;
