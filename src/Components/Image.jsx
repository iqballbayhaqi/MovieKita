import React from 'react';

class Image extends React.Component {

    ImagePlaceholder(event) {
        console.log(event.target.src)
        event.target.src = "/images/placeholder.jpg"
    }
    ImagePlaceholderB(event) {
        console.log(event.target.src)
        event.target.src = "/images/placeholderB.png"
    }

    render(){
        console.log("thisprops : ", this.props)
        return(
            <img 
            src={this.props.src} 
            onError={this.props.onError || this.ImagePlaceholder}
            alt={this.props.alt} 
            className={this.props.className} />
        )
    }
}

export default Image;