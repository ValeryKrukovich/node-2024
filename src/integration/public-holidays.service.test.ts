import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from '../services/public-holidays.service';
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { PublicHolidayShort } from '../types';

const mock = new MockAdapter(axios);

describe('getListOfPublicHolidays function', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch public holidays list and return shortened holidays', async () => {
    const year = 2024;
    const country = 'US';
    const mockResponse: PublicHolidayShort[] = [
      {
        date: "2024-02-19",
        localName: "Washington's Birthday",
        name: "Presidents Day",
      }
  ];
    mock.onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`).reply(200, mockResponse);

    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual([
      { 
        date: "2024-02-19",
        localName: "Washington's Birthday",
        name: "Presidents Day",
      }
    ]);
  });

  it('should return an empty array if fetching fails', async () => {
    const year = 2024;
    const country = 'US';
    mock.onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`).reply(500);

    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual([]);
  });
});

describe('checkIfTodayIsPublicHoliday function', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should return true if today is public holiday', async () => {
    const country = 'US';
    mock.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`).reply(200);

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(true);
  });

  it('should return false if today is not public holiday', async () => {
    const country = 'US';
    mock.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`).reply(404);

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(false);
  });

  it('should return false if fetching fails', async () => {
    const country = 'US';
    mock.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`).reply(500);

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(false);
  });
});

describe('getNextPublicHolidays function', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should fetch next public holidays list and return shortened holidays', async () => {
    const country = 'US';
    const mockResponse: PublicHolidayShort[] = [
      { 
        date: "2024-02-19",
        localName: "Washington's Birthday",
        name: "Presidents Day",
      }
    ];
    mock.onGet(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`).reply(200, mockResponse);

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([
      { 
        date: "2024-02-19",
        localName: "Washington's Birthday",
        name: "Presidents Day",
      }
    ]);
  });

  it('should return an empty array if fetching fails', async () => {
    const country = 'US';
    mock.onGet(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`).reply(500);

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([]);
  });
});
