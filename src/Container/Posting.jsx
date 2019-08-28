import React, {Fragment} from 'react';
import styled from 'styled-components';
import {apiHost} from '../Helpers/api';

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
`;
const Container = styled.div`
    margin-left: 30px;
    margin-top: 30px;
`;
const TextContainer = styled.div`
    color: #ffffff;
`;
const Desc = styled.p`
    margin: 10px;
`;


class Posting extends React.Component {
    state = {
        movie: null,
        error: null
    }

    componentDidMount() {
        this.fetchApi(this.props.match.params.id)
    }

    fetchApi = (text) => {
        fetch(`${apiHost}?i=${text}&apikey=97f679b2`)
        .then(res => res.json())
        .then(res => {
            if (res.Response === "True") {
                this.setState({movie: res})
            }else {
                this.setState({error: res.Error})
            }
        })
    }

    render(){
        //destructuring
        const {movie, error} = this.state;

        return(
            <Fragment>
                { movie !== null && (
                <Container>
                    <Head>
                        <img 
                        src={movie.Poster}
                        alt="Poster" 
                        />
                        <Title>{movie.Title}</Title>
                    </Head>
                    <TextContainer>
                        <Desc>{`Year : ${movie.Year}`}</Desc>
                        <Desc>{`Released : ${movie.Released}`}</Desc>
                        <Desc>{`Runtime : ${movie.Runtime}`}</Desc>
                        <Desc>{`Genre : ${movie.Genre}`}</Desc>
                        <Desc>{`Director : ${movie.Director}`}</Desc>
                        <Desc>{`Writer : ${movie.Writer}`}</Desc>
                        <Desc>{`Actors : ${movie.Actors}`}</Desc>
                        <Desc>{`Language : ${movie.Language}`}</Desc>
                        <Desc>{`Country : ${movie.Country}`}</Desc>
                        <Desc>{`DVD : ${movie.DVD}`}</Desc>
                        <Desc>{`Production : ${movie.Production}`}</Desc>
                        <Desc>{`BoxOffice : ${movie.BoxOffice}`}</Desc>
                        <Desc>{`Plot : ${movie.Plot}`}</Desc>
                    </TextContainer>
                    

                </Container>
                )}
                {error !== null && error }
            </Fragment>
        )
    }
}

export default Posting;