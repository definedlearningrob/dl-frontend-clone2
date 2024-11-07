import PropTypes from 'prop-types';

import { ASSESSMENT_STATUSES } from './constants';

export const shapeCourseMetaData = PropTypes.shape({
  alternativeTitles: PropTypes.string,
  averageSalary: PropTypes.string,
  jobZone: PropTypes.string,
  onetCode: PropTypes.string,
  outlook: PropTypes.string,
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

export const shapeAssessmentProgress = PropTypes.shape({
  interestsAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      optionId: PropTypes.string,
    })
  ),
  status: PropTypes.shape({
    interests: PropTypes.oneOf([
      ASSESSMENT_STATUSES.NOT_STARTED,
      ASSESSMENT_STATUSES.IN_PROGRESS,
      ASSESSMENT_STATUSES.COMPLETED,
    ]),
    studyPreferences: PropTypes.oneOf([
      ASSESSMENT_STATUSES.NOT_STARTED,
      ASSESSMENT_STATUSES.IN_PROGRESS,
      ASSESSMENT_STATUSES.COMPLETED,
    ]),
    workValues: PropTypes.oneOf([
      ASSESSMENT_STATUSES.NOT_STARTED,
      ASSESSMENT_STATUSES.IN_PROGRESS,
      ASSESSMENT_STATUSES.COMPLETED,
    ]),
  }),
  studyPreferencesAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      optionId: PropTypes.string,
      position: PropTypes.number,
    })
  ),
  workValuesAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      optionId: PropTypes.string,
      tokens: PropTypes.number,
    })
  ),
});

export const pathwayShape = PropTypes.shape({
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  description: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
});

export const shapeLesson = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.shape({
    audience: PropTypes.string,
    goal: PropTypes.string,
    introduction: PropTypes.string,
    role: PropTypes.string,
    situation: PropTypes.string,
  }),
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
});

export const shapeCourse = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  lessons: PropTypes.arrayOf(shapeLesson),
  name: PropTypes.string,
  pathway: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  status: PropTypes.string,
  thumbnailUrl: PropTypes.string,
});

export const shapeCourseForm = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    imageData: PropTypes.string,
    name: PropTypes.string,
    pathway: PropTypes.string,
    status: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    // When dealing with objects Formik sets touched as object during submission -> https://github.com/formium/formik/issues/1942
    imageData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    name: PropTypes.bool,
    // When dealing with objects Formik sets touched as object during submission -> https://github.com/formium/formik/issues/1942
    pathway: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }),
};

export const shapeLessonForm = {
  errors: PropTypes.shape({
    audience: PropTypes.string,
    goal: PropTypes.string,
    imageData: PropTypes.string,
    introduction: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    situation: PropTypes.string,
    type: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    audience: PropTypes.bool,
    goal: PropTypes.bool,
    // When dealing with objects Formik sets touched as object during submission -> https://github.com/formium/formik/issues/1942
    imageData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    introduction: PropTypes.bool,
    name: PropTypes.bool,
    role: PropTypes.bool,
    situation: PropTypes.bool,
    // When dealing with objects Formik sets touched as object during submission -> https://github.com/formium/formik/issues/1942
    type: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }),
};

export const shapeEnityPanelListOfEntities = {
  __typename: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  uuid: PropTypes.string,
};

export const shapePlanGroup = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  statements: PropTypes.arrayOf(
    PropTypes.shape({
      archivedAt: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      step: PropTypes.number,
    })
  ),
});

export const shapePlan = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  groups: PropTypes.arrayOf(shapePlanGroup),
  id: PropTypes.string,
  name: PropTypes.string,
});

export const shapeUserInfo = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  status: PropTypes.string,
  username: PropTypes.string,
  uuid: PropTypes.string,
};

export const shapeEntity = {
  __typename: PropTypes.string,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    })
  ),
  name: PropTypes.string,
  parent: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      role: PropTypes.string,
      uuid: PropTypes.string,
    })
  ),
  uuid: PropTypes.string,
};

export const shapePagingComponents = PropTypes.shape({
  NextPage: PropTypes.func,
  PagingSlider: PropTypes.func,
  PerPageSelector: PropTypes.func,
  PreviousPage: PropTypes.func,
  RecordsInfo: PropTypes.func,
});

export const shapeSchoolClass = {
  __typename: PropTypes.string,
  name: PropTypes.string,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      uuid: PropTypes.string,
    })
  ),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      uuid: PropTypes.string,
    })
  ),
  uuid: PropTypes.string,
};

export const shapeStudent = PropTypes.shape({
  __typename: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  uuid: PropTypes.string,
});

export const shapeTeacher = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  schoolClasses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    })
  ),
  __typename: PropTypes.string,
  uuid: PropTypes.string,
};

export const shapeUser = {
  __typename: PropTypes.string,
  email: PropTypes.string,
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string,
    })
  ),
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  uuid: PropTypes.string,
};

export const shapeUnit = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  service: PropTypes.string,
  status: PropTypes.string,
  step: PropTypes.number,
});

export const shapeTrack = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  step: PropTypes.number,
  units: PropTypes.arrayOf(shapeUnit),
});

export const shapeCatalog = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
});

export const shapeCatalogForm = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    imageData: PropTypes.object,
    name: PropTypes.string,
    status: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    displayName: PropTypes.bool,
    // When dealing with objects Formik sets touched as object during submission -> https://github.com/formium/formik/issues/1942
    imageData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    name: PropTypes.bool,
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }),
};

export const shapeTrackForm = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    imageData: PropTypes.object,
    name: PropTypes.string,
    status: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    displayName: PropTypes.bool,
    // When dealing with objects Formik sets touched as object during submission -> https://github.com/formium/formik/issues/1942
    imageData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    name: PropTypes.bool,
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }),
};

export const shapeTaskFile = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  filename: PropTypes.string,
  id: PropTypes.string,
  step: PropTypes.string,
  url: PropTypes.string,
});

export const shapeCriteria = PropTypes.shape({
  id: PropTypes.string,
  rubricCriteriaLabelId: PropTypes.string,
  rubricHeadingId: PropTypes.string,
  text: PropTypes.string,
  uuid: PropTypes.string,
});

export const shapeCriteriaLabel = PropTypes.shape({
  displayName: PropTypes.string,
  id: PropTypes.string,
  score: PropTypes.number,
  uuid: PropTypes.string,
});

export const shapeHeading = PropTypes.shape({
  id: PropTypes.string,
  multiplier: PropTypes.number,
  name: PropTypes.string,
  uuid: PropTypes.string,
});

export const shapeRubric = PropTypes.shape({
  archivedAt: PropTypes.string,
  criteriaLabels: PropTypes.arrayOf(shapeCriteriaLabel),
  criterias: PropTypes.arrayOf(shapeCriteria),
  description: PropTypes.string,
  headings: PropTypes.arrayOf(shapeHeading),
  id: PropTypes.string,
  name: PropTypes.string,
  uuid: PropTypes.string,
});

export const shapeAssignment = PropTypes.shape({
  assetName: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  rubrics: PropTypes.arrayOf(shapeRubric),
});

export const shapeProduct = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  rubrics: PropTypes.arrayOf(shapeRubric),
  rubricsUrl: PropTypes.string,
  status: PropTypes.string,
  step: PropTypes.number,
});

export const shapeTask = PropTypes.shape({
  archivedAt: PropTypes.string,
  description: PropTypes.string,
  displayName: PropTypes.string,
  files: PropTypes.arrayOf(shapeTaskFile),
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  introduction: PropTypes.string,
  name: PropTypes.string,
  presentationUrl: PropTypes.string,
  products: PropTypes.arrayOf(shapeProduct),
  standard: PropTypes.string,
  status: PropTypes.string,
  studentResources: PropTypes.string,
  teachingResources: PropTypes.string,
});

export const shapeTaskForm = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    imageData: PropTypes.string,
    name: PropTypes.string,
    presentationUrl: PropTypes.string,
    standard: PropTypes.string,
    status: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    displayName: PropTypes.bool,
    imageData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    introduction: PropTypes.bool,
    name: PropTypes.bool,
    presentationUrl: PropTypes.bool,
    standard: PropTypes.bool,
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    studentResources: PropTypes.bool,
    teachingResources: PropTypes.bool,
  }),
};

export const shapeProductForm = {
  errors: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    rubricsUrl: PropTypes.string,
    status: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    description: PropTypes.bool,
    displayName: PropTypes.bool,
    name: PropTypes.bool,
    rubricsUrl: PropTypes.bool,
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }),
};

export const shapeResume = PropTypes.shape({
  filename: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
});

export const shapeStandardSet = PropTypes.shape({
  archivedAt: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  setId: PropTypes.string,
});

export const shapeStandardSetForm = {
  errors: PropTypes.shape({
    displayName: PropTypes.string,
  }),
  title: PropTypes.string,
  touched: PropTypes.shape({
    displayName: PropTypes.bool,
  }),
};
export const shapePersonalProjectFiles = PropTypes.shape({
  filename: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
});

export const shapePersonalProjects = PropTypes.shape({
  description: PropTypes.string,
  files: PropTypes.arrayOf(shapePersonalProjectFiles),
  id: PropTypes.string,
  name: PropTypes.string,
});
