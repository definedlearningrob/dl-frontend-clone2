import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

Image.propTypes = {
  imagePath: PropTypes.string,
};

function Image({ imagePath }) {
  const interestImage = useRef(null);

  useEffect(() => {
    interestImage.current.style.backgroundImage = `url(${imagePath})`;
  });

  return <div ref={interestImage} className='image-container' />;
}

export default Image;
