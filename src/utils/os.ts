export const isAndroid = () => /android/i.test(navigator.userAgent);

export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
