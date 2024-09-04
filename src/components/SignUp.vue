<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <!-- Form Fields -->
        <div class="mb-3">
          <input
            type="text"
            class="form-control mx-auto"
            placeholder="First Name"
            v-model="payload.firstName"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control mx-auto"
            placeholder="Last Name"
            v-model="payload.lastName"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="number"
            class="form-control mx-auto"
            placeholder="Age"
            v-model="payload.userAge"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control mx-auto"
            placeholder="Gender"
            v-model="payload.Gender"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control mx-auto"
            placeholder="Role e.g. user"
            v-model="payload.userRole"
          />
        </div>
        <div class="mb-3">
          <input
            type="email"
            class="form-control mx-auto"
            placeholder="Email Address"
            v-model="payload.emailAdd"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control mx-auto"
            placeholder="Password"
            v-model="payload.userPass"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control mx-auto"
            placeholder="Profile Picture URL"
            v-model="payload.userProfile"
            required
          />
        </div>
      </div>
      <div class="form-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </div>
    </form>

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <SpinnerComp />
    </div>

    <!-- Success Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Success</h5>
          </div>
          <div class="modal-body">
            <p>You have successfully signed up! Click the button below to log in.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" @click="showModal = false">Close</button>
            <button type="button" class="btn" @click="redirectToLogin">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerComp from '@/components/SpinnerComp.vue'; // Import the spinner component

export default {
  name: 'SignUp',
  components: {
    SpinnerComp // Register the spinner component
  },
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
      loading: false, // Track loading state
    };
  },
  methods: {
    async register() {
      this.loading = true; // Show spinner
      try {
        await this.$store.dispatch('register', this.payload);
        this.showModal = true; // Show modal on success
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false; // Hide spinner
      }
    },
    redirectToLogin() {
      this.showModal = false;
      this.$router.push('/login'); // Redirect to login
    },
  },
};
</script>

<style scoped>
.signup-container {
  width: 25rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: black;
  font-size: 3rem;
  backdrop-filter: blur(5px);
}

.form-control {
  width: 80%;
}

.form-footer {
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

/* Center Modal */
.modal.show.d-block {
  display: flex !important;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  max-width: 500px;
  margin: 0;
}

/* Center and overlay the spinner */
.loading-spinner {
  position: fixed; /* Fixed positioning to overlay the content */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Darkened background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Higher z-index to be on top of other content */
}
</style>
