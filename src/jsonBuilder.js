export const buildJSON = (fields) => {
  const result = {};
  fields.forEach((field) => {
    if (!field.key) return;
    if (field.type === 'nested') result[field.key] = buildJSON(field.children || []);
    else result[field.key] = field.type;
  });
  return result;
};