<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand active" href="#"><router-link to="/">Modernity Jewelry</router-link></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link"><router-link to="/admin">Admin Page</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link to="/cart">Shopping Cart</router-link></a>
            </li>
          </div>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  text-align: center;
}

#nav {
  padding-bottom: 1%;
}

#nav a {
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>