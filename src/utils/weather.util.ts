function getWeatherIcon(weatherIcon: string, size = ''): string {
  let zoomVersion = '';
  if (size) zoomVersion = `@${size}`;
  return `https://openweathermap.org/img/wn/${weatherIcon}${zoomVersion}.png`;
}

function getWeatherVisibility(visibility: number): string {
  return `${Math.round(visibility / 1000)} km`;
}

export { getWeatherIcon, getWeatherVisibility };
