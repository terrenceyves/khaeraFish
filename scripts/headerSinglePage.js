import AllPhotographers from "./api/Api.js";

import ProfilFactory from "./factories/profilPhotographer.js";

import MainContentPhotographer from "./templates/SinglePageContent.js";
import GetPhotoGallery from "./templates/GetPhotoGallery.js";
import GetLikes from "./templates/Getlikes.js";

export default class HeaderSinglePage {
    constructor() {
        this.$userInfoProfil = document.querySelectorAll(
            "#main #photograph-header"
        );
        this.$userImagesProfil = document.getElementById("images-gallery");
        this.$priceDay = document.querySelectorAll("#likes_price .price");
        this.$likesElement = document.querySelectorAll("#likes_price");

        this.mediasApi = new AllPhotographers("../data/fisheye-data.json");

        this.idUrl = new URL(window.location.href).searchParams.get("id");

        this.namePhotographer;
    }
    async displayCardPhotographers() {
        const photographersData = await this.mediasApi.getPhotographers();
        const data = photographersData;
        const InfoPhotographers = data.map(
            (medias) => new ProfilFactory(medias, this.idUrl)
        );

        InfoPhotographers.forEach((user) => {
            if (this.idUrl == user.id) {
                const ProfilTemplate = new MainContentPhotographer(user, this.idUrl);

                this.$userInfoProfil.appendChild(ProfilTemplate.createUserInfoCard());
                this.$priceDay.appendChild(`${user.productPrice}€ / jour`);
            }
        });
    }
    async displayImagesPhotographers() {
        const galleryPhotographers = await this.mediasApi.getPhotos();
        const imagesData = galleryPhotographers;
        console.log(imagesData);
        const galleriesImages = imagesData
            .filter((media) => media.photographerId === parseInt(this.idUrl))
            .map((mediasingle) => {
                new ProfilFactory(mediasingle, this.idUrl, "tet");
            });

        console.log(galleriesImages);
        imagesData.forEach((photo) => {
            //console.log(photo);

            if (photo.photographerId == parseInt(this.idUrl)) {
                //console.log(this.idUrl);
                //console.log(photo.id + "ese");
                const MediaTemplate = new GetPhotoGallery(photo);

                //console.log(MediaTemplate);

                this.$userImagesProfil.appendChild(MediaTemplate.createUserGalleries());
            }
        });
    }

    async displayLikes() {
        const likesPhotographers = await this.mediasApi.getLikes();
        const likesData = likesPhotographers;
        const viewLikes = likesData.map(
            (medias) => new ProfilFactory(medias, this.idUrl)
        );

        viewLikes.forEach((like) => {
            let totalLikes = [];
            if (like.photographerId == this.idUrl) {
                totalLikes = totalLikes + like.likes;
            }
            let LikeTemplate = new GetLikes(like, this.idUrl);
            this.$likesElement.append(LikeTemplate.createUserLikes());
        });
    }
}

const app = new HeaderSinglePage();
app.displayCardPhotographers();
app.displayImagesPhotographers();
app.displayLikes();