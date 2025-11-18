export const searchDuplicate = (text: string, items: { name: string }[]): boolean => {
  return items.some(({ name }) => name.trim().toLowerCase() === text.trim().toLowerCase());
};
