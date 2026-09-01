export const delayFn = async (delay = 2000): Promise<void> => {
  await new Promise((res) => setTimeout(res, delay));
};
