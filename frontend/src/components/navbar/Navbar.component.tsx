import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";

const links = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/jobs", label: "Jobs" },
  { href: "/candidates", label: "Candidates" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  /* for dark mode 
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);*/

  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="brand">
        <h1>
          <span>R</span>esume <span>M</span>anagement
        </h1>
      </div>
      <div className={menuStyles}>
        <ul>
          {links.map((item) => (
            <li key={item.href} onClick={ToggleOpenMenu}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hamburger">
        <Menu onClick={ToggleOpenMenu} />
      </div>
      {/*For Dark Mode
      
      <div className="toggle">
        <ToggleButton
          value={"check"}
          selected={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? <LightMode /> : <DarkMode />}
        </ToggleButton>
          </div>*/}
    </div>
  );
};

export default Navbar;
