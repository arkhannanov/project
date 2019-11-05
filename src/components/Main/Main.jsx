import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {cancelFirstLoading, fetchNewImage, increaseCurrentImageIndex} from "../../redux/images-reducer";
import './Main.scss'
import {getCurrentImageIndexstate, getError, getFirstLoading, getImages} from "../../redux/images-selectors";

class Main extends React.Component {

    componentDidMount() {
        if (this.props.firstLoading) {
            this.props.fetchNewImage(0, Date.now(), Date(Date.now()).toString());
            this.props.cancelFirstLoading();
        }
    }

    loadNewImage(e) {
        let key = Date.now();
        var date = Date(key).toString();
        this.props.fetchNewImage(this.props.currentImageIndex, key, date);
    }

    render() {

        let image = this.props.images[this.props.images.length - 1];

        return (
            <div className="main">
                {!this.props.error
                    ? <img className="main__image" src={image && image.url} alt='img' height="300px"/>
                    : <div className="main__error">Ошибка загрузки</div>
                }
                <button className="main__button" onClick={(e) => this.loadNewImage(e)}>Загрузить</button>

            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
        images: getImages(state),
        currentImageIndex: getCurrentImageIndexstate(state),
        error: getError(state),
        firstLoading: getFirstLoading(state)
    })
}

export default compose(
    connect(mapStateToProps, {fetchNewImage, increaseCurrentImageIndex, cancelFirstLoading}),
    withRouter
)(Main);




