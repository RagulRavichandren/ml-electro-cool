export interface ThermalInputs {
  power: number;  // Power dissipation (W)
  flux: number;   // Heat flux (W/cm²)
  area: number;   // Heat source area (mm²)
  len: number;    // Available length (mm)
  wid: number;    // Available width (mm)
  hgt: number;    // Available height (mm)
  temp: number;   // Ambient temperature (°C)
  forced: boolean; // Forced air cooling
}

export interface RegressionOutputs {
  hs_len: number;
  hs_wid: number;
  hs_hgt: number;
  fins: number;
  cfm: number;
}

export interface ClassificationResult {
  val: string;
  conf: number;
  cls: string;
  color: string;
}

export interface IcepakMeshInfo {
  meshNodes: number;
  convergenceResidual: string;
  iterations: number;
  solverStatus: 'Converged' | 'Running' | 'Pending';
}

export interface IcepakVerificationResult {
  junctionTemp: number;
  thermalResistance: number;
  rConduction: number;
  rConvection: number;
  pressureDrop: number;
  airVelocity: number;
  heatTransferCoeff: number;
  mesh: IcepakMeshInfo;
  deltaTErrorPct: number;
  verifiedStatus: 'PASS' | 'MARGINAL' | 'FAIL';
  temperatureGrid: number[][];
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  inputs: ThermalInputs;
  regression: RegressionOutputs;
  volume: number; // cm³
  material: ClassificationResult;
  surfaceFinish: ClassificationResult;
  fanCategory: ClassificationResult;
  recommendation: string;
  icepak?: IcepakVerificationResult;
}

export interface MetricRow {
  name: string;
  val: number;
  scale: number;
  col: string;
  disp: string;
}
