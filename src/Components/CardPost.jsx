import React from 'react';
import { Link } from "react-router-dom";
import './CardPost.css';

class CardPost extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="sub-container">
                    <div>
                        <Link to={`/posting/${this.props.id}`}>
                        <img src={this.props.image} className="poster" />
                        </Link>
                    </div>
                    <div className="text">
                        <h1>{this.props.title}</h1>
                        <p>Tahun : {this.props.year}</p>
                        <p>Type : {this.props.type}</p>           
                    </div> 
                </div>
            </div>
        )
    }
}

export default CardPost;