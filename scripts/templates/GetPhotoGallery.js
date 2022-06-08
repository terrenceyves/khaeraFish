export default class GetPhotoGallery {
    constructor(media) {
        this._media = media;
        this.galleryElement = document.createElement("article");
    }

    createUserGalleries() {
        console.log(this._media);
        console.log("création du document");
        const image = `
            <img class='thumbnail type-contenu' src="../../assets/photographers/media/${this._media.image}" alt="${this._media.title}">
            <div class="description">
                <p class="title">${this._media.title}</p>
                <div class="likes">
                    <p>${this._media.likes} </p>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </div>
            </div>
            `;
        this.galleryElement.innerHTML = image;
        this.galleryElement.setAttribute("class", "cardImage");
        console.log(this.galleryElement);
        return this.galleryElement;
    }
}