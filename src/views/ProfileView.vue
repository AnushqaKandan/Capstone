<template>
  <div>
    <NavBar /> 
    <div class="container-fluid">
      <h1 class="display-3">Profile Settings</h1>
      <div class="display-5">
        <p>
        "Welcome to your Profile Settings. Here, you can update your personal information, adjust account preferences, or delete your account if you choose to."
        </p>
      </div>
      <!-- Loading Spinner -->
      <div v-if="loading" class="loading-spinner">
        <SpinnerComp />
      </div>
      
      <!-- USER PROFILE -->
      <div v-if="!loading && user" class="user-profile">
        <table class="table user-profile-table">
          <tbody>
            <tr>
              <td class="label">User ID:</td>
              <td>{{ user.userID }}</td>
            </tr>
            <tr>
              <td class="label">First Name:</td>
              <td>{{ user.firstName }}</td>
            </tr>
            <tr>
              <td class="label">Last Name:</td>
              <td>{{ user.lastName }}</td>
            </tr>
            <tr>
              <td class="label">User Age:</td>
              <td>{{ user.userAge }}</td>
            </tr>
            <tr>
              <td class="label">Gender:</td>
              <td>{{ user.Gender }}</td>
            </tr>
            <tr>
              <td class="label">User Role:</td>
              <td>{{ user.userRole }}</td>
            </tr>
            <tr>
              <td class="label">Email Address:</td>
              <td>{{  user.emailAdd }}</td>
            </tr>
            <tr>
              <td class="label">User Profile:</td>
              <td>
                <a :href="user.userProfile" target="_blank">
                  <img :src="user.userProfile" alt="User Profile" width="50">
                </a>
              </td>
            </tr>
            <tr>
              <td class="label">Action:</td>
              <td>
              <updateUser :user="user" />
              <button class="btn btn-danger deleteButton" @click="deleteUser(user.userID)">Delete</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SpinnerComp from '@/components/SpinnerComp.vue';
import { useCookies } from 'vue3-cookies';
import updateUser from '@/components/UpdateUser.vue';

const { cookies } = useCookies();

export default {
  components: {
    NavBar,
    SpinnerComp,
    updateUser,
  },
  data() {
    return {
      loading: true,
      user: null,
    };
  },
  async mounted() {
    await this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      try {
        // Retrieve user data from cookies
        const userData = cookies.get('LegitUser');
        
        if (!userData || !userData.user) {
          throw new Error('User not authenticated');
        }

        this.user = userData.user;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        this.loading = false;
      }
    },
    deleteUser(userID) {
    this.$store.dispatch('deleteUser', userID)
      .then(() => {
        // Redirect to home page after successful deletion
        this.$router.push('/');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  },
    updateUser(user) {
      let editUser = {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        userAge: user.userAge,
        Gender: user.Gender,
        userRole: user.userRole,
        emailAdd: user.emailAdd,
        userPass: user.userPass,
        userProfile: user.userProfile,
      };
      this.$store.dispatch('updateUser', { id: user.userID, data: editUser });
    },
  }
}
</script>

<style scoped>
.container-fluid{
  background: rgb(222, 138, 152);
}
.display-5{
  font-size: 1.2rem;
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

.user-profile {
  display: flex;
  justify-content: center; 
}

.user-profile-table {
  width: 60%; 
  border-collapse: collapse;

}

.user-profile-table td {
  padding: 12px; 
  border: 1px solid black; /* Black border around cells */
}

.user-profile-table .label {
  font-weight: bold;
  text-align: center; /* Align labels to the right */
}

.user-profile-table img {
  border-radius: 50%;
}

</style>