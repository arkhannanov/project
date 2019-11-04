import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs/random?api_key=gR30u9O8KPOanwIQupHbD90d4k57EOeY',
});

export const imagesAPI = {
  getNewImage() {
    return instance.get();
  }
}


