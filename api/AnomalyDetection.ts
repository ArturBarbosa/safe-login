import { Data, GaussianParams } from "./types";
import Statistics from "./Statistics";

class AnomalyDetection extends Statistics {
  detectAnomalies = (
    trainingData: Data,
    testingData: Data,
    epsilon?: number
  ): Data => {
    // First, estimate the Gaussian Parameters
    const params = this.estimateGaussianParameters(trainingData);
    const e = epsilon
      ? epsilon
      : this.estimateEpsilonAverage(trainingData, params);

    // calculate probability of anomaly for each data point
    const anomalies: Data = [];
    for (const datapoint of testingData) {
      const prob = this.gaussianPDF(datapoint, params);
      if (prob < e) {
        anomalies.push(datapoint);
      }
    }
    return anomalies;
  };

  estimateGaussianParameters = (trainingData: Data): GaussianParams => {
    const mean = this.mean(trainingData);
    const variance = this.variance(trainingData);
    const std = Math.sqrt(variance);
    return { mean, variance, std };
  };

  probabilityDatasetIsAnomalous = (
    trainingData: Data,
    testingData: Data,
    epsilon?: number
  ): number => {
    const anomalies = this.detectAnomalies(trainingData, testingData, epsilon);

    return anomalies.length / testingData.length;
  };

  estimateEpsilonAverage = (data: Data, params: GaussianParams): number => {
    let sumProbabilities = 0;
    for (const datapoint of data) {
      sumProbabilities += this.gaussianPDF(datapoint, params);
    }

    return sumProbabilities / data.length;
  };

  estimateEpsilonMinimum = (data: Data, params: GaussianParams): number => {
    let min = 1;
    for (const datapoint of data) {
      min = Math.min(this.gaussianPDF(datapoint, params), min);
    }

    return min;
  };
}

export default AnomalyDetection;
