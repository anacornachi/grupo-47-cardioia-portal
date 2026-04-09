import {useEffect, useState} from "react";
import styled from "styled-components";
import {fetchPatients} from "../services/api";
import PatientCard from "../components/PatientCard";
import type {Patient} from "../types";

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
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
`;

const Loading = styled.p`
  color: #6b7280;
  text-align: center;
  margin-top: 3rem;
`;

const Filter = styled.select`
  background: #f0f4ff;
  color: #1a1a2e;
  border: 1px solid #333;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
`;

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    fetchPatients().then((data) => {
      setPatients(data);
      setLoading(false);
    });
  }, []);

  const filtered =
    filter === "todos" ? patients : patients.filter((p) => p.risk === filter);

  return (
    <Container>
      <Title>Pacientes</Title>
      <Subtitle>{patients.length} pacientes carregados via API</Subtitle>

      <Filter value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="todos">Todos os riscos</option>
        <option value="alto">Alto risco</option>
        <option value="médio">Médio risco</option>
        <option value="baixo">Baixo risco</option>
      </Filter>

      {loading ? (
        <Loading>Carregando pacientes...</Loading>
      ) : (
        <Grid>
          {filtered.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Patients;
