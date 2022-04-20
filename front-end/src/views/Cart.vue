<template>
  <div class="cart">
    <section v-if="items.length > 0" class="container">
      <div v-if="items.length> 0" class="row justify-content-center">
        <div class="player col" v-for="item in items" :key="item.id">
          <div class="card mb-3 mx-auto bg-white text-dark">
            <img class="card-img-top" :src="item.path" :alt="item.title">
            <div class="card-body">
              <h5 class="card-title text-center">{{item.title}}</h5>
              <p class="card-text"><strong>Description:</strong> {{item.description}}</p>
              <p class="card-text"><strong>Price:</strong> ${{item.price}}</p>
              <button @click="removeFromCart(item)" class="btn btn-warning mt-5"><a>Remove Item</a></button>
            </div>
          </div>
        </div>
      </div>
      <br>
      <h3 class="text-center">Grand Total: ${{totalPrice}}</h3>
      <br>
    </section>
    <section v-else class="my-5">
      <h3>It looks like your cart is empty. Go to the <router-link to="/">Home</router-link> page to add jewelry to your cart.</h3>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "CartView",
  data() {
    return {
      items: [],
      totalPrice: Number,
    }
  },
  created() {
    this.getCart()
  },
  methods: {
    async getCart() {
      let response = await axios.get("/api/cart");
      this.items = response.data;
      let sum = this.items.reduce(function(a, b) {
        return a + b.price;
      }, 0);
      this.totalPrice = sum;
      return true;
    },
    async removeFromCart(item) {
      await axios.delete("api/cart/" + item._id);
      this.getCart();
      return true;
    }
  },
  computed: {
    cart() {
      return this.$root.$data.cart;
    },
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

.container {
  padding-bottom: 5%;
}
</style>