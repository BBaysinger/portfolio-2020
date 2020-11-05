import React from "react";

/**
 * This is the header for every page other than the home page. It takes a parameter
 * for the page title it displays.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class HeaderSub extends React.Component {
  
  /**
   *
   *
   * @returns
   * @memberof HeaderSub
   */
  render() {
    const { head, subhead } = this.props;

    const subheadElem = subhead ? <h5 className="subhead">{subhead}</h5> : null;

    return (
      <header className="header_sub">
        <div className="overheadFill"></div>
        <div className="header_container">
          <h1>{head}</h1>
          {subheadElem}
        </div>
      </header>
    );
  }
}
