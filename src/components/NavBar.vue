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
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/" aria-current="page">Login</router-link>
          </li> -->
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
              <span class="badge bg-warning rounded-pill">{{ cartCount }}</span>
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
          <li class="nav-item logbtn">
            <button class="Btn" @click="logout">
       <div class="sign">
        <svg viewBox="0 0 512 512" width="24" height="24">
        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
      </svg>
    </div>
    <div class="text">Logout</div>
  </button>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
  
</template>

<script>
import { mapGetters } from 'vuex';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

export default {
  computed: {
    ...mapGetters(['cartCount', 'userRole'])  
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/'); 
      cookies.remove('LegitUser');
    }
  }
};
</script>


<style scoped>
.active-link {
    text-decoration: underline;
    color: goldenrod; 
}
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(248, 198, 70);
  margin-top: 5px ;
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: white;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}

/* hover effect on button width */
.Btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}

/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}

/* button click effect*/
.Btn:active {
  transform: translate(2px ,2px);
}

@media (max-width: 992px) {
  .logbtn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>


