import * as Types from './types';

export type CourseDetailsFragment = { thumbnailUrl: string, name: string | null, pathwayName: string | null, onetData: { code: string, title: string, alsoCalled: Array<string>, whatTheyDo: string, education: Array<string>, onTheJob: Array<string>, personality: { title: string | null, elements: Array<string> } | null, jobOutlook: { salaryMedian: number | null, outlook: { category: string | null, description: string | null } | null, brightOutlook: { category: Array<string>, description: string | null } | null } | null, knowledge: Array<{ title: string | null, elements: Array<string> }>, skills: Array<{ title: string | null, elements: Array<string> }>, abilities: Array<{ title: string | null, elements: Array<string> }>, technology: Array<{ title: string | null, elements: Array<string> }>, alignedCourses: Array<{ id: string, name: string | null }> } | null };

export type PublicCourseDetailsQueryVariables = Types.Exact<{
  shareId: Types.Scalars['ID']['input'];
  code: Types.Scalars['String']['input'];
  courseId: Types.Scalars['ID']['input'];
}>;


export type PublicCourseDetailsQuery = { project: { course: { exploreMoreAvailable: boolean, thumbnailUrl: string, name: string | null, pathwayName: string | null, onetData: { code: string, title: string, alsoCalled: Array<string>, whatTheyDo: string, education: Array<string>, onTheJob: Array<string>, personality: { title: string | null, elements: Array<string> } | null, jobOutlook: { salaryMedian: number | null, outlook: { category: string | null, description: string | null } | null, brightOutlook: { category: Array<string>, description: string | null } | null } | null, knowledge: Array<{ title: string | null, elements: Array<string> }>, skills: Array<{ title: string | null, elements: Array<string> }>, abilities: Array<{ title: string | null, elements: Array<string> }>, technology: Array<{ title: string | null, elements: Array<string> }>, alignedCourses: Array<{ id: string, name: string | null }> } | null } } | null };

export type PublicProjectQueryVariables = Types.Exact<{
  shareId: Types.Scalars['ID']['input'];
  code: Types.Scalars['String']['input'];
  trackPresentation: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type PublicProjectQuery = { project: { description: string | null, displayName: string, id: string, introduction: string | null, presentationUrl: string | null, standard: string | null, studentResources: string | null, teachingResources: string | null, checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, courses: Array<{ id: string, name: string | null, thumbnailUrl: string, pathwayName: string | null }>, files: Array<{ description: string | null, displayName: string, filename: string, id: string, step: string, url: string }>, presentation: { color: string | null, description: string | null, displayName: string, id: string, name: string, status: Types.PresentationStatuses, transition: string | null, typography: string | null, type: Types.PresentationTypes, slides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null }> }>, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> }, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> } }> | null, products: Array<{ description: string | null, displayName: string, id: string, name: string, rubricsUrl: string | null, step: number | null, rubrics: Array<{ description: string, displayName: string, id: string, name: string, uuid: string, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string, uuid: string }>, headings: Array<{ id: string, multiplier: number, name: string, uuid: string }>, criteriaLabels: Array<{ displayName: string | null, id: string, score: number, uuid: string }> }> }> }> } | null, units: Array<{ displayName: string, id: string }> } | null };

export type PublicProjectProductsQueryVariables = Types.Exact<{
  shareId: Types.Scalars['ID']['input'];
  code: Types.Scalars['String']['input'];
}>;


export type PublicProjectProductsQuery = { project: { id: string, products: Array<{ id: string, description: string | null, displayName: string, name: string, rubrics: Array<{ description: string, id: string, name: string, displayName: string, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> }> } | null };

export type PublicProjectStandardsQueryVariables = Types.Exact<{
  shareId: Types.Scalars['ID']['input'];
  setId: Types.Scalars['String']['input'];
  code: Types.Scalars['String']['input'];
}>;


export type PublicProjectStandardsQuery = { project: { id: string, standards: Array<{ grade: string, standardNumber: string, standardText: string, subject: string }> } | null };

export type StandardSetsQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type StandardSetsQuery = { standardSets: Array<{ name: string, setId: string }> };
