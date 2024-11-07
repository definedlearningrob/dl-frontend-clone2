import fontColorContrast from 'font-color-contrast';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';
import {
  useApolloClient,
  useMutation,
  MutationFunction,
  FetchResult,
  DocumentNode,
} from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { DropResult } from 'react-beautiful-dnd';

import ARCHIVE_SLIDE_BACKGROUND_IMAGE, {
  TArchiveSlideBackgroundImageData,
  TArchiveSlideBackgroundImageVariables,
} from '@dc/graphql/user/mutations/archiveSlideBackgroundImage';
import ARCHIVE_SLIDE, {
  ArchiveSlideMutationData,
  ArchiveSlideMutationInput,
} from '@dc/graphql/user/mutations/archiveSlide';
import ARCHIVE_SLIDE_IMAGE, {
  TArchiveSlideImageData,
  TArchiveSlideImageVariables,
} from '@dc/graphql/user/mutations/archiveSlideImage';
import ARCHIVE_SLIDE_VIDEO, {
  TArchiveSlidevideoData,
  TArchiveSlidevideoVariables,
} from '@dc/graphql/user/mutations/archiveSlideVideo';
import CREATE_SLIDE_BACKGROUND_IMAGE, {
  TCreateSlideBackgroundImageData,
  TCreateSlideBackgroundImageVariables,
} from '@dc/graphql/user/mutations/createSlideBackgroundImage';
import CREATE_SLIDE_IMAGE, {
  TCreateSlideImageData,
  TCreateSlideImageVariables,
} from '@dc/graphql/user/mutations/createSlideImage';
import CREATE_SLIDE_VIDEO, {
  TCreateSlideVideoData,
  TCreateSlideVideoVariables,
} from '@dc/graphql/user/mutations/createSlideVideo';
import GENERATE_PRESIGNED_UPLOAD_URL from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import UPDATE_SLIDE_IMAGE, {
  TUpdateSlideImageData,
  TUpdateSlideImageVariables,
} from '@dc/graphql/user/mutations/updateSlideImage';
import UPDATE_SLIDE_VIDEO, {
  TUpdateSlideVideoData,
  TUpdateSlideVideoVariables,
} from '@dc/graphql/user/mutations/updateSlideVideo';
import taskPresentationQuery, {
  TSlideBackgroundImage,
  TTaskPresentationImage,
  TTaskPresentationVideo,
} from '@dc/graphql/user/queries/taskPresentation';
import updatePresentationMutation, {
  UpdatePresentationMutationData,
  UpdatePresentationMutationInput,
} from '@dc/graphql/user/mutations/updatePresentation';
import updateSlideMutation, {
  UpdateSlideMutationData,
  UpdateSlideMutationInput,
} from '@dc/graphql/user/mutations/updateSlide';
import { AssetType, ResourceClass } from '@dc/resources/enums';
import { IMAGE_SLIDE_POSITION } from '@dc/resources/constants';
import { fileUpload } from '@dc/services/aws';
import { removeFromCache } from '@dc/utils/graphql';
import {
  TTaskPresentation,
  TTaskPresentationSlide,
} from '@dc/graphql/user/queries/taskPresentation';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';
import 'reveal.js/dist/theme/black.css';

import { usePresentationState } from '@shared/hooks/usePresentationState';

type PresentationBuilderContextType = {
  setCurrentSlide: (
    slide: TTaskPresentationSlide & {
      subSlideSelected?: boolean;
      parentSlideId?: string;
    }
  ) => void;
  handleAddLibrarySubSlide: (subslide: Omit<TTaskPresentationSlide, 'subslides'>) => Promise<void>;
  handleAddSlide: (slide: TTaskPresentationSlide) => Promise<void>;
  handleAddSubSlide: (newSubSlideId: string) => Promise<void>;
  handleAddToLibrary: (slideId: string) => Promise<FetchResult<UpdateSlideMutationData>>;
  handleArchiveSlide: (id: string) => Promise<FetchResult<ArchiveSlideMutationData>>;
  handleImagePosition: (id: string, position: string) => Promise<void>;
  handleImageStyleUpdate: (
    image: {
      id: string;
    },
    style: 'fill' | 'contain'
  ) => Promise<void>;
  handleImageUpload: (
    passedFile: File,
    style: 'fill' | 'contain',
    contentId: string
  ) => Promise<void>;
  handleOnSlideDragEnd: (result: DropResult) => Promise<void>;
  handleRemoveSlide: (passedSlide: TTaskPresentationSlide) => Promise<void>;
  handleSettingsMenuChange: (id: string | number) => void;
  handleSlideBackgroundImageArchive: (id: string) => Promise<void>;
  handleSlideBackgroundImageUpload: (passedFile: File) => Promise<void>;
  handleSlideImageArchive: (id: string) => Promise<void>;
  handleSlideVideoArchive: (id: string) => Promise<void>;
  handleUpdatePresentation: (
    values: Omit<UpdatePresentationMutationInput['input'], 'id'>
  ) => Promise<void>;
  handleUpdateSlide: (_event?: null, newValues?: {}) => Promise<void>;
  handleVideoUpload: (passedFile: File, contentId: string) => Promise<void>;
  handleVideoUrlSave: (videoUrl: string, contentId: string) => Promise<void>;
  handleVideoUrlUpdate: (
    video: {
      id: string;
    },
    videoUrl: string
  ) => Promise<void>;
  isOnDark: boolean | null;
  toggleNewSubSlideModal: (slideId: string, value: boolean) => void;
  taskPresentationQuery: DocumentNode;
  // NEw
  archiveSlide: MutationFunction<ArchiveSlideMutationData, ArchiveSlideMutationInput>;
  archiveSlideBackgroundImage: MutationFunction<
    TArchiveSlideBackgroundImageData,
    TArchiveSlideBackgroundImageVariables
  >;
  archiveSlideImage: MutationFunction<TArchiveSlideImageData, TArchiveSlideImageVariables>;
  archiveSlideVideo: MutationFunction<TArchiveSlidevideoData, TArchiveSlidevideoVariables>;
  createSlideBackgroundImage: MutationFunction<
    TCreateSlideBackgroundImageData,
    TCreateSlideBackgroundImageVariables
  >;
  createSlideImage: MutationFunction<TCreateSlideImageData, TCreateSlideImageVariables>;
  createSlideVideo: MutationFunction<TCreateSlideVideoData, TCreateSlideVideoVariables>;
  currentPresentation: TTaskPresentation;
  currentSlide:
    | (TTaskPresentationSlide & {
        subSlideSelected?: boolean;
        parentSlideId?: string;
        slideBackgroundImages?: TSlideBackgroundImage[];
      })
    | null;
  dispatchOverflowingItems: Dispatch<OverflowReducerAction>;
  imagePosition: typeof IMAGE_SLIDE_POSITION[keyof typeof IMAGE_SLIDE_POSITION];
  imagesUploading: { contentId: string; progress: number }[];
  isSaving: boolean;
  isSystemAdminUser: boolean;
  newSubSlideModalState: {
    slideId: string | null;
    isOpen: boolean;
  };
  overflowingItems: { [key: string]: boolean } | null;
  scriptView: { [key: string]: boolean } | null;
  selectedSlideContent: { type: string; id: string } | null;
  setAdditionalParams: (value: {}) => void;
  setCurrentSlideId: (value: string) => void;
  setImagePosition: (value: typeof IMAGE_SLIDE_POSITION[keyof typeof IMAGE_SLIDE_POSITION]) => void;
  setImagesUploading: (value: { contentId: string; progress: number }[]) => void;
  setNewSubSlideModalState: (value: { slideId: string | null; isOpen: boolean }) => void;
  setScriptView: (value: null | { [key: string]: boolean }) => void;
  setSelectedSlideContent: (value: { type: string; id: string } | null) => void;
  setSettingsContent: (value: { name: string; selected: boolean }[]) => void;
  setShowSlideNotes: (value: boolean) => void;
  settingsContent: { name: string; selected: boolean }[];
  setVideosUploading: (value: { contentId: string; progress: number; name: string }[]) => void;
  showSlideNotes: boolean;
  taskId: string;
  updatePresentation: MutationFunction<
    UpdatePresentationMutationData,
    UpdatePresentationMutationInput
  >;
  updateSlide: MutationFunction<UpdateSlideMutationData, UpdateSlideMutationInput>;
  updateSlideImage: MutationFunction<TUpdateSlideImageData, TUpdateSlideImageVariables>;
  updateSlideVideo: MutationFunction<TUpdateSlideVideoData, TUpdateSlideVideoVariables>;
  videosUploading: { contentId: string; progress: number; name: string }[];
};

const PresentationBuilderContext = createContext<PresentationBuilderContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
  taskId: string;
  presentation: TTaskPresentation;
  isSystemAdminUser: boolean;
  onMount: () => void;
  onUnmount: () => void;
};

type OverflowReducerState = {
  id: string;
  overflowingItems: {
    [key: string]: boolean;
  };
}[];

type OverflowReducerAction = {
  type: string;
  payload: {
    [key: string]: boolean;
  };
};

export function PresentationBuilderProvider({
  children,
  presentation: currentPresentation,
  taskId,
  isSystemAdminUser,
  onMount,
  onUnmount,
}: ProviderProps) {
  const { t } = useTranslation();
  const [imagesUploading, setImagesUploading] = useState<
    {
      contentId: string;
      progress: number;
    }[]
  >([]);
  const [scriptView, setScriptView] = useState<null | { [key: string]: boolean }>(null);
  const [videosUploading, setVideosUploading] = useState<
    {
      contentId: string;
      progress: number;
      name: string;
    }[]
  >([]);
  const [additionalParams, setAdditionalParams] = useState({});
  const [newSubSlideModalState, setNewSubSlideModalState] = useState<{
    slideId: string | null;
    isOpen: boolean;
  }>({
    slideId: null,
    isOpen: false,
  });
  const [imagePosition, setImagePosition] = useState(IMAGE_SLIDE_POSITION.RIGHT);
  const [updateSlide, { loading: slideIsLoading }] = useMutation<
    UpdateSlideMutationData,
    UpdateSlideMutationInput
  >(updateSlideMutation);
  const [archiveSlideBackgroundImage, { loading: archiveSlideBackgroundImageLoading }] =
    useMutation<TArchiveSlideBackgroundImageData, TArchiveSlideBackgroundImageVariables>(
      ARCHIVE_SLIDE_BACKGROUND_IMAGE
    );
  const [archiveSlideImage, { loading: archiveImageLoading }] = useMutation<
    TArchiveSlideImageData,
    TArchiveSlideImageVariables
  >(ARCHIVE_SLIDE_IMAGE);
  const [archiveSlide, { loading: archiveSlideLoading }] = useMutation<
    ArchiveSlideMutationData,
    ArchiveSlideMutationInput
  >(ARCHIVE_SLIDE);
  const [archiveSlideVideo, { loading: archiveVideoLoading }] = useMutation<
    TArchiveSlidevideoData,
    TArchiveSlidevideoVariables
  >(ARCHIVE_SLIDE_VIDEO);
  const [createSlideBackgroundImage, { loading: createSlideBackgroundImageLoading }] = useMutation<
    TCreateSlideBackgroundImageData,
    TCreateSlideBackgroundImageVariables
  >(CREATE_SLIDE_BACKGROUND_IMAGE);
  const [createSlideImage, { loading: createImageLoading }] = useMutation<
    TCreateSlideImageData,
    TCreateSlideImageVariables
  >(CREATE_SLIDE_IMAGE);
  const [createSlideVideo, { loading: createVideoLoading }] = useMutation<
    TCreateSlideVideoData,
    TCreateSlideVideoVariables
  >(CREATE_SLIDE_VIDEO);
  const [updateSlideImage, { loading: updateSlideImageLoading }] = useMutation<
    TUpdateSlideImageData,
    TUpdateSlideImageVariables
  >(UPDATE_SLIDE_IMAGE);
  const [updateSlideVideo, { loading: updateSlideVideoLoading }] = useMutation<
    TUpdateSlideVideoData,
    TUpdateSlideVideoVariables
  >(UPDATE_SLIDE_VIDEO);
  const [updatePresentation, { loading: presentationIsLoading }] = useMutation<
    UpdatePresentationMutationData,
    UpdatePresentationMutationInput
  >(updatePresentationMutation);

  const sortedSlides = currentPresentation.slides
    .slice()
    .sort((slideA, slideB) => slideA.step - slideB.step);
  const [currentSlideId, setCurrentSlideId] = useState(sortedSlides[0]?.id);
  const [selectedSlideContent, setSelectedSlideContent] = useState<{
    type: string;
    id: string;
  } | null>(null);
  const [showSlideNotes, setShowSlideNotes] = useState(false);
  const { presentationState, presentationDispatch } = usePresentationState();
  const baseSettingsContent = [
    { name: t('admin.tasks.presentation.elements'), selected: true },
    { name: t('admin.tasks.presentation.slideSettings'), selected: false },
  ];
  const defaultTabs = currentPresentation.id
    ? [
        ...baseSettingsContent,
        { name: t('admin.tasks.presentation.presentationSettings'), selected: false },
      ]
    : baseSettingsContent;

  const [settingsContent, setSettingsContent] = useState(defaultTabs);

  const flattenSlides = sortedSlides
    ? sortedSlides.reduce(
        (acc, slide) => [...acc, slide, ...slide.subslides],
        [] as TTaskPresentationSlide[]
      )
    : [];

  const currentSlideRaw =
    flattenSlides.find((slide) => slide?.id === currentSlideId) || sortedSlides[0];

  const currentSlide = currentSlideRaw ? { ...currentSlideRaw, ...additionalParams } : null;
  const isSaving =
    archiveImageLoading ||
    archiveSlideBackgroundImageLoading ||
    archiveVideoLoading ||
    createImageLoading ||
    createSlideBackgroundImageLoading ||
    createVideoLoading ||
    presentationIsLoading ||
    slideIsLoading ||
    updateSlideImageLoading ||
    updateSlideVideoLoading ||
    archiveSlideLoading ||
    imagesUploading.length !== 0;

  const overFlowReducer = (state: OverflowReducerState, action: OverflowReducerAction) => {
    switch (action.type) {
      case 'SET_OVERFLOWING_ITEM':
        const slide = state.find((slide) => slide.id === currentSlide?.id) || {
          overflowingItems: {},
        };

        const newObject: OverflowReducerState[number] = {
          id: currentSlide?.id || '1',
          overflowingItems: {
            ...slide.overflowingItems,
            ...action.payload,
          },
        };

        const stateWithoutObject = state.filter((slide) => slide.id !== currentSlide?.id);

        return [...stateWithoutObject, newObject];
      default:
        return state;
    }
  };

  const [overflowingItems, dispatchOverflowingItems] = useReducer(overFlowReducer, []);

  useEffect(() => {
    if (settingsContent.length !== defaultTabs.length) {
      setSettingsContent(defaultTabs);
    }
  }, [currentPresentation]);

  useEffect(() => {
    presentationDispatch({ type: 'SET_PRESENTATION_HAS_PENDING_CHANGES', payload: false });
    presentationDispatch({ type: 'SET_IS_PRESENTATION_SAVING', payload: isSaving });
  }, [isSaving]);

  useEffect(() => {
    if (presentationState.isOnSharedSlide !== currentSlide?.isShared) {
      presentationDispatch({ type: 'SET_IS_ON_SHARED_SLIDE', payload: currentSlide?.isShared });
    }
  }, [currentSlide]);

  useEffect(() => {
    const { librarySlideId } = presentationState;

    if (librarySlideId && currentSlide?.id !== librarySlideId) {
      setCurrentSlideId(librarySlideId);
    }
  }, [presentationState.librarySlideId]);

  useEffect(() => {
    onMount && onMount();

    return () => {
      onUnmount && onUnmount();
    };
  }, []);

  //HERE:

  const [getPresignedUrl] = useMutation(GENERATE_PRESIGNED_UPLOAD_URL);
  const { cache } = useApolloClient();

  const { showPresentationSettings } = presentationState;

  const toggleNewSubSlideModal = (slideId: string, value: boolean) =>
    setNewSubSlideModalState({ slideId, isOpen: value });

  const handleRemoveSlide = async (passedSlide: TTaskPresentationSlide) => {
    const presentationSlideAttributes = [];

    for (let slide of currentPresentation.slides) {
      presentationSlideAttributes.push({
        slideId: slide.id,
        step: slide.step,
        subslides: slide.subslides.map((subslide) => ({
          slideId: subslide.id,
          step: subslide.step,
        })),
      });
    }

    const slideIndexToDelete = presentationSlideAttributes.findIndex(
      (slide) => slide.slideId === passedSlide.id
    );

    if (slideIndexToDelete !== -1) {
      presentationSlideAttributes.splice(slideIndexToDelete, 1);
    } else {
      presentationSlideAttributes.forEach((slide) => {
        const subSlideIndexToDelete = slide.subslides.findIndex(
          (subslide) => subslide.slideId === passedSlide.id
        );

        if (subSlideIndexToDelete !== -1) {
          slide.subslides.splice(subSlideIndexToDelete, 1);
        }
      });
    }

    try {
      if (!passedSlide.isShared) {
        await archiveSlide({ variables: { input: { id: passedSlide.id } } });
      }

      await updatePresentation({
        variables: {
          input: {
            id: currentPresentation.id,
            name: currentPresentation.name,
            description: currentPresentation.description,
            presentationSlides: presentationSlideAttributes,
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleAddToLibrary = async (slideId: string) =>
    updateSlide({
      variables: { input: { id: slideId, isShared: true } },
      update: (cache, { data }) => {
        const slide = data?.updateSlide.slide;
        cache.modify({
          fields: {
            slides: (existing) => ({ ...existing, nodes: [...existing.nodes, slide] }),
          },
        });
      },
    });

  const handleSubSlideLibraryDragEnd = async (result: DropResult) => {
    if (result?.type !== 'SUB_SLIDES_LIST') return;

    const slideId = result.source.droppableId.replace(/\D/g, '');
    const parentSlide = currentPresentation.slides.slice().find((slide) => slide.id === slideId);

    if (!parentSlide) return;

    const mutableSubSlidesList = parentSlide.subslides.slice();

    const reorderedSubSlides = mutableSubSlidesList.splice(result.source.index, 1);

    mutableSubSlidesList.splice(result?.destination?.index || 0, 0, reorderedSubSlides[0]);

    const newSubSlides = mutableSubSlidesList.map((subSlide, index) => ({
      ...subSlide,
      step: ++index,
    }));

    const subSlidesPayload = newSubSlides.map((subSlide) => ({
      slideId: subSlide.id,
      step: subSlide.step,
    }));

    cache.modify({
      id: cache.identify(parentSlide),
      fields: {
        subslides() {
          return newSubSlides;
        },
      },
    });

    updateSlide({
      variables: {
        input: {
          id: slideId,
          subslides: subSlidesPayload,
        },
      },
    });
  };

  const handleOnSlideDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    if (!taskId) {
      handleSubSlideLibraryDragEnd(result);

      return;
    }

    const presentationSlideAttributes: {
      slideId: string;
      step: number;
      subslides: {
        slideId: string;
        step: number;
      }[];
    }[] = [];
    const newMutatedSlidesList = Array.from(currentPresentation.slides);

    if (result.type === 'SLIDES_LIST') {
      const [reorderedSlide] = newMutatedSlidesList.splice(result.source.index, 1);

      newMutatedSlidesList.splice(result.destination.index, 0, reorderedSlide);

      const newSlidesList = newMutatedSlidesList.map((slide, index) => ({
        ...slide,
        slideId: slide.id,
        step: ++index,
        subslides: slide.subslides,
      }));

      cache.modify({
        id: cache.identify(currentPresentation),
        fields: {
          slides() {
            return newSlidesList;
          },
        },
      });

      newMutatedSlidesList.forEach((slide, index) => {
        presentationSlideAttributes.push({
          slideId: slide.id,
          step: ++index,
          subslides: slide.subslides.map((subslide) => ({
            slideId: subslide.id,
            step: subslide.step,
          })),
        });
      });
    }

    if (result.type === 'SUB_SLIDES_LIST') {
      const slideId = result.source.droppableId.replace(/\D/g, '');
      const newSubSlidesList = newMutatedSlidesList
        .find((slide) => slide.id === slideId)
        ?.subslides?.slice();

      if (!newSubSlidesList) return;

      const [reorderedSubSlide] = newSubSlidesList.splice(result.source.index, 1);

      newSubSlidesList.splice(result.destination.index, 0, reorderedSubSlide);

      const newSlidesList = newMutatedSlidesList.map((slide, subSlideIndex) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            slideId: slide.id,
            step: slide.step,
            subslides: newSubSlidesList.map((subslide) => ({
              ...subslide,
              slideId: subslide.id,
              step: ++subSlideIndex,
            })),
          };
        }

        return {
          ...slide,
          slideId: slide.id,
          step: slide.step,
          subslides: slide.subslides.map((subslide) => ({
            ...subslide,
            slideId: subslide.id,
            step: subslide.step,
          })),
        };
      });

      cache.modify({
        id: cache.identify(currentPresentation),
        fields: {
          slides() {
            return newSlidesList;
          },
        },
      });

      newMutatedSlidesList.forEach((slide, subSlideIndex) => {
        if (slide.id === slideId) {
          presentationSlideAttributes.push({
            slideId: slide.id,
            step: slide.step,
            subslides: newSubSlidesList.map((subslide) => ({
              slideId: subslide.id,
              step: ++subSlideIndex,
            })),
          });
        } else {
          presentationSlideAttributes.push({
            slideId: slide.id,
            step: slide.step,
            subslides: slide.subslides.map((subslide) => ({
              slideId: subslide.id,
              step: subslide.step,
            })),
          });
        }
      });
    }

    try {
      await updatePresentation({
        variables: {
          input: {
            id: currentPresentation.id,
            name: currentPresentation.name,
            description: currentPresentation.description,
            presentationSlides: presentationSlideAttributes,
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleSettingsMenuChange = (id: string | number) => {
    const newSettings = settingsContent.map((setting, index) => {
      if (index === id) {
        return {
          ...setting,
          selected: true,
        };
      }

      return {
        ...setting,
        selected: false,
      };
    });

    setSettingsContent(newSettings);
  };

  useEffect(() => {
    if (showPresentationSettings) {
      handleSettingsMenuChange(2);
      presentationDispatch({ type: 'SET_SHOW_PRESENTATION_SETTINGS', payload: false });
    }
  }, [showPresentationSettings]);

  // First is unused event because this function is used mainly as event handler and event is first argument
  const handleUpdateSlide = async (_event?: null, newValues?: {}) => {
    if (!currentSlide) return;

    const mappedTexts = currentSlide.content.texts.map((text) => ({
      contentId: text.contentId,
      style: text.style,
      type: text.type,
      value: text.value,
    }));

    const updateSlideBody = newValues
      ? { id: currentSlide.id, ...newValues }
      : {
          backgroundColor: currentSlide.backgroundColor,
          id: currentSlide.id,
          name: currentSlide.name,
          notes: currentSlide.notes,
          textItems: mappedTexts,
          iframeUrl: currentSlide.iframeUrl,
          isShared: currentSlide.isShared,
          products: currentSlide.products,
        };

    try {
      await updateSlide({
        variables: {
          input: updateSlideBody,
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleSlideBackgroundImageUpload = async (passedFile: File) => {
    try {
      const { promise, file, uuid } = await fileUpload(
        passedFile,
        getPresignedUrl,
        ResourceClass.SLIDE_BACKGROUND_IMAGE,
        AssetType.IMAGE
      );

      await promise;

      const { data } = await createSlideBackgroundImage({
        variables: {
          input: {
            imageFilename: file.name,
            imageUuid: uuid,
            slideId: currentSlide?.id || '0',
          },
        },
        update(cache, { data: data2 }) {
          const slideBgImage = data2?.createSlideBackgroundImage.slideBackgroundImage;
          if (taskId) {
            cache.modify({
              id: cache.identify(currentPresentation),
              fields: {
                slideBackgroundImages(existing = []) {
                  return [...existing, slideBgImage];
                },
              },
            });
          } else {
            if (!currentSlide) return;
            cache.modify({
              id: cache.identify(currentSlide),
              fields: {
                slideBackgroundImages(existing = []) {
                  return [...existing, slideBgImage];
                },
              },
            });
          }
        },
      });

      const url = data?.createSlideBackgroundImage.slideBackgroundImage.url;

      handleUpdateSlide(null, {
        backgroundImage: url,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleSlideBackgroundImageArchive = async (id: string) => {
    await archiveSlideBackgroundImage({
      variables: { input: { id } },
      update: (cache) => {
        cache.modify({
          id: cache.identify(currentPresentation),
          fields: {
            slideBackgroundImages(existing = [], { readField }) {
              return existing.filter(
                (backgroundImage: TSlideBackgroundImage) => readField('id', backgroundImage) !== id
              );
            },
          },
        });

        removeFromCache(id, 'SlideBackgroundImage');
      },
    });
  };

  const handleImageUpload = async (
    passedFile: File,
    style: 'fill' | 'contain',
    contentId: string
  ) => {
    if (!currentSlide) return;
    const uploadingImagesWithout = imagesUploading.filter((img) => img.contentId !== contentId);

    try {
      setImagesUploading([...uploadingImagesWithout, { contentId, progress: 25 }]);

      const { promise, file, uuid } = await fileUpload(
        passedFile,
        getPresignedUrl,
        ResourceClass.SLIDE_IMAGE,
        AssetType.IMAGE
      );

      setImagesUploading([...uploadingImagesWithout, { contentId, progress: 50 }]);

      await promise;

      setImagesUploading([...uploadingImagesWithout, { contentId, progress: 75 }]);

      await createSlideImage({
        variables: {
          input: {
            contentId,
            imageFilename: file.name,
            imageUuid: uuid,
            position: imagePosition,
            slideId: currentSlide.id,
            style,
          },
        },
        update(cache, { data }) {
          const newImage = data?.createSlideImage.slideImage;
          cache.modify({
            id: cache.identify(currentSlide.content),
            fields: {
              images(existing = []) {
                return [...existing, newImage];
              },
            },
          });
        },
      });

      setImagesUploading([...uploadingImagesWithout, { contentId, progress: 100 }]);
      setImagesUploading(uploadingImagesWithout);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      setImagesUploading(uploadingImagesWithout);
    }
  };

  const handleImageStyleUpdate = async (image: { id: string }, style: 'fill' | 'contain') => {
    await updateSlideImage({
      variables: { input: { id: image.id, style } },
    });
  };

  const handleImagePosition = async (id: string, position: string) => {
    await updateSlideImage({
      variables: { input: { id, position } },
    });
  };

  const handleSlideImageArchive = async (id: string) => {
    if (!currentSlide) return;
    await archiveSlideImage({
      variables: { input: { id } },
      update: (cache) => {
        cache.modify({
          id: cache.identify(currentSlide.content),
          fields: {
            images(existing = [], { readField }) {
              return existing.filter(
                (image: TTaskPresentationImage) => readField('id', image) !== id
              );
            },
          },
        });
      },
    });
  };

  const handleVideoUpload = async (passedFile: File, contentId: string) => {
    if (!currentSlide) return;
    const uploadingVideosWithout = videosUploading.filter((video) => video.contentId !== contentId);
    try {
      setVideosUploading([
        ...uploadingVideosWithout,
        { contentId, progress: 25, name: passedFile.name },
      ]);

      const { promise, file, uuid } = await fileUpload(
        passedFile,
        getPresignedUrl,
        ResourceClass.SLIDE_VIDEO,
        AssetType.VIDEO
      );

      setVideosUploading([
        ...uploadingVideosWithout,
        { contentId, progress: 50, name: passedFile.name },
      ]);

      await promise;

      setVideosUploading([
        ...uploadingVideosWithout,
        { contentId, progress: 75, name: passedFile.name },
      ]);

      await createSlideVideo({
        variables: {
          input: {
            videoFilename: file.name,
            videoUuid: uuid,
            contentId,
            slideId: currentSlide.id,
          },
        },
        update(cache, { data }) {
          const newSlideVideo = data?.createSlideVideo.slideVideo;
          cache.modify({
            id: cache.identify(currentSlide.content),
            fields: {
              videos(existing = []) {
                return [...existing, newSlideVideo];
              },
            },
          });
        },
      });

      setVideosUploading([
        ...uploadingVideosWithout,
        { contentId, progress: 100, name: passedFile.name },
      ]);
      setVideosUploading(uploadingVideosWithout);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      setVideosUploading(uploadingVideosWithout);
    }
  };

  const handleVideoUrlSave = async (videoUrl: string, contentId: string) => {
    if (!currentSlide) return;
    await createSlideVideo({
      variables: {
        input: {
          contentId,
          slideId: currentSlide.id,
          videoUrl,
        },
      },
      update(cache, { data }) {
        const newSlideVideo = data?.createSlideVideo.slideVideo;
        cache.modify({
          id: cache.identify(currentSlide.content),
          fields: {
            videos(existing = []) {
              return [...existing, newSlideVideo];
            },
          },
        });
      },
    });
  };

  const handleVideoUrlUpdate = async (video: { id: string }, videoUrl: string) => {
    await updateSlideVideo({
      variables: {
        input: { id: video.id, videoUrl },
      },
    });
  };

  const handleSlideVideoArchive = async (id: string) => {
    if (!currentSlide) return;

    await archiveSlideVideo({
      variables: { input: { id } },
      update: (cache) => {
        cache.modify({
          id: cache.identify(currentSlide.content),
          fields: {
            videos(existing = [], { readField }) {
              return existing.filter(
                (video: TTaskPresentationVideo) => readField('id', video) !== id
              );
            },
          },
        });
      },
    });
  };

  const handleAddSubSlide = async (newSubSlideId: string) => {
    const presentationSlideAttributes = currentPresentation.slides.map((slide) => {
      const newSubSlideStep = ++slide.subslides.slice().length;
      const subslides = [
        ...slide.subslides.slice().map((subSlide) => ({
          slideId: subSlide.id,
          step: subSlide.step,
        })),
      ];

      if (newSubSlideModalState.slideId === slide.id) {
        subslides.push({ slideId: newSubSlideId, step: newSubSlideStep });
      }

      return {
        slideId: slide.id,
        step: slide.step,
        subslides,
      };
    });

    try {
      await updatePresentation({
        variables: {
          input: {
            id: currentPresentation.id,
            name: currentPresentation.name,
            description: currentPresentation.description,
            presentationSlides: presentationSlideAttributes,
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleAddLibrarySubSlide = async (subslide: Omit<TTaskPresentationSlide, 'subslides'>) => {
    const parentSlide = currentPresentation.slides.find(
      (slide) => slide.id === newSubSlideModalState.slideId
    );

    if (!parentSlide) return;

    const oldSubslides = parentSlide.subslides.slice().map((subSlide) => ({
      slideId: subSlide.id,
      step: subSlide.step,
    }));
    const newSubslides = [...oldSubslides, { slideId: subslide.id, step: oldSubslides.length + 1 }];

    updateSlide({ variables: { input: { id: parentSlide.id, subslides: newSubslides } } });
  };

  const handleArchiveSlide = async (id: string) =>
    archiveSlide({
      variables: { input: { id } },
      update: removeFromCache(id, 'Slide'),
    });

  const handleAddSlide = async (passedSlide: TTaskPresentationSlide) => {
    const oldSlidesMapped = currentPresentation.slides.map((slide) => ({
      slideId: slide.id,
      step: slide.step,
      subslides: slide.subslides.map((subSlide) => ({
        slideId: subSlide.id,
        step: subSlide.step,
      })),
    }));

    const newSlide = {
      slideId: passedSlide.id,
      step: oldSlidesMapped.length + 1,
      subslides: passedSlide.subslides.map((subSlide) => ({
        slideId: subSlide.id,
        step: subSlide.step,
      })),
    };

    const newSlides = [...oldSlidesMapped, newSlide];

    try {
      await updatePresentation({
        variables: {
          input: {
            id: currentPresentation.id,
            presentationSlides: newSlides,
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleUpdatePresentation = async (
    values: Omit<UpdatePresentationMutationInput['input'], 'id'>
  ) => {
    try {
      await updatePresentation({
        variables: {
          input: { id: currentPresentation.id, ...values },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const isOnDark = currentSlide && fontColorContrast(currentSlide.backgroundColor) === '#ffffff';

  return (
    <PresentationBuilderContext.Provider
      value={{
        handleAddLibrarySubSlide,
        setCurrentSlide: (
          slide: TTaskPresentationSlide & {
            subSlideSelected?: boolean;
            parentSlideId?: string;
          }
        ) => {
          const isInPresentationScope = taskId;

          presentationDispatch({ type: 'SET_IS_ON_SHARED_SLIDE', payload: slide.isShared });
          setAdditionalParams({
            subSlideSelected: slide.subSlideSelected,
            parentSlideId: slide.parentSlideId,
          });
          setCurrentSlideId(slide.id);

          if (!isInPresentationScope) {
            presentationDispatch({ type: 'SET_LIBRARY_SLIDE_ID', payload: slide.id });
          }
        },
        handleAddSlide,
        handleAddSubSlide,
        handleAddToLibrary,
        handleArchiveSlide,
        handleImagePosition,
        handleImageStyleUpdate,
        handleImageUpload,
        handleOnSlideDragEnd,
        handleRemoveSlide,
        handleSettingsMenuChange,
        handleSlideBackgroundImageArchive,
        handleSlideBackgroundImageUpload,
        handleSlideImageArchive,
        handleSlideVideoArchive,
        handleUpdatePresentation,
        handleUpdateSlide,
        handleVideoUpload,
        handleVideoUrlSave,
        handleVideoUrlUpdate,
        isOnDark,
        toggleNewSubSlideModal,
        taskPresentationQuery,
        archiveSlide,
        archiveSlideBackgroundImage,
        archiveSlideImage,
        archiveSlideVideo,
        createSlideBackgroundImage,
        createSlideImage,
        createSlideVideo,
        currentPresentation,
        currentSlide,
        dispatchOverflowingItems,
        imagePosition,
        imagesUploading,
        isSaving,
        isSystemAdminUser,
        newSubSlideModalState,
        overflowingItems:
          overflowingItems.find((slide) => slide.id === currentSlide?.id)?.overflowingItems || null,
        scriptView,
        selectedSlideContent,
        setAdditionalParams,
        setCurrentSlideId,
        setImagePosition,
        setImagesUploading,
        setNewSubSlideModalState,
        setScriptView,
        setSelectedSlideContent,
        setSettingsContent,
        setShowSlideNotes,
        settingsContent,
        setVideosUploading,
        showSlideNotes,
        taskId,
        updatePresentation,
        updateSlide,
        updateSlideImage,
        updateSlideVideo,
        videosUploading,
      }}>
      {children}
    </PresentationBuilderContext.Provider>
  );
}

function usePresentationBuilder() {
  const context = useContext(PresentationBuilderContext);

  if (!context) {
    throw new Error('usePresentationBuilder must be used within a PresentationBuilderProvider');
  }

  return context;
}

export default usePresentationBuilder;
