export const formatTime = (totalSeconds: number): string => {
  const isNegative = totalSeconds < 0;
  const absSeconds = Math.abs(totalSeconds);

  const hours = Math.floor(absSeconds / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const seconds = absSeconds % 60;

  let formatted = '';

  if (hours > 0) {
    // HH:MM:SS format, minutes and seconds could be 00:00
    formatted = `${hours}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
  } else if (minutes > 0) {
    // MM:SS format, seconds could be 00
    formatted = `${minutes}:${String(seconds).padStart(2, '0')}`;
  } else {
    // Just seconds
    formatted = `${seconds}`;
  }

  // Negative/Overtime logic
  return isNegative ? `-${formatted}` : formatted;
};
