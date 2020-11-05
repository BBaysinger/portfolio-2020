import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import MiscUtils from "../../utils/MiscUtils";

/**
 * This is the mobile nav that appears to populate behind the page conent that
 * slides over to reveal it.
 * 
 * I think I made it separate from desktop nav for flexibility, but also that
 * I may have not known at the time that it wouldn't have been difficult to apply
 * the same feature with CSS alone. Specifically how flexbox and/or z-index would
 * have let me reorder the elements, where this needs populated behind the page
 * content. TODO: Maybe fix that, if we'll have lots of people reviewing code here.
 * But there are bigger fish to fry rn.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
class SlideoutNav extends React.Component {
  
  /**
   *
   *
   * @memberof SlideoutNav
   */
  handleCollapseNav = () => {
    this.props.collapseSlideOutHandler();
  }

  /**
   *
   *
   * @returns
   * @memberof SlideoutNav
   */
  render() {
    return (
      <nav id="slideout_nav" role="navigation">
        <img
          id="b_square_nav"
          src="/images/misc/nav-backing-logo.png"
          alt=""
        ></img>

        <ul id="slideout_nav_buttons">
          <li>
            <NavLink
              onClick={this.handleCollapseNav}
              to="/portfolio"
              activeClassName="active"
              isActive={MiscUtils.isActiveOrRoot}
            >
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={this.handleCollapseNav}
              to="/cv"
              activeClassName="active"
            >
              CV
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={this.handleCollapseNav}
              to="/whoami"
              activeClassName="active"
            >
              Who Am I?
            </NavLink>
          </li>
          {/* <li>
            <NavLink onClick={this.handleCollapseNav} to="/thissite" activeClassName="active">This Site</NavLink>
          </li> */}
          {/* <li>
            <NavLink onClick={this.handleCollapseNav} to="/whoami" activeClassName="active">Who Am I</NavLink>
          </li> */}
        </ul>
      </nav>
    );
  }
}

export default withRouter(SlideoutNav);
