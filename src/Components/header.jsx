import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: #20232a;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  z-index: 999999999;
  top: 0;
  @media (min-width: 320px) {
    display: block;
    text-align: center;
  }
  @media (min-width: 640px) {
    display: flex;
  }
`;
const BrandNname = styled.div`
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: #62dafb;
  font-size: 30px;
`;
const ContainerSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledInput = styled.input`
  border-radius: 12px;
  margin-right: 10px;
`;
const Icon = styled.i`
  color: #ffffff;
`;
const StyledButton = styled.button`
  background: none;
  border: none;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #62dafb;
`;

class Header extends React.Component {
  state = {
    input: "",
  };

  onSearch = () => {
    this.props.history.push(`/search/${this.state.input}`);
  };

  render() {
    return (
      <StyledHeader>
        <BrandNname>
          <StyledLink to="/">
            <span
              style={{
                fontSize: 40,
              }}
            >
              M
            </span>
            oviekita
          </StyledLink>
        </BrandNname>
        <ContainerSearch>
          <StyledInput
            type="text"
            placeholder="  Cari Judul Film"
            onInput={(event) => this.setState({ input: event.target.value })}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                this.onSearch();
              }
            }}
          />
          <StyledButton onClick={() => this.onSearch()}>
            <Icon className="fa fa-search"></Icon>
          </StyledButton>
        </ContainerSearch>
      </StyledHeader>
    );
  }
}

export default withRouter(Header);
