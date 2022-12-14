import { Component } from "react";
import { NavLink } from "react-router-dom";

import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./Drawer.module.scss";

const links = [
  { to: "/", label: "List", exact: "true" },
  { to: "/auth", label: "Authentication", exact: "false" },
  { to: "/quiz-creator", label: "Create Quiz", exact: "false" },
];
class Drawer extends Component {
  clickHandler = () => this.props.onClose();

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index + ""}>
          <NavLink
            to={link.to}
            exact={link.exact}
            className={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) cls.push(classes.close);
    return (
      <>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen && <Backdrop onClick={this.props.onClose} />}
      </>
    );
  }
}
export default Drawer;
