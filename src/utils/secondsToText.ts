export const secondsToText = (time: number) => {
  const minutes = String(Math.floor(time / 60));
  const seconds = String(time % 60);

  const finalMinutes = minutes.length < 2 ? "0" + minutes : minutes;
  const finalSeconds = seconds.length < 2 ? "0" + seconds : seconds;

  return `${finalMinutes}:${finalSeconds}`;
};
