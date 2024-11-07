/* eslint-disable max-len */
const defaultSlideData = {
  backgroundColor: '#ffffff',
  backgroundImage: '',
  name: 'Slide name',
  description: 'Default slide desc',
  id: null,
  iframeUrl: '',
  notes: '',
  step: null,
  content: {
    id: null,
    images: [],
    links: [],
    texts: [],
    videos: [],
  },
};

export const defaultTitleSlideData = {
  ...defaultSlideData,
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h1>Title page</h1>',
        type: 'header',
        style: 'center',
      },
    ],
  },
  template: 'title',
};

export const defaultBasicTextSlideData = {
  ...defaultSlideData,
  template: 'basicText',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h2>Basic text template</h2>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Ac amet arcu eleifend aliquam massa a quis interdum urna. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie.</p>',
        type: 'text',
        style: '',
      },
    ],
  },
};

export const defaultImageTextSlideData = {
  ...defaultSlideData,
  template: 'imageText',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>Image text block</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet nisi, maecenas scelerisque semper tristique ipsum molestie. Ac amet arcu eleifend aliquam massa a quis interdum urna. Vitae tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        type: 'text',
        style: '',
      },
    ],
  },
};

export const defaultVideoSlideData = {
  ...defaultSlideData,
  template: 'video',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>Video block</h3>',
        type: 'header',
        style: '',
      },
    ],
  },
};

export const defaultIFrameSlideData = {
  ...defaultSlideData,
  template: 'iframe',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>Iframe block</h3>',
        type: 'header',
        style: '',
      },
    ],
  },
};

export const defaultIFrameFilledSlideData = {
  ...defaultSlideData,
  template: 'iframeFilled',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h2>Iframe fullscreen block</h2>',
        type: 'header',
        style: '',
      },
    ],
  },
};

export const defaultProductSlideData = {
  ...defaultSlideData,
  template: 'product',
  content: {
    ...defaultSlideData.content,
  },
};

export const defaultCheckinSlideData = {
  ...defaultSlideData,
  template: 'checkInQuestion',
  content: {
    ...defaultSlideData.content,
  },
};

export const defaultCheckinGroupSlideData = {
  ...defaultSlideData,
  template: 'checkInGroup',
  content: {
    ...defaultSlideData.content,
  },
};

export const default2ProductChoiceSlideData = {
  ...defaultSlideData,
  template: 'twoProductChoice',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>2 Product choice template</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value: '<h4>First Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '3',
        value: '<h4>Second Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '4',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '5',
        value:
          '<p style="font-size: 21pt">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
        type: 'text',
        style: '',
      },
    ],
    links: [
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '1',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '2',
      },
    ],
  },
};

export const default3ProductChoiceSlideData = {
  ...defaultSlideData,
  template: 'threeProductChoice',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>3 Product choice template</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '2',
        value: '<h4>First Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '3',
        value: '<h4>Second Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '4',
        value: '<h4>Third Product</h4>',
        type: 'header',
        style: '',
      },
      {
        contentId: '5',
        value: '<p style="font-size: 21pt">Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '6',
        value: '<p style="font-size: 21pt">Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '7',
        value: '<p style="font-size: 21pt">Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
    ],
    links: [
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '1',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '2',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '3',
      },
    ],
  },
};
export const default4ProductChoiceSlideData = {
  ...defaultSlideData,
  template: 'fourProductChoice',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>4 Product choice template</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '6',
        value:
          '<h4 style="font-size: 18pt!important">First Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '7',
        value:
          '<h4 style="font-size: 18pt!important">Second Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '8',
        value:
          '<h4 style="font-size: 18pt!important">Third Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '9',
        value:
          '<h4 style="font-size: 18pt!important">Fourth Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
    ],
    links: [
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '1',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '2',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '3',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '4',
      },
    ],
  },
};
export const default5ProductChoiceSlideData = {
  ...defaultSlideData,
  template: 'fiveProductChoice',
  content: {
    ...defaultSlideData.content,
    texts: [
      {
        contentId: '1',
        value: '<h3>5 Product choice template</h3>',
        type: 'header',
        style: '',
      },
      {
        contentId: '7',
        value:
          '<h4 style="font-size: 18pt!important">First Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '8',
        value:
          '<h4 style="font-size: 18pt!important">Second Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '9',
        value:
          '<h4 style="font-size: 18pt!important">Third Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '10',
        value:
          '<h4 style="font-size: 18pt!important">Fourth Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
      {
        contentId: '11',
        value:
          '<h4 style="font-size: 18pt!important">Fifth Product</h4><p style="font-size: 14pt!important">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.</p>',
        type: 'text',
        style: '',
      },
    ],
    links: [
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '1',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '2',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '3',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '4',
      },
      {
        text: 'Go to product',
        targetId: '',
        targetName: '',
        contentId: '5',
      },
    ],
  },
};

export default {
  title: defaultTitleSlideData,
  basicText: defaultBasicTextSlideData,
  imageText: defaultImageTextSlideData,
  video: defaultVideoSlideData,
  iframe: defaultIFrameSlideData,
  iframeFilled: defaultIFrameFilledSlideData,
  twoProductChoice: default2ProductChoiceSlideData,
  threeProductChoice: default3ProductChoiceSlideData,
  fourProductChoice: default4ProductChoiceSlideData,
  fiveProductChoice: default5ProductChoiceSlideData,
};
