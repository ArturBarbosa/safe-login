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

describe("DetectAnomalies Class", () => {
  test("Correctly detect anomalies in dataset", () => {
    const anon = new AnomalyDetection();
    const testingData: Data = [1, 2, 1, 2, 3, 1, 2, 3, 4, 2, 2, 1, 3, 3, 4, 5];
    const trainingData: Data = [3, 2, 4, 1, 5, 10, 20];
    expect(anon.detectAnomalies(testingData, trainingData, 0.02)).toStrictEqual(
      [10, 20]
    );
  });

  test("Correctly returns probability of dataset being anomalous", () => {
    const anon = new AnomalyDetection();
    const testingData: Data = [1, 2, 1, 2, 3, 1, 2, 3, 4, 2, 2, 1, 3, 3, 4, 5];
    const trainingData: Data = [3, 2, 4, 1, 5, 10, 20];
    expect(
      anon
        .probabilityDatasetIsAnomalous(testingData, trainingData, 0.02)
        .toFixed(3)
    ).toBe("0.286");
  });
});
