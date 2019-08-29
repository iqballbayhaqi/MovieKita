import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    background: #20232a;
    border-bottom: 2px solid #62dafb;
`;
const SubContainer = styled.div`
    display: flex;
    height: 250px;
`;
const Poster = styled.img`
    width: 200px;
    height: 100%;
`;
const Text = styled.div`
    margin-left: 30px;
    color: #ffffff;
`;

class CardPost extends React.Component {
    render() {
        return(
            <Container>
                <SubContainer>
                    <div>
                        <Link to={`/posting/${this.props.id}`}>
                        <Poster src={this.props.image} />
                        </Link>
                    </div>
                    <Text>
                        <h1>{this.props.title}</h1>
                        <p>Tahun : {this.props.year}</p>
                        <p>Type : {this.props.type}</p>           
                    </Text> 
                </SubContainer>
            </Container>
        )
    }
}

export default CardPost;