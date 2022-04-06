const convertToTwoDigits = function (number) {
  if (number > 99 || number < 0) return 0;
  if (number > 9) return number;
  return `0${number}`
}

export const formatVideoDuration = function (duration) {

  if (duration < 60) return `00:${convertToTwoDigits(duration)}`;
  if (duration < 3600) {
    const minute = parseInt(duration / 60), second = duration % 60;
    return `${convertToTwoDigits(minute)}:${convertToTwoDigits(second)}`;
  }
  const hour = parseInt(duration / 3600);
  const remain = duration % 3600;
  const minute = parseInt(remain / 60);
  const second = remain % 60;
  return `${convertToTwoDigits(hour)}:${convertToTwoDigits(minute)}:${convertToTwoDigits(second)}`;
}