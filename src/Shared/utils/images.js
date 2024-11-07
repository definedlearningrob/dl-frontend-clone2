export const preloadImages = (urls) =>
  Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () => resolve();
          image.src = url;
        })
    )
  );
