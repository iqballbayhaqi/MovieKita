import React from "react";
import styled from "styled-components";
import Slider from "../Components/slider";
import CardPost from "../Components/CardPost";
import { apiHost } from "../Helpers/api";

const Button = styled.button`
  background: #62dafb;
  border: none;
  font-weight: bold;
  color: #20232a;
  width: 100%;
  padding: 0;
  height: 25px;
`;

class home extends React.Component {
  state = {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalresult: null
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = (page = 1) => {
    fetch(`${apiHost}?s=man&y=2019&type=movie&page=${page}&apikey=97f679b2`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          movies: this.state.movies.concat(res.Search),
          error: null,
          totalresult: res.totalResults
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Slider />
        {this.state.movies.map(movie => (
          <CardPost
            key={movie.imdbID}
            image={movie.Poster}
            title={movie.Title}
            year={movie.Year}
            type={movie.Type}
            id={movie.imdbID}
          />
        ))}
        {this.state.movies.length < this.state.totalresult && (
          <Button
            onClick={() => {
              this.setState(
                state => ({
                  page: state.page + 1
                }),
                () => {
                  this.fetchApi(this.state.page);
                }
              );
            }}
          >
            View more...
          </Button>
        )}
      </React.Fragment>
    );
  }
}

export default home;
