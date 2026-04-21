import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav data-testid="navbar">
      <Link to="/activities" data-testid="nav-activities">Activities</Link>
      {" | "}
      <Link to="/filter" data-testid="nav-filter">Filter</Link>
      {" | "}
      <Link to="/stats" data-testid="nav-stats">Stats</Link>
    </nav>
  );
};

export default Navbar;