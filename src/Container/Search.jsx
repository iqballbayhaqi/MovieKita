import React from "react";
import styled from "styled-components";
import CardPost from "../Components/CardPost";
import { apiHost } from "../Helpers/api";

const Text = styled.p`
  font-size: 1.5em;
  text-align: center;
  color: #20232a;
`;
const Button = styled.button`
  background: #62dafb;
  border: none;
  font-weight: bold;
  color: #20232a;
  width: 100%;
  padding: 0;
  height: 25px;
`;

class Search extends React.Component {
  state = {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalresult: null
  };

  componentDidMount() {
    this.fetchApi(this.props.match.params.keyword);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.keyword !== prevProps.match.params.keyword) {
      this.setState({ movies: [] }, () => {
        this.fetchApi(this.props.match.params.keyword);
      });
    }
  }

  fetchApi = (text, page = 1) => {
    fetch(`${apiHost}?s=${text}&page=${page}&apikey=97f679b2`)
      .then(res => res.json())
      .then(res => {
        if (res.Response === "True") {
          this.setState({
            movies: this.state.movies.concat(res.Search),
            error: null,
            totalresult: res.totalResults
          });
        } else {
          this.setState({ error: res.Error });
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.error === null ? (
          this.state.movies.map(movie => (
            <CardPost
              key={movie.imdbID}
              image={movie.Poster}
              title={movie.Title}
              year={movie.Year}
              type={movie.Type}
              id={movie.imdbID}
            />
          ))
        ) : (
          <Text>{this.state.error}</Text>
        )}
        {this.state.movies.length < this.state.totalresult && (
          <Button
            onClick={() => {
              this.setState(
                state => ({
                  page: state.page + 1
                }),
                () => {
                  this.fetchApi(
                    this.props.match.params.keyword,
                    this.state.page
                  );
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

export default Search;
