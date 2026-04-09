import {useReducer, useState} from "react";
import styled from "styled-components";
import {appointmentReducer, initialState} from "../reducers/appointmentReducer";
import type {Appointment} from "../types";

const Container = styled.div`
  padding: 2rem;
  background: #f5f7fa;
  min-height: 100vh;
`;

const Title = styled.h2`
  color: #1a1a2e;
  margin-bottom: 0.3rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Form = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const FormTitle = styled.h3`
  color: #1a1a2e;
  margin-bottom: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  background: #f5f7fa;
  border: 1px solid #333;
  border-radius: 8px;
  color: #1a1a2e;
  font-size: 0.9rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #e94560;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  background: #f5f7fa;
  border: 1px solid #333;
  border-radius: 8px;
  color: #1a1a2e;
  font-size: 0.9rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #e94560;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #c73652;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

interface StatusProps {
  $status: string;
}

const AppointmentItem = styled.div<StatusProps>`
  background: #ffffff;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid
    ${({$status}) =>
      $status === "confirmado"
        ? "#27ae60"
        : $status === "cancelado"
          ? "#e94560"
          : "#f5a623"};
  opacity: ${({$status}) => ($status === "cancelado" ? "0.5" : "1")};
`;

const AppointmentName = styled.p`
  color: #1a1a2e;
  font-weight: bold;
  margin: 0 0 0.3rem;
`;

const AppointmentInfo = styled.p`
  color: #6b7280;
  font-size: 0.82rem;
  margin: 0.1rem 0;
`;

const CancelBtn = styled.button`
  margin-top: 0.5rem;
  background: transparent;
  border: 1px solid #e94560;
  color: #e94560;
  padding: 0.2rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    background: #e9456022;
  }
`;

const Appointments = () => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);
  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: "",
    type: "consulta" as Appointment["type"],
  });

  const handleAdd = () => {
    if (!form.patientName || !form.date || !form.time) return;

    dispatch({
      type: "ADD_APPOINTMENT",
      payload: {
        id: Date.now(),
        ...form,
        status: "agendado",
      },
    });

    setForm({patientName: "", date: "", time: "", type: "consulta"});
  };

  return (
    <Container>
      <Title>Agendamentos</Title>
      <Subtitle>{state.appointments.length} consultas registradas</Subtitle>

      <Layout>
        <Form>
          <FormTitle>Novo Agendamento</FormTitle>
          <Input
            placeholder="Nome do paciente"
            value={form.patientName}
            onChange={(e) => setForm({...form, patientName: e.target.value})}
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({...form, date: e.target.value})}
          />
          <Input
            type="time"
            value={form.time}
            onChange={(e) => setForm({...form, time: e.target.value})}
          />
          <Select
            value={form.type}
            onChange={(e) =>
              setForm({...form, type: e.target.value as Appointment["type"]})
            }
          >
            <option value="consulta">Consulta</option>
            <option value="retorno">Retorno</option>
            <option value="exame">Exame</option>
          </Select>
          <Button onClick={handleAdd}>Agendar</Button>
        </Form>

        <List>
          {state.appointments.map((a) => (
            <AppointmentItem key={a.id} $status={a.status}>
              <AppointmentName>{a.patientName}</AppointmentName>
              <AppointmentInfo>
                📅 {a.date} às {a.time}
              </AppointmentInfo>
              <AppointmentInfo>
                🩺 {a.type} — {a.status}
              </AppointmentInfo>
              {a.status !== "cancelado" && (
                <CancelBtn
                  onClick={() =>
                    dispatch({type: "CANCEL_APPOINTMENT", payload: a.id})
                  }
                >
                  Cancelar
                </CancelBtn>
              )}
            </AppointmentItem>
          ))}
        </List>
      </Layout>
    </Container>
  );
};

export default Appointments;
