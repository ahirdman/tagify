interface TagObject {
  key: string;
  value: string;
}

export const matchTag = (object: TagObject, uri: string) => {
  let matched = [];
  for (const [key, value] of Object.entries(object)) {
    if (value.includes(uri)) matched.push(key);
  }
  return matched;
};
