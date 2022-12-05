import AnomalyDetection from "./AnomalyDetection";
import { Data } from "./types";

class SafeLogin extends AnomalyDetection {
  private historicalData: Data = [];

  /** Accepts historical data */
  constructor(historicalData?: Data) {
    super();
    if (historicalData) this.historicalData = historicalData;
  }

  verifyUser = (newData: Data, epsilon?: number): number => {
    return (
      1 -
      this.probabilityDatasetIsAnomalous(this.historicalData, newData, epsilon)
    );
  };

  addHistoricalData = (data: Data) => {
    this.historicalData = [...this.historicalData, ...data];
  };

  getHistoricalData = () => {
    return this.historicalData;
  };
}

export default SafeLogin;
