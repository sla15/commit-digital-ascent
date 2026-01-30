export const getEntranceOffset = (small = 100, large = 40) => {
  if (typeof window === 'undefined') return large;
  try {
    return window.matchMedia('(max-width: 768px)').matches ? small : large;
  } catch (e) {
    return large;
  }
};
