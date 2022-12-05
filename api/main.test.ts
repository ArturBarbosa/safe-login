import AnomalyDetection from "./AnomalyDetection";
import Statistics from "./Statistics";
import { Data } from "./types";

describe("Statistics Class", () => {
  test("Add values in an array using sum function", () => {
    const stats = new Statistics();
    const test1: Data = [1, 2, 3, 4, 5, 6];
    const test2: Data = [];
    const test3: Data = [9];
    expect(stats.sum(test1)).toBe(21);
    expect(stats.sum(test2)).toBe(0);
    expect(stats.sum(test3)).toBe(9);
  });

  test("Calculate mean of data", () => {
    const stats = new Statistics();
    const test1: Data = [1, 2, 3, 4, 5, 6];
    const test2: Data = [];
    const test3: Data = [9];
    expect(stats.mean(test1)).toBe(3.5);
    expect(stats.mean(test2)).toBe(NaN);
    expect(stats.mean(test3)).toBe(9);
  });

  test("Calculate variance of data", () => {
    const stats = new Statistics();
    const test1: Data = [1, 2, 3, 4, 5, 6, 7, 8];
    const test2: Data = [];
    const test3: Data = [9];
    expect(stats.variance(test1)).toBe(5.25);
    expect(stats.variance(test2)).toBe(NaN);
    expect(stats.variance(test3)).toBe(0);
  });
});
