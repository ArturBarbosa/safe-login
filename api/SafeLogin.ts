import AnomalyDetection from "./AnomalyDetection";
import { Data } from "./types";

export interface Options {
  epsilon?: number;
  epsilonMethod?: "average" | "min" | "std";
}

class SafeLogin extends AnomalyDetection {
  private historicalData: Data = [];

  /** Accepts historical data */
  constructor(historicalData?: Data) {
    super();
    if (historicalData) this.historicalData = historicalData;
  }

  /**
   * Method: Verify User
   * --------------------
   * Returns the probability that the user is the true owner
   * of account given testing data and optional epsilon
   * @param newData
   * @param options (optional)
   * @returns probability that the user is true owner
   */
  verifyUser = (newData: Data, options?: Options): number => {
    return (
      1 -
      this.probabilityDatasetIsAnomalous(this.historicalData, newData, options)
    );
  };

  /**
   * Method: Add Historical Data
   * ---------------------
   * For each time a user logs in and is verified,
   * adds more data to their history
   * @param data
   */
  addHistoricalData = (data: Data): void => {
    this.historicalData = [...this.historicalData, ...data];
  };

  /**
   * Method: Get Historical Data
   * ---------------------
   * Gets the stored historical data of a user
   * @returns current historical data (array)
   */
  getHistoricalData = (): Data => {
    return this.historicalData;
  };
}

export default SafeLogin;
