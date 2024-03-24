// test.ts
import { validateInput, shortenPublicHoliday } from './helpers';
import { SUPPORTED_COUNTRIES } from './config';

describe('validateInput function', () => {
  it('should not throw an error for valid input', () => {
    const validInput = { year: 2024, country: 'US' };
    expect(() => validateInput(validInput)).not.toThrow();
  });

  it('should throw an error for invalid country', () => {
    const invalidCountry = 'ZZ'; // Assuming 'ZZ' is not a supported country
    expect(() => validateInput({ country: invalidCountry })).toThrowError(
      `Country provided is not supported, received: ${invalidCountry}`
    );
  });

  it('should throw an error for invalid year', () => {
    const invalidYear = 2000; // Assuming 2000 is not the current year
    expect(() => validateInput({ year: invalidYear })).toThrowError(
      `Year provided not the current, received: ${invalidYear}`
    );
  });

  it('should throw an error if both country and year are invalid', () => {
    const invalidInput = { year: 2000, country: 'ZZ' }; // Both year and country are invalid
    expect(() => validateInput(invalidInput)).toThrow();
  });
});

describe('shortenPublicHoliday function', () => {
  it('should shorten public holiday', () => {
    const holiday = {
      date: '2022-01-01',
      localName: 'New Year',
      name: 'New Year',
      countryCode: 'US',
      fixed: true,
      global: false,
      counties: null,
      launchYear: null,
      types: [''],
    };
    const expectedShortenedHoliday = {
      name: 'New Year',
      localName: 'New Year',
      date: '2022-01-01',
    };
    expect(shortenPublicHoliday(holiday)).toEqual(expectedShortenedHoliday);
  });
});
