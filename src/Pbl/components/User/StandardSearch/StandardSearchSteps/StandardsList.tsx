import { isEmpty } from 'lodash-es';
import React, { Fragment } from 'react';
import cx from 'classnames';

import useStandardSearch from '@shared/hooks/useStandardSearchContext';
import { RadioButton } from '@shared/components/RadioButton/RadioButton';

import styles from './StandardsList.module.sass';

type Standard = {
  guid: string;
  standardText: string;
  standardNumber: string;
  children: Standard[];
};

type SubChildrenProps = {
  standards: Standard[];
  onRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nestingLevel: number;
};

export const StandardsList = (props: SubChildrenProps) => {
  const { standardsSearchState } = useStandardSearch();
  const { standards, onRadioChange, nestingLevel } = props;

  const containerClassNames = cx({
    [styles.mainContainer]: nestingLevel > 1,
  });

  return (
    <div className={containerClassNames}>
      {standards.map((childStandard) => {
        const { standardNumber, standardText, guid, children } = childStandard;
        const name = (
          <div>
            {standardNumber && <span className={styles.standardNumber}>{standardNumber} - </span>}
            {standardText}
          </div>
        );

        return (
          <Fragment key={guid}>
            <div className={styles.singleStandard}>
              <RadioButton
                checked={guid === standardsSearchState?.selectedStandard?.uuid}
                name='standard'
                value={guid}
                onChange={onRadioChange}>
                {name}
              </RadioButton>
            </div>
            {!isEmpty(children) && (
              <StandardsList
                nestingLevel={nestingLevel + 1}
                standards={children}
                onRadioChange={onRadioChange}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
