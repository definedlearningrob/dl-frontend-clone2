import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DeprecatedAsyncSelect } from '@shared/components/DeprecatedAsyncSelect';
import { useMessaging } from '@shared/hooks/useMessaging';
import SelectOption from '@shared/components/Messaging/Modal/SelectOption/SelectOption';
import SelectValue from '@shared/components/Messaging/Modal/SelectValue/SelectValue';
import { ReactComponent as TeamIcon } from '@shared/assets/icons/projectTeam.svg';

import styles from './ReceiverSelect.module.sass';

MessagingModalReceiverSelect.propTypes = {
  disabled: PropTypes.bool,
  isTeamMessage: PropTypes.bool,
  receiver: PropTypes.shape({
    entity: PropTypes.shape({
      name: PropTypes.string,
    }),
    name: PropTypes.string,
    teamName: PropTypes.string,
    uuid: PropTypes.string,
  }),
  setReceiver: PropTypes.func,
};

function MessagingModalReceiverSelect({ disabled, setReceiver, receiver, isTeamMessage }) {
  const { queries } = useMessaging();
  const { usersQuery: query } = queries;
  const { t } = useTranslation();

  if (isTeamMessage && receiver) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.label}>{t('messaging.new.to')}</span>
        <div className={styles.teamReceiverWrapper}>
          <div className={styles.receiverIconWrapper}>
            <TeamIcon />
          </div>
          {receiver.teamName}
        </div>
      </div>
    );
  }

  return (
    <DeprecatedAsyncSelect
      OptionComponent={SelectOption}
      SelectedValueComponent={SelectValue}
      className={styles.select}
      dataKey='conversationRecipients.nodes'
      disabled={disabled}
      filterName='nameCont'
      label={t('messaging.new.to')}
      name='receiver'
      placeholder={t('common.placeholders.search')}
      query={query}
      value={receiver}
      valueKey='uuid'
      onChange={setReceiver}
    />
  );
}

export default MessagingModalReceiverSelect;
