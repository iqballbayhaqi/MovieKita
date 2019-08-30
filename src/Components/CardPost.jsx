import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "./Image";

const Container = styled.div`
  background: #20232a;
  border-bottom: 2px solid #62dafb;
`;
const SubContainer = styled.div`
  display: flex;
  height: 250px;
`;
const Poster = styled(Image)`
  width: 200px;
  height: 100%;
  @media (min-width: 320px) {
    width: 170px;
  }
  @media (min-width: 6400px) {
    width: 200px;
  }
`;
const Text = styled.div`
  margin-left: 30px;
  color: #ffffff;
  @media (min-width: 320px) {
    margin-left: 15px;
  }
`;
const StyledH1 = styled.h1`
  @media (min-width: 320px) {
    font-size: large;
  }
  @media (min-width: 640px) {
    font-size: 2em;
  }
`;
const Desc = styled.p`
  @media (min-width: 320px) {
    font-size: 14px;
  }
  @media (min-width: 640px) {
    font-size: 18px;
  }
`;

class CardPost extends React.Component {
  ImagePlaceholderB(event) {
    event.target.src = "/images/placeholderB.png";
  }
  render() {
    return (
      <Container>
        <SubContainer>
          <div>
            <Link to={`/posting/${this.props.id}`}>
              <Poster src={this.props.image} onError={this.ImagePlaceholderB} />
            </Link>
          </div>
          <Text>
            <StyledH1>{this.props.title}</StyledH1>
            <Desc>Tahun : {this.props.year}</Desc>
            <Desc>Type : {this.props.type}</Desc>
          </Text>
        </SubContainer>
      </Container>
    );
  }
}

export default CardPost;
