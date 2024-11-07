import ExtensionFieldDetails from '@dc/components/Extensions/Details/Details';
import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import { type TLessonsExtensionField } from '@dc/graphql/student/queries/lessonExtensions';

import SharedImage from '@shared/components/Image/Image';
import { cleanInjection } from '@shared/utils/cleanInjection';

import styles from './ExtensionFieldItem.module.sass';

type Props = {
  extensionField: TLessonsExtensionField;
  isUser: boolean;
};

type CardProps = {
  title: string;
  onAskGuidanceClick?: () => void;
};

const ExtensionFieldItem = ({ extensionField }: Props) => {
  let cardProps: CardProps = {
    title: extensionField.name,
  };

  //Not yet implemented
  // if (!isUser) {
  //   cardProps.onAskGuidanceClick = () => {};
  // }

  const generatedUUID = extensionField.__typename + extensionField.id;

  return (
    <Card {...cardProps} id={generatedUUID}>
      <div className={styles.cardBody}>
        <div className={styles.imageWrapper}>
          <SharedImage
            alt={extensionField.name}
            className={styles.image}
            src={extensionField.imageUrl}
          />
        </div>
        <div className={styles.contentWrapper}>
          <p
            className={styles.description}
            //eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(extensionField.description)}
          />
          <ExtensionFieldDetails files={extensionField.files} links={extensionField.links} />
        </div>
      </div>
    </Card>
  );
};

export default ExtensionFieldItem;
