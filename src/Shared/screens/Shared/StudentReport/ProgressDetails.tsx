import { Trans, useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';
import { sortBy } from 'lodash-es';

import Card from '@shared/components/Card/Card';
import { PlanGroupAccordionItem } from '@shared/components/StudentReport/ProgressDetails/PlanGroupAccordionItem';
import { PlanGroupsProgressLegend } from '@shared/components/StudentReport/ProgressDetails/PlanGroupsProgressLegend';
import { TPlanData } from '@shared/graphql/student/query/studentReportProgressByStudent';

type Props = {
  plan: TPlanData | undefined;
  isLoading: boolean;
};

export const ProgressDetails = ({ plan, isLoading }: Props) => {
  const { t } = useTranslation();

  const [expandedItem, setExpandedItem] = useState('');

  const filteredGroups = plan?.groups?.filter((group) => group.statements.length > 0);

  const groupsToRender = isLoading ? new Array(5).fill(null) : sortBy(filteredGroups, 'step');

  return (
    <Card>
      <h5 className='mb-xs text-sm xxxl:text-base xxxl:mb-sm leading-base'>
        <Trans
          components={{
            neutralText: <span className='text-neutral-600' />,
          }}
          i18nKey='studentGoalReport.progressDetailsCount'
          values={{ count: plan?.groups?.length || 0 }}
        />
      </h5>
      <p className='mb-base text-xs xxxl:text-sm leading-lg'>
        {t('studentGoalReport.progressDetailsInfo')}
      </p>
      <PlanGroupsProgressLegend />
      <Accordion.Root
        className='flex flex-col gap-sm xxxl:gap-base'
        collapsible={true}
        disabled={isLoading}
        type='single'
        value={expandedItem}
        onValueChange={setExpandedItem}>
        {groupsToRender.map((group, index) => (
          <Accordion.Item key={`${index}-group`} asChild={true} value={`item-${index + 1}`}>
            <PlanGroupAccordionItem
              group={group}
              isExpanded={`item-${index + 1}` === expandedItem}
              isLoading={isLoading}
            />
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Card>
  );
};
