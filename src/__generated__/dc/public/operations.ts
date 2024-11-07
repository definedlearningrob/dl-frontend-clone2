import * as Types from './types';

export type CourseBaseInfoFragment = { id: string, description: string | null, imageUrl: string, name: string };

export type CourseMetadataFragment = { metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } };

export type PublicCourseQueryVariables = Types.Exact<{
  shareId: Types.Scalars['ID']['input'];
  code: Types.Scalars['String']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type PublicCourseQuery = { course: { id: string, description: string | null, name: string, pathway: { name: string } | null, lessons: Array<{ name: string, archivedAt: string | null, hasPresentation: boolean, id: string, imageUrl: string, step: number | null, thumbnailUrl: string, type: string, description: { audience: string | null, introduction: string | null, goal: string | null, role: string | null, situation: string | null } | null, assignments: Array<{ description: string, displayName: string, id: string, step: number | null, rubrics: Array<{ description: string, id: string, name: string, uuid: string, criteriaLabels: Array<{ displayName: string | null, id: string, score: number, uuid: string }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string, uuid: string }>, headings: Array<{ id: string, multiplier: number, name: string, uuid: string }> }> }>, attachments: Array<{ description: string, displayName: string, id: string, step: number | null, files: Array<{ filename: string, id: string, url: string }> }>, careerReviewSurvey: { questions: Array<{ id: string }> } | null, checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, externalPresentations: Array<{ displayName: string, isExpandable: boolean, id: string, source: string, step: number }>, researchLinks: Array<{ author: string, displayName: string, id: string, resourceLink: string, sourceName: string, step: number }>, texts: Array<{ content: string, displayName: string, id: string, step: number }>, videos: Array<{ description: string, displayName: string, filename: string, id: string, step: number, url: string }>, vocabularies: Array<{ definition: string, id: string, step: number, term: string }> }> } | null };
