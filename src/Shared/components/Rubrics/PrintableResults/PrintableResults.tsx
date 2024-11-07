import { Kicker } from '@shared/components/Kicker';
import { useRubric } from '@shared/components/Rubrics/RubricProvider';

export const PrintableResults = () => {
  const { grading, rubric } = useRubric();

  if (!grading) {
    return null;
  }

  const getMatchingCriteria = (result: typeof grading.results[number]) => {
    const matchingCriteria = rubric.criterias.find((criteria) => criteria.id === result.criteriaId);

    if (!matchingCriteria || !result.trait) {
      return { matchingHeading: null, matchingCriteria: null };
    }

    const matchingHeading = rubric.headings.find(
      (heading) => heading.id === matchingCriteria.rubricHeadingId
    );

    return { matchingCriteria, matchingHeading };
  };

  return (
    <>
      {grading.results.map((result) => {
        const { matchingCriteria, matchingHeading } = getMatchingCriteria(result);

        if (!matchingCriteria || !matchingHeading) {
          return null;
        }

        return (
          <div key={result.criteriaId} className='printableRubric'>
            <Kicker className='printableRubric__heading' size='sm'>
              {matchingHeading.name}
            </Kicker>
            <div className='printableRubric__text'>
              <span>{matchingCriteria.text}</span>
              <p>
                <strong>{result.trait}</strong>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
