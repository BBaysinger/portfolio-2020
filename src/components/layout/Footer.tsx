import React from "react";

import { NavLink } from "react-router-dom";

import MiscUtils from "../../utils/MiscUtils";

import email from "../../assets/images/footer/icons/email.png";
import github from "../../assets/images/footer/icons/github.png";
import linkedIn from "../../assets/images/footer/icons/linked-in.png";
import location from "../../assets/images/footer/icons/location.png";
import phone from "../../assets/images/footer/icons/phone.png";
import stackoverflow from "../../assets/images/footer/icons/stackoverflow.png";

type State = {
  emailAddr: string;
  portfolioLinkActive: boolean;
};

type Props = {
  currentPieceId: string;
};

/**
 * As you may have guessed, this is the footer, common to every page.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
class Footer extends React.Component {
  /**
   *
   *
   * @type {State}
   * @memberof Footer
   */
  state: State;

  /**
   * Creates an instance of Footer.
   * @param {Props} props
   * @param {State} state
   * @memberof Footer
   */
  constructor(props: Props, state: State) {
    super(props);

    this.state = {
      portfolioLinkActive: true,
      emailAddr: "@gmail.com", // firstly render a non-functional email avert readers.
    };

    // A dumb trick so that crawlers don't scrape my email address (probably still can but only good ones).
    const e1 = "bradley";
    const e2 = "baysinger";
    const e3 = "@gmail.com";

    setTimeout(() => {
      this.setState({ emailAddr: e1 + e2 + e3 });
    }, 500);
  }

  /**
   *
   *
   * @returns
   * @memberof Footer
   */
  render() {
    return (
      <footer>
        <div className="container footer_container">
          <div className="row">
            <div className="col-xs-12 col-sm-7 col-md-6 col-lg-6 footer_cell">
              <p>
                <img
                  src="/images/footer/bb2.jpg"
                  className="img-responsive pull-left footer_photo"
                  alt="Pic of Bradley"
                />
                I'm keeping things simple here as there's never any shortage of
                things to do everywhere else. Feel free to reach out if there's
                any further information I can provide. I look forward to
                speaking with you about how I can bring unique interactive
                experiences to your&nbsp;organization.
              </p>
            </div>

            <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4 footer_cell contact">
              <div>
                <ul>
                  <li>
                    <a href={"mailto:" + this.state.emailAddr}>
                      <div
                        style={{ backgroundImage: "url(" + email + ")" }}
                      ></div>
                      {this.state.emailAddr}
                    </a>
                  </li>
                  {/* <li>
                    <a href="tel:+15092798603">
                      <div
                        style={{ backgroundImage: "url(" + phone + ")" }}
                      ></div>
                      509.279.8603
                    </a>
                  </li> */}
                  <li>
                    <a
                      href="http://www.linkedin.com/in/bradleybaysinger"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="nobr">
                        <div
                          style={{ backgroundImage: "url(" + linkedIn + ")" }}
                        ></div>
                        linkedin.com/in/bradleybaysinger
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/bbaysinger"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        style={{ backgroundImage: "url(" + github + ")" }}
                      ></div>
                      github.com/bbaysinger
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://stackoverflow.com/u/1253298"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        style={{
                          backgroundImage: "url(" + stackoverflow + ")",
                        }}
                      ></div>
                      stackoverflow.com/u/1253298
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.google.com/maps/place/Spokane,+WA/@47.6727552,-117.552233,11z/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        style={{ backgroundImage: "url(" + location + ")" }}
                      ></div>
                      Spokane, WA{" "}
                      <span className="not_a_suburb">
                        (<i>not</i> near Seattle)
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 footer_cell footer-nav">
              <ul className="bottom_nav">
                <li>
                  <NavLink
                    activeClassName="active"
                    to="/portfolio"
                    isActive={MiscUtils.isActiveOrRoot}
                  >
                    Portfolio
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/cv">
                    CV
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/whoami">
                    Who Am I
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="copyright">
          <div className="react">
            <a
              href="https://facebook.github.io/react/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/footer/react.png" alt="React Logo" />
              Built with React
            </a>
          </div>
          &copy; <span style={{ color: "#ffffff" }}>BBInteractive</span>.co
        </div>
      </footer>
    );
  }
}

export default Footer;
