import type { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import { SingleProduct } from '@dc/components/Admin/Tasks/PresentationBuilder/SingleProduct/SingleProduct';
import { PresentationTextEditor } from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationTextEditor/PresentationTextEditor';

const firstProductItems = [
  { id: '7', type: 'text' },
  { id: '1', type: 'image' },
  { id: '1', type: 'link' },
];

const secondProductItems = [
  { id: '8', type: 'text' },
  { id: '2', type: 'image' },
  { id: '2', type: 'link' },
];

const thirdProductItems = [
  { id: '9', type: 'text' },
  { id: '3', type: 'image' },
  { id: '3', type: 'link' },
];

const fourthProductItems = [
  { id: '10', type: 'text' },
  { id: '4', type: 'image' },
  { id: '4', type: 'link' },
];

const fifthProductItems = [
  { id: '11', type: 'text' },
  { id: '5', type: 'image' },
  { id: '5', type: 'link' },
];

type Props = {
  contentStyle: string;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
  texts: TTaskPresentationText[];
};

export function FiveProductChoice({
  contentStyle,
  getText,
  shouldShowElement,
  handleEditorChange,
  texts,
}: Props) {
  const title = getText('1', texts);
  const firstProductDescription = getText('7', texts);
  const secondProductDescription = getText('8', texts);
  const thirdProductDescription = getText('9', texts);
  const fourthProductDescription = getText('10', texts);
  const fifthProductDescription = getText('11', texts);

  return (
    <div className='animate-fadeDropIn'>
      {title && shouldShowElement({ type: 'text', id: title.contentId }) && (
        <PresentationTextEditor
          contentStyle={contentStyle}
          handleEditorChange={handleEditorChange}
          text={title}
        />
      )}
      <SingleProduct
        contentStyle={contentStyle}
        handleEditorChange={handleEditorChange}
        imageId='1'
        items={firstProductItems}
        linkId='1'
        productDescription={firstProductDescription}
        productTitle={{ value: 'First Product', contentId: '', type: 'text', style: '' }}
        shouldShowElement={shouldShowElement}
      />
      <SingleProduct
        contentStyle={contentStyle}
        handleEditorChange={handleEditorChange}
        imageId='2'
        items={secondProductItems}
        linkId='2'
        productDescription={secondProductDescription}
        productTitle={{ value: 'Second Product', contentId: '', type: 'text', style: '' }}
        shouldShowElement={shouldShowElement}
      />
      <SingleProduct
        contentStyle={contentStyle}
        handleEditorChange={handleEditorChange}
        imageId='3'
        items={thirdProductItems}
        linkId='3'
        productDescription={thirdProductDescription}
        productTitle={{ value: 'Third Product', contentId: '', type: 'text', style: '' }}
        shouldShowElement={shouldShowElement}
      />
      <SingleProduct
        contentStyle={contentStyle}
        handleEditorChange={handleEditorChange}
        imageId='4'
        items={fourthProductItems}
        linkId='4'
        productDescription={fourthProductDescription}
        productTitle={{ value: 'Fourth Product', contentId: '', type: 'text', style: '' }}
        shouldShowElement={shouldShowElement}
      />
      <SingleProduct
        contentStyle={contentStyle}
        handleEditorChange={handleEditorChange}
        imageId='5'
        items={fifthProductItems}
        linkId='5'
        productDescription={fifthProductDescription}
        productTitle={{ value: 'Fifth Product', contentId: '', type: 'text', style: '' }}
        shouldShowElement={shouldShowElement}
      />
    </div>
  );
}
