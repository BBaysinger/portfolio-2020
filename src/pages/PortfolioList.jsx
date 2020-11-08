import React from "react";
import ReactDOM from "react-dom";

import PieceThumbnail from "../components/PieceThumbnail";
import HeaderMain from "../components/layout/HeaderMain";

import StringUtil from "../utils/StringUtil";
import portfolioData from "../components/PortfolioData";
import ExecutionEnvironment from "exenv";
import Sniffer from "../utils/Sniffer";

/**
 * The list of portfolio pieces, each represented by buttons/thumbnails on the home/portfolio page that are
 * highlighted when they are in 'focus', which is determined by either a rollover or by scroll position.
 * On mobile/touch devices, the thumbnail closest to the middle of the viewport is focused in single column,
 * or if there are multiple columns, the focus proceeds through
 * items in each row from left to right when scrolling downward (or opposite).
 * That is determined by using math from scroll position.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class PortfolioList extends React.Component {
  /**
   *
   *
   * @memberof PortfolioList
   */
  pieceThumbs = null;

  /**
   *
   *
   * @memberof PortfolioList
   */
  pieceThumbComponents = [];

  /**
   *
   *
   * @memberof PortfolioList
   */
  ticking = false;

  /**
   * Creates an instance of PortfolioList.
   * @memberof PortfolioList
   */
  constructor() {
    super();

    this.pieceThumbs = portfolioData.activePieces.map((pieceData, i) => {
      let id = portfolioData.activeKeys[i];
      let {
        title,
        omitFromList,
        clientId,
        property,
        shortDesc,
        desc,
      } = pieceData;

      return (
        <PieceThumbnail
          key={Math.random()} //facebook.github.io/react/docs/multiple-components.html#dynamic-children
          index={i}
          omitFromList={omitFromList}
          pieceId={id}
          title={title}
          clientId={clientId}
          property={property}
          shortDesc={shortDesc}
          desc={desc}
          ref={(c) => {
            this.pieceThumbComponents.push(c);
          }}
        />
      );
    });

    // Backwards loop.
    for (let i = this.pieceThumbs.length - 1; i >= 0; i--) {
      if (StringUtil.stringToBool(this.pieceThumbs[i].props.omitFromList)) {
        this.pieceThumbs.splice(i, 1);
      }
    }
  }

  /**
   *
   *
   * @memberof PortfolioList
   */
  componentDidMount() {
    document.addEventListener("scroll", this.handleScrollOrResize);
    window.addEventListener("resize", this.handleScrollOrResize);
  }

  /**
   *
   *
   * @memberof PortfolioList
   */
  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScrollOrResize);
    window.removeEventListener("resize", this.handleScrollOrResize);
  }

  /**
   * This manages the thumbnails highlights that occur when scrolled to the middle
   * of the viewport (mobile), or hovered over (desktop).
   *
   * @param {*} e
   */
  handleScrollOrResize = (e) => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update(e);
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  /**
   *
   *
   * @param {*} e
   * @memberof PortfolioList
   */
  update(e) {
    if (ExecutionEnvironment.canUseDOM) {
      if (Sniffer.mobile) {
        let offset;
        let absOffset;
        let bounding;
        let thumbDOMNode;
        let component;
        let linkHeight;
        let targetMaxOffset;
        /* The row closest to vertical middle. */
        let active = [];

        this.pieceThumbComponents.forEach((comp, index) => {
          component = comp;

          thumbDOMNode = ReactDOM.findDOMNode(this.pieceThumbComponents[index]);
          bounding = thumbDOMNode.getBoundingClientRect();
          linkHeight = parseInt(thumbDOMNode.offsetHeight);
          targetMaxOffset = linkHeight / 2;
          offset = window.innerHeight / 2 - (bounding.top + targetMaxOffset);
          absOffset = Math.abs(offset);

          if (absOffset < targetMaxOffset) {
            active.push(component);
          } else {
            component.setState({ highlight: false });
          }
        });

        active.forEach((theActive, index) => {
          thumbDOMNode = ReactDOM.findDOMNode(theActive);
          bounding = thumbDOMNode.getBoundingClientRect();
          linkHeight = parseInt(thumbDOMNode.offsetHeight) / active.length;
          let top = bounding.top + linkHeight * index;
          targetMaxOffset = linkHeight / 2;
          offset = window.innerHeight / 2 - (top + targetMaxOffset);
          absOffset = Math.abs(offset);

          if (absOffset < targetMaxOffset) {
            active[index].setState({ highlight: true });
          } else {
            active[index].setState({ highlight: false });
          }
        });
      } else {
        if (e.type === "resize") {
          // Force reset to hover mode.
          this.pieceThumbComponents.forEach((component, index) => {
            component.state.highlight = false;
            component.setState(component.state);
          });
        }
      }
    }
  }

  /**
   *
   *
   * @returns
   * @memberof PortfolioList
   */
  render() {
    return (
      <div>
        <HeaderMain />
        <div className="portfolio_list">{this.pieceThumbs}</div>
        <div className="list_note">
          <div className="container">
            <h3>Welcome!</h3>

            <p>
              I am a front-end web developer with fifteen years of industry
              experience in client-side scripting and fluid interactive
              experiences. I've worked on countless projects for Fortune 500
              companies as well as a few federal government&nbsp;agencies.
            </p>

            <p>
              I've presented here just a few of my favorite projects to give a
              taste of work I've done over the years. I've prevailed over some
              wildly diverse challenges and a staggering number of insane
              deadlines. From my experience, I've gained an incredibly unique
              view of UI and UX and an endless toolbox of techniques that I can
              bring to the front-end&nbsp;scene.
            </p>

            <p>
              Meticulous perfectionism is my tendency, but what's brought me
              fantastic opportunities has been my passion for breathing life
              into projects. Let's build some great&nbsp;things.
            </p>

            <p className="yellow-orange">
              <span className="asterisk">*</span>{" "}
              <div class="asterisk-copy">
                About the abundance of jQuery in here, that wouldn't be my
                choice nowadays other than for legacy support or another
                specific reason. Anyhow, I can speak to how that has come
                to&nbsp;be. ✌️
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
