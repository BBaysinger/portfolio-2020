import React from "react";
import { Link } from "react-router-dom";
import Sniffer from "../utils/Sniffer";

/**
 * The thumbnails in the portfolio/home that each link out to a specific portfolio piece.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class PieceThumbnail extends React.Component {
  /**
   *
   *
   * @returns
   * @memberof PieceThumbnail
   */
  render() {
    const { pieceId, title, clientId } = this.props;

    const style = {
      backgroundImage: "url('/images/thumbs/" + pieceId + ".jpg')",
    };

    const focus = this.props.focused ? "piece-thumbnail-focus" : "";
    const hoverEnabled = !Sniffer.mobile ? "hover_enabled" : "";

    return (
      <div
        className={
          "col-lg-4 col-md-6 col-sm-6 piece-thumbnail " +
          focus +
          " " +
          hoverEnabled
        }
        style={style}
      >
        <Link to={"/portfolio/" + pieceId}>
          <div className="vingette"></div>
          <div className="thumb-content">
            <img
              src={"/images/client-logos/" + clientId + ".png"}
              className="client-logo"
              alt={clientId + " logo"}
            />
            <h4 className="thumb-title">{title}</h4>
          </div>
        </Link>
      </div>
    );
  }
}
