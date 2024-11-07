import { screen } from '@testing-library/react';
import React from 'react';
import { Route } from 'react-router-dom';

import { StudentCourseLessons } from '@dc/components/Student/Course/Lessons/Lessons';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const lessons = [
  {
    careerReviewSurvey: {
      performed: false,
      version: 1,
    },
    progress: {
      total: 2,
      submitted: 1,
    },
    id: '2',
    imageUrl: 'image-url',
    name: 'Lesson name 2',
    step: 2,
    type: 'lesson-type',
    thumbnailUrl: 'thumbnail-url',
  },
  {
    careerReviewSurvey: {
      performed: false,
      version: 1,
    },
    progress: {
      total: 2,
      submitted: 1,
    },
    id: '1',
    imageUrl: 'image-url',
    name: 'Lesson name',
    step: 1,
    type: 'lesson-type',
    thumbnailUrl: 'thumbnail-url',
  },
];

describe('Lessons', () => {
  it('should render a list of lessons correctly', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <Route path='course/:id'>
        <StudentCourseLessons courseProgress={{ total: 4, submitted: 2 }} lessons={lessons} />
      </Route>,
      { route: 'course/123' }
    );

    expect(screen.getAllByRole('link')).toHaveLength(2);

    expect(container).toMatchSnapshot();
  });
});
