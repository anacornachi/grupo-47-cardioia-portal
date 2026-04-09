import {useEffect, useState} from "react";
import styled from "styled-components";
import {useAuth} from "../contexts/useAuth";
import {fetchPatients} from "../services/api";
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
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

interface MetricCardProps {
  $color: string;
}

const MetricCard = styled.div<MetricCardProps>`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  border-top: 4px solid ${({$color}) => $color};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const MetricValue = styled.h2`
  color: #1a1a2e;
  font-size: 2.2rem;
  margin: 0.3rem 0;
`;

const MetricLabel = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
`;

const AlertBox = styled.div`
  background: #e9456011;
  border: 1px solid #e94560;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  color: #e94560;
  font-size: 0.9rem;
`;

const Dashboard = () => {
  const {user} = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients().then(setPatients);
  }, []);

  const altoRisco = patients.filter((p) => p.risk === "alto").length;
  const medioRisco = patients.filter((p) => p.risk === "médio").length;
  const baixoRisco = patients.filter((p) => p.risk === "baixo").length;

  return (
    <Container>
      <Title>Olá, {user?.name} 👋</Title>
      <Subtitle>Visão geral do portal CardioIA</Subtitle>

      <Grid>
        <MetricCard $color="#e94560">
          <MetricLabel>Total de Pacientes</MetricLabel>
          <MetricValue>{patients.length}</MetricValue>
        </MetricCard>
        <MetricCard $color="#e94560">
          <MetricLabel>Alto Risco</MetricLabel>
          <MetricValue>{altoRisco}</MetricValue>
        </MetricCard>
        <MetricCard $color="#f5a623">
          <MetricLabel>Médio Risco</MetricLabel>
          <MetricValue>{medioRisco}</MetricValue>
        </MetricCard>
        <MetricCard $color="#27ae60">
          <MetricLabel>Baixo Risco</MetricLabel>
          <MetricValue>{baixoRisco}</MetricValue>
        </MetricCard>
      </Grid>

      {altoRisco > 0 && (
        <AlertBox>
          ⚠️ {altoRisco} paciente(s) em alto risco cardiovascular requerem
          atenção prioritária.
        </AlertBox>
      )}
    </Container>
  );
};

export default Dashboard;
