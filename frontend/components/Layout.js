import { NavLink } from "react-router-dom";
import ScrollProgress from "./ScrollProgress";

export default function Layout({ children }) {
  return (
    <>
      <ScrollProgress />
      <nav className="nav">
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <NavLink to="/task" className="nav-link">Tasks</NavLink>
        <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
      </nav>
      {children}
    </>
  );
}
