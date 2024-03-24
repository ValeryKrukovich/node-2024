import axios from 'axios';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';
import { validateInput } from '../helpers';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

jest.mock('axios');

describe('getListOfPublicHolidays function', () => {
  it('should fetch public holidays list and return shortened holidays', async () => {
    const mockedPublicHolidays = [
      {
        date: "2024-02-19",
        localName: "Washington's Birthday",
        name: "Presidents Day",
      },
    ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockedPublicHolidays });

    const result = await getListOfPublicHolidays(2024, 'US');

    expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2024/US`);
    expect(result).toEqual([...mockedPublicHolidays]);
  });

  it('should return an empty array if fetching fails', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Failed to fetch data'));

    const result = await getListOfPublicHolidays(2024, 'US');

    expect(result).toEqual([]);
  });
});

describe('checkIfTodayIsPublicHoliday function', () => {
  it('should return true if today is public holiday', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ status: 200 });

    const result = await checkIfTodayIsPublicHoliday('US');

    expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/US`);
    expect(result).toBe(true);
  });

  it('should return false if today is not public holiday', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ status: 404 });

    const result = await checkIfTodayIsPublicHoliday('US');

    expect(result).toBe(false);
  });

  it('should return false if fetching fails', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Failed to fetch data'));

    const result = await checkIfTodayIsPublicHoliday('US');

    expect(result).toBe(false);
  });
});

describe('getNextPublicHolidays function', () => {
  it('should fetch next public holidays list and return shortened holidays', async () => {
    const mockedPublicHolidays = [{ date: '2022-01-01', name: 'New Year' }];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockedPublicHolidays });

    const result = await getNextPublicHolidays('US');

    expect(axios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/US`);
    expect(result).toEqual([{ date: '2022-01-01', name: 'New Year' }]);
  });

  it('should return an empty array if fetching fails', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error('Failed to fetch data'));

    const result = await getNextPublicHolidays('US');

    expect(result).toEqual([]);
  });
});

describe('validateInput function', () => {
  it('should not throw an error for valid input', () => {
    expect(() => validateInput({ year: 2024, country: 'US' })).not.toThrow();
  });

  it('should throw an error for invalid input', () => {
    expect(() => validateInput({ year: 2023, country: '' })).toThrow();
  });
});
