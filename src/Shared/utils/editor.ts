//extract img tag from string <img src="..." ...rest>
export const extractImgTags = (html: string) => {
  const imgTags = html?.match(/<img.*?>/g);

  return imgTags || [];
};

//extract img src from string -> src="value"
export const extractSrc = (imgTag: string) => {
  const src = imgTag.match(/src="(.*?)"/g);

  if (src && src?.length > 0) {
    return src[0].replace('src="', '').replace('"', '');
  }

  return '';
};

//extract img src from string -> longdesc="value"
//uuid is held in longdesc due to the fact that editor purges data props
export const extractUuid = (imgTag: string) => {
  const src = imgTag.match(/longdesc="(.*?)"/g);

  if (src && src?.length > 0) {
    return src[0].replace('longdesc="', '').replace('"', '');
  }

  return '';
};

export const extractImageUuidsFromHtml = (html: string) => {
  const imgTags = extractImgTags(html);

  return imgTags.map((imgTag) => extractUuid(imgTag));
};
