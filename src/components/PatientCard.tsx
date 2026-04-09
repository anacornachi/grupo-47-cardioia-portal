import styled from "styled-components";
import type {Patient} from "../types";

interface RiskProps {
  $risk: string;
}

const Card = styled.div<RiskProps>`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid
    ${({$risk}) =>
      $risk === "alto" ? "#e94560" : $risk === "médio" ? "#f5a623" : "#27ae60"};
`;

const Name = styled.h3`
  color: #1a1a2e;
  margin: 0 0 0.4rem;
  font-size: 1rem;
`;

const Info = styled.p`
  color: #6b7280;
  margin: 0.2rem 0;
  font-size: 0.85rem;
`;

const RiskBadge = styled.span<RiskProps>`
  display: inline-block;
  margin-top: 0.6rem;
  padding: 0.2rem 0.7rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  background: ${({$risk}) =>
    $risk === "alto"
      ? "#e9456022"
      : $risk === "médio"
        ? "#f5a62322"
        : "#27ae6022"};
  color: ${({$risk}) =>
    $risk === "alto" ? "#e94560" : $risk === "médio" ? "#f5a623" : "#27ae60"};
`;

const PatientCard = ({patient}: {patient: Patient}) => (
  <Card $risk={patient.risk}>
    <Name>{patient.name}</Name>
    <Info>📧 {patient.email}</Info>
    <Info>📞 {patient.phone}</Info>
    <Info>🎂 {patient.age} anos</Info>
    <RiskBadge $risk={patient.risk}>
      Risco {patient.risk.charAt(0).toUpperCase() + patient.risk.slice(1)}
    </RiskBadge>
  </Card>
);

export default PatientCard;
