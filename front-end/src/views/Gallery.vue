<template>
  <div class="gallery">
    <h1 class="my-2">Modernity Jewelry</h1>
    <br>
    <div class="container">
      <div v-if="items.length > 0" class="row justify-content-center">
        <div class="player col" v-for="item in items" :key="item.id">
          <div class="card mb-3 mx-auto bg-white text-dark">
            <img class="card-img-top" :src="item.path" :alt="item.title">
            <div class="card-body">
              <h5 class="card-title text-center my-1">{{item.title}}</h5>
              <br>
              <p class="card-text"><strong>Description:</strong> {{item.description}}</p>
              <p class="card-text"><strong>Price:</strong> ${{item.price}}</p>
              <button @click="addItemToCart(item)" class="btn btn-info mt-5 mx-auto d-flex justify-content-center"><a>Add to Cart</a></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "GalleryView",
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      this.response = await axios.get("/api/items");
      this.items = this.response.data;
      return true;
    },
    async addItemToCart(item) {
      let respData = await axios.post('/api/cart', {id: item._id});
      return respData;
    }
  }
};
</script>

<style scoped>
.card {
  border: 3px solid black;
  width: 300px;
}

.card-body {
  background: rgb(213, 213, 213);
}

.card-body .row .col {
  font-size: 13px;
  line-height: 8px;
  padding: 0 0 1em 1em;
}

.container {
  padding-bottom: 5%;
}
</style>