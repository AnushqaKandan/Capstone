<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="register">
      <!-- Form fields here... -->
      <div class="mb-3">
        <input
          type="text"
          class="form-control w-50 mx-auto"
          placeholder="First Name"
          v-model="payload.firstName"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control w-50 mx-auto"
          placeholder="Last Name"
          v-model="payload.lastName"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="number"
          class="form-control w-50 mx-auto"
          placeholder="Age"
          v-model="payload.userAge"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control w-50 mx-auto"
          placeholder="Gender"
          v-model="payload.Gender"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control w-50 mx-auto"
          placeholder="Role"
          v-model="payload.userRole"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control w-50 mx-auto"
          placeholder="Email Address"
          v-model="payload.emailAdd"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control w-50 mx-auto"
          placeholder="Password"
          v-model="payload.userPass"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control w-50 mx-auto"
          placeholder="Profile Picture URL"
          v-model="payload.userProfile"
          required
        />
      </div>
      <!-- Additional form fields omitted for brevity -->
      <div class="form-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </div>
    </form>

    <!-- Success Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Success</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>You have successfully signed up! Click the button below to log in.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            <button type="button" class="btn btn-primary" @click="redirectToLogin">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      payload: {
        firstName: "",
        lastName: "",
        userAge: null,
        Gender: "",
        userRole: "",
        emailAdd: "",
        userPass: "",
        userProfile: "",
      },
      showModal: false,
    };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', this.payload);
        this.showModal = true; // Show the modal
      } catch (error) {
        console.error(error);
      }
    },
    redirectToLogin() {
      this.showModal = false;
      this.$router.push('/login'); // Redirect to the login page
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.form-footer {
  display: flex;
  justify-content: space-between;
}
.modal.show.d-block {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
