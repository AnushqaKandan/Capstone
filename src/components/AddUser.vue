<template>
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add User
    </button>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add User</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="first name"
                  v-model="payload.firstName"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="last name"
                  v-model="payload.lastName"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="user age"
                  v-model="payload.userAge"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="gender"
                  v-model="payload.Gender"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="user role"
                  v-model="payload.userRole"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="email address"
                  v-model="payload.emailAdd"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="user password"
                  v-model="payload.userPass"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="user profile"
                  v-model="payload.userProfile"
                  required
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  @click="addingUser"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "addUser",
    data() {
      return {
        payload: {
          userID: null,
          firstName: "",
          lastName: "",
          userAge: null,
          Gender: "",
          userRole: "",
          emailAdd: "",
          userPass: "",
          userProfile: "",
        },
      };
    },
    methods: {
      async addingUser() {
        try {
          await this.$store.dispatch("register", this.payload);
        } catch (error) {
          console.error(error);
        }
      },

    },
  };
  </script>
  <style scoped>
  .btn{
    text-decoration: underline;
  }

</style>