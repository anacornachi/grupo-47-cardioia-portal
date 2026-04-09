import type {Patient} from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const RISK_LEVELS: Array<"alto" | "médio" | "baixo"> = [
  "alto",
  "médio",
  "baixo",
];
const AGES = [45, 52, 67, 38, 71, 55, 48, 63, 41, 58];

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();

  return data.map(
    (
      user: {id: number; name: string; email: string; phone: string},
      index: number,
    ) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: AGES[index % AGES.length],
      risk: RISK_LEVELS[index % RISK_LEVELS.length],
    }),
  );
};
