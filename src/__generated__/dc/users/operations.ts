import * as Types from './types';

export type CourseBaseInfoFragment = { id: string, description: string | null, imageUrl: string, name: string };

export type CourseMetadataFragment = { metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } };

export type FinalReportCourseFragment = { id: string, name: string, description: string | null, assignments: Array<{ id: string, displayName: string | null, submission: { id: string, files: Array<{ id: string, filename: string, url: string }> } | null }> | null, pathway: { name: string, cluster: { name: string } } | null, reviewSurvey: { questions: Array<{ id: string, answer: Array<string | null>, question: string }> } | null };

export type ArchiveAssignmentMutationVariables = Types.Exact<{
  input: Types.ArchiveAssignmentMutationInput;
}>;


export type ArchiveAssignmentMutation = { archiveAssignment: { assignment: { archivedAt: string | null, id: string } } | null };

export type ArchiveAttachmentMutationVariables = Types.Exact<{
  input: Types.ArchiveAttachmentMutationInput;
}>;


export type ArchiveAttachmentMutation = { archiveAttachment: { attachment: { archivedAt: string | null, id: string } } | null };

export type ArchiveAttachmentFileMutationVariables = Types.Exact<{
  input: Types.ArchiveAttachmentFileMutationInput;
}>;


export type ArchiveAttachmentFileMutation = { archiveAttachmentFile: { attachmentFile: { archivedAt: string | null, id: string } } | null };

export type ArchiveBadgeMutationVariables = Types.Exact<{
  input: Types.ArchiveBadgeMutationInput;
}>;


export type ArchiveBadgeMutation = { archiveBadge: { badge: { archivedAt: string | null, id: string, imageUrl: string, name: string } | null } | null };

export type ArchiveCatalogMutationVariables = Types.Exact<{
  input: Types.ArchiveCatalogMutationInput;
}>;


export type ArchiveCatalogMutation = { archiveCatalog: { catalog: { archivedAt: string | null, id: string } } | null };

export type ArchiveCheckInGroupMutationVariables = Types.Exact<{
  input: Types.ArchiveCheckInGroupMutationInput;
}>;


export type ArchiveCheckInGroupMutation = { archiveCheckInGroup: { checkInGroup: { archivedAt: string | null, id: string } } | null };

export type DcArchiveCheckInQuestionMutationVariables = Types.Exact<{
  input: Types.ArchiveCheckInQuestionMutationInput;
}>;


export type DcArchiveCheckInQuestionMutation = { archiveCheckInQuestion: { checkInQuestion: { archivedAt: string | null, id: string } } | null };

export type ArchiveCourseMutationVariables = Types.Exact<{
  input: Types.ArchiveCourseMutationInput;
}>;


export type ArchiveCourseMutation = { archiveCourse: { course: { archivedAt: string | null, id: string } } | null };

export type ArchiveExtensionFieldMutationVariables = Types.Exact<{
  input: Types.ArchiveExtensionFieldMutationInput;
}>;


export type ArchiveExtensionFieldMutation = { archiveExtensionField: { extensionField: { id: string } } | null };

export type ArchiveExtensionFieldFileMutationVariables = Types.Exact<{
  input: Types.ArchiveExtensionFieldFileMutationInput;
}>;


export type ArchiveExtensionFieldFileMutation = { archiveExtensionFieldFile: { extensionFieldFile: { filename: string, id: string, url: string } } | null };

export type ArchiveExternalPresentationMutationVariables = Types.Exact<{
  input: Types.ArchiveExternalPresentationMutationInput;
}>;


export type ArchiveExternalPresentationMutation = { archiveExternalPresentation: { externalPresentation: { id: string, archivedAt: string | null } } | null };

export type ArchiveLessonMutationVariables = Types.Exact<{
  input: Types.ArchiveLessonMutationInput;
}>;


export type ArchiveLessonMutation = { archiveLesson: { lesson: { id: string, archivedAt: string | null } } | null };

export type ArchivePartnerMutationVariables = Types.Exact<{
  input: Types.ArchivePartnerMutationInput;
}>;


export type ArchivePartnerMutation = { archivePartner: { partner: { id: string, isArchived: boolean } } | null };

export type ArchivePlanMutationVariables = Types.Exact<{
  input: Types.ArchivePlanMutationInput;
}>;


export type ArchivePlanMutation = { archivePlan: { plan: { archivedAt: string | null, id: string } } | null };

export type ArchivePlanGroupMutationVariables = Types.Exact<{
  input: Types.ArchivePlanGroupMutationInput;
}>;


export type ArchivePlanGroupMutation = { archivePlanGroup: { planGroup: { archivedAt: string | null, id: string } } | null };

export type ArchivePlanGroupStatementMutationVariables = Types.Exact<{
  input: Types.ArchivePlanGroupStatementMutationInput;
}>;


export type ArchivePlanGroupStatementMutation = { archivePlanGroupStatement: { planGroupStatement: { archivedAt: string | null, id: string } } | null };

export type ArchiveProductMutationVariables = Types.Exact<{
  input: Types.ArchiveProductMutationInput;
}>;


export type ArchiveProductMutation = { archiveProduct: { product: { archivedAt: string | null, id: string } } | null };

export type ArchiveResearchLinkMutationVariables = Types.Exact<{
  input: Types.ArchiveResearchLinkMutationInput;
}>;


export type ArchiveResearchLinkMutation = { archiveResearchLink: { researchLink: { archivedAt: string | null, id: string } } | null };

export type ArchiveRubricMutationVariables = Types.Exact<{
  input: Types.ArchiveRubricMutationInput;
}>;


export type ArchiveRubricMutation = { archiveRubric: { rubric: { archivedAt: string | null, id: string } } | null };

export type ArchiveSlideMutationVariables = Types.Exact<{
  input: Types.ArchiveSlideMutationInput;
}>;


export type ArchiveSlideMutation = { archiveSlide: { slide: { id: string } } | null };

export type ArchiveSlideBackgroundImageMutationVariables = Types.Exact<{
  input: Types.ArchiveSlideBackgroundImageMutationInput;
}>;


export type ArchiveSlideBackgroundImageMutation = { archiveSlideBackgroundImage: { slideBackgroundImage: { id: string } } | null };

export type ArchiveSlideImageMutationVariables = Types.Exact<{
  input: Types.ArchiveSlideImageMutationInput;
}>;


export type ArchiveSlideImageMutation = { archiveSlideImage: { slideImage: { id: string } } | null };

export type ArchiveSlideVideoMutationVariables = Types.Exact<{
  input: Types.ArchiveSlideVideoMutationInput;
}>;


export type ArchiveSlideVideoMutation = { archiveSlideVideo: { slideVideo: { id: string } } | null };

export type ArchiveTaskMutationVariables = Types.Exact<{
  input: Types.ArchiveTaskMutationInput;
}>;


export type ArchiveTaskMutation = { archiveTask: { task: { archivedAt: string | null, id: string } } | null };

export type ArchiveTextMutationVariables = Types.Exact<{
  input: Types.ArchiveTextMutationInput;
}>;


export type ArchiveTextMutation = { archiveText: { text: { archivedAt: string | null, id: string } } | null };

export type ArchiveTrackMutationVariables = Types.Exact<{
  input: Types.ArchiveTrackMutationInput;
}>;


export type ArchiveTrackMutation = { archiveTrack: { track: { archivedAt: string | null, id: string } } | null };

export type ArchiveUnitMutationVariables = Types.Exact<{
  input: Types.ArchiveUnitMutationInput;
}>;


export type ArchiveUnitMutation = { archiveUnit: { unit: { archivedAt: string | null, description: string | null, id: string, imageUrl: string, name: string } } | null };

export type ArchiveVideoMutationVariables = Types.Exact<{
  input: Types.ArchiveVideoMutationInput;
}>;


export type ArchiveVideoMutation = { archiveVideo: { video: { archivedAt: string | null, id: string } } | null };

export type ArchiveVirtualInternshipMutationVariables = Types.Exact<{
  input: Types.ArchiveVirtualInternshipMutationInput;
}>;


export type ArchiveVirtualInternshipMutation = { archiveVirtualInternship: { virtualInternship: { id: string } | null } | null };

export type ArchiveVocabularyMutationVariables = Types.Exact<{
  input: Types.ArchiveVocabularyMutationInput;
}>;


export type ArchiveVocabularyMutation = { archiveVocabulary: { vocabulary: { archivedAt: string | null, id: string } } | null };

export type AssignExtensionFieldToEntityMutationVariables = Types.Exact<{
  input: Types.AssignExtensionFieldToEntityMutationInput;
}>;


export type AssignExtensionFieldToEntityMutation = { assignExtensionFieldToEntity: { extensionField: { id: string } | null } | null };

export type AssignPlanToEntityMutationVariables = Types.Exact<{
  input: Types.AssignPlanToEntityMutationInput;
}>;


export type AssignPlanToEntityMutation = { assignPlanToEntity: { plan: { id: string } | null } | null };

export type AssignSchoolClassToCourseMutationVariables = Types.Exact<{
  input: Types.AssignSchoolClassToCourseMutationInput;
}>;


export type AssignSchoolClassToCourseMutation = { assignSchoolClassToCourse: { status: string } | null };

export type AssignStandardSetToEntityMutationVariables = Types.Exact<{
  input: Types.AssignStandardSetToEntityMutationInput;
}>;


export type AssignStandardSetToEntityMutation = { assignStandardSetToEntity: { standardSet: { id: string, entities: { nodes: Array<{ uuid: string, standardSets: Array<{ id: string }> | null }> } } | null } | null };

export type AssignStudentToCourseMutationVariables = Types.Exact<{
  input: Types.AssignStudentToCourseMutationInput;
}>;


export type AssignStudentToCourseMutation = { assignStudentToCourse: { course: { id: string, imageUrl: string, name: string, status: Types.CourseStatuses, progress: { submitted: number, total: number }, pathway: { name: string } | null } } | null };

export type AssignStudentsToCounselorMutationVariables = Types.Exact<{
  input: Types.AssignStudentsToCounselorMutationInput;
}>;


export type AssignStudentsToCounselorMutation = { assignStudentsToCounselor: { students: Array<{ uuid: string, counselor: { uuid: string, fullName: string | null } | null }> } | null };

export type ClearCacheMutationVariables = Types.Exact<{
  input: Types.ClearCacheMutationInput;
}>;


export type ClearCacheMutation = { clearCache: { status: string } | null };

export type CreateAnnouncementMutationVariables = Types.Exact<{
  input: Types.CreateAnnouncementMutationInput;
}>;


export type CreateAnnouncementMutation = { createAnnouncement: { announcement: { body: string, createdAt: string, id: string, name: string, author: { uuid: string, firstName: string | null, lastName: string | null }, target: { name: string | null, uuid: string } } } | null };

export type CreateAssignmentMutationVariables = Types.Exact<{
  input: Types.CreateAssignmentMutationInput;
}>;


export type CreateAssignmentMutation = { createAssignment: { assignment: { assetName: string, description: string, displayName: string | null, id: string, rubrics: Array<{ id: string, name: string, description: string }> } | null } | null };

export type CreateAttachmentMutationVariables = Types.Exact<{
  input: Types.CreateAttachmentMutationInput;
}>;


export type CreateAttachmentMutation = { createAttachment: { attachment: { description: string, displayName: string | null, id: string, name: string } | null } | null };

export type CreateAttachmentFileMutationVariables = Types.Exact<{
  input: Types.CreateAttachmentFileMutationInput;
}>;


export type CreateAttachmentFileMutation = { createAttachmentFile: { attachmentFile: { id: string } | null } | null };

export type CreateBadgeMutationVariables = Types.Exact<{
  input: Types.CreateBadgeMutationInput;
}>;


export type CreateBadgeMutation = { createBadge: { badge: { archivedAt: string | null, id: string, imageUrl: string, name: string } | null } | null };

export type CreateCatalogMutationVariables = Types.Exact<{
  input: Types.CreateCatalogMutationInput;
}>;


export type CreateCatalogMutation = { createCatalog: { catalog: { description: string | null, displayName: string | null, id: string, imageUrl: string, name: string } | null } | null };

export type CreateCheckInGroupMutationVariables = Types.Exact<{
  input: Types.CreateCheckInGroupMutationInput;
}>;


export type CreateCheckInGroupMutation = { createCheckInGroup: { checkInGroup: { archivedAt: string | null, displayName: string | null, id: string, name: string, step: number | null, questions: Array<{ archivedAt: string | null, id: string, question: string, step: number | null }> } | null } | null };

export type DcCreateCheckInQuestionMutationVariables = Types.Exact<{
  input: Types.CreateCheckInQuestionMutationInput;
}>;


export type DcCreateCheckInQuestionMutation = { createCheckInQuestion: { checkInQuestion: { archivedAt: string | null, id: string, question: string, step: number | null } | null } | null };

export type CreateCourseMutationVariables = Types.Exact<{
  input: Types.CreateCourseMutationInput;
}>;


export type CreateCourseMutation = { createCourse: { course: { description: string | null, id: string, imageUrl: string, name: string, collection: { id: string, name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } } | null } | null };

export type CreateExtensionMutationVariables = Types.Exact<{
  input: Types.CreateExtensionFieldMutationInput;
}>;


export type CreateExtensionMutation = { createExtensionField: { extensionField: { id: string, name: string, description: string } | null } | null };

export type CreateExtensionFieldFileMutationVariables = Types.Exact<{
  input: Types.CreateExtensionFieldFileMutationInput;
}>;


export type CreateExtensionFieldFileMutation = { createExtensionFieldFile: { extensionFieldFile: { filename: string, id: string, url: string } | null } | null };

export type CreateExternalPresentationMutationVariables = Types.Exact<{
  input: Types.CreateExternalPresentationMutationInput;
}>;


export type CreateExternalPresentationMutation = { createExternalPresentation: { externalPresentation: { displayName: string | null, id: string, name: string, source: string } | null } | null };

export type CreateLessonMutationVariables = Types.Exact<{
  input: Types.CreateLessonMutationInput;
}>;


export type CreateLessonMutation = { createLesson: { lesson: { id: string, imageUrl: string, name: string } | null } | null };

export type CreatePartnerMutationVariables = Types.Exact<{
  input: Types.CreatePartnerMutationInput;
}>;


export type CreatePartnerMutation = { createPartner: { partner: { about: string, additionalUrls: Array<string> | null, address: string | null, coursesCount: number, details: string | null, email: string | null, id: string, imageUrl: string | null, imageFitToContainer: boolean, isArchived: boolean, name: string, opportunitiesCount: number, phone: string | null, status: Types.PartnerStatuses, thumbnailUrl: string | null, url: string | null, virtualInternshipsCount: number, visibilityScope: Types.VisibilityScope } | null } | null };

export type CreatePartnerFileMutationVariables = Types.Exact<{
  input: Types.CreatePartnerFileMutationInput;
}>;


export type CreatePartnerFileMutation = { createPartnerFile: { partnerFile: { createdAt: string, filename: string, id: string, url: string, submitter: { uuid: string, firstName: string | null, lastName: string | null } } | null } | null };

export type CreatePlanMutationVariables = Types.Exact<{
  input: Types.CreatePlanMutationInput;
}>;


export type CreatePlanMutation = { createPlan: { plan: { archivedAt: string | null, description: string | null, id: string, name: string, groups: Array<{ archivedAt: string | null, description: string | null, displayName: string, id: string, name: string, statements: Array<{ id: string, name: string, step: number | null }> }> } | null } | null };

export type CreatePlanGroupMutationVariables = Types.Exact<{
  input: Types.CreatePlanGroupMutationInput;
}>;


export type CreatePlanGroupMutation = { createPlanGroup: { planGroup: { id: string, description: string | null, displayName: string, name: string } | null } | null };

export type CreatePlanGroupStatementMutationVariables = Types.Exact<{
  input: Types.CreatePlanGroupStatementMutationInput;
}>;


export type CreatePlanGroupStatementMutation = { createPlanGroupStatement: { planGroupStatement: { archivedAt: string | null, id: string, name: string, step: number | null, isRequired: boolean, question: { text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ option: string, step: number }> } | null } | null } | null };

export type CreatePresentationMutationVariables = Types.Exact<{
  input: Types.CreatePresentationMutationInput;
}>;


export type CreatePresentationMutation = { createPresentation: { presentation: { id: string, name: string } | null } | null };

export type CreateProductMutationVariables = Types.Exact<{
  input: Types.CreateProductMutationInput;
}>;


export type CreateProductMutation = { createProduct: { product: { description: string | null, displayName: string | null, id: string, rubricsUrl: string | null, name: string } | null } | null };

export type CreateResearchLinkMutationVariables = Types.Exact<{
  input: Types.CreateResearchLinkMutationInput;
}>;


export type CreateResearchLinkMutation = { createResearchLink: { researchLink: { author: string | null, displayName: string | null, id: string, name: string, resourceLink: string, sourceName: string } | null } | null };

export type CreateRubricMutationVariables = Types.Exact<{
  input: Types.CreateRubricMutationInput;
}>;


export type CreateRubricMutation = { createRubric: { rubric: { description: string, displayName: string | null, id: string, name: string } | null } | null };

export type CreateSlideMutationVariables = Types.Exact<{
  input: Types.CreateSlideMutationInput;
}>;


export type CreateSlideMutation = { createSlide: { slide: { backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, isShared: boolean, name: string, notes: string | null, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ contentId: string, url: string | null }> } } | null } | null };

export type CreateSlideBackgroundImageMutationVariables = Types.Exact<{
  input: Types.CreateSlideBackgroundImageMutationInput;
}>;


export type CreateSlideBackgroundImageMutation = { createSlideBackgroundImage: { slideBackgroundImage: { id: string, thumbnailUrl: string, url: string } | null } | null };

export type CreateSlideImageMutationVariables = Types.Exact<{
  input: Types.CreateSlideImageMutationInput;
}>;


export type CreateSlideImageMutation = { createSlideImage: { slideImage: { contentId: string, id: string, url: string, style: string, thumbnailUrl: string } | null } | null };

export type CreateSlideVideoMutationVariables = Types.Exact<{
  input: Types.CreateSlideVideoMutationInput;
}>;


export type CreateSlideVideoMutation = { createSlideVideo: { slideVideo: { id: string, contentId: string, url: string | null, videoUrl: string | null, filename: string | null } | null } | null };

export type CreateTagMutationVariables = Types.Exact<{
  input: Types.CreateTagMutationInput;
}>;


export type CreateTagMutation = { createTag: { tag: { hasRubricHeadings: boolean, id: string, name: string, type: Types.TagTypes, rubricHeadings: { nodes: Array<{ id: string, name: string, multiplier: number }> } } | null } | null };

export type CreateTaskMutationVariables = Types.Exact<{
  input: Types.CreateTaskMutationInput;
}>;


export type CreateTaskMutation = { createTask: { task: { id: string } | null } | null };

export type CreateTaskFileMutationVariables = Types.Exact<{
  input: Types.CreateTaskFileMutationInput;
}>;


export type CreateTaskFileMutation = { createTaskFile: { taskFile: { id: string, filename: string, url: string, step: number | null } | null } | null };

export type CreateTaskProductMutationVariables = Types.Exact<{
  input: Types.CreateProductMutationInput;
}>;


export type CreateTaskProductMutation = { createProduct: { product: { id: string, displayName: string | null, description: string | null } | null } | null };

export type CreateTextMutationVariables = Types.Exact<{
  input: Types.CreateTextMutationInput;
}>;


export type CreateTextMutation = { createText: { text: { content: string, displayName: string | null, id: string, name: string } | null } | null };

export type CreateTrackMutationVariables = Types.Exact<{
  input: Types.CreateTrackMutationInput;
}>;


export type CreateTrackMutation = { createTrack: { track: { id: string } | null } | null };

export type CreateUnitMutationVariables = Types.Exact<{
  input: Types.CreateUnitMutationInput;
}>;


export type CreateUnitMutation = { createUnit: { unit: { description: string | null, displayName: string | null, id: string, imageUrl: string, name: string } | null } | null };

export type CreateVideoMutationVariables = Types.Exact<{
  input: Types.CreateVideoMutationInput;
}>;


export type CreateVideoMutation = { createVideo: { video: { description: string, displayName: string | null, filename: string, name: string, id: string, url: string } | null } | null };

export type CreateVirtualInternshipMutationVariables = Types.Exact<{
  input: Types.CreateVirtualInternshipMutationInput;
}>;


export type CreateVirtualInternshipMutation = { createVirtualInternship: { virtualInternship: { archivedAt: string | null, id: string, requiredExperiences: number, opportunity: { id: string, name: string, availableSpots: number | null, creditsOutcomes: string | null, description: string, imageUrl: string | null, opportunityType: Types.OpportunityTypes, tags: Array<string>, pathways: Array<{ id: string, name: string }> } } | null } | null };

export type CreateVocabularyMutationVariables = Types.Exact<{
  input: Types.CreateVocabularyMutationInput;
}>;


export type CreateVocabularyMutation = { createVocabulary: { vocabulary: { definition: string, id: string, term: string } | null } | null };

export type DeletePartnerFileMutationVariables = Types.Exact<{
  input: Types.DeletePartnerFileMutationInput;
}>;


export type DeletePartnerFileMutation = { deletePartnerFile: { partnerFile: { id: string } | null } | null };

export type DeleteTagMutationVariables = Types.Exact<{
  input: Types.DeleteTagMutationInput;
}>;


export type DeleteTagMutation = { deleteTag: { status: string | null } | null };

export type DuplicateCourseMutationVariables = Types.Exact<{
  input: Types.DuplicateCourseMutationInput;
}>;


export type DuplicateCourseMutation = { duplicateCourse: { course: { id: string } | null } | null };

export type DuplicateRubricMutationVariables = Types.Exact<{
  input: Types.DuplicateRubricMutationInput;
}>;


export type DuplicateRubricMutation = { duplicateRubric: { rubric: { id: string } | null } | null };

export type GenerateAssessmentReportMutationVariables = Types.Exact<{
  input: Types.GenerateAssessmentReportMutationInput;
}>;


export type GenerateAssessmentReportMutation = { generateAssessmentReport: { assessmentReport: { id: string } | null } | null };

export type GenerateCareerExplorationReportMutationVariables = Types.Exact<{
  input: Types.GeneratePathwayReportMutationInput;
}>;


export type GenerateCareerExplorationReportMutation = { generatePathwayReport: { pathwayReport: { id: string } | null } | null };

export type GenerateCareerReviewSurveyReportMutationVariables = Types.Exact<{
  input: Types.GenerateCareerReviewSurveyReportMutationInput;
}>;


export type GenerateCareerReviewSurveyReportMutation = { generateCareerReviewSurveyReport: { report: { id: string, url: string | null, uploadStatus: Types.ReportUploadStatuses | null } | null } | null };

export type GenerateCourseReportMutationVariables = Types.Exact<{
  input: Types.GenerateCourseReportMutationInput;
}>;


export type GenerateCourseReportMutation = { generateCourseReport: { courseReport: { id: string } | null } | null };

export type GenerateOpportunityReportMutationVariables = Types.Exact<{
  input: Types.GenerateOpportunityReportMutationInput;
}>;


export type GenerateOpportunityReportMutation = { generateOpportunityReport: { opportunityReport: { id: string } | null } | null };

export type GeneratePlanReportMutationVariables = Types.Exact<{
  input: Types.GeneratePlanReportMutationInput;
}>;


export type GeneratePlanReportMutation = { generatePlanReport: { planReport: { id: string } | null } | null };

export type GeneratePresignedUploadUrlMutationVariables = Types.Exact<{
  input: Types.GeneratePresignedUploadUrlMutationInput;
}>;


export type GeneratePresignedUploadUrlMutation = { generatePresignedUploadUrl: { url: string, uuid: string } | null };

export type GradeAssignmentSubmissionMutationVariables = Types.Exact<{
  input: Types.GradeAssignmentSubmissionMutationInput;
}>;


export type GradeAssignmentSubmissionMutation = { gradeAssignmentSubmission: { grade: { pointsAvailable: number, pointsScored: number, lastGradedBy: { firstName: string | null, lastName: string | null } | null, results: Array<{ criteriaId: string, trait: string | null }> } | null } | null };

export type GradeSubmissionMutationVariables = Types.Exact<{
  input: Types.GradeSubmissionMutationInput;
}>;


export type GradeSubmissionMutation = { gradeSubmission: { submissionGrade: { id: string, status: Types.SubmissionGradeStatuses } } | null };

export type LockStatementMutationVariables = Types.Exact<{
  input: Types.LockStatementMutationInput;
  planId: Types.Scalars['ID']['input'];
}>;


export type LockStatementMutation = { lockStatement: { student: { uuid: string, plan: { groups: Array<{ id: string, statements: Array<{ id: string, isLocked: boolean }> }> } } | null } | null };

export type PerformContractsSyncMutationVariables = Types.Exact<{
  input: Types.PerformContractsSyncMutationInput;
}>;


export type PerformContractsSyncMutation = { performContractsSync: { status: string } | null };

export type PerformFullContractSyncMutationVariables = Types.Exact<{
  input: Types.PerformFullContractSyncMutationInput;
}>;


export type PerformFullContractSyncMutation = { performFullContractSync: { status: string } | null };

export type RecommendOpportunityMutationVariables = Types.Exact<{
  input: Types.RecommendOpportunityMutationInput;
}>;


export type RecommendOpportunityMutation = { recommendOpportunity: { status: string | null } | null };

export type ResetPostSecondaryApplicationsForStudentsMutationVariables = Types.Exact<{
  input: Types.ResetPostSecondaryApplicationsForStudentMutationInput;
}>;


export type ResetPostSecondaryApplicationsForStudentsMutation = { resetPostSecondaryApplicationsForStudent: { student: { uuid: string, postSecondaryApplicationsStatus: { isEnabled: boolean, isOverridden: boolean } } } | null };

export type RestoreCatalogMutationVariables = Types.Exact<{
  input: Types.RestoreCatalogMutationInput;
}>;


export type RestoreCatalogMutation = { restoreCatalog: { catalog: { archivedAt: string | null, id: string } } | null };

export type RestoreExtensionFieldMutationVariables = Types.Exact<{
  input: Types.RestoreExtensionFieldMutationInput;
}>;


export type RestoreExtensionFieldMutation = { restoreExtensionField: { extensionField: { archivedAt: string | null, id: string } } | null };

export type RestorePartnerMutationVariables = Types.Exact<{
  input: Types.RestorePartnerMutationInput;
}>;


export type RestorePartnerMutation = { restorePartner: { partner: { id: string, isArchived: boolean } } | null };

export type RestoreTrackMutationVariables = Types.Exact<{
  input: Types.RestoreTrackMutationInput;
}>;


export type RestoreTrackMutation = { restoreTrack: { track: { archivedAt: string | null, id: string } } | null };

export type RestoreUnitMutationVariables = Types.Exact<{
  input: Types.RestoreUnitMutationInput;
}>;


export type RestoreUnitMutation = { restoreUnit: { unit: { archivedAt: string | null, description: string | null, id: string, imageUrl: string, name: string } } | null };

export type SetEntityTagsMutationVariables = Types.Exact<{
  input: Types.SetEntityTagsMutationInput;
}>;


export type SetEntityTagsMutation = { setEntityTags: { entity: { uuid: string, tags: Array<{ id: string }> | null, children: { nodes: Array<{ uuid: string, tags: Array<{ id: string }> | null }> } | null } } | null };

export type ShareResourceMutationVariables = Types.Exact<{
  input: Types.ShareResourceMutationInput;
}>;


export type ShareResourceMutation = { shareResource: { sharedResource: { allowLogin: boolean, code: string } } | null };

export type SyncStandardSetsMutationVariables = Types.Exact<{
  input: Types.SyncStandardSetsMutationInput;
}>;


export type SyncStandardSetsMutation = { syncStandardSets: { status: string } | null };

export type ToggleEntityReportMutationVariables = Types.Exact<{
  input: Types.ToggleEntityReportTypeAvailabilityMutationInput;
}>;


export type ToggleEntityReportMutation = { toggleEntityReportTypeAvailability: { entity: { uuid: string, reportTypes: Array<Types.ReportTypes> | null, children: { nodes: Array<{ uuid: string, reportTypes: Array<Types.ReportTypes> | null }> } | null } } | null };

export type TogglePostSecondaryApplicationsForStudentsMutationVariables = Types.Exact<{
  input: Types.TogglePostSecondaryApplicationsForStudentsMutationInput;
}>;


export type TogglePostSecondaryApplicationsForStudentsMutation = { togglePostSecondaryApplicationsForStudents: { students: Array<{ uuid: string, postSecondaryApplicationsStatus: { isEnabled: boolean, isOverridden: boolean } }> } | null };

export type UnassignExtensionFieldToEntityMutationVariables = Types.Exact<{
  input: Types.UnassignExtensionFieldFromEntityMutationInput;
}>;


export type UnassignExtensionFieldToEntityMutation = { unassignExtensionFieldFromEntity: { extensionField: { id: string } | null } | null };

export type UnassignPlanFromEntityMutationVariables = Types.Exact<{
  input: Types.UnassignPlanFromEntityMutationInput;
}>;


export type UnassignPlanFromEntityMutation = { unassignPlanFromEntity: { plan: { id: string } | null } | null };

export type UnassignSchoolClassFromCourseMutationVariables = Types.Exact<{
  input: Types.UnassignSchoolClassFromCourseMutationInput;
}>;


export type UnassignSchoolClassFromCourseMutation = { unassignSchoolClassFromCourse: { status: string } | null };

export type UnassignStandardSetFromEntityMutationVariables = Types.Exact<{
  input: Types.UnassignStandardSetFromEntityMutationInput;
}>;


export type UnassignStandardSetFromEntityMutation = { unassignStandardSetFromEntity: { standardSet: { id: string, entities: { nodes: Array<{ uuid: string, standardSets: Array<{ id: string }> | null }> } } | null } | null };

export type UnassignStudentFromCourseMutationVariables = Types.Exact<{
  input: Types.UnassignStudentFromCourseMutationInput;
}>;


export type UnassignStudentFromCourseMutation = { unassignStudentFromCourse: { courseId: string } | null };

export type UnlockStatementMutationVariables = Types.Exact<{
  input: Types.UnlockStatementMutationInput;
  planId: Types.Scalars['ID']['input'];
}>;


export type UnlockStatementMutation = { unlockStatement: { student: { uuid: string, plan: { groups: Array<{ id: string, statements: Array<{ id: string, isLocked: boolean }> }> } } | null } | null };

export type UnsubmitCommonAppFormResponsesMutationVariables = Types.Exact<{
  input: Types.UnsubmitCommonAppFormResponsesMutationInput;
}>;


export type UnsubmitCommonAppFormResponsesMutation = { unsubmitCommonAppFormResponses: { status: string } | null };

export type UpdateAssignmentMutationVariables = Types.Exact<{
  input: Types.UpdateAssignmentMutationInput;
}>;


export type UpdateAssignmentMutation = { updateAssignment: { assignment: { assetName: string, description: string, displayName: string | null, id: string, badges: Array<{ id: string, name: string, imageUrl: string }>, rubrics: Array<{ id: string, description: string, name: string }> } | null } | null };

export type UpdateAttachmentMutationVariables = Types.Exact<{
  input: Types.UpdateAttachmentMutationInput;
}>;


export type UpdateAttachmentMutation = { updateAttachment: { attachment: { description: string, displayName: string | null, id: string, name: string } | null } | null };

export type UpdateBadgeMutationVariables = Types.Exact<{
  input: Types.UpdateBadgeMutationInput;
}>;


export type UpdateBadgeMutation = { updateBadge: { badge: { archivedAt: string | null, id: string, description: string, imageUrl: string, name: string } | null } | null };

export type UpdateCatalogMutationVariables = Types.Exact<{
  input: Types.UpdateCatalogMutationInput;
}>;


export type UpdateCatalogMutation = { updateCatalog: { catalog: { description: string | null, displayName: string | null, id: string, imageUrl: string, name: string, status: Types.CatalogStatuses } | null } | null };

export type UpdateCheckInGroupMutationVariables = Types.Exact<{
  input: Types.UpdateCheckInGroupMutationInput;
}>;


export type UpdateCheckInGroupMutation = { updateCheckInGroup: { checkInGroup: { archivedAt: string | null, displayName: string | null, id: string, name: string, step: number | null, questions: Array<{ archivedAt: string | null, id: string, question: string, step: number | null }> } | null } | null };

export type DcUpdateCheckInQuestionMutationVariables = Types.Exact<{
  input: Types.UpdateCheckInQuestionMutationInput;
}>;


export type DcUpdateCheckInQuestionMutation = { updateCheckInQuestion: { checkInQuestion: { archivedAt: string | null, id: string, question: string, step: number | null } | null } | null };

export type UpdateContractMutationVariables = Types.Exact<{
  input: Types.UpdateContractMutationInput;
}>;


export type UpdateContractMutation = { updateContract: { contract: { id: string, uuid: string, syncable: boolean } | null } | null };

export type UpdateCourseMutationVariables = Types.Exact<{
  input: Types.UpdateCourseMutationInput;
}>;


export type UpdateCourseMutation = { updateCourse: { course: { description: string | null, displayName: string, id: string, imageUrl: string, name: string, collection: { id: string, name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } } | null } | null };

export type UpdateEntityMutationVariables = Types.Exact<{
  input: Types.UpdateEntityMutationInput;
}>;


export type UpdateEntityMutation = { updateEntity: { entity: { uuid: string, dcIconUrl: string | null, dcLogoUrl: string | null, dlIconUrl: string | null, dlLogoUrl: string | null, welcomeMessage: { dcStudent: string | null, dcTeacher: string | null, dlStudent: string | null, dlTeacher: string | null } | null } | null } | null };

export type UpdateEntityCatalogsMutationVariables = Types.Exact<{
  input: Types.UpdateEntityCatalogsMutationInput;
}>;


export type UpdateEntityCatalogsMutation = { updateEntityCatalogs: { entity: { uuid: string, name: string | null } | null } | null };

export type UpdateEntityPlansMutationVariables = Types.Exact<{
  input: Types.UpdateEntityPlansMutationInput;
}>;


export type UpdateEntityPlansMutation = { updateEntityPlans: { entity: { uuid: string, name: string | null } | null } | null };

export type DcUpdateEntitySettingsMutationVariables = Types.Exact<{
  input: Types.UpdateEntitySettingsMutationInput;
}>;


export type DcUpdateEntitySettingsMutation = { updateEntitySettings: { entity: { uuid: string, settings: { assessmentEnabled: boolean, assessmentType: Types.AssessmentTypes, onboardingEnabled: boolean, opportunitiesEnabled: boolean, postSecondaryApplicationsEnabled: boolean, classManagementEnabled: boolean, selfEvaluationEnabled: boolean }, schoolClasses: { nodes: Array<{ uuid: string, settings: { assessmentType: Types.AssessmentTypes }, students: { nodes: Array<{ uuid: string, settings: { assessmentEnabled: { origin: Types.StudentSettingsOrigins, value: boolean }, assessmentType: { origin: Types.StudentSettingsOrigins, value: Types.AssessmentTypes }, onboardingEnabled: { origin: Types.StudentSettingsOrigins, value: boolean } } }> } }> } | null } | null } | null };

export type UpdateExtensionFieldMutationVariables = Types.Exact<{
  input: Types.UpdateExtensionFieldMutationInput;
}>;


export type UpdateExtensionFieldMutation = { updateExtensionField: { extensionField: { description: string, id: string, imageUrl: string | null, name: string, publishedFrom: string | null, publishedTo: string | null, status: Types.ExtensionFieldStatuses, clusters: Array<{ id: string, name: string }>, courses: Array<{ id: string, name: string }>, files: Array<{ id: string, filename: string, url: string }>, links: Array<{ name: string, url: string }>, pathways: Array<{ id: string, name: string }> } | null } | null };

export type UpdateExtensionFieldStatusMutationVariables = Types.Exact<{
  input: Types.UpdateExtensionFieldMutationInput;
}>;


export type UpdateExtensionFieldStatusMutation = { updateExtensionField: { extensionField: { id: string, status: Types.ExtensionFieldStatuses } | null } | null };

export type UpdateExternalPresentationMutationVariables = Types.Exact<{
  input: Types.UpdateExternalPresentationMutationInput;
}>;


export type UpdateExternalPresentationMutation = { updateExternalPresentation: { externalPresentation: { displayName: string | null, isExpandable: boolean, id: string, name: string, source: string } | null } | null };

export type UpdateLessonMutationVariables = Types.Exact<{
  input: Types.UpdateLessonMutationInput;
}>;


export type UpdateLessonMutation = { updateLesson: { lesson: { id: string, imageUrl: string, name: string, type: string, assignments: Array<{ assetName: string, description: string, displayName: string | null, id: string, step: number | null }>, attachments: Array<{ description: string, displayName: string | null, id: string, name: string, step: number | null, files: Array<{ filename: string, id: string, url: string }> }>, description: { introduction: string | null, goal: string | null, role: string | null, audience: string | null, situation: string | null } | null, externalPresentations: Array<{ displayName: string | null, id: string, name: string, source: string }>, researchLinks: Array<{ author: string | null, displayName: string | null, id: string, name: string, resourceLink: string, sourceName: string, step: number | null }>, texts: Array<{ content: string, displayName: string | null, id: string, name: string, step: number | null }>, videos: Array<{ description: string, displayName: string | null, filename: string, id: string, name: string, url: string, step: number | null }>, vocabularies: Array<{ definition: string, id: string, step: number | null, term: string }> } | null } | null };

export type UpdateOpportunityApplicationMutationVariables = Types.Exact<{
  input: Types.UpdateOpportunityApplicationMutationInput;
}>;


export type UpdateOpportunityApplicationMutation = { updateOpportunityApplication: { application: { status: Types.ApplicationStatus, lastChangedBy: { name: string | null } | null } | null } | null };

export type UpdatePartnerMutationVariables = Types.Exact<{
  input: Types.UpdatePartnerMutationInput;
}>;


export type UpdatePartnerMutation = { updatePartner: { partner: { about: string, additionalUrls: Array<string> | null, address: string | null, coursesCount: number, details: string | null, email: string | null, id: string, imageUrl: string | null, imageFitToContainer: boolean, isArchived: boolean, name: string, opportunitiesCount: number, phone: string | null, status: Types.PartnerStatuses, thumbnailUrl: string | null, url: string | null, virtualInternshipsCount: number, visibilityScope: Types.VisibilityScope } | null } | null };

export type UpdatePartnerStatusMutationVariables = Types.Exact<{
  input: Types.UpdatePartnerMutationInput;
}>;


export type UpdatePartnerStatusMutation = { updatePartner: { partner: { id: string, status: Types.PartnerStatuses } | null } | null };

export type UpdatePlanMutationVariables = Types.Exact<{
  input: Types.UpdatePlanMutationInput;
}>;


export type UpdatePlanMutation = { updatePlan: { plan: { archivedAt: string | null, description: string | null, id: string, name: string, groups: Array<{ archivedAt: string | null, description: string | null, displayName: string, id: string, name: string, step: number | null, statements: Array<{ id: string, name: string, step: number | null }> }> } | null } | null };

export type UpdatePlanGroupMutationVariables = Types.Exact<{
  input: Types.UpdatePlanGroupMutationInput;
}>;


export type UpdatePlanGroupMutation = { updatePlanGroup: { planGroup: { description: string | null, displayName: string, id: string, name: string, statements: Array<{ id: string, step: number | null }> } | null } | null };

export type UpdatePlanGroupStatementMutationVariables = Types.Exact<{
  input: Types.UpdatePlanGroupStatementMutationInput;
}>;


export type UpdatePlanGroupStatementMutation = { updatePlanGroupStatement: { planGroupStatement: { id: string, name: string, step: number | null, isRequired: boolean, question: { text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ option: string, step: number }> } | null } | null } | null };

export type UpdatePresentationMutationVariables = Types.Exact<{
  input: Types.UpdatePresentationMutationInput;
}>;


export type UpdatePresentationMutation = { updatePresentation: { presentation: { color: string | null, description: string | null, displayName: string, id: string, name: string, status: Types.PresentationStatuses, transition: string | null, typography: string | null, type: Types.PresentationTypes, slides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> }, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null }> } }> | null }> } | null } | null };

export type UpdateProductMutationVariables = Types.Exact<{
  input: Types.UpdateProductMutationInput;
}>;


export type UpdateProductMutation = { updateProduct: { product: { archivedAt: string | null, description: string | null, displayName: string | null, id: string, name: string, rubricsUrl: string | null } | null } | null };

export type UpdateResearchLinkMutationVariables = Types.Exact<{
  input: Types.UpdateResearchLinkMutationInput;
}>;


export type UpdateResearchLinkMutation = { updateResearchLink: { researchLink: { author: string | null, displayName: string | null, id: string, name: string, resourceLink: string, sourceName: string } | null } | null };

export type DcUpdateRubricHeadingMutationVariables = Types.Exact<{
  input: Types.UpdateRubricHeadingMutationInput;
}>;


export type DcUpdateRubricHeadingMutation = { updateRubricHeading: { rubricHeading: { id: string, multiplier: number, name: string, tags: Array<{ id: string }> } | null } | null };

export type UpdateSchoolClassSettingsMutationVariables = Types.Exact<{
  input: Types.UpdateSchoolClassSettingsMutationInput;
}>;


export type UpdateSchoolClassSettingsMutation = { updateSchoolClassSettings: { schoolClass: { uuid: string, settings: { assessmentType: Types.AssessmentTypes }, students: { nodes: Array<{ uuid: string, settings: { assessmentType: { origin: Types.StudentSettingsOrigins, value: Types.AssessmentTypes } } }> } } | null } | null };

export type UpdateSlideMutationVariables = Types.Exact<{
  input: Types.UpdateSlideMutationInput;
}>;


export type UpdateSlideMutation = { updateSlide: { slide: { backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, isShared: boolean, name: string, notes: string | null, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null, videoUrl: string | null }> }, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, isShared: boolean, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null, videoUrl: string | null }> } }> | null, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, checkInGroups: Array<{ displayName: string | null, id: string, name: string, step: number | null }>, products: Array<{ id: string, description: string | null, displayName: string | null, name: string }> } | null } | null };

export type UpdateSlideImageMutationVariables = Types.Exact<{
  input: Types.UpdateSlideImageMutationInput;
}>;


export type UpdateSlideImageMutation = { updateSlideImage: { slideImage: { id: string, style: string, url: string, contentId: string, position: string | null } | null } | null };

export type UpdateSlideVideoMutationVariables = Types.Exact<{
  input: Types.UpdateSlideVideoMutationInput;
}>;


export type UpdateSlideVideoMutation = { updateSlideVideo: { slideVideo: { id: string, videoUrl: string | null, url: string | null, contentId: string } | null } | null };

export type UpdateStandardSetMutationVariables = Types.Exact<{
  input: Types.UpdateStandardSetMutationInput;
}>;


export type UpdateStandardSetMutation = { updateStandardSet: { standardSet: { displayName: string | null, id: string } | null } | null };

export type UpdateStudentSettingsMutationVariables = Types.Exact<{
  input: Types.UpdateStudentSettingsMutationInput;
}>;


export type UpdateStudentSettingsMutation = { updateStudentSettings: { student: { firstName: string | null, lastName: string | null, uuid: string, settings: { assessmentEnabled: { origin: Types.StudentSettingsOrigins, value: boolean }, assessmentType: { origin: Types.StudentSettingsOrigins, value: Types.AssessmentTypes }, onboardingEnabled: { origin: Types.StudentSettingsOrigins, value: boolean }, selfEvaluationEnabled: { origin: Types.StudentSettingsOrigins, value: boolean } } } | null } | null };

export type UpdateTagMutationVariables = Types.Exact<{
  input: Types.UpdateTagMutationInput;
}>;


export type UpdateTagMutation = { updateTag: { tag: { hasRubricHeadings: boolean, id: string, name: string, type: Types.TagTypes, rubricHeadings: { nodes: Array<{ id: string, name: string, multiplier: number }> } } | null } | null };

export type UpdateTaskMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateTaskMutation = { updateTask: { task: { id: string } | null } | null };

export type UpdateTaskFileMutationVariables = Types.Exact<{
  input: Types.UpdateTaskFileMutationInput;
}>;


export type UpdateTaskFileMutation = { updateTaskFile: { taskFile: { description: string | null, displayName: string, filename: string, id: string, step: number | null, url: string, task: { id: string } } | null } | null };

export type UpdateTextMutationVariables = Types.Exact<{
  input: Types.UpdateTextMutationInput;
}>;


export type UpdateTextMutation = { updateText: { text: { content: string, displayName: string | null, id: string, name: string } | null } | null };

export type UpdateTrackMutationVariables = Types.Exact<{
  input: Types.UpdateTrackMutationInput;
}>;


export type UpdateTrackMutation = { updateTrack: { track: { id: string } | null } | null };

export type UpdateUnitMutationVariables = Types.Exact<{
  input: Types.UpdateUnitMutationInput;
}>;


export type UpdateUnitMutation = { updateUnit: { unit: { archivedAt: string | null, description: string | null, displayName: string | null, id: string, imageUrl: string, name: string } | null } | null };

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateUserMutationInput;
}>;


export type UpdateUserMutation = { updateUser: { user: { uuid: string, role: Types.UserRoles } } | null };

export type UpdateVideoMutationVariables = Types.Exact<{
  input: Types.UpdateVideoMutationInput;
}>;


export type UpdateVideoMutation = { updateVideo: { video: { description: string, displayName: string | null, filename: string, name: string, id: string, url: string } | null } | null };

export type UpdateVirtualInternshipMutationVariables = Types.Exact<{
  input: Types.UpdateVirtualInternshipMutationInput;
}>;


export type UpdateVirtualInternshipMutation = { updateVirtualInternship: { virtualInternship: { archivedAt: string | null, status: Types.VirtualInternshipStatuses, id: string, requiredExperiences: number, opportunity: { id: string, name: string, availableSpots: number | null, creditsOutcomes: string | null, description: string, imageUrl: string | null, opportunityType: Types.OpportunityTypes, tags: Array<string>, pathways: Array<{ id: string, name: string }> } } | null } | null };

export type UpdateVocabularyMutationVariables = Types.Exact<{
  input: Types.UpdateVocabularyMutationInput;
}>;


export type UpdateVocabularyMutation = { updateVocabulary: { vocabulary: { definition: string, id: string, term: string } | null } | null };

export type PartnerQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PartnerQuery = { partner: { name: string, about: string, additionalUrls: Array<string> | null, address: string | null, coursesCount: number, details: string | null, email: string | null, id: string, imageUrl: string | null, imageFitToContainer: boolean, isArchived: boolean, opportunitiesCount: number, phone: string | null, status: Types.PartnerStatuses, thumbnailUrl: string | null, url: string | null, virtualInternshipsCount: number, visibilityScope: Types.VisibilityScope, entities: Array<{ dcIconUrl: string | null, dcLogoUrl: string | null, dlIconUrl: string | null, dlLogoUrl: string | null, gradingNeeded: boolean, hasCareersContract: boolean, hasPblContract: boolean, name: string | null, regionName: string | null, reportTypes: Array<Types.ReportTypes> | null, uuid: string }>, courses: Array<{ id: string, name: string, thumbnailUrl: string, collection: { id: string, name: string } | null, pathway: { id: string, name: string, description: string | null, imageUrl: string, thumbnailUrl: string } | null }>, opportunities: Array<{ id: string, name: string, imageUrl: string | null, thumbnailUrl: string | null, opportunityType: Types.OpportunityTypes, visibilityScope: Types.VisibilityScope, entities: Array<{ name: string | null, uuid: string }>, pathways: Array<{ name: string }> }>, pathways: Array<{ description: string | null, id: string, imageUrl: string, name: string, thumbnailUrl: string }>, documents: Array<{ createdAt: string, filename: string, id: string, url: string, previewUrl: string, submitter: { uuid: string, firstName: string | null, lastName: string | null } }> } };

export type AdminClusterEnrollmentStatsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  startYear: Types.Scalars['Int']['input'];
}>;


export type AdminClusterEnrollmentStatsQuery = { adminDashboard: { userId: string, entity: { uuid: string, clusterEnrollmentStats: Array<{ studentsCount: number, cluster: { id: string, name: string } }> } | null } | null };

export type AdminDashboardMyReportsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  startYear: Types.Scalars['Int']['input'];
}>;


export type AdminDashboardMyReportsQuery = { adminDashboard: { userId: string, entity: { uuid: string, myReports: { assessmentsFinished: number, assignmentsSubmitted: number, coursesEnrolled: number, coursesFinished: number } } | null } | null };

export type AdminEntitiesQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.EntityFilter>;
}>;


export type AdminEntitiesQuery = { adminDashboard: { userId: string, entity: { uuid: string, children: { pagesCount: number, nodes: Array<{ name: string, uuid: string, hierarchyMetrics: { entitiesCount: number, schoolClassesCount: number, studentsCount: number, teachersCount: number } | null, settings: { assessmentType: Types.AssessmentTypes } }> } } | null } | null };

export type AdminEntityHasChildrenQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type AdminEntityHasChildrenQuery = { adminDashboard: { userId: string, entity: { hasChildren: boolean, uuid: string } | null } | null };

export type DcAdminEntityInfoQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type DcAdminEntityInfoQuery = { adminDashboard: { userId: string, entity: { hasChildren: boolean, name: string, uuid: string, catalogs: Array<{ id: string, name: string }> | null, extensionFields: Array<{ id: string, name: string }> | null, hierarchyMetrics: { entitiesCount: number, schoolClassesCount: number, studentsCount: number, teachersCount: number } | null, plans: Array<{ id: string, name: string }> | null, settings: { assessmentEnabled: boolean, assessmentType: Types.AssessmentTypes, onboardingEnabled: boolean, selfEvaluationEnabled: boolean, schoolYearStartDate: { day: number, month: number } }, standardSets: Array<{ id: string, name: string }> | null } | null } | null };

export type AdminPathwayEnrollmentStatsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  startYear: Types.Scalars['Int']['input'];
}>;


export type AdminPathwayEnrollmentStatsQuery = { adminDashboard: { userId: string, entity: { uuid: string, pathwayEnrollmentStats: Array<{ studentsCount: number, pathway: { id: string, name: string } }> } | null } | null };

export type AdminUsernameQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type AdminUsernameQuery = { user: { firstName: string | null, lastName: string | null, uuid: string } | null };

export type AdminUsersQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserFilter>;
}>;


export type AdminUsersQuery = { adminDashboard: { userId: string, entity: { uuid: string, users: { pagesCount: number, nodes: Array<{ firstName: string | null, gradingNeeded: boolean, lastName: string | null, role: Types.UserRoles, schoolClassesCount: number, uuid: string, entity: { name: string, uuid: string, parent: { name: string, uuid: string } | null } | null }> } } | null } | null };

export type AdminVirtualInternshipQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type AdminVirtualInternshipQuery = { virtualInternship: { archivedAt: string | null, id: string, requiredExperiences: number, status: Types.VirtualInternshipStatuses, badges: Array<{ id: string, name: string, imageUrl: string }>, opportunity: { id: string, name: string, availableSpots: number | null, creditsOutcomes: string | null, description: string, imageUrl: string | null, opportunityType: Types.OpportunityTypes, salaryInformation: string | null, tags: Array<string>, pathways: Array<{ id: string, name: string }> }, calendarLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }>, experienceOpportunityLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }>, postExperienceLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }>, readinessSkillsLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }> } | null };

export type AssessmentReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type AssessmentReportQuery = { assessmentReport: { id: string, uploadStatus: Types.ReportUploadStatuses | null, url: string | null } | null };

export type AssessmentReportFiltersQueryVariables = Types.Exact<{
  filters: Types.InputMaybe<Types.ReportFiltersFilter>;
  entityFilter: Types.InputMaybe<Types.EntityFilter>;
  userFilter: Types.InputMaybe<Types.UserFilter>;
  schoolClassFilter: Types.InputMaybe<Types.SchoolClassFilter>;
}>;


export type AssessmentReportFiltersQuery = { assessmentReportFilters: { gradeLevels: Array<string>, entities: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null }> }, users: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, fullName: string | null }> }, schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null, users: { nodes: Array<{ fullName: string | null }> } | null }> } } };

export type AssignmentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type AssignmentQuery = { assignment: { archivedAt: string | null, assetName: string, description: string, displayName: string | null, id: string, badges: Array<{ id: string, name: string, imageUrl: string }>, rubrics: Array<{ description: string, id: string, name: string, displayName: string | null, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> } | null };

export type AssignmentLessonsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type AssignmentLessonsQuery = { assignment: { id: string, lessons: Array<{ id: string, name: string }> } | null };

export type AssignmentsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.AssignmentFilter>;
}>;


export type AssignmentsQuery = { assignments: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, assetName: string, description: string, displayName: string | null, id: string, name: string, rubrics: Array<{ id: string, name: string, description: string }> }> } };

export type AttachmentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type AttachmentQuery = { attachment: { archivedAt: string | null, description: string, displayName: string | null, id: string, name: string, files: Array<{ id: string, filename: string, url: string }> } | null };

export type AttachmentLessonsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type AttachmentLessonsQuery = { attachment: { id: string, lessons: Array<{ id: string, name: string }> } | null };

export type AttachmentsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.AttachmentFilter>;
}>;


export type AttachmentsQuery = { attachments: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string, displayName: string | null, id: string, name: string, files: Array<{ id: string, filename: string, url: string }> }> } };

export type BadgeQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type BadgeQuery = { badge: { archivedAt: string | null, id: string, imageUrl: string, thumbnailUrl: string, description: string, name: string } | null };

export type BadgesQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.BadgeFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type BadgesQuery = { badges: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string, name: string, imageUrl: string, id: string }> } };

export type CareerExplorationReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CareerExplorationReportQuery = { pathwayReport: { id: string, uploadStatus: Types.ReportUploadStatuses | null, url: string | null } | null };

export type CareerExplorationReportFiltersQueryVariables = Types.Exact<{
  filters: Types.InputMaybe<Types.ReportFiltersFilter>;
  entityFilter: Types.InputMaybe<Types.EntityFilter>;
  userFilter: Types.InputMaybe<Types.UserFilter>;
  schoolClassFilter: Types.InputMaybe<Types.SchoolClassFilter>;
}>;


export type CareerExplorationReportFiltersQuery = { pathwayReportFilters: { gradeLevels: Array<string>, entities: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null }> }, users: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, fullName: string | null }> }, schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null, users: { nodes: Array<{ fullName: string | null }> } | null }> } } };

export type CareerExplorationReportFullDataQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.PathwayReportFilter>;
  resultsFilter: Types.InputMaybe<Types.PathwayVisitResultFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type CareerExplorationReportFullDataQuery = { reports: { pathwayReport: { visitResults: { nodesCount: number, pagesCount: number, nodes: Array<{ clusterNames: Array<string>, isEnrolled: boolean, pathwayNames: Array<string>, resourceId: string, resourceName: string, resourceType: string, visitorEmail: string, visitorId: string, visitorName: string, visitorSisId: string | null, visitorType: string, visitsCount: number }> } } | null } | null };

export type CareerExplorationReportSummaryQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.PathwayReportFilter>;
}>;


export type CareerExplorationReportSummaryQuery = { reports: { pathwayReport: { summary: { engagementsCount: number, clustersCount: number, pathwaysCount: number, studentsCount: number, usersCount: number } } | null } | null };

export type CareerExplorationReportVisitCountsQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.PathwayReportFilter>;
}>;


export type CareerExplorationReportVisitCountsQuery = { reports: { pathwayReport: { visitCounts: Array<{ visitsCount: number, cluster: { name: string, id: string }, pathwayVisitCounts: Array<{ visitsCount: number, pathway: { id: string, name: string, cluster: { name: string, id: string } } }> }> } | null } | null };

export type CareerReviewSurveyLessonQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CareerReviewSurveyLessonQuery = { careerReviewSurveyLesson: { archivedAt: string | null, id: string, imageUrl: string, name: string, type: string } };

export type CareerReviewSurveyReportQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.CareerReviewSurveyReportFilter>;
}>;


export type CareerReviewSurveyReportQuery = { reports: { careerReviewSurveyReport: { studentsCount: number, studentsAnsweredCount: number, questionAnswerCounts: Array<{ question: { id: string, question: string }, baselineCounts: Array<{ answer: string, count: number }>, currentCounts: Array<{ answer: string, count: number }> }> } | null } | null };

export type CareerReviewSurveyReportCsvQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CareerReviewSurveyReportCsvQuery = { careerReviewSurveyReport: { id: string, url: string | null, uploadStatus: Types.ReportUploadStatuses | null } | null };

export type CareerReviewSurveyReportFiltersQueryVariables = Types.Exact<{
  filters: Types.InputMaybe<Types.ReportFiltersFilter>;
  entityFilter: Types.InputMaybe<Types.EntityFilter>;
  userFilter: Types.InputMaybe<Types.UserFilter>;
  schoolClassFilter: Types.InputMaybe<Types.SchoolClassFilter>;
}>;


export type CareerReviewSurveyReportFiltersQuery = { careerReviewSurveyReportFilters: { gradeLevels: Array<string>, entities: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null }> }, users: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, fullName: string | null }> }, schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null, users: { nodes: Array<{ fullName: string | null }> } | null }> } } };

export type CareerReviewSurveyReportResultsQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.CareerReviewSurveyReportFilter>;
  resultsFilter: Types.InputMaybe<Types.CareerReviewSurveyReportResultFilter>;
  sort: Types.InputMaybe<Types.CareerReviewSurveyReportResultSortAttributes>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type CareerReviewSurveyReportResultsQuery = { reports: { careerReviewSurveyReport: { results: { nodesCount: number, pagesCount: number, nodes: Array<{ studentSisId: string | null, studentName: string, contextType: Types.CareerReviewSurveyAnswerContextTypes | null, contextName: string | null, takeNumber: number, isCurrent: boolean, isBaseline: boolean, takenAt: string, answers: Array<{ question: { id: string, question: string }, answer: Array<{ type: Types.CareerReviewSurveyAnswerTypes, value: string }> }> }> } } | null } | null };

export type CatalogQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CatalogQuery = { catalog: { description: string | null, displayName: string | null, id: string, imageUrl: string, name: string, status: Types.CatalogStatuses, thumbnailUrl: string, service: Types.Services, tracks: Array<{ id: string, imageUrl: string, name: string, step: number | null, service: Types.Services, units: Array<{ id: string, name: string }> }> } | null };

export type CatalogsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.CatalogFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type CatalogsQuery = { catalogs: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string | null, displayName: string | null, id: string, imageUrl: string, name: string, status: Types.CatalogStatuses, service: Types.Services, thumbnailUrl: string, tracks: Array<{ id: string, imageUrl: string, name: string, step: number | null, service: Types.Services, units: Array<{ id: string, name: string, step: number | null }> }> }> } };

export type CheckinGroupsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.CheckInGroupFilter>;
}>;


export type CheckinGroupsQuery = { checkInGroups: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, displayName: string | null, id: string, name: string, questions: Array<{ id: string, question: string, step: number | null }> }> } };

export type CheckinGroupQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CheckinGroupQuery = { checkInGroup: { displayName: string | null, id: string, name: string, badges: Array<{ id: string, name: string, imageUrl: string }>, questions: Array<{ id: string, question: string, step: number | null }> } | null };

export type CheckinQuestionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CheckinQuestionQuery = { checkInQuestion: { id: string, question: string, answer: { answer: string | null, createdAt: string, id: string, name: string, updatedAt: string, grade: { createdAt: string, id: string, status: Types.SubmissionGradeStatuses, updatedAt: string } | null } | null } | null };

export type CheckinQuestionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.CheckInQuestionFilter>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
}>;


export type CheckinQuestionsQuery = { checkInQuestions: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, id: string, question: string, answer: { answer: string | null, createdAt: string, id: string, name: string, updatedAt: string, grade: { createdAt: string, id: string, status: Types.SubmissionGradeStatuses, updatedAt: string } | null } | null }> } };

export type ContractsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.ContractFilter>;
}>;


export type ContractsQuery = { contracts: { nodesCount: number, pagesCount: number, nodes: Array<{ definedLearningUuid: string, endDate: string, id: string, name: string | null, startDate: string, syncable: boolean, uuid: string, entities: Array<{ uuid: string, name: string | null }> }> } };

export type CounselorsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserFilter>;
}>;


export type CounselorsQuery = { counselors: { pagesCount: number, nodesCount: number, nodes: Array<{ uuid: string, firstName: string | null, lastName: string | null, fullName: string | null }> } };

export type UserCourseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type UserCourseQuery = { course: { description: string | null, displayName: string, id: string, imageUrl: string, isGlobal: boolean, thumbnailUrl: string, name: string, status: Types.CourseStatuses, type: Types.CourseTypes, badges: Array<{ id: string, imageUrl: string, name: string }> | null, lessons: Array<{ id: string, imageUrl: string, name: string, step: number | null, thumbnailUrl: string, type: string }>, sharedResource: { allowLogin: boolean, code: string } | null, pathway: { id: string, name: string } | null, collection: { id: string, name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } } | null };

export type CourseGradingSchoolClassWithStudentsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  courseId: Types.Scalars['ID']['input'];
}>;


export type CourseGradingSchoolClassWithStudentsQuery = { schoolClass: { name: string | null, parentName: string | null, uuid: string, gradingNeededStudents: { nodes: Array<{ firstName: string | null, lastName: string | null, uuid: string, course: { id: string, name: string }, settings: { assessmentType: { value: Types.AssessmentTypes } } }> }, withoutGradingNeededStudents: { nodes: Array<{ firstName: string | null, lastName: string | null, uuid: string, course: { id: string, name: string }, settings: { assessmentType: { value: Types.AssessmentTypes } } }> } } | null };

export type CourseGradingSchoolClassesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CourseGradingSchoolClassesQuery = { course: { id: string, name: string, gradingNeededSchoolClasses: { nodes: Array<{ name: string | null, parentName: string | null, uuid: string, settings: { assessmentType: Types.AssessmentTypes } }> } | null, withoutGradingNeededSchoolClasses: { nodes: Array<{ name: string | null, parentName: string | null, uuid: string, settings: { assessmentType: Types.AssessmentTypes } }> } | null } | null };

export type CourseOptionsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.CourseFilter>;
}>;


export type CourseOptionsQuery = { courses: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, imageUrl: string, thumbnailUrl: string, name: string }> } };

export type CourseReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CourseReportQuery = { courseReport: { id: string, uploadStatus: Types.ReportUploadStatuses | null, url: string | null } | null };

export type CoursesQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.CourseFilter>;
  withCopies: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type CoursesQuery = { courses: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, id: string, description: string | null, displayName: string, imageUrl: string, name: string, status: Types.CourseStatuses, thumbnailUrl: string, type: Types.CourseTypes, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null }, lessons: Array<{ id: string, imageUrl: string, name: string, step: number | null, type: string }>, pathway: { id: string, name: string } | null, collection: { id: string, name: string } | null }> } };

export type EntitiesQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.EntityFilter>;
}>;


export type EntitiesQuery = { entities: { pagesCount: number, nodesCount: number, nodes: Array<{ uuid: string, gradingNeeded: boolean, name: string | null }> } };

export type EntitiesWithChildrenQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.EntityFilter>;
}>;


export type EntitiesWithChildrenQuery = { entities: { pagesCount: number, nodesCount: number, nodes: Array<{ uuid: string, name: string | null, children: { nodes: Array<{ uuid: string, name: string | null, children: { nodes: Array<{ uuid: string, name: string | null, children: { nodes: Array<{ uuid: string, name: string | null, children: { nodes: Array<{ uuid: string, name: string | null }> } | null }> } | null }> } | null }> } | null }> } };

export type EntityQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type EntityQuery = { entity: { name: string | null, reportTypes: Array<Types.ReportTypes> | null, regionName: string | null, uuid: string, dcIconUrl: string | null, dcLogoUrl: string | null, dlIconUrl: string | null, dlLogoUrl: string | null, tags: Array<{ id: string, name: string, type: Types.TagTypes }> | null, catalogs: Array<{ id: string, name: string, imageUrl: string, service: Types.Services, tracks: Array<{ id: string, name: string, units: Array<{ id: string, name: string }> }> }> | null, parent: { name: string | null, uuid: string } | null, plans: Array<{ id: string, name: string }> | null, settings: { assessmentEnabled: boolean, assessmentType: Types.AssessmentTypes, onboardingEnabled: boolean, opportunitiesEnabled: boolean, postSecondaryApplicationsEnabled: boolean, selfEvaluationEnabled: boolean, classManagementEnabled: boolean, schoolYearStartDate: { day: number, month: number } }, standardSets: Array<{ id: string, name: string }> | null, welcomeMessage: { dcStudent: string | null, dcTeacher: string | null, dlStudent: string | null, dlTeacher: string | null } | null } | null };

export type EntityPlansQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type EntityPlansQuery = { entity: { uuid: string, plans: Array<{ id: string, name: string }> | null } | null };

export type EntityWithChildrenQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.EntityFilter>;
}>;


export type EntityWithChildrenQuery = { entity: { name: string | null, uuid: string, children: { pagesCount: number, nodesCount: number, nodes: Array<{ uuid: string, gradingNeeded: boolean, name: string | null }> } | null } | null };

export type ExtensionCoursesQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.CourseFilter>;
}>;


export type ExtensionCoursesQuery = { courses: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, name: string }> } };

export type ExtensionFieldQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ExtensionFieldQuery = { extensionField: { archivedAt: string | null, description: string, id: string, imageUrl: string | null, name: string, publishedFrom: string | null, publishedTo: string | null, status: Types.ExtensionFieldStatuses, author: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string }, clusters: Array<{ id: string, name: string }>, courses: Array<{ id: string, name: string }>, files: Array<{ id: string, filename: string, url: string }>, links: Array<{ name: string, url: string }>, pathways: Array<{ id: string, name: string }> } | null };

export type ExtensionFieldsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.ExtensionFieldFilter>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
}>;


export type ExtensionFieldsQuery = { extensionFields: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string, id: string, imageUrl: string | null, name: string, publishedFrom: string | null, publishedTo: string | null, status: Types.ExtensionFieldStatuses, author: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string }, clusters: Array<{ id: string, name: string }>, courses: Array<{ id: string, name: string }>, pathways: Array<{ id: string, name: string }> }> } | null };

export type ExtensionFieldsToAssignQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.ExtensionFieldFilter>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
}>;


export type ExtensionFieldsToAssignQuery = { extensionFields: { nodes: Array<{ id: string, name: string, publishedFrom: string | null, publishedTo: string | null, status: Types.ExtensionFieldStatuses }> } | null };

export type ExternalPresentationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ExternalPresentationQuery = { externalPresentation: { archivedAt: string | null, displayName: string | null, isExpandable: boolean, id: string, name: string, source: string } | null };

export type ExternalPresentationsLessonsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ExternalPresentationsLessonsQuery = { externalPresentation: { id: string, lessons: Array<{ id: string, name: string }> } | null };

export type ExternalPresentationsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.ExternalPresentationFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ExternalPresentationsQuery = { externalPresentations: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, displayName: string | null, id: string, name: string, source: string }> } };

export type UserInstitutionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type UserInstitutionQuery = { institution: { id: string, type: string | null, name: string, sizeType: Types.InstitutionSizeTypes | null, sizeDescription: Types.InstitutionSizeDescriptions | null, cost: number | null, commonAppApplicationUrl: string | null, imageUrl: string | null, thumbnailUrl: string | null, admissionRate: number | null, satMathMin: number | null, satMathMax: number | null, satReadingMin: number | null, satReadingMax: number | null, actMin: number | null, actMax: number | null, studentFacultyRatio: number | null, commonAppEnabled: boolean, degrees: Array<string>, isIpeds: boolean, address: { street: string | null, city: string | null, zip: string | null, state: string | null, stateCode: string | null, area: { kind: string | null, type: string | null } }, dates: Array<{ deadlineDate: string, decisionType: string, term: string | null }>, contact: { phone: string | null, urlAdmissions: string | null, urlApplications: string | null, urlFinancialAid: string | null, urlNetPriceCalculator: string | null, urlGeneral: string | null } } | null };

export type UserInstitutionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserInstitutionFilter>;
}>;


export type UserInstitutionsQuery = { institutions: { pagesCount: number, nodes: Array<{ type: string | null, sizeType: Types.InstitutionSizeTypes | null, sizeDescription: Types.InstitutionSizeDescriptions | null, commonAppEnabled: boolean, cost: number | null, thumbnailUrl: string | null, id: string, imageUrl: string | null, name: string, address: { city: string | null, stateCode: string | null } }> } };

export type LessonQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type LessonQuery = { lesson: { archivedAt: string | null, hasPresentation: boolean, id: string, imageUrl: string, name: string, thumbnailUrl: string, type: string, badges: Array<{ id: string, name: string, imageUrl: string }>, assignments: Array<{ assetName: string, description: string, displayName: string | null, id: string, step: number | null, name: string, rubrics: Array<{ description: string, id: string, name: string, hasAlignedStatements: boolean, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> }>, attachments: Array<{ description: string, displayName: string | null, id: string, name: string, step: number | null, files: Array<{ filename: string, id: string, url: string }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, checkInGroups: Array<{ displayName: string | null, id: string, name: string, step: number | null, questions: Array<{ id: string, question: string }> }>, description: { introduction: string | null, goal: string | null, role: string | null, audience: string | null, situation: string | null } | null, externalPresentations: Array<{ displayName: string | null, isExpandable: boolean, id: string, name: string, source: string, step: number | null }>, researchLinks: Array<{ author: string | null, displayName: string | null, id: string, name: string, resourceLink: string, sourceName: string, step: number | null }>, texts: Array<{ content: string, displayName: string | null, id: string, name: string, step: number | null }>, videos: Array<{ description: string, displayName: string | null, filename: string, id: string, name: string, url: string, step: number | null }>, vocabularies: Array<{ definition: string, id: string, step: number | null, term: string, name: string }>, careerReviewSurvey: { questions: Array<{ answer: Array<string | null>, id: string, question: string, type: Types.CareerReviewSurveyQuestionTypes, options: Array<{ option: string, step: number }> }> } | null } | null };

export type LessonCoursesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type LessonCoursesQuery = { lesson: { courses: Array<{ id: string, name: string }> } | null };

export type LessonExtensionsQueryVariables = Types.Exact<{
  lessonId: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type LessonExtensionsQuery = { lesson: { extensionFields: Array<{ description: string, id: string, imageUrl: string | null, name: string, files: Array<{ id: string, filename: string, url: string }>, links: Array<{ name: string, url: string }> }> } | null };

export type LessonsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.LessonFilter>;
}>;


export type LessonsQuery = { lessons: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, id: string, imageUrl: string, name: string, thumbnailUrl: string, type: string }> } };

export type UserOpportunitiesQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.OpportunityFilter>;
}>;


export type UserOpportunitiesQuery = { opportunities: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, createdAt: string, name: string, opportunityType: Types.OpportunityTypes, periodEnd: string | null, periodStart: string | null, deadline: string | null, visibilityScope: Types.VisibilityScope, hasPendingApplications: boolean, imageUrl: string | null, thumbnailUrl: string | null, imageFitToContainer: boolean, entities: Array<{ uuid: string }>, partner: { id: string, name: string } | null, pathways: Array<{ name: string }> }> } };

export type UserOpportunityQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.OpportunityApplicationFilter>;
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type UserOpportunityQuery = { opportunity: { id: string, name: string, automaticAcceptance: boolean | null, availableSpots: number | null, creditsOutcomes: string | null, description: string, imageUrl: string | null, location: string | null, opportunityType: Types.OpportunityTypes, salaryInformation: string | null, tags: Array<string>, deadline: string | null, periodEnd: string | null, periodStart: string | null, visibilityScope: Types.VisibilityScope, hasPendingApplications: boolean, imageFitToContainer: boolean, thumbnailUrl: string | null, pathways: Array<{ id: string, name: string }>, applications: { nodes: Array<{ id: string, appliedAt: string, updatedAt: string, status: Types.ApplicationStatus, student: { uuid: string, fullName: string | null, schoolClasses: Array<{ uuid: string, name: string | null }> } }> }, entities: Array<{ uuid: string, name: string | null }>, virtualInternship: { id: string } | null, partner: { id: string, name: string } | null } | null };

export type CreateOpportunityMutationVariables = Types.Exact<{
  input: Types.CreateOpportunityMutationInput;
}>;


export type CreateOpportunityMutation = { createOpportunity: { opportunity: { description: string, name: string, opportunityType: Types.OpportunityTypes, automaticAcceptance: boolean | null, availableSpots: number | null, creditsOutcomes: string | null, visibilityScope: Types.VisibilityScope, imageUrl: string | null, location: string | null, tags: Array<string>, salaryInformation: string | null, periodStart: string | null, periodEnd: string | null, deadline: string | null, id: string, pathways: Array<{ id: string, name: string }>, entities: Array<{ uuid: string, name: string | null }>, partner: { id: string, name: string } | null } | null } | null };

export type UpdateOpportunityMutationVariables = Types.Exact<{
  input: Types.UpdateOpportunityMutationInput;
}>;


export type UpdateOpportunityMutation = { updateOpportunity: { opportunity: { id: string, name: string, automaticAcceptance: boolean | null, availableSpots: number | null, creditsOutcomes: string | null, description: string, imageUrl: string | null, location: string | null, opportunityType: Types.OpportunityTypes, salaryInformation: string | null, tags: Array<string>, deadline: string | null, periodEnd: string | null, periodStart: string | null, visibilityScope: Types.VisibilityScope, pathways: Array<{ id: string, name: string }>, entities: Array<{ uuid: string, name: string | null }>, partner: { id: string, name: string } | null } | null } | null };

export type ArchiveOpportunityMutationVariables = Types.Exact<{
  input: Types.ArchiveOpportunityMutationInput;
}>;


export type ArchiveOpportunityMutation = { archiveOpportunity: { opportunity: { id: string } | null } | null };

export type OpportunityApplicationsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.OpportunityApplicationFilter>;
}>;


export type OpportunityApplicationsQuery = { opportunity: { automaticAcceptance: boolean | null, hasPendingApplications: boolean, id: string, name: string, opportunityType: Types.OpportunityTypes, filteredApplications: { pagesCount: number, nodesCount: number, nodes: Array<{ id: string, appliedAt: string, updatedAt: string, status: Types.ApplicationStatus, answers: Array<{ id: string, answer: string, opportunityQuestionId: string }>, student: { uuid: string, fullName: string | null, schoolClasses: Array<{ uuid: string, name: string | null }> } }> }, applications: { pagesCount: number, nodesCount: number, nodes: Array<{ id: string, appliedAt: string, updatedAt: string, status: Types.ApplicationStatus, lastChangedBy: { uuid: string, name: string | null } | null, answers: Array<{ id: string, answer: string, opportunityQuestionId: string }>, student: { uuid: string, fullName: string | null } }> }, questions: Array<{ id: string, question: string, step: number }> } | null };

export type OpportunityReportApplicationCountQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.OpportunityReportFilter>;
}>;


export type OpportunityReportApplicationCountQuery = { reports: { opportunityReport: { clusterCounts: Array<{ applicationsCount: number, cluster: { id: string, name: string }, pathwayApplicationCounts: Array<{ applicationsCount: number, pathway: { id: string, name: string, cluster: { id: string, name: string } } }> }> } | null } | null };

export type OpportunityReportCsvQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type OpportunityReportCsvQuery = { opportunityReport: { id: string, url: string | null, uploadStatus: Types.ReportUploadStatuses | null } | null };

export type OpportunityReportFiltersQueryVariables = Types.Exact<{
  filters: Types.InputMaybe<Types.ReportFiltersFilter>;
  entityFilter: Types.InputMaybe<Types.EntityFilter>;
  userFilter: Types.InputMaybe<Types.UserFilter>;
  schoolClassFilter: Types.InputMaybe<Types.SchoolClassFilter>;
}>;


export type OpportunityReportFiltersQuery = { opportunityReportFilters: { gradeLevels: Array<string>, entities: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null }> }, users: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, fullName: string | null }> }, schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null, users: { nodes: Array<{ fullName: string | null }> } | null }> } } };

export type OpportunityReportFullDataQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.OpportunityReportFilter>;
  resultsFilter: Types.InputMaybe<Types.OpportunityApplicationResultFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type OpportunityReportFullDataQuery = { reports: { opportunityReport: { results: { nodesCount: number, pagesCount: number, nodes: Array<{ applicationDeadline: string | null, applicationStatus: Types.ApplicationStatus, assignmentsSubmitted: number | null, assignmentsToSubmit: number | null, checkInsSubmitted: number | null, checkInsToSubmit: number | null, clusterNames: Array<string>, isFavorite: boolean, opportunityName: string | null, opportunityPartnerNames: Array<string>, opportunityType: Types.OpportunityTypes, pathwayNames: Array<string>, studentGradeLevel: string | null, studentId: string, studentName: string | null, studentSisId: string | null }> } } | null } | null };

export type OpportunityReportSummaryQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.OpportunityReportFilter>;
}>;


export type OpportunityReportSummaryQuery = { reports: { opportunityReport: { studentsCount: number, summary: { opportunitiesCount: number, virtualInternshipsCount: number } } | null } | null };

export type OpportunityReportTypesChartQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.OpportunityReportFilter>;
}>;


export type OpportunityReportTypesChartQuery = { reports: { opportunityReport: { typeCounts: Array<{ applicationsCount: number, opportunityType: Types.OpportunityTypes }> } | null } | null };

export type PartnerOpportunitiesQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.OpportunityFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type PartnerOpportunitiesQuery = { opportunities: { nodesCount: number, pagesCount: number, nodes: Array<{ imageUrl: string | null, thumbnailUrl: string | null, name: string, opportunityType: Types.OpportunityTypes, visibilityScope: Types.VisibilityScope, id: string, pathways: Array<{ name: string }>, entities: Array<{ name: string | null, uuid: string }> }> } };

export type UserPartnerOptionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.PartnerFilter>;
}>;


export type UserPartnerOptionsQuery = { partners: { pagesCount: number, nodes: Array<{ id: string, name: string, status: Types.PartnerStatuses }> } };

export type PartnerOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PartnerOverviewQuery = { partner: { about: string, additionalUrls: Array<string> | null, address: string | null, canEdit: boolean, coursesCount: number, details: string | null, email: string | null, id: string, name: string, isArchived: boolean, opportunitiesCount: number, phone: string | null, status: Types.PartnerStatuses, thumbnailUrl: string | null, imageUrl: string | null, imageFitToContainer: boolean, url: string | null, virtualInternshipsCount: number, visibilityScope: Types.VisibilityScope, entities: Array<{ uuid: string }>, opportunities: Array<{ id: string, name: string, opportunityType: Types.OpportunityTypes, imageUrl: string | null, deadline: string | null, periodStart: string | null, periodEnd: string | null, hasPendingApplications: boolean, pathways: Array<{ id: string, name: string }>, virtualInternship: { roadmapItemsCount: number, readinessSkillsLessons: Array<{ id: string }> } | null }>, pathways: Array<{ id: string }>, courses: Array<{ id: string, name: string, thumbnailUrl: string, imageUrl: string, type: Types.CourseTypes, description: string | null, collection: { name: string } | null, pathway: { name: string } | null, metadata: { alternativeTitles: string | null } }>, documents: Array<{ createdAt: string, filename: string, id: string, url: string, previewUrl: string, submitter: { uuid: string, firstName: string | null, lastName: string | null } }> } };

export type PartnersQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.PartnerFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  nameSortOrder: Types.InputMaybe<Types.SortingOrder>;
}>;


export type PartnersQuery = { partners: { nodesCount: number, pagesCount: number, nodes: Array<{ about: string, additionalUrls: Array<string> | null, address: string | null, canEdit: boolean, coursesCount: number, details: string | null, email: string | null, id: string, imageUrl: string | null, imageFitToContainer: boolean, isArchived: boolean, name: string, opportunitiesCount: number, phone: string | null, status: Types.PartnerStatuses, thumbnailUrl: string | null, url: string | null, virtualInternshipsCount: number, visibilityScope: Types.VisibilityScope }> } };

export type PathwaysQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PathwaysQuery = { pathways: Array<{ id: string, name: string }> };

export type PlanQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PlanQuery = { plan: { archivedAt: string | null, description: string | null, id: string, name: string, groups: Array<{ archivedAt: string | null, description: string | null, displayName: string, id: string, name: string, step: number | null, statements: Array<{ id: string, name: string, step: number | null }> }> } | null };

export type PlanGroupQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PlanGroupQuery = { planGroup: { description: string | null, displayName: string, id: string, name: string, statements: Array<{ archivedAt: string | null, id: string, name: string, step: number | null, isRequired: boolean, question: { text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ option: string, step: number }> } | null }> } | null };

export type PlanGroupsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.PlanGroupFilter>;
}>;


export type PlanGroupsQuery = { planGroups: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string | null, displayName: string, id: string, name: string, statements: Array<{ id: string, name: string }> }> } };

export type PlanReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PlanReportQuery = { planReport: { id: string, uploadStatus: Types.ReportUploadStatuses | null, url: string | null } | null };

export type PlansQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.PlanFilter>;
}>;


export type PlansQuery = { plans: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string | null, id: string, name: string, groups: Array<{ id: string, name: string, statements: Array<{ id: string, name: string }> }> }> } };

export type PlansWithStatementAlignmentQueryVariables = Types.Exact<{
  rubricHeadingId: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type PlansWithStatementAlignmentQuery = { plans: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string | null, id: string, name: string, groups: Array<{ id: string, name: string, statements: Array<{ id: string, name: string, isAligned: boolean }> }> }> } };

export type ProductQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ProductQuery = { product: { archivedAt: string | null, description: string | null, displayName: string | null, id: string, name: string, rubricsUrl: string | null, status: Types.ProductStatuses, badges: Array<{ id: string, name: string, imageUrl: string }>, rubrics: Array<{ id: string, name: string, description: string }> } | null };

export type ProductTasksQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ProductTasksQuery = { product: { id: string, tasks: Array<{ id: string, name: string }> } | null };

export type ProductsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.ProductFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  withCopies: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type ProductsQuery = { products: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string | null, displayName: string | null, id: string, name: string, rubricsUrl: string | null, status: Types.ProductStatuses, owner: { name: string | null, uuid: string } | null }> } };

export type RecentApplicationsQueryVariables = Types.Exact<{
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  before: Types.InputMaybe<Types.Scalars['String']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type RecentApplicationsQuery = { recentApplications: { edges: Array<{ cursor: string, node: { id: string, updatedAt: string, status: Types.ApplicationStatus, student: { uuid: string, fullName: string | null }, opportunity: { name: string } } | null } | null> | null, pageInfo: { hasNextPage: boolean, endCursor: string | null } } };

export type RecommendationRequestQueryVariables = Types.Exact<{
  studentUuid: Types.Scalars['ID']['input'];
}>;


export type RecommendationRequestQuery = { recommendationRequest: { applicant: { applicantId: string, email: string | null, firstName: string | null, lastName: string | null, uuid: string }, forms: Array<{ formType: Types.CommonAppFormTypes, status: Types.FormStatuses, previewUrl: string | null, deadline: string | null }> } | null };

export type RecommendationRequestsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type RecommendationRequestsQuery = { recommendationRequests: { nodesCount: number, pagesCount: number, nodes: Array<{ deadline: string | null, submittedFormsCount: number, totalFormsCount: number, applicant: { applicantId: string, email: string | null, firstName: string | null, lastName: string | null, uuid: string } }> } };

export type ReportsAssessmentReportQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.AssessmentReportFilter>;
}>;


export type ReportsAssessmentReportQuery = { reports: { assessmentReport: { studentsCount: number, summary: { assessmentCompleted: number, assessmentTaken: number }, highSchoolInterests: Array<{ category: string, score: number }>, middleSchoolInterests: Array<{ category: string, score: number }>, highSchoolWorkValues: Array<{ category: string, averageTokens: number }>, middleSchoolWorkValues: Array<{ category: string, averageTokens: number }>, highSchoolStudyPreferences: Array<{ area: string, results: { position1: number, position2: number, position3: number, position4: number, position5: number, position6: number, position7: number } }>, middleSchoolStudyPreferences: Array<{ area: string, results: { position1: number, position2: number, position3: number, position4: number, position5: number } }>, clusterRecommendationCounts: Array<{ recommendationsCount: number, cluster: { name: string, id: string, pathways: Array<{ name: string, id: string }> }, pathwayRecommendationCounts: Array<{ recommendationsCount: number, pathway: { name: string, id: string } }> }> } | null } | null };

export type ResearchLinkQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ResearchLinkQuery = { researchLink: { archivedAt: string | null, author: string | null, displayName: string | null, id: string, name: string, resourceLink: string, sourceName: string } | null };

export type ResearchLinkLessonsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ResearchLinkLessonsQuery = { researchLink: { id: string, lessons: Array<{ id: string, name: string }> } | null };

export type ResearchLinksQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.ResearchLinkFilter>;
}>;


export type ResearchLinksQuery = { researchLinks: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, author: string | null, displayName: string | null, id: string, name: string, resourceLink: string, sourceName: string }> } };

export type DcRubricQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DcRubricQuery = { rubric: { description: string, displayName: string | null, id: string, name: string, canEdit: boolean, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string, statements: Array<{ id: string }>, tags: Array<{ id: string, name: string, type: Types.TagTypes }>, plans: Array<{ description: string | null, id: string, name: string, evaluation: { id: string, plan: { name: string }, student: { username: string | null, uuid: string } } | null, groups: Array<{ description: string | null, name: string, id: string, statements: Array<{ id: string, name: string }> }> }> }> } | null };

export type RubricAssignmentsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RubricAssignmentsQuery = { rubric: { id: string, assignments: Array<{ id: string, name: string }> } | null };

export type RubricProductsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RubricProductsQuery = { rubric: { id: string, products: Array<{ id: string, name: string }> } | null };

export type RubricsQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.RubricFilter>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  withCopies: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type RubricsQuery = { rubrics: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string, displayName: string | null, id: string, name: string, owner: { name: string | null, uuid: string } | null }> } };

export type DcSchoolClassQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type DcSchoolClassQuery = { schoolClass: { isDemo: boolean, name: string | null, uuid: string, entity: { name: string | null, uuid: string }, settings: { assessmentType: Types.AssessmentTypes } } | null };

export type SchoolClassPlansQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type SchoolClassPlansQuery = { schoolClass: { uuid: string, entity: { uuid: string, plans: Array<{ id: string, name: string }> | null } } | null };

export type SchoolClassWithStudentsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  filter: Types.InputMaybe<Types.StudentFilter>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
}>;


export type SchoolClassWithStudentsQuery = { schoolClass: { name: string | null, uuid: string, students: { pagesCount: number, nodes: Array<{ archivedAt: string | null, assessmentCompleted: boolean, coursesCompleted: number, coursesEnrolled: number, firstName: string | null, gradingNeeded: boolean, lastName: string | null, uuid: string, settings: { assessmentType: { value: Types.AssessmentTypes } } }> } } | null };

export type SchoolClassesQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.SchoolClassFilter>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type SchoolClassesQuery = { schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ name: string | null, uuid: string, entity: { uuid: string, name: string | null } }> } };

export type SchoolClassesStudentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SchoolClassesStudentsQuery = { schoolClasses: { nodes: Array<{ uuid: string, name: string | null, students: { nodes: Array<{ uuid: string, fullName: string | null }> } }> } };

export type SlidesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SlidesQuery = { slides: { nodes: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, isShared: boolean, name: string, notes: string | null, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> }, slideBackgroundImages: Array<{ id: string, thumbnailUrl: string, url: string }>, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, isShared: boolean, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> } }> | null }> } };

export type StandardSetQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type StandardSetQuery = { standardSet: { archivedAt: string | null, displayName: string | null, id: string, name: string, setId: string } | null };

export type StandardSetsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.StandardSetFilter>;
}>;


export type StandardSetsQuery = { standardSets: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, displayName: string | null, id: string, name: string, setId: string }> } };

export type DcStudentQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type DcStudentQuery = { student: { email: string | null, firstName: string | null, lastName: string | null, uuid: string, currentCourses: Array<{ id: string, name: string, progress: { total: number, submitted: number } }>, entity: { name: string | null, uuid: string } | null, settings: { assessmentEnabled: { origin: Types.StudentSettingsOrigins, value: boolean }, assessmentType: { origin: Types.StudentSettingsOrigins, value: Types.AssessmentTypes }, onboardingEnabled: { origin: Types.StudentSettingsOrigins, value: boolean }, selfEvaluationEnabled: { origin: Types.StudentSettingsOrigins, value: boolean } } } | null };

export type StudentAllCoursesQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  filter: Types.InputMaybe<Types.StudentCourseFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type StudentAllCoursesQuery = { student: { assessmentCompleted: boolean, uuid: string, allCourses: { pagesCount: number, nodes: Array<{ id: string, imageUrl: string, match: number | null, name: string, type: Types.CourseTypes, thumbnailUrl: string, isRecommended: boolean, isEnrolled: boolean, pathway: { name: string } | null, collection: { id: string, name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } }> } } | null };

export type StudentApplicationsQueryVariables = Types.Exact<{
  studentUuid: Types.Scalars['ID']['input'];
}>;


export type StudentApplicationsQuery = { studentApplications: Array<{ forms: Array<{ formType: Types.CommonAppFormTypes, status: Types.FormStatuses }>, institution: { id: string, name: string } }> };

export type StudentAssessmentResultQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type StudentAssessmentResultQuery = { student: { uuid: string, assessmentResult: { additionalPathways: Array<{ name: string, description: string | null }>, interestsResult: Array<{ interest: string, score: number }>, recommendedPathways: Array<{ name: string, description: string | null }>, studyPreferencesResult: Array<{ area: string, description: string, position: number }>, workValuesResult: Array<{ score: number, workValue: string }> } | null } | null };

export type StudentCourseActivityQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  courseId: Types.Scalars['ID']['input'];
}>;


export type StudentCourseActivityQuery = { student: { uuid: string, course: { id: string, lessons: Array<{ id: string, step: number | null, name: string, assignments: Array<{ id: string, step: number | null, description: string, displayName: string | null, submission: { id: string, updatedAt: string, files: Array<{ id: string, filename: string, attachmentUrl: string, previewUrl: string }>, rubricGrade: { pointsAvailable: number, pointsScored: number, updatedAt: string, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null, results: Array<{ criteriaId: string, trait: string | null }> } | null, grade: { id: string, updatedAt: string, status: Types.SubmissionGradeStatuses, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null } | null } | null, rubrics: Array<{ pointsAvailable: number, description: string, id: string, name: string, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null, answer: { id: string, updatedAt: string, answer: string | null, grade: { id: string, updatedAt: string, status: Types.SubmissionGradeStatuses, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null } | null } | null }>, checkInGroups: Array<{ displayName: string | null, id: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null, answer: { id: string, updatedAt: string, answer: string | null, grade: { id: string, updatedAt: string, status: Types.SubmissionGradeStatuses, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null } | null } | null }> }> }> } } | null };

export type StudentCurrentCoursesQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type StudentCurrentCoursesQuery = { student: { assessmentCompleted: boolean, uuid: string, currentCourses: Array<{ id: string, imageUrl: string, name: string, status: Types.CourseStatuses, thumbnailUrl: string, progress: { submitted: number, total: number }, pathway: { name: string } | null }> } | null };

export type StudentCurrentCoursesPreviewQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  studentUuid: Types.Scalars['ID']['input'];
}>;


export type StudentCurrentCoursesPreviewQuery = { student: { archivedAt: string | null, assessmentCompleted: boolean, firstName: string | null, hasPlans: boolean, lastName: string | null, uuid: string, assessmentResult: { id: string } | null, currentCourses: Array<{ id: string, name: string, type: Types.CourseTypes, gradingNeeded: boolean, progress: { total: number, submitted: number } }>, schoolClasses: Array<{ uuid: string, name: string | null }>, settings: { assessmentEnabled: { origin: Types.StudentSettingsOrigins, value: boolean }, assessmentType: { origin: Types.StudentSettingsOrigins, value: Types.AssessmentTypes }, onboardingEnabled: { origin: Types.StudentSettingsOrigins, value: boolean }, selfEvaluationEnabled: { origin: Types.StudentSettingsOrigins, value: boolean } }, plans: Array<{ id: string }> } | null };

export type StudentFinalReportQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type StudentFinalReportQuery = { student: { firstName: string | null, lastName: string | null, uuid: string, finalReport: { additionalPathways: Array<{ description: string | null, id: string, imageUrl: string, name: string }>, assessmentAttempt: { id: string, updatedAt: string } | null, currentCourses: Array<{ id: string, name: string, description: string | null, assignments: Array<{ id: string, displayName: string | null, submission: { id: string, files: Array<{ id: string, filename: string, url: string }> } | null }> | null, pathway: { name: string, cluster: { name: string } } | null, reviewSurvey: { questions: Array<{ id: string, answer: Array<string | null>, question: string }> } | null }>, interestsResult: Array<{ interest: string, score: number }>, recommendedCourses: Array<{ description: string | null, id: string, name: string, pathway: { id: string, name: string, cluster: { id: string, name: string } } | null }>, recommendedPathways: Array<{ id: string, name: string, imageUrl: string, description: string | null }>, studyPreferencesResult: Array<{ area: string, description: string, position: number }>, workValuesResult: Array<{ score: number, workValue: string }> } } | null };

export type StudentManagementQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.StudentFilter>;
  fullNameSortOrder: Types.InputMaybe<Types.SortingOrder>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
}>;


export type StudentManagementQuery = { students: { nodesCount: number, pagesCount: number, nodes: Array<{ gradYear: number | null, uuid: string, firstName: string | null, canPostSecondarySettingBeChanged: boolean, fullName: string | null, lastName: string | null, email: string | null, sisId: string | null, postSecondaryApplicationsStatus: { isEnabled: boolean, isOverridden: boolean }, counselor: { uuid: string, fullName: string | null } | null, entity: { uuid: string, name: string | null } | null, plans: Array<{ id: string }> }> } };

export type StudentPortfolioInfoQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type StudentPortfolioInfoQuery = { student: { uuid: string, firstName: string | null, lastName: string | null, schoolClasses: Array<{ uuid: string, name: string | null }> } | null };

export type StudentRecommendedCoursesQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type StudentRecommendedCoursesQuery = { student: { uuid: string, recommendedCourses: Array<{ id: string, imageUrl: string, match: number | null, type: Types.CourseTypes, name: string, thumbnailUrl: string, pathway: { name: string } | null, collection: { id: string, name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } }> } | null };

export type StudentsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.StudentFilter>;
  scope: Types.InputMaybe<Types.ArchivableStatus>;
}>;


export type StudentsQuery = { students: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, firstName: string | null, lastName: string | null, entity: { uuid: string, name: string | null } | null }> } };

export type SystemAdminEntitiesQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.EntityFilter>;
}>;


export type SystemAdminEntitiesQuery = { adminDashboard: { userId: string, entities: { pagesCount: number, nodes: Array<{ name: string, uuid: string, hierarchyMetrics: { entitiesCount: number, schoolClassesCount: number, studentsCount: number, teachersCount: number } | null, settings: { assessmentType: Types.AssessmentTypes } }> } } | null };

export type DcAdminUsersQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserFilter>;
}>;


export type DcAdminUsersQuery = { adminDashboard: { userId: string, users: { pagesCount: number, nodesCount: number, nodes: Array<{ firstName: string | null, gradingNeeded: boolean, lastName: string | null, role: Types.UserRoles, schoolClassesCount: number, uuid: string, entity: { name: string, uuid: string, parent: { name: string, uuid: string } | null } | null }> } } | null };

export type TagQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TagQuery = { tag: { hasRubricHeadings: boolean, id: string, name: string, isDefault: boolean, type: Types.TagTypes, rubricHeadings: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, name: string, multiplier: number, uuid: string, rubric: { id: string, name: string } }> } } | null };

export type TagsQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.TagFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type TagsQuery = { tags: { nodesCount: number, pagesCount: number, nodes: Array<{ name: string, id: string, type: Types.TagTypes, hasRubricHeadings: boolean }> } };

export type TaskQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TaskQuery = { task: { archivedAt: string | null, description: string | null, displayName: string | null, id: string, imageUrl: string | null, introduction: string | null, name: string, presentationUrl: string | null, standard: string | null, status: Types.TaskStatuses, studentResources: string | null, teachingResources: string | null, thumbnailUrl: string | null, badges: Array<{ id: string, name: string, imageUrl: string }>, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, courses: Array<{ name: string, id: string }>, checkInGroups: Array<{ displayName: string | null, id: string, name: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null }> }>, pathways: Array<{ id: string, name: string }>, files: Array<{ description: string | null, displayName: string, filename: string, id: string, step: number | null, url: string, task: { id: string } }>, products: Array<{ id: string, name: string, displayName: string | null, description: string | null, rubricsUrl: string | null, status: Types.ProductStatuses, step: number | null, owner: { uuid: string, name: string | null } | null }>, presentation: { id: string, status: Types.PresentationStatuses } | null } | null };

export type TaskPresentationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TaskPresentationQuery = { task: { id: string, presentation: { color: string | null, description: string | null, displayName: string, id: string, name: string, status: Types.PresentationStatuses, transition: string | null, typography: string | null, type: Types.PresentationTypes, slideBackgroundImages: Array<{ id: string, thumbnailUrl: string, url: string }>, slides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, isShared: boolean, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> }, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, isShared: boolean, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string, type: string, value: string, style: string }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> } }> | null, checkInGroups: Array<{ displayName: string | null, id: string, name: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, products: Array<{ description: string | null, displayName: string | null, id: string, name: string, rubricsUrl: string | null, step: number | null, rubrics: Array<{ canEdit: boolean, description: string, displayName: string | null, hasAlignedStatements: boolean, id: string, name: string, pointsAvailable: number, uuid: string, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string, uuid: string }>, headings: Array<{ id: string, multiplier: number, name: string, uuid: string }>, criteriaLabels: Array<{ displayName: string | null, id: string, score: number, uuid: string }> }> }> }> } | null } | null };

export type TaskUnitsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TaskUnitsQuery = { task: { id: string, units: Array<{ id: string, name: string }> } | null };

export type TasksQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.TaskFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  withCopies: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type TasksQuery = { tasks: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, id: string, imageUrl: string | null, name: string, status: Types.TaskStatuses, thumbnailUrl: string | null, owner: { name: string | null, uuid: string } | null }> } };

export type TeacherClusterEnrollmentStatsQueryVariables = Types.Exact<{
  userUuid: Types.InputMaybe<Types.Scalars['ID']['input']>;
  startYear: Types.Scalars['Int']['input'];
}>;


export type TeacherClusterEnrollmentStatsQuery = { teacherDashboard: { userId: string, clusterEnrollmentStats: Array<{ studentsCount: number, cluster: { id: string, name: string } }> } | null };

export type TeacherDashboardActivityLogQueryVariables = Types.Exact<{
  userUuid: Types.InputMaybe<Types.Scalars['ID']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type TeacherDashboardActivityLogQuery = { teacherDashboard: { userId: string, activityLog: { edges: Array<{ cursor: string, node: { activity: string | null, updatedAt: string, type: Types.StudentActivityTypes | null, context: { id: string, name: string } | { id: string, name: string } | { id: string, name: string | null } | null, student: { uuid: string, firstName: string | null, lastName: string | null }, target: { id: string, name: string } | null } | null } | null> | null, pageInfo: { endCursor: string | null, hasNextPage: boolean } } } | null };

export type TeacherDashboardClassesStatsQueryVariables = Types.Exact<{
  userUuid: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type TeacherDashboardClassesStatsQuery = { teacherDashboard: { userId: string, schoolClasses: Array<{ enrolledCoursesCount: number, entityName: string, finishedAssessmentsCount: number, finishedCoursesCount: number, gradingNeeded: boolean, isDemo: boolean, schoolClassName: string, schoolClassUuid: string, studentsCount: number, settings: { assessmentType: Types.AssessmentTypes } }> } | null };

export type TeacherDashboardMyReportsQueryVariables = Types.Exact<{
  userUuid: Types.InputMaybe<Types.Scalars['ID']['input']>;
  startYear: Types.Scalars['Int']['input'];
}>;


export type TeacherDashboardMyReportsQuery = { teacherDashboard: { userId: string, myReports: { assessmentsFinished: number, assignmentsSubmitted: number, coursesEnrolled: number, coursesFinished: number } } | null };

export type TeacherDashboardPlansQueryVariables = Types.Exact<{
  userUuid: Types.Scalars['ID']['input'];
}>;


export type TeacherDashboardPlansQuery = { teacherDashboard: { userId: string, plans: Array<{ id: string, name: string }> } | null };

export type TeacherPathwayEnrollmentStatsQueryVariables = Types.Exact<{
  userUuid: Types.InputMaybe<Types.Scalars['ID']['input']>;
  startYear: Types.Scalars['Int']['input'];
}>;


export type TeacherPathwayEnrollmentStatsQuery = { teacherDashboard: { userId: string, pathwayEnrollmentStats: Array<{ studentsCount: number, pathway: { id: string, name: string } }> } | null };

export type TextQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TextQuery = { text: { archivedAt: string | null, content: string, displayName: string | null, id: string, name: string } | null };

export type TextLessonsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TextLessonsQuery = { text: { id: string, lessons: Array<{ id: string, name: string }> } | null };

export type TextsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.TextFilter>;
}>;


export type TextsQuery = { texts: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, content: string, displayName: string | null, id: string, name: string }> } };

export type TrackQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TrackQuery = { track: { archivedAt: string | null, description: string | null, displayName: string | null, grades: Array<string>, id: string, imageUrl: string, name: string, shortDescription: string | null, status: Types.TrackStatuses, service: Types.Services, thumbnailUrl: string, units: Array<{ id: string, imageUrl: string, thumbnailUrl: string, name: string, step: number | null, service: Types.Services | null }> } | null };

export type TrackCatalogsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TrackCatalogsQuery = { track: { id: string, catalogs: Array<{ id: string, name: string }> } | null };

export type TracksQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.TrackFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type TracksQuery = { tracks: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string | null, displayName: string | null, grades: Array<string>, id: string, imageUrl: string, name: string, shortDescription: string | null, service: Types.Services, status: Types.TrackStatuses, thumbnailUrl: string, units: Array<{ id: string, imageUrl: string, name: string, step: number | null, service: Types.Services | null }> }> } };

export type UnitQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type UnitQuery = { unit: { archivedAt: string | null, description: string | null, displayName: string | null, id: string, imageUrl: string, name: string, status: Types.UnitStatuses, service: Types.Services | null, thumbnailUrl: string, tasks: Array<{ id: string, name: string, step: number | null, thumbnailUrl: string | null, owner: { name: string | null, uuid: string } | null }>, resources: Array<{ name: string, resourceId: string, resourceType: Types.UnitResourceTypes, step: number, thumbnailUrl: string | null, isVirtualInternship: boolean | null }> } | null };

export type UnitTracksQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type UnitTracksQuery = { unit: { id: string, tracks: Array<{ id: string, name: string }>, resources: Array<{ description: string | null, imageUrl: string | null, name: string, resourceId: string, resourceType: Types.UnitResourceTypes, step: number, thumbnailUrl: string | null }> } | null };

export type UnitsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  filter: Types.InputMaybe<Types.UnitFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UnitsQuery = { units: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string | null, displayName: string | null, id: string, imageUrl: string, name: string, status: Types.UnitStatuses, service: Types.Services | null, thumbnailUrl: string, tasks: Array<{ id: string, name: string, step: number | null }> }> } };

export type UserQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type UserQuery = { user: { firstName: string | null, lastName: string | null, email: string | null, role: Types.UserRoles, uuid: string, permissions: { wblAdmin: boolean, counselor: boolean, canImpersonate: boolean, canBrowseReports: boolean } } | null };

export type UserCoursesQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.CourseFilter>;
}>;


export type UserCoursesQuery = { courses: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, id: string, description: string | null, imageUrl: string, name: string, status: Types.CourseStatuses, thumbnailUrl: string, type: Types.CourseTypes, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null }, pathway: { id: string, name: string } | null, collection: { id: string, name: string } | null }> } };

export type DcUserInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DcUserInfoQuery = { userInfo: { availableReportTypes: Array<Types.ReportTypes>, email: string | null, logoUrl: string | null, iconUrl: string | null, currentSchoolYear: number, firstName: string | null, hasUnreadConversation: boolean, hasOpportunitiesEnabled: boolean, hasAccessToPbl: boolean, lastName: string | null, isImpersonated: boolean, role: Types.UserRoles, username: string | null, uuid: string, welcomeMessage: string | null, commonAppData: { hasRecommenderInvitation: boolean, hasTeacherInvitation: boolean, hasCounselorInvitation: boolean, hasCounselorProfileFormCompleted: boolean, hasTeacherProfileFormCompleted: boolean, syncStatus: { lastSyncedAt: string | null, status: Types.CommonAppSyncStatuses } | null }, entities: { nodes: Array<{ uuid: string, reportTypes: Array<Types.ReportTypes> | null, settings: { postSecondaryApplicationsEnabled: boolean, classManagementEnabled: boolean, schoolYearStartDate: { day: number, month: number } } }> }, permissions: { wblAdmin: boolean, counselor: boolean, canImpersonate: boolean, canBrowseReports: boolean } } };

export type UserPlansQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type UserPlansQuery = { user: { uuid: string, entities: { nodes: Array<{ uuid: string, plans: Array<{ id: string, name: string }> | null }> } } | null };

export type UserWithClassesQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type UserWithClassesQuery = { user: { email: string | null, firstName: string | null, lastName: string | null, role: Types.UserRoles, uuid: string, gradingNeeded: boolean, schoolClasses: { nodes: Array<{ uuid: string, name: string | null, gradingNeeded: boolean, entity: { name: string | null, uuid: string } }> } } | null };

export type UsersOfEntityQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserFilter>;
}>;


export type UsersOfEntityQuery = { entity: { uuid: string, users: { pagesCount: number, nodesCount: number, nodes: Array<{ firstName: string | null, lastName: string | null, role: Types.UserRoles, uuid: string, gradingNeeded: boolean }> } | null } | null };

export type VideoQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type VideoQuery = { video: { archivedAt: string | null, description: string, displayName: string | null, filename: string, id: string, name: string, url: string } | null };

export type VideoLessonsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type VideoLessonsQuery = { video: { id: string, lessons: Array<{ id: string, name: string }> } | null };

export type VideosQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.VideoFilter>;
}>;


export type VideosQuery = { videos: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, description: string, displayName: string | null, filename: string, id: string, name: string, url: string }> } };

export type VirtualInternshipQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type VirtualInternshipQuery = { virtualInternship: { archivedAt: string | null, id: string, requiredExperiences: number, status: Types.VirtualInternshipStatuses, opportunity: { id: string, name: string, availableSpots: number | null, creditsOutcomes: string | null, description: string, imageUrl: string | null, opportunityType: Types.OpportunityTypes, salaryInformation: string | null, tags: Array<string>, pathways: Array<{ id: string, name: string }> }, calendarLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }>, experienceOpportunityLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }>, postExperienceLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }>, readinessSkillsLessons: Array<{ id: string, step: number | null, name: string, imageUrl: string, thumbnailUrl: string, type: string }> } | null };

export type UserVirtualInternshipLessonQueryVariables = Types.Exact<{
  virtualInternshipId: Types.Scalars['ID']['input'];
  lessonId: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type UserVirtualInternshipLessonQuery = { virtualInternship: { id: string, opportunity: { id: string, name: string }, lesson: { hasPresentation: boolean, id: string, imageUrl: string, name: string, type: string, assignments: Array<{ description: string, displayName: string | null, id: string, step: number | null, rubrics: Array<{ description: string, id: string, name: string, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> }>, attachments: Array<{ description: string, displayName: string | null, id: string, step: number | null, files: Array<{ filename: string, id: string, url: string }> }>, careerReviewSurvey: { questions: Array<{ answer: Array<string | null>, id: string, question: string, type: Types.CareerReviewSurveyQuestionTypes, options: Array<{ option: string, step: number }> }> } | null, checkInGroups: Array<{ displayName: string | null, id: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null }>, description: { introduction: string | null, goal: string | null, role: string | null, audience: string | null, situation: string | null } | null, externalPresentations: Array<{ displayName: string | null, id: string, source: string, step: number | null, isExpandable: boolean }>, researchLinks: Array<{ author: string | null, displayName: string | null, id: string, resourceLink: string, sourceName: string, step: number | null }>, texts: Array<{ content: string, displayName: string | null, id: string, step: number | null }>, videos: Array<{ description: string, displayName: string | null, filename: string, id: string, url: string, step: number | null }>, vocabularies: Array<{ definition: string, id: string, step: number | null, term: string }> } } | null };

export type VirtualInternshipsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type VirtualInternshipsQuery = { virtualInternships: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, id: string, requiredExperiences: number, status: Types.VirtualInternshipStatuses, opportunity: { id: string, name: string, availableSpots: number | null, creditsOutcomes: string | null, description: string, imageUrl: string | null, opportunityType: Types.OpportunityTypes, salaryInformation: string | null, tags: Array<string>, pathways: Array<{ id: string, name: string }> } }> } };

export type VocabulariesQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.VocabularyFilter>;
}>;


export type VocabulariesQuery = { vocabularies: { nodesCount: number, pagesCount: number, nodes: Array<{ archivedAt: string | null, definition: string, id: string, term: string, name: string }> } };

export type VocabularyQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type VocabularyQuery = { vocabulary: { archivedAt: string | null, definition: string, id: string, term: string } | null };

export type VocabularyLessonsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type VocabularyLessonsQuery = { vocabulary: { id: string, lessons: Array<{ id: string, name: string }> } | null };
