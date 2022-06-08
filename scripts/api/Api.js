class Api {
    constructor(url) {
        this.url = url;
    }

    async getPhotographesJSON() {
        return fetch(this.url)
            .then((res) => res.json())
            .then((res) => res.photographers)
            .catch((err) => console.log("erreur", err));
    }

    async getPhotosJSON() {
        return fetch(this.url)
            .then((res) => res.json())
            .then((res) => res.media)
            .catch((err) => console.log("erreur", err));
    }

    async getLikesJSON() {
        return fetch(this.url)
            .then((res) => res.json())
            .then((res) => res.media)
            .catch((err) => console.log("erreur", err));
    }
}

export default class AllPhotographers extends Api {
    constructor(url) {
        super(url);
    }
    async getPhotographers() {
        return await this.getPhotographesJSON();
    }

    async getPhotos() {
        console.log(this.getPhotosJSON());
        return await this.getPhotosJSON();
    }

    async getLikes() {
        return await this.getLikesJSON();
    }
}