import React, { Component } from "react";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      machinewin: 0,
      playerwin: 0,
      tie: 0,
    };
  }
  render() {
    return (
      <div>
        <section class="u-clearfix u-grey-5 u-section-3" id="sec-bc23">
          <div class="u-clearfix u-sheet u-sheet-1">
            <h1 class="u-custom-font u-font-lobster u-text u-text-default u-text-palette-4-base u-title u-text-1">
              Round {this.state.round}
            </h1>
            <h1 class="u-custom-font u-font-lobster u-text u-text-default u-text-grey-70 u-text-2">
              Machine
            </h1>
            <h1 class="u-align-right-md u-align-right-sm u-align-right-xs u-custom-font u-font-lobster u-text u-text-default u-text-grey-70 u-text-3">
              You
            </h1>
            <h1 class="u-custom-font u-font-lobster u-text u-text-default u-text-grey-70 u-text-4">
              Tie
            </h1>
            <h2 class="u-align-left-md u-align-left-sm u-align-left-xs u-custom-font u-font-lobster u-text u-text-default u-text-grey-50 u-text-5">
              {this.state.machinewin}
            </h2>
            <h2 class="u-custom-font u-font-lobster u-text u-text-default u-text-grey-50 u-text-6">
              {this.state.tie}
            </h2>
            <h2 class="u-align-right-md u-align-right-sm u-align-right-xs u-custom-font u-font-lobster u-text u-text-default u-text-grey-50 u-text-7">
              {this.state.playerwin}
            </h2>
            <div class="u-clearfix u-gutter-98 u-layout-wrap u-layout-wrap-1">
              <div class="u-layout">
                <div class="u-layout-row">
                  <div
                    class="u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-image-1"
                    src=""
                    data-image-width="1080"
                    data-image-height="1080"
                  >
                    <div
                      class="u-container-layout u-valign-middle u-container-layout-1"
                      src=""
                    ></div>
                  </div>
                  <div
                    class="u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-image-2"
                    src=""
                    data-image-width="1080"
                    data-image-height="1080"
                  >
                    <div
                      class="u-container-layout u-container-layout-2"
                      src=""
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="u-align-right u-container-style u-group u-image u-image-3"
              data-image-width="1980"
              data-image-height="1385"
            >
              <div class="u-container-layout u-container-layout-3"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Game;
