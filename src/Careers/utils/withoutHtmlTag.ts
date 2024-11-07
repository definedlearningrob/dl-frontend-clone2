export const withoutHtmlTag = (html: string) => {
  const regex = /(<([^>]+)>)|(&nbsp;)/gi;

  return html.replace(regex, '');
};
