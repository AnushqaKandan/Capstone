<template> 
<NavBar/> 
    <div class="container">
      <h1>Checkout</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="cartItems.length">
            <td v-for="item in cartItems" :key="item.cartID"></td>
              <td>{{ item.prodName }}</td>
              <td>{{ item.category }}</td>
              <td><img :src="item.prodURL" alt="Product Image" /></td>
              <td>{{ item.quantity }}</td>
              <td>${{ item.amount.toFixed(2) }}</td>
              <td>
                <button @click="removeItem(item.prodID)" class="btn btn-danger">Remove</button>
              </td>
            </tr>
         
          <tr v-if="!cartItems.length">
            <td colspan="7" class="text-center">Your cart is empty.</td>
          </tr>
        </tbody>
      </table>
      <button @click="clearCart" class="btn btn-secondary">Clear Cart</button>
      <button @click="payNow" class="btn btn-primary">Pay Now</button>
    </div>

</template>


<script>
import { mapState, mapActions } from 'vuex';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapState({
      cartItems: state => state.cart.items,
      userId: state => state.auth.userId
    })
  },
  methods: {
    ...mapActions(['fetchCartItems', 'clearCart', 'removeItem', 'payNow']),
    async fetchCartItems() {
      try {
        const response = await this.$axios.get(`/api/cart/${this.userId}`);
        if (response.status === 200) {
          this.$store.commit('setCartItems', response.data.results);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  },
  created() {
    this.fetchCartItems();
  }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}
th, td {
    border: 1px solid black;
    padding: 10px;
    text-align: left;
    background-color: white;
}
th {
    background-color: #f2f2f2;
    }
</style>
