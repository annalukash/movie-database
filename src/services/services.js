export default class MoviesServices {
    constructor() {
        this._baseApi = 'https://api.themoviedb.org/3';
        this._apiKey = 'api_key=d97132eedaef267781863bedd0564229';
        this._apiLanguage = 'language=ru-RU';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._baseApi}${url}${this._apiKey}&${this._apiLanguage}`);

        return await res.json();
    }

    getPopular = async (page) => {
        const response = await this.getResource(`/movie/popular?page=${page}&`);
        return response;
    }

    getMovieDetails = async (movieId) => {
        const response = await this.getResource(`/movie/${movieId}?`);
        return response;
    }

    getNowPlaying = async (page) => {
        const response = await this.getResource(`/movie/now_playing?page=${page}&`);
        return response;
    }

    getTopRated = async (page) => {
        const response = await this.getResource(`/movie/top_rated?page=${page}&`);
        return response;
    }

    getUpcoming = async (page) => {
        const response = await this.getResource(`/movie/upcoming?page=${page}&`);
        return response;
    }

    getCast = async (movieId) => {
        const response = await this.getResource(`/movie/${movieId}/credits?`);
        return response;
    }

    getKeywords = async (movieId) => {
        const response = await this.getResource(`/movie/${movieId}/keywords?`);
        return response;
    }

    getVideos = async (movieId) => {
        const response = await this.getResource(`/movie/${movieId}/videos?`);
        return response;
    }
}