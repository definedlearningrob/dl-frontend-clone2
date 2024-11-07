import { TRubric, TProductSubmissionGrade } from '@pbl/components/Project/types';

import { RubricsModal } from '@shared/components/RubricsModal/RubricsModal';

import { ProductRubricsModalActions } from './ProductRubricsModalActions';

type Props = {
  productName: string;
  grade?: TProductSubmissionGrade;
  rubrics: TRubric[];
  onClose: () => void;
};

export const ProductRubricsModal = (props: Props) => {
  const { grade, productName, rubrics, onClose } = props;

  return (
    <RubricsModal
      grade={grade}
      isOpen={true}
      productName={productName}
      renderActions={(currentRubric) => (
        <ProductRubricsModalActions currentRubric={currentRubric} />
      )}
      rubrics={rubrics}
      onClose={onClose}
    />
  );
};
