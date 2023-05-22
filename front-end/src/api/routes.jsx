import { Component } from 'react';
import axios from "axios";

class Routes extends Component {
    constructor() {
        super()
        this.state = {
            route: 'http://localhost:3010' //localhost
            // route: 'https://otterbeat-server-production.up.railway.app' //server
        }
    }

    //Artists List Page
    async getAllArtists() {
        return await axios.get(`${this.state.route}/api/songs/get-artists`)
            .then(response => response);
    }

    //Dashboard Page
    async getTop3FavoriteSongs() {
        return await axios.get(`${this.state.route}/api/management/favorable-songs`)
            .then(response => response);
    }

    async getTop3FavoriteArtists() {
        return await axios.get(`${this.state.route}/api/management/favorable-artists`)
            .then(response => response);
    }

    async getTop3Decade() {
        return await axios.get(`${this.state.route}/api/management/favorable-songs-decade`)
            .then(response => response);
    }

    async getShortestAndLongestSongs() {
        return await axios.get(`${this.state.route}/api/management/longest-shortest-songs`)
            .then(response => response);
    }

    //Favorite List Page
    async getFavoriteListOfUser(token) {
        return await axios.get(`${this.state.route}/api/favorite/all-song`, { headers: { Authorization: token } })
            .then(response => response);
    }

    async checkSongFromFavorite(songID, token) {
        return await axios.get(`${this.state.route}/api/favorite/specific-song/?songID=${songID}`, { headers: { Authorization: token } })
            .then(response => response);
    }

    async addSongToFavorite(songID, token) {
        return await axios.put(`${this.state.route}/api/favorite/add`, { songID: songID }, { headers: { Authorization: token } })
            .then(response => response);
    }

    async removeSongFromFavorite(songID, token) {
        return await axios.delete(`${this.state.route}/api/favorite/remove`, { data: { songID: songID }, headers: { Authorization: token } })
            .then(response => response);
    }

    //Songs List Page
    async getSongsOfArtist(artistID) {
        return axios.get(`${this.state.route}/api/songs/get-songs-of-artist/${artistID}`)
            .then(response => response);
    }

    //Login Page
    async loginUser(email, password) {
        return await axios.post(`${this.state.route}/api/auth/login`, { email: email, password: password })
            .then(response => response);
    }

    async getUserInfo(token) {
        return await axios.get(`${this.state.route}/api/auth/info-user`, { headers: { Authorization: token } })
            .then(response => response);
    }

    //Register Page
    async register(userInfo) {
        return await axios.post(`${this.state.route}/api/auth/register`, userInfo)
            .then(response => response);
    }
}

export default new Routes();