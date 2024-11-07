import { ObjectFieldTemplateProps } from '@rjsf/utils';

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const { title, description, properties } = props;

  return (
    <div>
      {title && <h4 className='object-field-section'>{title}</h4>}
      {description && <p>{description}</p>}
      {properties.map((element) => (
        <div key={element.name} className='mb-base xxxl:mb-md'>
          {element.content}
        </div>
      ))}
    </div>
  );
};
