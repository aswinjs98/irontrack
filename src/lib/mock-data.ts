export interface DailyLog {
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    weight: number;
}

export const MOCK_LOGS: DailyLog[] = [
    { date: '2026-02-23', calories: 2800, protein: 180, carbs: 320, fats: 75, weight: 82.5 },
    { date: '2026-02-24', calories: 2950, protein: 195, carbs: 340, fats: 80, weight: 82.3 },
    { date: '2026-02-25', calories: 3100, protein: 210, carbs: 360, fats: 85, weight: 82.6 },
    { date: '2026-02-26', calories: 2700, protein: 170, carbs: 300, fats: 70, weight: 82.1 },
    { date: '2026-02-27', calories: 3000, protein: 200, carbs: 350, fats: 80, weight: 81.9 },
    { date: '2026-02-28', calories: 3200, protein: 215, carbs: 380, fats: 90, weight: 82.4 },
    { date: '2026-03-01', calories: 1260, protein: 140, carbs: 210, fats: 55, weight: 82.0 },
];

export const USER_GOALS = {
    calories: 3000,
    protein: 200,
    carbs: 350,
    fats: 80,
    weight: 78.0
};
