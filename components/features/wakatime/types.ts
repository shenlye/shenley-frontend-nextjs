export interface WakatimeData {
  languages: {
    data: Array<{
      name: string;
      percent: number;
      color: string;
      total_seconds: number;
      text: string;
      hours?: number;
    }>;
  };
  systems: {
    data: Array<{
      name: string;
      percent: number;
      color: string;
      total_seconds: number;
      text: string;
    }>;
  };
  editors: {
    data: Array<{
      name: string;
      percent: number;
      color: string;
      total_seconds: number;
      text: string;
    }>;
  };
  activity: {
    data: {
      best_day: {
        date: string;
        text: string;
        total_seconds: number;
      };
      grand_total: {
        daily_average: number;
        human_readable_daily_average: string;
        human_readable_total: string;
        total_seconds: number;
      };
      range: {
        start: string;
        end: string;
        days_including_holidays: number;
        days_minus_holidays: number;
        holidays: number;
      };
    };
  };
} 