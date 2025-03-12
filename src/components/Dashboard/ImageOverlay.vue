<template>
  <div v-if="isVisible" class="overlay" @click="close">
    <div class="modal-content" @click.stop>
      <img :src="imageSrc" alt="Enlarged file" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: String,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  max-width: 100%;
  max-height: 100%;
  display: block; /* Removes bottom space/gap */
}
</style>
