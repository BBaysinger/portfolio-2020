import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import MiscUtils from "../../utils/MiscUtils";

import navLogo from "../../assets/images/misc/logo-nav.png";
import Sniffer from "../../utils/Sniffer.js";

/**
 * Navigation as text buttons, and a button for slide-out nav, on mobile.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
class NavBar extends React.Component {
  
  /**
   *
   *
   * @static
   * @memberof NavBar
   */
  static HEIGHT = 50;

  /**
   * Creates an instance of NavBar.
   * @memberof NavBar
   */
  constructor() {
    super();

    this.state = { collapsed: true };
  }

  /**
   *
   *
   * @memberof NavBar
   */
  handleToggleNav = () => {
    this.props.toggleSlideOutHandler();
  };

  /**
   *
   *
   * @param {*} e
   * @memberof NavBar
   */
  handleClick = (e) => {
    //TODO: Figure out how to make so this doesn't rely on class names?

    let name = e.target.className;
    switch (name) {
      case "navbar-toggle":
      case "icon-bar":
        break;

      default:
        switch (e.target.id) {
          case "slideout_nav":
            break;
          default:
            if (Sniffer.mobile) {
              setTimeout(this.collapse, 100);
            } else {
              setTimeout(this.collapse, 100);
            }
        }
    }
  };

  /**
   *
   *
   * @returns
   * @memberof NavBar
   */
  render() {
    const navStyle = {
      width: "100%",
    };

    const logoStyle = {
      position: "absolute",
      maxHeight: "38px",
      float: "left",
      marginRight: "10px",
      marginLeft: "15px",
      marginTop: "6px",
    };

    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav
        id="top-navbar"
        className="navbar-inverse navbar-fixed-top"
        role="navigation"
      >
        <NavLink to="/">
          <img src={navLogo} alt="BB Logo" style={logoStyle} />
        </NavLink>
        <div id="navTitle">
          <div className="nav-logo-text">
            <p>BRADLEY BAYSINGER</p>
            <p>
              <span className="nobr">Interactive Web</span> &bull;{" "}
              <span className="nobr">UI Developer</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          className="navbar-toggle"
          onClick={this.handleToggleNav}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        <div className={"the-navbar " + navClass} id="navbar-collapse-1">
          <ul className="nav navbar-nav" style={navStyle}>
            <li>
              <NavLink
                to="/portfolio"
                activeClassName="active"
                isActive={MiscUtils.isActiveOrRoot}
              >
                Portfolio
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/thissite" activeClassName="active">This Site</NavLink>
            </li> */}
            <li>
              <NavLink to="/cv" activeClassName="active">
                CV
              </NavLink>
            </li>
            <li>
              <NavLink to="/whoami" activeClassName="active">
                Who Am I
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/whoami" activeClassName="active">Who Am I</NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
