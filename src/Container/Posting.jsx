import React, { Fragment } from "react";
import styled from "styled-components";
import { apiHost } from "../Helpers/api";
import Image from "../Components/Image";

const Title = styled.h1`
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Head = styled.div`
  display: flex;
  padding-top: 30px;
  @media (max-width: 640px) {
    display: block;
    text-align: center;
  }
`;
const Container = styled.div`
  margin-left: 30px;
  margin-top: 30px;
  @media (max-width: 640px) {
    margin-left: 0;
  }
`;
const TextContainer = styled.div`
  color: #ffffff;
`;
const Desc = styled.p`
  margin: 10px;
`;
const StyledImage = styled(Image)`
  width: 300px;
  height: 445px;
`;

class Posting extends React.Component {
  state = {
    movie: null,
    error: null
  };

  componentDidMount() {
    this.fetchApi(this.props.match.params.id);
  }

  fetchApi = text => {
    fetch(`${apiHost}?i=${text}&apikey=97f679b2`)
      .then(res => res.json())
      .then(res => {
        if (res.Response === "True") {
          this.setState({ movie: res });
        } else {
          this.setState({ error: res.Error });
        }
      });
  };

  render() {
    //destructuring
    const { movie, error } = this.state;
    const descArray = movie !== null && [
      `Year : ${movie.Year}`,
      `Released : ${movie.Released}`,
      `Runtime : ${movie.Runtime}`,
      `Genre : ${movie.Genre}`,
      `Director : ${movie.Director}`,
      `Writer : ${movie.Writer}`,
      `Actors : ${movie.Actors}`,
      `Language : ${movie.Language}`,
      `Country : ${movie.Country}`,
      `DVD : ${movie.DVD}`,
      `Production : ${movie.Production}`,
      `BoxOffice : ${movie.BoxOffice}`,
      `Plot : ${movie.Plot}`
    ];

    return (
      <Fragment>
        {movie !== null && (
          <Container>
            <Head>
              <StyledImage
                src={movie.Poster}
                alt="Poster"
                onError={undefined}
              />
              <Title>{movie.Title}</Title>
            </Head>
            <TextContainer>
              {descArray.map((desc, index) => (
                <Desc key={index}>{desc}</Desc>
              ))}
            </TextContainer>
          </Container>
        )}
        {error !== null && error}
      </Fragment>
    );
  }
}

export default Posting;
