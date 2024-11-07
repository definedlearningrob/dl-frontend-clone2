import { isEmpty } from 'lodash-es';
import { FC, SVGProps } from 'react';

import { TPortfolioProject } from '@shared/components/Portfolio/types';
import { ResumeItemAttributes } from '@shared/resources/types';

export const createPortfolioData = (
  icon: FC<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >,
  title: string,
  details: ResumeItemAttributes[] | TPortfolioProject[]
) => ({
  icon,
  title,
  portfolioDetails: details,
  visible: !isEmpty(details),
});
