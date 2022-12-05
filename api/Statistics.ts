import { Data, GaussianParams } from "./types";

class Statistics {
  /**
   * Method: Sum
   * -----------------
   * Sum values of an array
   * @param data
   * @returns sum number
   */
  public sum = (data: Data): number => {
    const sumValue = 0;
    return data.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      sumValue
    );
  };

  /**
   * Method: Mean
   * -----------------
   * Calculate the mean of a dataset
   * @param data
   * @returns mean value
   */
  public mean = (data: Data): number => {
    return this.sum(data) / data.length;
  };

  /**
   * Method: Variance
   * -------------------
   * Calculates the variance of a given dataset
   * @param data
   * @returns variance number
   */
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

  /**
   * Method: Gaussian PDF
   * --------------
   * Applies the Gaussian PDF to find the probability of a
   * datapoint, given the params of the Gaussian
   * @param x
   * @param params
   * @returns probability value
   */
  public gaussianPDF = (x: number, params: GaussianParams): number => {
    const numerator = 1 / (params.std * Math.sqrt(2 * Math.PI));
    const exponent = -0.5 * Math.pow((x - params.mean) / params.std, 2);
    return numerator * Math.exp(exponent);
  };
}

export default Statistics;
