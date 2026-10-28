// Vite's BASE_URL may or may not end with a slash depending on the `base` setting,
// so normalise it before joining.
export const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
