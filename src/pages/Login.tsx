import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../contexts/useAuth";

const Container = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

const Logo = styled.h1`
  color: #e94560;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #1a1a2e;
  font-size: 0.95rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #e94560;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
    -webkit-text-fill-color: #1a1a2e;
    border: 1px solid #e5e7eb;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: #e94560;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #c73652;
  }
`;

const Error = styled.p`
  color: #e94560;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Hint = styled.p`
  color: #555;
  font-size: 0.78rem;
  text-align: center;
  margin-top: 1.2rem;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    const success = login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Email ou senha inválidos.");
    }
  };

  return (
    <Container>
      <Card>
        <Logo>❤️ CardioIA</Logo>
        <Subtitle>Portal de Diagnóstico Cardiovascular</Subtitle>
        {error && <Error>{error}</Error>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button onClick={handleSubmit}>Entrar</Button>
        <Hint>admin@cardioia.com / 123456</Hint>
      </Card>
    </Container>
  );
};

export default Login;
