export interface Stat {
  deviceName: string;
  records: [StatRecord];
}

interface StatRecord {
  date: string;
  programLogArray: [ProgrammLog];
}

interface ProgrammLog {
  timestamp: string;
  task: string;
  taskType: string;
}
