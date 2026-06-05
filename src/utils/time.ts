export const isLocked = (kickoffAt: string) => {
  const lockTime = new Date(new Date(kickoffAt).getTime() - 30 * 60 * 1000);
  return new Date() >= lockTime;
};
