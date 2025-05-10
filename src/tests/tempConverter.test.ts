import {
  convertFahrenheitToCelsius,
  convertCelsiusToFahrenheit,
} from "../tempConverter";

describe("Temperature Converter", () => {
  describe("convertFahrenheitToCelsius", () => {
    test("converts 32°F to 0°C", () => {
      expect(convertFahrenheitToCelsius(32)).toBe(0);
    });

    test("converts 212°F to 100°C", () => {
      expect(convertFahrenheitToCelsius(212)).toBe(100);
    });

    test("converts 98.6°F to 37°C", () => {
      expect(convertFahrenheitToCelsius(98.6)).toBe(37);
    });

    test("converts negative values correctly", () => {
      expect(convertFahrenheitToCelsius(-40)).toBe(-40);
    });
  });

  describe("convertCelsiusToFahrenheit", () => {
    test("converts 0°C to 32°F", () => {
      expect(convertCelsiusToFahrenheit(0)).toBe(32);
    });

    test("converts 100°C to 212°F", () => {
      expect(convertCelsiusToFahrenheit(100)).toBe(212);
    });

    test("converts 37°C to 98.6°F", () => {
      expect(convertCelsiusToFahrenheit(37)).toBe(98.6);
    });

    test("converts negative values correctly", () => {
      expect(convertCelsiusToFahrenheit(-40)).toBe(-40);
    });
  });
});
