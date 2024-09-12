<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="emailAdd" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="userPass" required />
      </div>
      <div class="button-group">
        <button type="submit">Login</button>
        <button class="btn" @click="$emit('close')">Close</button>
      </div>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      emailAdd: '',
      userPass: '',
      error: ''
    };
  },
  methods: {

    login() {
      this.$store.dispatch('login', {
        emailAdd: this.emailAdd , userPass: this.userPass
      })
    }

  }
};
</script>

<style scoped>
.login-container {
  width: 25rem;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  color: white;
  font-size: 3rem;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  color: goldenrod;
  font-weight: bold;
  font-size: 1.3rem;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  min-width: 120px;
  
  position: relative;
  cursor: pointer;

  padding: 12px 17px;
  border: 0;
  border-radius: 7px;

  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  background: radial-gradient(
    ellipse at bottom,
    rgba(71, 81, 92, 1) 0%,
    rgba(11, 21, 30, 1) 45%
  );

  color: white;

  transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1);
}

button::before {
  content: "";
  width: 70%;
  height: 1px;

  position: absolute;
  bottom: 0;
  left: 15%;

  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.2;

  transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1);
}

button:hover {
  color: rgb(255, 255, 255, 1);
  transform: scale(1.1) translateY(-3px);
}

button:hover::before {
  opacity: 1;
}

/* Mobile responsiveness */

@media (max-width: 480px) {
  .login-container {
    width: 100%;
    padding: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
    min-width: 90px;
    padding: 8px 12px;
  }

  input {
    padding: 6px;
  }

  label {
    font-size: 1rem;
  }
}
</style>
