<template>
  <div id="app">
    <ImageGallery />
  </div>
</template>
<script>
import ImageGallery from "./components/ImageGallery.vue";
export default {
  name: "App",
  components: {
    ImageGallery,
  },
};
</script>
<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}
</style>
