import { describe, it, expect } from 'vitest';
import { getColorValues, rgbToPdfColor } from '../utils';

describe('utils', () => {
  describe('getColorValues', () => {
    it('should return correct RGB values for red', () => {
      const [r, g, b] = getColorValues('red');
      expect(r).toBe('1.000');
      expect(g).toBe('0.000');
      expect(b).toBe('0.000');
    });

    it('should return correct RGB values for blue', () => {
      const [r, g, b] = getColorValues('blue');
      expect(r).toBe('0.000');
      expect(g).toBe('0.000');
      expect(b).toBe('1.000');
    });

    it('should handle case insensitive color names', () => {
      const [r, g, b] = getColorValues('RED');
      expect(r).toBe('1.000');
      expect(g).toBe('0.000');
      expect(b).toBe('0.000');
    });

    it('should return black for unknown colors', () => {
      const [r, g, b] = getColorValues('unknowncolor');
      expect(r).toBe('0.000');
      expect(g).toBe('0.000');
      expect(b).toBe('0.000');
    });
  });

  describe('rgbToPdfColor', () => {
    it('should convert RGB to PDF color format', () => {
      const [r, g, b] = rgbToPdfColor(255, 128, 0);
      expect(r).toBe('1.000');
      expect(g).toBe('0.502');
      expect(b).toBe('0.000');
    });

    it('should handle zero values', () => {
      const [r, g, b] = rgbToPdfColor(0, 0, 0);
      expect(r).toBe('0.000');
      expect(g).toBe('0.000');
      expect(b).toBe('0.000');
    });
  });
});