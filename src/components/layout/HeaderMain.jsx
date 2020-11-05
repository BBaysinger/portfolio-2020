import React from "react";

import ExecutionEnvironment from "exenv";
import Sniffer from "../../utils/Sniffer";
import NavBar from "./NavBar";
import Scroll from "react-scroll";

import headerLogo from "../../assets/images/main-header/logo-header.png";
import caret from "../../assets/images/main-header/caret.png";

// type State = {

// }

// type Props = {

// }

/**
 * This is the header on the home page only, which is distinct from the header on every other page.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class HeaderMain extends React.Component {
  /**
   *
   *
   * @memberof HeaderMain
   */
  static MARGIN_TOP = 26;

  /**
   *
   *
   * @memberof HeaderMain
   */
  scrolled = false;

  /**
   *Creates an instance of HeaderMain.
   * @memberof HeaderMain
   */
  // constructor(props: Props) {
  constructor(props) {
    super(props);

    this.state = {
      height: this.getHeight(),
      caretAnimationStyle: "",
    };
  }

  /**
   *
   *
   * @returns
   * @memberof HeaderMain
   */
  getHeight() {
    // 812 is iPhone X height in portrait.
    return Math.max(Math.min(window.innerHeight, 812), 500);
  }

  /**
   *
   *
   * @memberof HeaderMain
   */
  stopCaret() {
    if (!this.scrolled) {
      this.setState({ caretAnimationStyle: "none" });
      this.scrolled = true;
    }
  }

  /**
   *
   *
   * @memberof HeaderMain
   */
  scrollDown = () => {
    this.stopCaret();
    Scroll.animateScroll.scrollTo(this.getHeight() - NavBar.HEIGHT);
  };

  /**
   *
   *
   * @param {*} e
   * @memberof HeaderMain
   */
  handleResize = (e) => {
    setTimeout(() => {
      this.setState({ height: this.getHeight() });
    }, 0); // Delay because width and height properties are not changed util after orientationchange fires.
  };

  /**
   *
   *
   * @memberof HeaderMain
   */
  handleScroll = () => {
    this.stopCaret();
  };

  /**
   *
   *
   * @memberof HeaderMain
   */
  componentDidMount() {
    //Exclude mobile because resize triggers when scrolling (iOS).
    //TODO: Fix to detect iOS Safari instead.
    if (ExecutionEnvironment.canUseDOM && !Sniffer.mobile) {
      window.addEventListener("resize", this.handleResize);
    }

    setTimeout(() => {
      window.addEventListener("scroll", this.handleScroll);
    }, 50);

    window.addEventListener("orientationchange", () => {
      // Apparently if you run this right away, it will run before the
      // new dimesions are readable.
      setTimeout(this.handleResize, 100);
    });
  }

  /**
   *
   *
   * @memberof HeaderMain
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("orientationchange", this.handleResize);
  }

  /**
   *
   *
   * @returns
   * @memberof HeaderMain
   */
  render() {
    return (
      <header className="header_main">
        <div className="overheadFill"></div>
        <div className="header_container">
          <img src={headerLogo} className="header-logo" alt="BB Logo" />
          <h1>Bradley Baysinger</h1>

          <h5 className="subhead">
            <span className="nobr">Interactive Web</span> &bull;{" "}
            <span className="nobr">Front-end Developer</span>
          </h5>
        </div>

        <div
          className="view_portfolio"
          style={{ animation: this.state.caretAnimationStyle }}
        >
          <div onClick={this.scrollDown}>
            <h6>View Portfolio</h6>
            <img
              src={caret}
              width="50"
              height="30"
              className="caret-img"
              alt=""
            />
          </div>
        </div>
      </header>
    );
  }
}
