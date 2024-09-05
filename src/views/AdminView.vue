<template>
  <div>
    <NavBar/>
    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <SpinnerComp />
    </div>
    <!-- USERS TABLE -->
    <h2>Users Table</h2>
    <addUser/>
    <div class="container table-responsive">
      <div class="col"></div>
      <table class="table users-table" v-if="!loading && users">
        <thead class="table-dark">
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Age</th>
            <th>Gender</th>
            <th>User Role</th>
            <th>Email Address</th>
            <th>User Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.userID">
            <td>{{ user.userID }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.userAge }}</td>
            <td>{{ user.Gender }}</td>
            <td>{{ user.userRole }}</td>
            <td>{{ user.emailAdd }}</td>
            <td>
              <a :href="user.userProfile" target="_blank">
                <img :src="user.userProfile" alt="User Profile" width="50">
              </a>
            </td>
            <td>
              <updateUser :user="user" />
              <button class="btn btn-danger deleteButton" @click="deleteUser(user.userID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PRODUCTS TABLE -->
    <h2>Products Table</h2>
    <addProduct/>
    <div class="container table-responsive">
      <table class="table products-table" v-if="!loading && products">
        <thead class="table-dark">
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Product URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.prodID">
            <td>{{ product.prodID }}</td>
            <td>{{ product.prodName }}</td>
            <td>R {{ product.amount }}</td>
            <td> {{ product.Category }}</td>
            <td>
              <a :href="product.prodURL" target="_blank">
                <img :src="product.prodURL" alt="Product Image" width="50">
              </a>
            </td>
            <td>
              <updateProduct :product="product"/>
              <button class="btn btn-danger deleteButton" @click.prevent="deleteProduct(product.prodID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import updateUser from '@/components/UpdateUser.vue';
import updateProduct from '@/components/UpdateProduct.vue';
import addProduct from '@/components/AddProduct.vue';
import addUser from '@/components/AddUser.vue';
import SpinnerComp from '@/components/SpinnerComp.vue';

export default {
  components: {
    NavBar,
    updateUser,
    updateProduct,
    addProduct,
    addUser,
    SpinnerComp,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    users() {
      return this.$store.state.users;
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        await Promise.all([
          this.$store.dispatch('fetchProducts'),
          this.$store.dispatch('fetchUsers')
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false; // Hide spinner when data is loaded
      }
    },
    deleteUser(userID) {
      this.$store.dispatch('deleteUser', userID);
    },
    deleteProduct(prodID) {
      this.$store.dispatch('deleteProduct', prodID);
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
    updateProduct(product) {
      let editProduct = {
        productID: product.prodID,
        productName: product.prodName,
        amount: product.amount,
        category: product.category,
        prodURL: product.prodURL,
      };
      this.$store.dispatch('updateProduct', { id: product.prodID, data: editProduct });
    }
  }
}
</script>

<style scoped>
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

/* Responsive Styles for Users Table */
@media (max-width: 768px) {
  .users-table {
    width: 100%;
    border-collapse: collapse;
  }
  .users-table thead {
    display: none;
  }
  .users-table tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }
  .users-table td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    padding: 10px;
    position: relative;
  }
  .users-table td:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
  .users-table td:last-child {
    border-bottom: 0;
  }
  .users-table td:nth-child(1):before {
    content: "User ID";
  }
  .users-table td:nth-child(2):before {
    content: "First Name";
  }
  .users-table td:nth-child(3):before {
    content: "Last Name";
  }
  .users-table td:nth-child(4):before {
    content: "User Age";
  }
  .users-table td:nth-child(5):before {
    content: "Gender";
  }
  .users-table td:nth-child(6):before {
    content: "User Role";
  }
  .users-table td:nth-child(7):before {
    content: "Email Address";
  }
  .users-table td:nth-child(8):before {
    content: "User Profile";
  }
  .users-table td:nth-child(9):before {
    content: "Action";
  }
}

/* Responsive Styles for Products Table */
@media (max-width: 768px) {
  .products-table {
    width: 100%;
    border-collapse: collapse;
  }
  .products-table thead {
    display: none;
  }
  .products-table tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }
  .products-table td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    padding: 10px;
    position: relative;
  }
  .products-table td:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
  .products-table td:last-child {
    border-bottom: 0;
  }
  .products-table td:nth-child(1):before {
    content: "Product ID";
  }
  .products-table td:nth-child(2):before {
    content: "Product Name";
  }
  .products-table td:nth-child(3):before {
    content: "Amount";
  }
  .products-table td:nth-child(4):before {
    content: "Category";
  }
  .products-table td:nth-child(5):before {
    content: "Product URL";
  }
  .products-table td:nth-child(6):before {
    content: "Action";
  }
}
</style>
