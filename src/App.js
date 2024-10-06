import React from "react";
import { Router, Route } from "react-router-dom";
import ExecutionEnvironment from "exenv";

import NavBar from "./components/layout/NavBar";
import CurriculumVitae from "./pages/CurriculumVitae";
import WhoAmI from "./pages/WhoAmI";
import PortfolioList from "./pages/PortfolioList";
import Footer from "./components/layout/Footer";
import PieceDetail from "./pages/PieceDetail";
import SlideOutNav from "./components/layout/SlideoutNav";
import { createBrowserHistory as createHistory } from 'history'
import { wrapHistory } from "oaf-react-router";
import smoothscroll from 'smoothscroll-polyfill';

require("./styles/styles.scss");
require("./styles/piece-shot.scss");
require("./styles/piece-info+features.scss");
require("./styles/piece-detail.scss");
require("./styles/header.scss");
require("./styles/footer.scss");
require("./styles/portfolio-list.scss");
require("./styles/textual-pages.scss");
require("./styles/curriculum-vitae.scss");
require("./styles/whoami.scss");
require("./styles/top-navbar.scss");
require("./styles/slideout-nav.scss");

smoothscroll.polyfill(); // Needed for Safari, IE, Edge...

const history = createHistory();

const settings = {
  // navigationMessage: (title: string, location: Location, action: Action): string => `Navigated to ${title}.`,
  navigationMessage: (title, location, action) => `Navigated to ${title}.`,
  // shouldHandleAction: (previousLocation: Location, nextLocation: Location, action: Action) => {
  shouldHandleAction: (previousLocation, nextLocation, action) => {
    if (nextLocation.pathname.indexOf("/portfolio/") !== -1) {
      if (previousLocation.pathname.indexOf("/portfolio/") !== -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
  smoothScroll: true,
};

wrapHistory(history, settings);

/**
 * Main component of the application.
 *
 * @export
 * @class App
 * @extends {React.Component}
 */
export default class App extends React.Component {

  ticking = false;

  constructor() {

    super();

    this.state = { slideOut: false };

  }

  /**
   *
   *
   * @memberof App
   */
  toggleSlideOutHandler = () => {
    this.setState({
      slideOut: !this.state.slideOut
    });
  }

  /**
   *
   *
   * @memberof App
   */
  collapseSlideOutHandler = () => {
    if (this.state.slideOut) {
      this.setState({
        slideOut: false
      });
    }
  }

  handleResize = () => {
    this.collapseSlideOutHandler();
  }

  /**
   *
   *
   * @param {*} e
   * @memberof App
   */
  handleScroll = (e) => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.collapseSlideOutHandler();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  /**
   *
   *
   * @memberof App
   */
  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('resize', this.handleResize, false);
    }
  }

  /**
   *
   *
   * @memberof App
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
    window.removeEventListener('resize', this.handleResize, false);
  }

  /**
   *
   *
   * @returns
   * @memberof App
   */
  getRoundedHalfWidth() {
    return Math.floor(window.innerWidth / 2) + "px";
  }

  /**
   *
   *
   * @returns
   * @memberof App
   */
  render() {

    return (
      <Router history={history}>
        <div>
          <SlideOutNav
            collapseSlideOutHandler={this.handleResize}
          ></SlideOutNav>
          <div id="main" style={this.state.slideOut ? { right: this.getRoundedHalfWidth() } : {}}>
            <NavBar
              toggleSlideOutHandler={this.toggleSlideOutHandler}
              collapseSlideOutHandler={this.handleResize}
            ></NavBar>
            <Route path="/">
              <Route exact path="/" name="portfolio" component={PortfolioList}></Route>
              <Route exact path="/portfolio" name="portfolio" component={PortfolioList}></Route>
              <Route exact path="/portfolio/:pieceId" name="portfolio" component={PieceDetail}></Route>
              <Route exact path="/cv" name="cv" component={CurriculumVitae}></Route>
              <Route exact path="/whoami" name="cv" component={WhoAmI}></Route>
            </Route>
            <Footer></Footer>
          </div>
        </div>
      </Router>
    )
  }
}
