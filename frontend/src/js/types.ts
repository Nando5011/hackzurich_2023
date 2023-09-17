export interface Stat {
  date: string;
  timestamps: [StatRecord];
}

export type StatRecord = {
  year: [MonthObject];
};

interface MonthObject {
  month: [DateObject];
}
interface DateObject {
  date: Log;
}

interface Log {
  timestamps: [
    {
      task: string;
      taskType: string;
    }
  ];
  workflowRatings: [
    {
      rating: number;
    }
  ];
}

export const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};
