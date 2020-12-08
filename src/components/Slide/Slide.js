import React, { Component, Fragment } from "react";
import Slide from "./ViweStyle";
import { Pagination, Button, Flex } from "./SilderStyle";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
class Slider extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.gallery);
    this.state = {
      slide: this.props.gallery,
      // slide: [
      //   {
      //     id: "1",
      //     image:
      //       "https://scitechdaily.com/images/New-Hubble-Image-Shows-Part-of-the-Large-Magellanic-Cloud.jpg",
      //     text: "Image One Slider",
      //   },
      //   {
      //     id: "2",
      //     image:
      //       "https://i0.wp.com/wallpapers.ae/wp-content/uploads/2018/11/Beautiful-summer-beach-wallpaper-45-1920x1080.jpg?fit=1920%2C1080",
      //     text: "Image Two Slider",
      //   },
      //   {
      //     id: "3",
      //     image:
      //       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
      //     text: "Image Three Slider",
      //   },
      // ],
      currentIndex: 0,
    };
  }

  previousState = () => {
    const { slide, currentIndex } = this.state;
    const { gallery } = this.props;

    if (currentIndex === 0) {
      return this.setState({ currentIndex: gallery.length - 1 });
    }
    this.setState({ currentIndex: currentIndex - 1 });
  };

  nextState = () => {
    const { currentIndex, slide } = this.state;
    const { gallery } = this.props;

    if (currentIndex === gallery.length - 1) {
      return this.setState({ currentIndex: 0 });
    }
    this.setState({ currentIndex: currentIndex + 1 });
  };

  indexSlide = (info) => {
    console.log(info);
    const { id } = info;
    this.setState({ currentIndex: id - 1 });
  };

  render() {
    const { slide, currentIndex } = this.state;
    const { gallery } = this.props;
    console.log(gallery);
    return (
      <Fragment>
        <Slide key={currentIndex} info={gallery[currentIndex]} />
        <Flex>
          {gallery.map((v, index) => {
            let bgColor = "lightgrey";
            if (currentIndex === index) {
              bgColor = "#CD0448";
            }
            return (
              <Pagination
                key={v.id}
                bgColor={bgColor}
                onClick={() => this.indexSlide(currentIndex)}
              />
            );
          })}
        </Flex>
        <Flex
          style={{
            position: "absolute",
            top: 190,
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={this.previousState}>
            <NavigateBeforeRoundedIcon />
          </Button>
          <Button onClick={this.nextState}>
            <NavigateNextRoundedIcon />
          </Button>
        </Flex>
      </Fragment>
    );
  }
}

export default Slider;
