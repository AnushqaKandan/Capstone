<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <button class="btn btn-secondary" @click="$emit('close')">Close</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
  console.log('Email:', this.email);
  console.log('Password:', this.password);
  try {
    const response = await axios.post('http://localhost:3005/users/login', {
      emailAdd: this.email,
      userPass: this.password,
    });
    console.log('Response:', response);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      this.$router.push('/home');
    }
  } catch (err) {
    console.error('Error:', err);
    this.error = err.response?.data?.msg || 'Login failed. Please try again.';
  }
}

  }
};


</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 50%;
  padding: 10px;
  background-color: maroon;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
