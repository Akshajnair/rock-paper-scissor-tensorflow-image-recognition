import React, { Component } from "react"; // eslint-disable-next-line
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import {
  Finger,
  FingerCurl,
  GestureDescription,
  GestureEstimator,
} from "fingerpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

import rock from "./assets/rock.svg";
import paper from "./assets/paper.svg";
import scissor from "./assets/scissor.svg";
import loader from "./assets/loader.svg";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      machinewin: 0,
      playerwin: 0,
      tie: 0,
      error: "Please wait, System is loading",
      machineplay: null,
      playerplay: null,
      gesture: null,
      timeoutid: null,
      shakeleft: "",
      shakeright: "",
      timer: null,
      arenacss: {
        backgroundImage: "url(" + loader + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        textAlign: "center",
        backgroundColor: "#2cccc4",
      },
    };
    this.webcamRef = React.createRef();
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    this.runHandpose();
  }
  async runHandpose() {
    const net = await handpose.load({ detectionConfidence: 0.9 });
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
      
      if (hand.length === 0) {
        this.setState({
          error: "NO Hand Detected",
          playerplay: null,
          machineplay: null,
          gesture: null,
        });
        clearTimeout(this.state.timeoutid);
      } else {
        this.setState({ error: "" });
        const gestures = GE.estimate(hand[0].landmarks, 7.5);
        if (
          gestures.gestures.length > 0 &&
          gestures.gestures[0].name !== this.state.gesture
        ) {
          this.playermove(gestures.gestures[0].name);
          this.setState({ gesture: gestures.gestures[0].name });
        }
      }
      // Draw mesh
      const ctx = this.canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }
  async playermove(gesture) {
    this.setState({ timer: new Date().getSeconds() + 3 });
    this.makingmove(true);
    let intervalid = setInterval(() => {
      if (this.state.gesture !== null) {
        if (this.state.timer === new Date().getSeconds()) {
          this.setplayermove(this.state.gesture);
          this.makingmove(false);
          clearInterval(intervalid);
        }
      } else {
        clearInterval(intervalid);
        this.makingmove(false);
      }
    }, 100);
  }
  makingmove(data) {
    if (data) {
      this.setState({
        machineplay: rock,
        playerplay: rock,
        shakeleft: "shakeleft",
        shakeright: "shakeright",
      });
    } else {
      this.setState({
        shakeleft: "",
        shakeright: "",
      });
    }
  }
  setplayermove(gesture) {
    if (gesture === "rock") {
      this.setState({ playerplay: rock });
      this.machinemove();
    }
    if (gesture === "paper") {
      this.setState({ playerplay: paper });
      this.machinemove();
    }
    if (gesture === "scissor") {
      this.setState({ playerplay: scissor });
      this.machinemove();
    }
  }
  machinemove() {
    let move = [rock, paper, scissor];
    this.setState({ machineplay: move[Math.floor(Math.random() * 3)] });
    this.winnercount();
  }
  winnercount() {
    var tie = this.state.tie;
    var playerwin = this.state.playerwin;
    var machinewin = this.state.machinewin;
    var round = this.state.round;
    if (this.state.playerplay === this.state.machineplay) tie++;
    if (
      (this.state.playerplay === rock && this.state.machineplay === scissor) ||
      (this.state.playerplay === scissor && this.state.machineplay === paper) ||
      (this.state.playerplay === paper && this.state.machineplay === rock)
    )
      playerwin++;
    if (
      (this.state.machineplay === rock && this.state.playerplay === scissor) ||
      (this.state.machineplay === scissor && this.state.playerplay === paper) ||
      (this.state.machineplay === paper && this.state.playerplay === rock)
    )
      machinewin++;
    round++;
    this.setState({ playerwin, machinewin, tie, round });
  }
  loaderdisp() {
    if (this.state.error === "Please wait, System is loading") {
      return loader;
    } else if (this.state.arenacss !== null) this.setState({ arenacss: null });
  }
  render() {
    return (
      <div>
        <section className="u-clearfix u-grey-5 u-section-3" id="sec-bc23">
          <div className="u-clearfix u-sheet u-sheet-1">
            <h1 className="u-custom-font u-font-lobster u-text u-text-default u-text-palette-4-base u-title u-text-1">
              Round {this.state.round}
            </h1>
            <h1 className="u-custom-font u-font-lobster u-text u-text-default u-text-grey-70 u-text-2">
              Machine
            </h1>
            <h1 className="u-align-right-md u-align-right-sm u-align-right-xs u-custom-font u-font-lobster u-text u-text-default u-text-grey-70 u-text-3">
              You
            </h1>
            <h1 className="u-custom-font u-font-lobster u-text u-text-default u-text-grey-70 u-text-4">
              Tie
            </h1>
            <h2 className="u-align-left-md u-align-left-sm u-align-left-xs u-custom-font u-font-lobster u-text u-text-default u-text-grey-50 u-text-5">
              {this.state.machinewin}
            </h2>
            <h2 className="u-custom-font u-font-lobster u-text u-text-default u-text-grey-50 u-text-6">
              {this.state.tie}
            </h2>
            <h2 className="u-align-right-md u-align-right-sm u-align-right-xs u-custom-font u-font-lobster u-text u-text-default u-text-grey-50 u-text-7">
              {this.state.playerwin}
            </h2>
            <div
              className="u-clearfix u-gutter-98 u-layout-wrap u-layout-wrap-1"
              style={this.state.arenacss}
            >
              <div className="u-layout">
                <div className="u-layout-row">
                  <div
                    className={
                      "u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-image-1 " +
                      this.state.shakeleft
                    }
                    style={{
                      backgroundImage: "url(" + this.state.machineplay + ")",
                    }}
                    src=""
                    data-image-width="1080"
                    data-image-height="1080"
                  >
                    <div
                      className="u-container-layout u-valign-middle u-container-layout-1"
                      src=""
                    ></div>
                  </div>
                  <div
                    className={
                      "u-align-center u-container-style u-image u-layout-cell u-right-cell u-size-30 u-size-xs-60 u-image-2 " +
                      this.state.shakeright
                    }
                    style={{
                      backgroundImage: "url(" + this.state.playerplay + ")",
                    }}
                    src=""
                    data-image-width="1080"
                    data-image-height="1080"
                  >
                    <div
                      className="u-container-layout u-container-layout-2"
                      src=""
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="u-align-right u-container-style u-group u-image u-image-3"
              style={{
                backgroundImage: "url(" + this.loaderdisp() + ")",
                backgroundColor: "#2cccc4",
              }}
            >
              <Webcam
                className="embed-responsive-item"
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
                  color: "white",
                }}
              >
                {this.state.error}
              </div>
              <div className="u-container-layout u-container-layout-3"></div>
            </div>
            <div className="u-container-style u-group u-shape-rectangle u-group-2">
              <div className="u-container-layout u-container-layout-4">
                <h1 className="u-align-center u-text u-text-palette-4-base u-text-8">
                  How to play
                </h1>
                <p className="u-align-center u-text u-text-9">
                  <span style={{ fontWeight: "700" }}>1.</span> Keep your hand
                  within the camera frame.
                  <br />
                  <span style={{ fontWeight: "700" }}>2.</span> Make your move
                  with your hand (rock with a fist, paper with an open palm, and
                  scissor with victory gesture).
                  <br />
                  <span style={{ fontWeight: "700" }}>3. </span>hold your hand
                  still for 3 sec.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Game;
