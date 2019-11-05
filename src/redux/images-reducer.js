import {put, takeEvery, call} from "@redux-saga/core/effects";

const REQUERST_NEW_IMAGE = 'SET_NEW_IMAGE';
const INCREASE_CURRENT_IMAGE_INDEX = 'INCREASE_CURRENT_IMAGE_INDEX';
const REQUERST_NEW_IMAGE_SUCCEEDED = 'SET_NEW_IMAGE_SUCCEEDED';
const REQUERST_NEW_IMAGE_FAILED = 'SET_NEW_IMAGE_FAILED';
const FETCH_NEW_IMAGE = 'FETCH_NEW_IMAGE';
const CANCEL_FIRST_LOADING = 'CANCEL_FIRST_LOADING';
const DELETE_IMAGE = 'DELETE_IMAGE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

let initialState = {
    images: [],
    currentImageindex: -1,
    loading: false,
    error: false,
    firstLoading: true,
    currentPage: 1,
    imagesPerPage: 3
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE: {
            let number = action.number;
            return {
                ...state,
                currentPage: number,
            }
        }
        case DELETE_IMAGE: {
            let key = action.key;
            let filteredImages = state.images.filter(function (item) {
                return (item.key !== key);
            })

            return {
                ...state,
                images: filteredImages,
            }
        }
        case CANCEL_FIRST_LOADING: {
            return {
                ...state,
                firstLoading: false,
            }
        }
        case REQUERST_NEW_IMAGE: {
            return {
                ...state,
                loading: true,
            }
        }
        case REQUERST_NEW_IMAGE_SUCCEEDED: {
            let imageUrl = action.url;
            let title = action.title;
            let key = action.key;
            let date = action.date;
            return {
                ...state,
                images: [...state.images,
                    {
                        url: imageUrl,
                        title: title,
                        key: key,
                        date: date
                    }
                ],
                loading: false,
                error: false
            }
        }
        case REQUERST_NEW_IMAGE_FAILED: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case INCREASE_CURRENT_IMAGE_INDEX: {
            return {
                ...state,
                currentImageindex: state.currentImageindex += 1
            }
        }
        default:
            return state;
    }
}

export const increaseCurrentImageIndex = () => ({type: INCREASE_CURRENT_IMAGE_INDEX});
export const requestNewImageSucceeded = (url, title, key, date) => ({
    type: REQUERST_NEW_IMAGE_SUCCEEDED,
    url,
    title,
    key,
    date
});
export const requestNewImageFailed = (url) => ({type: REQUERST_NEW_IMAGE_FAILED, url});
export const requestNewImage = () => ({type: REQUERST_NEW_IMAGE});
export const fetchNewImage = (index, key, date) => ({type: FETCH_NEW_IMAGE, index, key, date});
export const cancelFirstLoading = () => ({type: CANCEL_FIRST_LOADING});
export const deleteImage = (key) => ({type: DELETE_IMAGE, key});
export const setCurrentPage = (number) => ({type: SET_CURRENT_PAGE, number});

export function* watchFetchImage() {
    yield takeEvery('FETCH_NEW_IMAGE', fetchImageAsync);
}

function* fetchImageAsync(action) {
    try {
        yield put(requestNewImage());
        const data = yield call(() => {
                return fetch('https://api.giphy.com/v1/gifs/random?api_key=gR30u9O8KPOanwIQupHbD90d4k57EOeY')
                    .then(res => res.json())
            }
        );
        yield put(requestNewImageSucceeded(Object.values(data.data.images)[action.index].url, Object.keys(data.data.images)[action.index], action.key, action.date));
        yield put(increaseCurrentImageIndex());
    } catch (error) {
        yield put(requestNewImageFailed());
    }
}


export default imagesReducer;