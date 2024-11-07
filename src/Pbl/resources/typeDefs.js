import PropTypes from 'prop-types';

export const shapeProject = PropTypes.shape({
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  step: PropTypes.number,
  thumbnailUrl: PropTypes.string,
});

export const shapeLesson = PropTypes.shape({
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  projects: PropTypes.arrayOf(shapeProject),
  step: PropTypes.number,
  thumbnailUrl: PropTypes.string,
});

export const shapeCourse = PropTypes.shape({
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  lessons: PropTypes.arrayOf(shapeLesson),
  shortDescription: PropTypes.string,
  thumbnailUrl: PropTypes.string,
});

export const shapeStandardSignInForm = {
  errors: PropTypes.shape({
    domain: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
  }),
  touched: PropTypes.shape({
    domain: PropTypes.bool,
    login: PropTypes.bool,
    password: PropTypes.bool,
  }),
};

export const shapeAccessCodeSignInForm = {
  errors: PropTypes.shape({
    accessCode: PropTypes.string,
  }),
  touched: PropTypes.shape({
    accessCode: PropTypes.bool,
  }),
};
