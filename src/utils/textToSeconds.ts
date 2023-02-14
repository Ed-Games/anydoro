export const textToSenconds = (text: string) => {
  return Number(text.split(":")[0]) * 60 + (Number(text.split(":")[1]) % 60);
};
