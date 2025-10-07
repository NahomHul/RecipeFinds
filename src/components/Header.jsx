import { Link } from "react-router-dom";
import "./Header.css"; 

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">🍲 FindRecipe</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
