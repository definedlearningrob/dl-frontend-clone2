import { ProductRubricsModalActions } from '@pbl/components/Project/Products/ProductRubricsModal/ProductRubricsModalActions';
import { TRubric, TProductSubmissionGrade } from '@pbl/components/Project/types';

import { RubricsModal } from '../RubricsModal/RubricsModal';

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
