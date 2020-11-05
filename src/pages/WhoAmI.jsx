import React from "react";

import HeaderSub from "../components/layout/HeaderSub";

/**
 * Page for references. Mostly a static page.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class WhoAmI extends React.Component {
  /**
   *
   *
   * @returns
   * @memberof WhoAmI
   */
  render() {
    return (
      <div>
        <HeaderSub head={"Who Am I?"} subhead={""} />

        <div id="main_content" className="container textual_page whoami_page">
          {/* <p>
            className="emphasis"
            style={{ fontSize: "16px", lineHeight: "22px" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>*/}

          <h4>Greetings!</h4>

          <h5>Introduction</h5>

          {/* <div className="sub-container">
            <div className="left-sub">Seven2 Interactive</div>
            <div className="right-sub">09.30.2019</div>
          </div> */}

          {/* <p>
						To those interested in hiring good&nbsp;people,
					</p> */}

          <p>
            I'm a born native, and so far a nearly lifelong resident of the beautiful
            City of Spokane on the eastern side of Washington State. In addition
            to my love for bringing beautiful websites to life, I have a history
            in fine arts and industrial&nbsp;arts.
          </p>

          <p>
            To put it simply, I love to create. The personal reward I get from
            making beautiful things makes it not work to me. It really doesn't
            matter if it's a sculpture, a painting on canvas, or a very
            technical progressive web application; as many people are witness, I
            don't back down to&nbsp;challenges.
          </p>

          <h5>Workhorse</h5>

          <p>
            The advertising industry where I've spent many years is known for
            turn-and-burn projects, and that couldn't be <i>more</i> true in
            digital advertising. Agencies treat developers and designers well,
            but when deadlines loom, in every way we are expected to sacrifice
            from our personal lives for our projects, clients,
            and&nbsp;coleagues.
          </p>

          <h5>Leisure</h5>

          <p>
            Over the last few years I've been increasingly pursing a healthy and
            active lifestyle. This has lead me to becoming a bit of an
            adventurer. I prefer to bike to work every day of the year, even
            through hard winters, and am emphatic about all things cycling. It
            is absolutely a lifestyle for me, and leaves me with many tales to
            tell. I wont do that here, but I will say, as I often do with
            technical challenges, I take on things that are daunting, and I make
            them&nbsp;happen.
          </p>

          <h5>It's a wrap!</h5>

          <p>
            Personal challenges are part of my character. I take a great deal of
            pride in my work. If all goes well, you'll see these things in me.
            Let's make awesome projects&nbsp;together!
          </p>
        </div>
      </div>
    );
  }
}
