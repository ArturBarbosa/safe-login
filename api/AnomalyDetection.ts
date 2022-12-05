import { Data, GaussianParams } from "./types";
import Statistics from "./Statistics";
import { Options } from "./SafeLogin";

class AnomalyDetection extends Statistics {
  /**
   * Method: Detect Anomalies
   * ---------------------------
   * The method is given training and testing data and
   * detect anomalies in the testing data by approximating
   * a Gaussian on the training data.
   * @param trainingData
   * @param testingData
   * @param epsilon
   * @returns Data (array) with all detected anomalies
   */
  detectAnomalies = (
    trainingData: Data,
    testingData: Data,
    options?: Options
  ): Data => {
    const epsilonMethod = !options?.epsilonMethod
      ? "std"
      : options.epsilonMethod;
    const epsilonMethods = {
      average: this.estimateEpsilonAverage,
      min: this.estimateEpsilonMinimum,
      std: this.estimateEpsilonStd,
    };
    // First, estimate the Gaussian Parameters
    const params = this.estimateGaussianParameters(trainingData);
    const e = options?.epsilon
      ? options.epsilon
      : epsilonMethods[epsilonMethod](trainingData, params);
    console.log("epsilon", e);

    // calculate probability of anomaly for each data point
    const anomalies: Data = [];
    for (const datapoint of testingData) {
      const prob = this.gaussianPDF(datapoint, params);
      console.log(prob);
      if (prob < e) {
        anomalies.push(datapoint);
      }
    }
    return anomalies;
  };

  /**
   * Method: Estimate Gaussian Parameters
   * --------------------
   * Given training data, return the mean, variance and standard deviation
   * of the data
   * @param trainingData
   * @returns mean, variance and std
   */
  estimateGaussianParameters = (trainingData: Data): GaussianParams => {
    const mean = this.mean(trainingData);
    const variance = this.variance(trainingData);
    const std = Math.sqrt(variance);
    return { mean, variance, std };
  };

  /**
   * Method: Probability Dataset is Anomalous
   * --------------
   * Calculate the probability that the
   * whole testing dataset is anomalous by counting the
   * anomalous points contained in it.
   */
  probabilityDatasetIsAnomalous = (
    trainingData: Data,
    testingData: Data,
    options?: Options
  ): number => {
    const anomalies = this.detectAnomalies(trainingData, testingData, options);

    return anomalies.length / testingData.length;
  };

  /**
   * Method: Estimate Epsilon Average
   * ----------------------
   * Set epsilon as the average of all probabilities in the dataset
   * @param data
   * @param params
   * @returns epsilon value
   */
  estimateEpsilonAverage = (data: Data, params: GaussianParams): number => {
    let sumProbabilities = 0;
    for (const datapoint of data) {
      sumProbabilities += this.gaussianPDF(datapoint, params);
    }

    return sumProbabilities / data.length;
  };

  /**
   * Method: Estimate Epsilo Minimum
   * ----------------------
   * Use the lowest probability in the training set (data)
   * and set it as epsilon.
   * @param data
   * @param params
   * @returns epsilon value
   */
  estimateEpsilonMinimum = (data: Data, params: GaussianParams): number => {
    let min = 1;
    for (const datapoint of data) {
      min = Math.min(this.gaussianPDF(datapoint, params), min);
    }

    return min;
  };

  /**
   * Method: Estimate Epsilon by Standard Deviation
   * ----------------------
   * Set epsilon as a factor of the standard deviation
   * @param params
   * @param multiplier
   * @returns epsilon value
   */
  estimateEpsilonStd = (
    data: Data,
    params: GaussianParams,
    multiplier = 3
  ): number => {
    const point = params.std * multiplier;
    return this.gaussianPDF(point, params);
  };
}

export default AnomalyDetection;
