<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container-fluid" id="navbar">
      <router-link class="navbar-brand" to="/">
        <img
          src="https://anushqakandan.github.io/Capstone_images/logo.jpg"
          alt="logo"
          class="img-thumbnail"
          loading="lazy"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/" aria-current="page">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/home"  exact-active-class="active-link" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about"  exact-active-class="active-link" aria-current="page">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products"  exact-active-class="active-link" aria-current="page">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/checkout"  exact-active-class="active-link" aria-current="page">Checkout
                <span class="badge bg-warning rounded-pill" counter>0</span>
            </router-link>
          </li>
          <li v-if="userRole === 'Admin'" class="nav-item">
            <router-link class="nav-link" to="/admin" exact-active-class="active-link" aria-current="page">Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" exact-active-class="active-link" aria-current="page">Contact Info</router-link>
          </li>
          <ul class="userAccount navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/profile" exact-active-class="active-link" aria-current="page">Profile</router-link>
            </li>
          </ul>
      <li><button @click="logout">Logout</button></li>
          
        </ul>
      </div>
    </div>
  </nav>
  
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['userRole']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout'); // Use Vuex action for logout
      this.$router.push('/'); // Redirect to login page
    }
  }
};
</script>

<style scoped>
.active-link {
    text-decoration: underline;
    color: goldenrod; 
}
</style>
<!-- <script> -->
// export default {
//     // data() {
//     //     return {
//     //         cartCount: 0
//     //     };
//     // },
//     // created() {
//     //     // Mock example - in reality, this data might come from a store or API
//     //     this.cartCount = this.getCartCount();
//     // },
//     // methods: {
//     //     getCartCount() {
//     //         // Logic to get the cart count, possibly from a Vuex store or API
//     //         return 3; // Replace with actual logic
//     //     }
//     // }
// }
<!-- </script> -->
