<template>
  <div></div>
  <div class="container-fluid auth-container imglog">
    <div class="center-container">
      <div class="text-center">
        <h1 v-if="!showForm">Luminous Gems</h1>
        <div class="auth-buttons" v-if="!showForm">
          <button @click="showForm = 'login'" class="btn">Login</button>
          <button @click="showForm = 'signup'" class="btn">Register</button>
        </div>
      </div>
      <!-- Login form -->
      <Login v-if="showForm === 'login'" @close="showForm = null" />
      <!-- Signup form -->
      <SignUp v-if="showForm === 'signup'" @close="showForm = null" @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>

<script>
import SignUp from '../components/SignUp.vue';
import Login from '../components/LoginComp.vue';

export default {
  name: 'AuthOptions',
  components: {
    SignUp,
    Login,
  },
  data() {
    return {
      showForm: null,  // Controls which form is displayed (login/signup)
    };
  },
  methods: {
    handleLoginSuccess() {
      this.showForm = 'login';  // Display login form
    },
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');

h1 {
  color: goldenrod;
  font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 6rem;
  margin-bottom: 20px; /* Add space between the heading and buttons */
}

.imglog { 
  background-image: url('https://anushqakandan.github.io/Capstone_images/login8.png');
  background-size: cover; 
  background-repeat: no-repeat; 
  height: 100vh;
  background-position: center; 
}

@media only screen and (max-width: 839px) {
  h1 {
    font-size: 6rem;
  }
}

@media only screen and (max-width: 767px) {
  .imglog {
    background-position: center; 
  }
  h1 {
    font-size: 5rem;
  }
}
@media only screen and (max-width: 426px) {
  h1 {
    font-size: 3.5rem;
  }
}

@media only screen and (max-width: 360px) {
  .imglog {
    height: 140vh; 
  }
}

.auth-container {
  text-align: center; 
}

.auth-buttons {
  margin-top: 20px;
}

.btn {
  margin: 0 10px;
  padding: 10px 20px;
}

.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Button styling */
button {
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  padding: 0.7em 2em;
  border: 3px solid #FF0072;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
  color: white;
  text-decoration: none;
  transition: 0.3s ease all;
  z-index: 1;
}

button:before {
  transition: 0.5s all ease;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  bottom: 0;
  opacity: 0;
  content: '';
  background-color: #FF0072;
  z-index: -1;
}

button:hover, button:focus {
  color: white;
}

button:hover:before, button:focus:before {
  transition: 0.5s all ease;
  left: 0;
  right: 0;
  opacity: 1;
}

button:active {
  transform: scale(0.9);
}
</style>
