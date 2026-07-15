export const delayFn = async (delay = 2000) => {
  await new Promise((res) => setTimeout(res, delay));
};
