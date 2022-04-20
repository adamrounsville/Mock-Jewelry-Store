<template>
<div class="admin container">
  <h1>Admin Console</h1>
  <div class="add my-3">
    <div class="form">
      <h4 class="my-3">Add Listing</h4>
      <div class="form-group">
        <label>Item Name</label>
        <input v-model="title" class="form-control w-50 mx-auto" type="text" placeholder="Name">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input v-model="description" class="form-control w-75 mx-auto" type="text" placeholder="Description">
      </div>
      <div class="form-group">
        <label>Price</label>
        <input v-model="price" class="form-control w-25 mx-auto" type="text" placeholder="Price">
      </div>
      <div class="form-group w-25 my-2 mx-auto d-flex justify-content-center">
        <input type="file" name="photo" class="form-control-file my-2" @change="fileChanged">
      </div>
      <button type="submit" @click="upload" class="btn btn-success my-2">Submit</button>
    </div>
  </div>

  <form class="my-3" style="border: 1px solid black;" v-if="suggestions.length > 0">
    <h4 class="my-3">Edit/Delete Listing</h4>
    <div class="form-group">
      <div class="w-50 mx-auto d-flex justify-content-center">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="suggestion in suggestions" :key="suggestion.id" @click="selectItem(suggestion)">
            {{suggestion.title}}
          </div>
        </div>
      </div>
    </div>
    <div v-if="findItem">
      <div class="form-group">
        <label>Item Name</label>
        <input v-model="findItem.title" class="form-control w-50 mx-auto" type="text" placeholder="Name">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input v-model="findItem.description" class="form-control w-75 mx-auto" type="text" placeholder="Description">
      </div>
      <div class="form-group">
        <label>Price</label>
        <input v-model="findItem.price" class="form-control w-25 mx-auto" type="text" placeholder="Price">
      </div>
      <div class="form-group my-2">
        <button @click="editItem(findItem)" class="btn btn-primary mr-3">Edit</button>
        <button @click="deleteItem(findItem)" class="btn btn-danger ml-3">Delete</button>
      </div>
      <div class="form-group my-3 mx-3">
        <img class="img-fluid" :src="findItem.path">
      </div>
    </div>
  </form>
  <br>
  <br>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AdminView",
  data() {
    return {
      title: "",
      description: "",
      price: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: '',
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      const formData = new FormData();
      formData.append('photo', this.file, this.file.name);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('price', this.price);
      let r1 = await axios.post('/api/photos', formData);
      let r2 = await axios.post('/api/items', {
        title: this.title,
        description: this.description,
        price: this.price,
        path: r1.data.path
      });
      this.addItem = r2.data;
      this.title = "";
      this.description = "";
      this.price = null;
      this.file = null;
    },
    async getItems() {
      let response = await axios.get("/api/items");
      this.items = response.data;
      return true;
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      await axios.delete("/api/items/" + item._id);
      this.findItem = null;
      this.getItems();
      return true;
    },
    async editItem(item) {
      await axios.put("/api/items/" + item._id, {
        title: this.findItem.title,
        description: this.findItem.description,
        price: this.findItem.price,
      });
      this.findItem = null;
      this.getItems();
      return true;
    },
  }
};
</script>

<style>
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
  border: 1px solid black;
}

.suggestion:hover {
  background-color: #6cacff;
  color: #fff;
}

.form {
  border: 1px solid black;
}
</style>