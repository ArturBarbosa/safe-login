import { Data, GaussianParams } from "./types";

class Statistics {
  public sum = (data: Data) => {
    const sumValue = 0;
    return data.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      sumValue
    );
  };

  public mean = (data: Data): number => {
    const length = data.length;

    return this.sum(data) / length;
  };

  public variance = (data: Data): number => {
    const mean = this.mean(data);
    const sumValue = 0;
    const summation = data.reduce(
      (accumulator, currentValue) =>
        accumulator + Math.pow(currentValue - mean, 2),
      sumValue
    );
    return summation / data.length;
  };

  public gaussianPDF = (x: number, params: GaussianParams): number => {
    const numerator = 1 / (params.std * Math.sqrt(2 * Math.PI));
    const exponent = -0.5 * Math.pow((x - params.mean) / params.std, 2);
    return numerator * Math.exp(exponent);
  };
}

export default Statistics;
