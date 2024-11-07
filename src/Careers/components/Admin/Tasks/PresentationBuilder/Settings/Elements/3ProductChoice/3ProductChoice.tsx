import type { TTaskPresentationText } from '@dc/graphql/user/queries/taskPresentation';
import { SingleProduct } from '@dc/components/Admin/Tasks/PresentationBuilder/SingleProduct/SingleProduct';
import { PresentationTextEditor } from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationTextEditor/PresentationTextEditor';

type Props = {
  contentStyle: string;
  handleEditorChange: (values: string, editedContentId: string) => void;
  shouldShowElement: (object: { type: string; id: string }) => boolean;
  getText: (id: string, texts: TTaskPresentationText[]) => TTaskPresentationText | undefined;
  texts: TTaskPresentationText[];
};

function AdminTasksPresentationBuilderSettingsElements3ProductChoice({
  contentStyle,
  getText,
  shouldShowElement,
  handleEditorChange,
  texts,
}: Props) {
  const firstProductItems = [
    { id: '2', type: 'text' },
    { id: '5', type: 'text' },
    { id: '1', type: 'image' },
    { id: '1', type: 'link' },
  ];

  const secondProductItems = [
    { id: '3', type: 'text' },
    { id: '6', type: 'text' },
    { id: '2', type: 'image' },
    { id: '2', type: 'link' },
  ];

  const thirdProductItems = [
    { id: '4', type: 'text' },
    { id: '7', type: 'text' },
    { id: '3', type: 'image' },
    { id: '3', type: 'link' },
  ];

  const title = getText('1', texts);
  const firstProductTitle = getText('2', texts);
  const secondProductTitle = getText('3', texts);
  const thirdProductTitle = getText('4', texts);
  const firstProductDescription = getText('5', texts);
  const secondProductDescription = getText('6', texts);
  const thirdProductDescription = getText('7', texts);

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
        productTitle={firstProductTitle}
        shouldShowElement={shouldShowElement}
      />
      <SingleProduct
        contentStyle={contentStyle}
        handleEditorChange={handleEditorChange}
        imageId='2'
        items={secondProductItems}
        linkId='2'
        productDescription={secondProductDescription}
        productTitle={secondProductTitle}
        shouldShowElement={shouldShowElement}
      />
      <SingleProduct
        contentStyle={contentStyle}
        handleEditorChange={handleEditorChange}
        imageId='3'
        items={thirdProductItems}
        linkId='3'
        productDescription={thirdProductDescription}
        productTitle={thirdProductTitle}
        shouldShowElement={shouldShowElement}
      />
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsElements3ProductChoice;
