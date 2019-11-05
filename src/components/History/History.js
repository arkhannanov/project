import React from 'react';
import {connect} from "react-redux";
import './History.scss'
import {deleteImage, setCurrentPage} from "../../redux/images-reducer";
import {getCurrentPage, getImages, getImagesPerPage} from "../../redux/images-selectors";

class History extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    deleteImage(key, text) {
        this.props.deleteImage(key);
    }

    handleClick(event) {
        this.props.setCurrentPage(Number(event.target.id));
    }

    // createHistory(item, index) {
    //
    //     return (
    //
    //         <div className="image" key={item && item.key}>
    //             <img src={item && item.url} height='200px' alt={item && item.title}/>
    //             <div className="image__date">{item && item.date}</div>
    //             <div className="image__title">{item && item.title}</div>
    //             <button className="image__button" onClick={() => this.deleteImage(item.key)}>Удалить</button>
    //         </div>
    //     )
    // }

    render() {

        const {images, currentPage, imagesPerPage} = this.props;

        const indexOfLastImages = currentPage * imagesPerPage;
        const indexOfFirstImage = indexOfLastImages - imagesPerPage;
        const currentImages = images.slice(indexOfFirstImage, indexOfLastImages);


        console.log(currentImages, currentPage, imagesPerPage, indexOfLastImages, indexOfFirstImage  );

        const renderImages = currentImages.map((image, index) => {
            return <div className="image" key={image && image.key}>
                <img src={image && image.url} height='200px' alt={image && image.title}/>
                <div className="image__date">{image && image.date}</div>
                <div className="image__title">{image && image.title}</div>
                <button className="image__button" onClick={() => this.deleteImage(image.key)}>Удалить</button>
            </div>
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(images.length / imagesPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <div className={number===currentPage ? "history__pagination_selected" : null}
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </div>
            );
        });

        return (
            <div>
                    {renderImages}
                <div className="history__pagination">
                    {renderPageNumbers}
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        images: getImages(state),
        currentPage: getCurrentPage(state),
        imagesPerPage: getImagesPerPage(state)
    }
}

export default connect(mapStateToProps, {deleteImage, setCurrentPage})(History);

