import { isEmpty } from 'lodash-es';

import { useAnswerPlanGroupStatementQuestion } from '@shared/graphql/shared/hooks/useAnswerPlanGroupStatementQuestion';

import { PlanStatementQuestion } from '../PlanStatementQuestion/PlanStatementQuestion';
import { TPlanStatementQuestion } from '../types';

type Props = {
  question: TPlanStatementQuestion | null;
  evaluationId: string;
};

export const StatementQuestion = ({ question, evaluationId }: Props) => {
  const [answerStatementQuestion] = useAnswerPlanGroupStatementQuestion();

  if (!question || isEmpty(question.text)) {
    return null;
  }

  const { text, answer, options, questionType, id } = question;

  const handleSubmit = async (answer: string[]) => {
    await answerStatementQuestion({ evaluationId, questionId: id, answer });
  };

  return (
    <PlanStatementQuestion
      answer={answer?.answer}
      options={options}
      questionType={questionType}
      text={text}
      onSubmit={handleSubmit}
    />
  );
};
