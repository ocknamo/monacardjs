import { dateToUnixTimeSeconds } from './unit';

describe('unit.ts', () => {
  describe('dateToUnixTimeSeconds', () => {
    it('should get unixtime string', () => {
      const date1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
      expect(dateToUnixTimeSeconds(date1)).toBe('823230245');

      const date2 = new Date(Date.UTC(2022, 1, 2, 3, 4, 5));
      expect(dateToUnixTimeSeconds(date2)).toBe('1643771045');
    });
  });
});
