import type {AppointmentAction, AppointmentState} from "../types";

export const initialState: AppointmentState = {
  appointments: [
    {
      id: 1,
      patientName: "João Silva",
      date: "2026-04-10",
      time: "09:00",
      type: "consulta",
      status: "confirmado",
    },
    {
      id: 2,
      patientName: "Maria Souza",
      date: "2026-04-11",
      time: "14:30",
      type: "exame",
      status: "agendado",
    },
    {
      id: 3,
      patientName: "Carlos Mendes",
      date: "2026-04-12",
      time: "11:00",
      type: "retorno",
      status: "agendado",
    },
  ],
  loading: false,
};

export const appointmentReducer = (
  state: AppointmentState,
  action: AppointmentAction,
): AppointmentState => {
  switch (action.type) {
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };

    case "CANCEL_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload ? {...a, status: "cancelado"} : a,
        ),
      };

    case "SET_LOADING":
      return {...state, loading: action.payload};

    default:
      return state;
  }
};
