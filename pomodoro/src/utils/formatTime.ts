/* eslint-disable prettier/prettier */
function formatTimer(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / (60 * 60));
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
}

export default formatTimer;
