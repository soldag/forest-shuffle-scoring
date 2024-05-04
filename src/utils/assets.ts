import urlJoin from "url-join";

export const resolvePublic = (path: string) =>
  urlJoin(import.meta.env.BASE_URL, path);
