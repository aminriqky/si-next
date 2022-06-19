export function replace(str: string) {
  let url = str;
  url = str.replace(/\s+/g, "-").toLowerCase();
  return url;
}

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
