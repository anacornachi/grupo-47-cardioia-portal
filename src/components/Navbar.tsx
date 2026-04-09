import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {useAuth} from "../contexts/useAuth";

const Nav = styled.nav`
  background: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 0 #e5e7eb;
`;

const Logo = styled.span`
  color: #e94560;
  font-size: 1.4rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: #6b7280;
  text-decoration: none;
  font-size: 0.95rem;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;

  &:hover {
    color: #e94560;
  }

  &.active {
    color: #e94560;
    border-bottom: 2px solid #e94560;
    font-weight: 600;
  }
`;

const LogoutBtn = styled.button`
  background: #e94560;
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background: #c73652;
  }
`;

const UserInfo = styled.span`
  color: #6b7280;
  font-size: 0.85rem;
`;

const Navbar = () => {
  const {user, logout} = useAuth();

  return (
    <Nav>
      <Logo>❤️ CardioIA</Logo>
      <NavLinks>
        <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        <StyledNavLink to="/patients">Pacientes</StyledNavLink>
        <StyledNavLink to="/appointments">Agendamentos</StyledNavLink>
        <UserInfo>{user?.name}</UserInfo>
        <LogoutBtn onClick={logout}>Sair</LogoutBtn>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
