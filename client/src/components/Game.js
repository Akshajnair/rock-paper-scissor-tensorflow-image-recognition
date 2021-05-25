import React, { Component } from "react"; // eslint-disable-next-line
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
  GestureEstimator,
  Gestures,
} from "fingerpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

import rock from "./assets/rock.svg";
import paper from "./assets/paper.svg";
import scissor from "./assets/scissor.svg";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      machinewin: 0,
      playerwin: 0,
      tie: 0,
      error: "Please wait, System is loading",
      machineplay: rock,
      playerplay: null,
    };
    this.webcamRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.runHandpose();
  }
  playermove(gesture) {
    if (gesture === "rock" && this.state.playerplay !== rock) {
      this.setState({ playerplay: rock });
    }
    if (gesture === "paper" && this.state.playerplay !== paper) {
      this.setState({ playerplay: paper });
    }
    if (gesture === "scissor" && this.state.playerplay !== scissor) {
      this.setState({ playerplay: scissor });
    }
  }
  async runHandpose() {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      this.detect(net);
    }, 100);
  }

  async detect(net) {
    const rockGesture = new GestureDescription("rock");
    const paperGesture = new GestureDescription("paper");
    const scissorGesture = new GestureDescription("scissor");
    for (let finger of [
      Finger.Thumb,
      Finger.Index,
      Finger.Middle,
      Finger.Ring,
      Finger.Pinky,
    ]) {
      rockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
      paperGesture.addCurl(finger, FingerCurl.NoCurl, 0.5);
    }
    scissorGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
    scissorGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
    scissorGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
    scissorGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.5);
    scissorGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.5);

    const GE = new GestureEstimator([
      rockGesture,
      paperGesture,
      scissorGesture,
    ]);
    // Check data is available
    if (
      typeof this.webcamRef.current !== "undefined" &&
      this.webcamRef.current !== null &&
      this.webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = this.webcamRef.current.video;
      const videoWidth = this.webcamRef.current.video.videoWidth;
      const videoHeight = this.webcamRef.current.video.videoHeight;

      // Set video width
      this.webcamRef.current.video.width = videoWidth;
      this.webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      this.canvasRef.current.width = videoWidth;
      this.canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video, true);

      if (hand.length === 0) this.setState({ error: "NO Hand Detected" });
      else {
        this.setState({ error: "" });

        const gestures = GE.estimate(hand[0].landmarks, 7.5);
        console.log(gestures);
        if (gestures.gestures.length > 0) {
          this.playermove(gestures.gestures[0].name);
          // console.log(gestures.gestures[0].name);
        }
      }
      // Draw mesh
      const ctx = this.canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
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
                    style={{
                      backgroundImage: "url(" + this.state.machineplay + ")",
                    }}
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
                    style={{
                      backgroundImage: "url(" + this.state.playerplay + ")",
                    }}
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
              <Webcam
                class="embed-responsive-item"
                ref={this.webcamRef}
                audio={false}
                mirrored={true}
                videoConstraints={{ facingMode: "user" }}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  top: 0,
                  width: "auto",
                  height: "100%",
                }}
              />
              <canvas
                ref={this.canvasRef}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  top: 0,
                  width: "auto",
                  height: "100%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  top: 0,
                  width: "auto",
                  height: "100%",
                }}
              >
                {this.state.error}
              </div>
              <div class="u-container-layout u-container-layout-3"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Game;
