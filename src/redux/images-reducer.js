import {put, takeEvery, call} from "@redux-saga/core/effects";

const REQUERST_NEW_IMAGE = 'SET_NEW_IMAGE';
const INCREASE_CURRENT_IMAGE_INDEX = 'INCREASE_CURRENT_IMAGE_INDEX';
const REQUERST_NEW_IMAGE_SUCCEEDED = 'SET_NEW_IMAGE_SUCCEEDED';
const REQUERST_NEW_IMAGE_FAILED = 'SET_NEW_IMAGE_FAILED';
const FETCH_NEW_IMAGE = 'FETCH_NEW_IMAGE';


let initialState = {
    images: [],
    currentImageindex: 0,
    loading: false,
    error: false
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUERST_NEW_IMAGE: {
          console.log('Тест');
            return {
                ...state,
                loading: true,
            }
        }
        case REQUERST_NEW_IMAGE_SUCCEEDED: {
            let imageUrl = action.url;
          console.log('Тест2');
            return {
                ...state,
                images: state.images.push(imageUrl),
                loading: false
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
export const requestNewImageSucceeded = (url) => ({type: REQUERST_NEW_IMAGE_SUCCEEDED, url});
export const requestNewImageFailed = (url) => ({type: REQUERST_NEW_IMAGE_FAILED, url});
export const requestNewImage = () => ({type: REQUERST_NEW_IMAGE});
export const fetchNewImage = (index) => ({type: FETCH_NEW_IMAGE, index});

export function* watchFetchImage() {
    yield takeEvery('FETCH_NEW_IMAGE', fetchImageAsync);
}

function* fetchImageAsync(index) {
    try {
        yield put(requestNewImage());
        const data = yield call(() => {
                return fetch('https://api.giphy.com/v1/gifs/random?api_key=gR30u9O8KPOanwIQupHbD90d4k57EOeY')
                    .then(res => res.json())
            }
        );
        console.log(Object.values(data.data.images)[index].url);
        yield put(requestNewImageSucceeded(Object.values(data.data.images)[index].url));
    } catch (error) {
        yield put(requestNewImageFailed());
    }
}


export default imagesReducer;