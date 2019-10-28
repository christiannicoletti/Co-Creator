import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cocreate-5c155.firebaseio.com'
})

export default instance;