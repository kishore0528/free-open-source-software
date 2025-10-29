<template>
  <div class="gallery-container">
    <h2>Marvel Zone</h2>
    <div class="filter-controls">
      <button
        @click="toggleShowFavorites"
        :class="{ 'active-filter': showFavoritesOnly }"
      >
        {{ showFavoritesOnly ? "Show All Images" : "Show Only Favorites" }}
      </button>
    </div>
    <div class="gallery">
      <div v-for="image in filteredImages" :key="image.id" class="gallery-item">
        <img :src="image.src" :alt="image.alt" @click="selectImage(image.id)" />
        <button class="fav-button" @click="toggleFavorite(image.id)">
          <span :class="{ 'star-filled': image.isFavorite }">★</span>
        </button>
      </div>
    </div>
    <div v-if="isLightboxActive" class="lightbox">
      <button @click="prevImage" class="nav-btn">⟨</button>
      <img
        :src="selectedImage.src"
        :alt="selectedImage.alt"
        @wheel="zoomImage"
        :style="{ transform: 'scale(' + zoom + ')' }"
      />
      <button @click="nextImage" class="nav-btn">⟩</button>
      <button @click="closeLightbox" class="close-btn">X</button>
      <div class="meta">
        <label
          >Title: <textarea v-model="selectedImage.title"></textarea>
        </label>
        <button
          class="fav-button-lightbox"
          @click="toggleFavorite(selectedImage.id)"
        >
          <span :class="{ 'star-filled': selectedImage.isFavorite }">★</span>
          <span>{{
            selectedImage.isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"
          }}</span>
        </button>
        <button class="delete-btn" @click="deleteImage(selectedImage.id)">
          Delete
        </button>
      </div>
    </div>
    <button
      v-if="deletedImages.length"
      class="restore-btn"
      @click="restoreImage"
    >
      Restore Last Deleted
    </button>
  </div>
</template>
<script>
export default {
  name: "ImageGallery",
  data() {
    return {
      images: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        src: `/images/Image${i + 1}.jpg`,
        alt: `Image ${i + 1}`,
        title: `Image ${i + 1}`,
        description: "",
        isFavorite: false,
      })),
      deletedImages: [],
      selectedImageId: null,
      zoom: 1,
      showFavoritesOnly: false,
    };
  },
  computed: {
    isLightboxActive() {
      return this.selectedImageId !== null;
    },
    selectedImage() {
      return this.images.find((img) => img.id === this.selectedImageId);
    },
    filteredImages() {
      if (this.showFavoritesOnly) {
        return this.images.filter((image) => image.isFavorite);
      }
      return this.images;
    },
  },
  methods: {
    selectImage(imageId) {
      this.selectedImageId = imageId;
      this.zoom = 1;
    },
    closeLightbox() {
      this.selectedImageId = null;
    },
    deleteImage(imageId) {
      const indexToDelete = this.images.findIndex((img) => img.id === imageId);
      if (indexToDelete !== -1) {
        const removed = this.images.splice(indexToDelete, 1)[0];
        this.deletedImages.push(removed);
        if (imageId === this.selectedImageId) {
          this.closeLightbox();
        }
      }
    },
    restoreImage() {
      if (this.deletedImages.length) {
        const restoredImage = this.deletedImages.pop();
        this.images.push(restoredImage);
        this.images.sort((a, b) => a.id - b.id);
      }
    },
    zoomImage(event) {
      this.zoom += event.deltaY > 0 ? -0.1 : 0.1;
      this.zoom = Math.max(0.5, Math.min(this.zoom, 2));
    },
    prevImage() {
      const currentIndex = this.images.findIndex(
        (img) => img.id === this.selectedImageId
      );
      if (currentIndex > 0) {
        this.selectedImageId = this.images[currentIndex - 1].id;
        this.zoom = 1;
      }
    },
    nextImage() {
      const currentIndex = this.images.findIndex(
        (img) => img.id === this.selectedImageId
      );
      if (currentIndex < this.images.length - 1) {
        this.selectedImageId = this.images[currentIndex + 1].id;
        this.zoom = 1;
      }
    },
    toggleFavorite(imageId) {
      const image = this.images.find((img) => img.id === imageId);
      if (image) {
        image.isFavorite = !image.isFavorite;
      }
    },
    toggleShowFavorites() {
      this.showFavoritesOnly = !this.showFavoritesOnly;
      if (
        this.isLightboxActive &&
        this.showFavoritesOnly &&
        this.selectedImage &&
        !this.selectedImage.isFavorite
      ) {
        this.closeLightbox();
      }
    },
  },
};
</script>
---
<style scoped>
.gallery-container {
  max-width: 100%;
  margin: auto;
  text-align: center;
  padding-bottom: 50px;
}
h2 {
  color: #333;
}
/* Filter Controls */
.filter-controls {
  margin-bottom: 20px;
}
.filter-controls button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
.filter-controls button:hover {
  background-color: #0056b3;
}
.filter-controls button.active-filter {
  background-color: #28a745;
}
.filter-controls button.active-filter:hover {
  background-color: #218838;
}
/* Gallery Grid */
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 0 15px;
}
.gallery-item {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  display: block;
}
/* Favorite Star in Grid */
.fav-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 10;
  padding: 0;
  line-height: 1;
  outline: none;
}
.fav-button span {
  color: #ccc;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
.fav-button .star-filled {
  color: gold;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.8);
}
.fav-button:hover span {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
/* Lightbox Styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}
.lightbox img {
  max-width: 80%;
  max-height: 80vh;
  object-fit: contain;
  transition: transform 0.3s ease-out;
  flex-shrink: 0;
}
.nav-btn {
  background: none;
  color: white;
  font-size: 4rem;
  border: none;
  cursor: pointer;
  padding: 0 20px;
  user-select: none;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}
.nav-btn:hover {
  opacity: 1;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  background: #dc3545;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}
.close-btn:hover {
  background: #c82333;
}
.meta {
  color: white;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
}
.meta label {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #eee;
  font-size: 0.9rem;
  text-align: left;
}
.meta textarea {
  color: #333;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 60px;
}
/* Favorite Star in Lightbox */
.fav-button-lightbox {
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  user-select: none;
  padding: 0;
}
.fav-button-lightbox span:first-child {
  font-size: 1.8rem;
  line-height: 1;
  color: #ccc;
}
.fav-button-lightbox .star-filled {
  color: gold;
}
.fav-button-lightbox:hover span:first-child {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
.delete-btn {
  background: crimson;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  align-self: center;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}
.delete-btn:hover {
  background: #a30000;
}
.restore-btn {
  margin-top: 20px;
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
.restore-btn:hover {
  background: #217dbb;
}
</style>
