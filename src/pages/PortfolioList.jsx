import React from "react";
import ReactDOM from "react-dom";

import PieceThumbnail from "../components/PieceThumbnail";
import HeaderMain from "../components/layout/HeaderMain";

import portfolioData from "../components/PortfolioData";
import ExecutionEnvironment from "exenv";
import Sniffer from "../utils/Sniffer";

/**
 * The list of portfolio pieces, each represented by buttons/thumbnails on the home/portfolio page that are
 * focused when they are either rolled over or scrolled to the vertical middle of the viewport.
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
  pieceThumbRefs = [];

  /**
   *
   *
   * @memberof PortfolioList
   */
  ticking = false;

  /**
   *
   *
   * @memberof PortfolioList
   */
  state = { focusedThumbIndex: -1 };

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
   *
   * @param {*} thumbComponent
   */
  setThumbRef = (thumbComponent) => {
    this.pieceThumbRefs.push(thumbComponent);
  };

  /**
   * A best practice that can help performace for processes that
   * may cause dropped frames on scroll.
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
  update = (e) => {
    if (ExecutionEnvironment.canUseDOM) {
      if (Sniffer.mobile) {
        let offset;
        let absOffset;
        let bounding;
        let thumbDOMNode;
        let linkHeight;
        let targetMaxOffset;
        /* The row closest to vertical middle. */
        let inRange = [];

        // Collect the 1, 2, or 3 (of a row) that are closest to the middle of the viewport.
        this.pieceThumbRefs.forEach((thumbRef, index) => {
          // TODO: Should be able to ref a memeber of THIS component rather
          // than reaching for the child's DOM node. 🤔
          thumbDOMNode = ReactDOM.findDOMNode(this.pieceThumbRefs[index]);
          bounding = thumbDOMNode.getBoundingClientRect();
          linkHeight = parseInt(thumbDOMNode.offsetHeight);
          targetMaxOffset = linkHeight / 2;
          offset = window.innerHeight / 2 - (bounding.top + targetMaxOffset);
          absOffset = Math.abs(offset);

          if (absOffset < targetMaxOffset) {
            inRange.push(thumbRef);
          }
        });

        // Loop over the ones in range to see which one to focus.
        inRange.forEach((thumbRef, index) => {
          thumbDOMNode = ReactDOM.findDOMNode(thumbRef);
          bounding = thumbDOMNode.getBoundingClientRect();
          linkHeight = parseInt(thumbDOMNode.offsetHeight) / inRange.length;
          let top = bounding.top + linkHeight * index;
          targetMaxOffset = linkHeight / 2;
          offset = window.innerHeight / 2 - (top + targetMaxOffset);
          absOffset = Math.abs(offset);

          if (absOffset < targetMaxOffset) {
            this.setState({ focusedThumbIndex: thumbRef.props.index });
          }
        });
      } else {
        if (e.type === "resize") {
          // Force reset to hover mode.
          this.setState({ test: 1, focusedThumbIndex: -1 });
        }
      }
    }
  };

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
        <div className="portfolio_list">
          {portfolioData.listedPieces.map((pieceData, index) => {
            let id = portfolioData.listedKeys[index];
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
                focused={this.state.focusedThumbIndex === index}
                key={title} //facebook.github.io/react/docs/multiple-components.html#dynamic-children
                index={index}
                omitFromList={omitFromList}
                pieceId={id}
                title={title}
                clientId={clientId}
                property={property}
                shortDesc={shortDesc}
                desc={desc}
                ref={this.setThumbRef}
              />
            );
          })}
        </div>
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
              <span className="asterisk-copy">
                Regarding the abundance of jQuery here, that wouldn't be my
                choice nowadays other than for legacy support or any
                specific reason. Anyhow, I can speak to how that has come
                to&nbsp;be. ✌️
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
