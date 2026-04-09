export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  risk: "alto" | "médio" | "baixo";
}

export interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: "consulta" | "retorno" | "exame";
  status: "agendado" | "confirmado" | "cancelado";
}

export interface User {
  name: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
}

export type AppointmentAction =
  | {type: "ADD_APPOINTMENT"; payload: Appointment}
  | {type: "CANCEL_APPOINTMENT"; payload: number}
  | {type: "SET_LOADING"; payload: boolean};
