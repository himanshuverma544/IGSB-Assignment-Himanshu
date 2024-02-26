import { NavLink } from "react-router-dom";


const SmartNavLink = ({ className: navLinkClassName="", path, title, target = "_self" }) => {
  return (
    <li>
      <NavLink className={navLinkClassName} to={path} target={target}>
        {title}
      </NavLink>
    </li>
  );
}

export default SmartNavLink;