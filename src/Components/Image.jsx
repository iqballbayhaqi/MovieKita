import React from "react";

class Image extends React.Component {
  ImagePlaceholder(event) {
    event.target.src = "/images/placeholder.jpg";
  }
  ImagePlaceholderB(event) {
    event.target.src = "/images/placeholderB.png";
  }

  render = () => (
    <img
      src={this.props.src}
      onError={!this.props.onError ? this.ImagePlaceholder : this.props.onError}
      alt={this.props.alt}
      className={this.props.className}
    />
  );
}

export default Image;
