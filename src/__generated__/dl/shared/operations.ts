import * as Types from './types';

export type CourseDetailsFragment = { thumbnailUrl: string, name: string | null, pathwayName: string | null, onetData: { code: string, title: string, alsoCalled: Array<string>, whatTheyDo: string, education: Array<string>, onTheJob: Array<string>, personality: { title: string | null, elements: Array<string> } | null, jobOutlook: { salaryMedian: number | null, outlook: { category: string | null, description: string | null } | null, brightOutlook: { category: Array<string>, description: string | null } | null } | null, knowledge: Array<{ title: string | null, elements: Array<string> }>, skills: Array<{ title: string | null, elements: Array<string> }>, abilities: Array<{ title: string | null, elements: Array<string> }>, technology: Array<{ title: string | null, elements: Array<string> }>, alignedCourses: Array<{ id: string, name: string | null }> } | null };

export type CreateProductSubmissionFileMutationVariables = Types.Exact<{
  input: Types.CreateProductSubmissionFileMutationInput;
}>;


export type CreateProductSubmissionFileMutation = { createProductSubmissionFile: { productSubmissionFile: { filename: string, id: string, source: string, url: string } | null } | null };

export type CreateProductSubmissionFileFromGoogleDriveMutationVariables = Types.Exact<{
  input: Types.CreateProductSubmissionFileFromGoogleDriveMutationInput;
}>;


export type CreateProductSubmissionFileFromGoogleDriveMutation = { createProductSubmissionFileFromGoogleDrive: { productSubmissionFile: { filename: string, googleWeblink: string | null, id: string, source: string, url: string } | null } | null };

export type DeleteProductSubmissionFileMutationVariables = Types.Exact<{
  input: Types.DeleteProductSubmissionFileMutationInput;
}>;


export type DeleteProductSubmissionFileMutation = { deleteProductSubmissionFile: { status: string | null, productSubmission: { id: string, productId: string, grade: { pointsScored: number, pointsAvailable: number, updatedAt: string } | null, files: Array<{ id: string }> } | null } | null };

export type TrackSlideVisitMutationVariables = Types.Exact<{
  input: Types.TrackSlideVisitMutationInput;
}>;


export type TrackSlideVisitMutation = { trackSlideVisit: { status: string | null, clientMutationId: string | null } | null };

export type CourseDetailsQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
  courseId: Types.Scalars['ID']['input'];
}>;


export type CourseDetailsQuery = { project: { course: { thumbnailUrl: string, name: string | null, pathwayName: string | null, onetData: { code: string, title: string, alsoCalled: Array<string>, whatTheyDo: string, education: Array<string>, onTheJob: Array<string>, personality: { title: string | null, elements: Array<string> } | null, jobOutlook: { salaryMedian: number | null, outlook: { category: string | null, description: string | null } | null, brightOutlook: { category: Array<string>, description: string | null } | null } | null, knowledge: Array<{ title: string | null, elements: Array<string> }>, skills: Array<{ title: string | null, elements: Array<string> }>, abilities: Array<{ title: string | null, elements: Array<string> }>, technology: Array<{ title: string | null, elements: Array<string> }>, alignedCourses: Array<{ id: string, name: string | null }> } | null } } };
