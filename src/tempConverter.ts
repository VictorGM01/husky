/**
 * Converts Fahrenheit to Celsius
 * Formula: (F - 32) * 5/9
 */
export function convertFahrenheitToCelsius(fahrenheit: number): number {
  return Number((((fahrenheit - 32) * 5) / 9).toFixed(2));
}

/**
 * Converts Celsius to Fahrenheit
 * Formula: (C * 9/5) + 32
 */
export function convertCelsiusToFahrenheit(celsius: number): number {
  return Number(((celsius * 9) / 5 + 32).toFixed(2));
}
