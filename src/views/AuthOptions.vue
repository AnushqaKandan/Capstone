<template>
  <div class="auth-container">
    <h1>Welcome to Luminous Gems</h1>
    <div class="auth-buttons" v-if="!showForm">
      <button @click="showForm = 'login'" class="btn btn-primary">Login</button>
      <button @click="showForm = 'signup'" class="btn btn-secondary">Register</button>
    </div>
    <Login v-if="showForm === 'login'" @close="showForm = null" />
    <SignUp v-if="showForm === 'signup'" @close="showForm = null" />
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
        showForm: null, 
    };
  },
};
</script>

<style scoped>
.auth-container {
  text-align: center;
  margin-top: 100px;
}
.auth-buttons {
  margin-top: 20px;
}
.btn {
  margin: 0 10px;
  padding: 10px 20px;
}
</style>
