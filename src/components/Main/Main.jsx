import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {fetchNewImage, increaseCurrentImageIndex} from "../../redux/images-reducer";

class Main extends React.Component {

    componentDidMount() {
        this.props.fetchNewImage(0);
    }

    loadNewImage(e) {
        this.props.increaseCurrentImageIndex();
        this.props.fetchNewImage(this.props.currentImageindex);
    }

    render() {
        return (
            <div>
                <img src={this.props.images[this.props.currentImageindex]} alt='img'/>
                <button onClick={(e) => this.loadNewImage(e)}>Загрузить</button>

            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
        images: state.imagesPage.images
    })
}

export default compose(
    connect(mapStateToProps, {fetchNewImage, increaseCurrentImageIndex}),
    withRouter
)(Main);




