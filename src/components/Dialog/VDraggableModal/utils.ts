export const getWindowSize = (): { width: number; height: number } => ({
  width: window.innerWidth || 0,
  height: window.innerHeight || 0
});

export const clamp = (min: number, max: number, value: number): number =>
  Math.max(min, Math.min(max, value));

export const getNumberMatch = (prop: any, type: 'width' | 'height') => {
  const windowSize = getWindowSize();
  if (prop === '100%') {
    return windowSize[type];
  }
  if (prop) {
    const match = prop.toString().match(/(\d+)/);
    if (match) {
      const amount = parseInt(match[0], 10);
      if (prop.includes('vh') || prop.includes('vw')) {
        return (windowSize[type] * amount) / 100;
      }
      return amount;
    }
  }
  return undefined;
};
