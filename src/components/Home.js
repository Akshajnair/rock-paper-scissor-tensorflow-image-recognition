import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionask: false,
    };
  }

  permissionask() {
    let this1 = this;
    if (this.state.permissionask === true)
      return (
        <div>
          <p className="u-large-text u-text u-text-variant u-text-2">
            Click "Allow camera access" to give camera permission and play the
            game.
            <br />
            <span style={{ fontsize: "1rem" }}>
              Your Image and video will NOT be recorded
            </span>
          </p>
          <a
            href={window.location.origin + "/game"}
            className="
              u-border-3
              u-border-palette-4-base
              u-btn
              u-btn-round
              u-button-style
              u-hover-custom-color-3
              u-palette-4-base
              u-radius-50
              u-text-hover-palette-4-base
              u-btn-1
            "
          >
            ALLOW CAMERA ACCESS
          </a>
        </div>
      );
    else
      return (
        <div>
          <p className="u-large-text u-text u-text-variant u-text-2">
            A Tensorflow Hand pose Recognition game
            <br />
            Author:&nbsp;Akshaj Nair
          </p>
          <div className="u-align-center-xs u-social-icons u-spacing-10 u-social-icons-1">
            <a
              className="u-social-url"
              title="instagram"
              target="_blank"
              href="https://www.instagram.com/akshajnair"
            >
              <span
                className="
                u-icon
                u-icon-circle
                u-social-icon
                u-social-instagram
                u-text-palette-4-base
                u-icon-1
              "
              >
                <svg
                  className="u-svg-link"
                  preserveAspectRatio="xMidYMin slice"
                  viewBox="0 0 112 112"
                >
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#svg-60f3"
                  ></use>
                </svg>
                <svg
                  className="u-svg-content"
                  viewBox="0 0 112 112"
                  x="0"
                  y="0"
                  id="svg-60f3"
                >
                  <circle
                    fill="currentColor"
                    cx="56.1"
                    cy="56.1"
                    r="55"
                  ></circle>
                  <path
                    fill="#FFFFFF"
                    d="M55.9,38.2c-9.9,0-17.9,8-17.9,17.9C38,66,46,74,55.9,74c9.9,0,17.9-8,17.9-17.9C73.8,46.2,65.8,38.2,55.9,38.2
            z M55.9,66.4c-5.7,0-10.3-4.6-10.3-10.3c-0.1-5.7,4.6-10.3,10.3-10.3c5.7,0,10.3,4.6,10.3,10.3C66.2,61.8,61.6,66.4,55.9,66.4z"
                  ></path>
                  <path
                    fill="#FFFFFF"
                    d="M74.3,33.5c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2S76.6,33.5,74.3,33.5z"
                  ></path>
                  <path
                    fill="#FFFFFF"
                    d="M73.1,21.3H38.6c-9.7,0-17.5,7.9-17.5,17.5v34.5c0,9.7,7.9,17.6,17.5,17.6h34.5c9.7,0,17.5-7.9,17.5-17.5V38.8
            C90.6,29.1,82.7,21.3,73.1,21.3z M83,73.3c0,5.5-4.5,9.9-9.9,9.9H38.6c-5.5,0-9.9-4.5-9.9-9.9V38.8c0-5.5,4.5-9.9,9.9-9.9h34.5
            c5.5,0,9.9,4.5,9.9,9.9V73.3z"
                  ></path>
                </svg>
              </span>
            </a>
            <a
              className="u-social-url"
              target="_blank"
              title="Github"
              href="https://github.com/Akshajnair"
            >
              <span
                className="
                u-icon
                u-icon-circle
                u-social-github
                u-social-icon
                u-text-palette-4-base
                u-icon-2
              "
              >
                <svg
                  className="u-svg-link"
                  preserveAspectRatio="xMidYMin slice"
                  viewBox="0 0 112 112"
                >
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#svg-160a"
                  ></use>
                </svg>
                <svg
                  className="u-svg-content"
                  viewBox="0 0 112 112"
                  x="0"
                  y="0"
                  id="svg-160a"
                >
                  <circle
                    fill="currentColor"
                    cx="56.1"
                    cy="56.1"
                    r="55"
                  ></circle>
                  <path
                    fill="#FFFFFF"
                    d="M88,51.3c0-5.5-1.9-10.2-5.3-13.7c0.6-1.3,2.3-6.5-0.5-13.5c0,0-4.2-1.4-14,5.3c-4.1-1.1-8.4-1.7-12.7-1.8
	c-4.3,0-8.7,0.6-12.7,1.8c-9.7-6.6-14-5.3-14-5.3c-2.8,7-1,12.2-0.5,13.5C25,41.2,23,45.7,23,51.3c0,19.6,11.9,23.9,23.3,25.2
	c-1.5,1.3-2.8,3.5-3.2,6.8c-3,1.3-10.2,3.6-14.9-4.3c0,0-2.7-4.9-7.8-5.3c0,0-5-0.1-0.4,3.1c0,0,3.3,1.6,5.6,7.5c0,0,3,9.1,17.2,6
	c0,4.3,0.1,8.3,0.1,9.5h25.2c0-1.7,0.1-7.2,0.1-14c0-4.7-1.7-7.9-3.4-9.4C76,75.2,88,70.9,88,51.3z"
                  ></path>
                </svg>
              </span>
            </a>
          </div>
          <a
            onClick={function () {
              this1.setState({ permissionask: true });
            }}
            className="u-border-3 u-border-palette-4-base u-btn u-btn-round u-button-style u-hover-custom-color-3 u-palette-4-base u-radius-50 u-text-hover-palette-4-base u-btn-1"
          >
            PLAY
          </a>
        </div>
      );
  }
  render() {
    return (
      <div>
        <section
          className="u-align-center u-clearfix u-image u-shading u-section-1"
          src=""
          data-image-width="1024"
          data-image-height="1614"
          id="sec-b44c"
        >
          <div className="u-clearfix u-sheet u-valign-bottom-xl u-sheet-1">
            <h1
              className="
            u-custom-font
            u-font-lobster
            u-text
            u-text-palette-4-base
            u-title
            u-text-1
          "
            >
              ROCK PAPER SCISSOR
            </h1>
            {this.permissionask()}
          </div>
        </section>
      </div>
    );
  }
}
