<template> 
  <NavBar/> 
  <div class="container-fluid">
    <h1 class="display-3">Checkout</h1>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="cartItems.length">
        <tr v-for="item in cartItems" :key="item.cartID">
          <td>{{ item.prodName }}</td>
          <td>{{ item.category }}</td>
          <td><img :src="item.prodURL" alt="Product Image" /></td>
          <td>R{{ (item.amount * item.quantity).toFixed(2) }}</td>
          <td>
            <input 
              type="number" 
              v-model="item.quantity" 
              @change="updateQuantity(item)" 
              min="1" 
              step="1"
            />
          </td>
          <td>
            <button @click="removeFromCart(item.prodID)" class="btn btn-danger Removebtn">Remove</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="5">
            Total: R{{ cartItems.reduce((total, item) => total + (item.amount * item.quantity), 0).toFixed(2) }}
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="button-group">
      <button @click="clearCart" class="btn btn-danger">Clear Cart</button>
      <button @click="payNow" class="btn btn-dark">Pay Now</button>
    </div>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import { mapState, mapActions } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import { toast } from 'vue3-toastify';

const { cookies } = useCookies();

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapState({
      cartItems: state => state.cartItems,
    })
  },
  methods: {
    ...mapActions([
      'fetchCartItems', 
      'clearCart', 
      'removeFromCart', 
      'updateCartItemQuantity',
      'payNow'
    ]),
    
    async fetchCartItems() {
      try {
        const userID = cookies.get('LegitUser')?.user?.userID;
        if (userID) {
          await this.$store.dispatch('fetchCartItems', userID);
        } else {
          throw new Error('User ID not found.');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },

    async removeFromCart(prodID) {
      try {
        const userID = cookies.get('LegitUser')?.user?.userID;
        if (!userID) {
          throw new Error('User ID not found.');
        }
        await this.$store.dispatch('removeFromCart', { prodID, userID });
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    },

    async updateQuantity(item) {
      try {
        if (!this.validateQuantity(item.quantity)) {
          toast.error('Quantity must be a positive integer.', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          });
          return;
        }
        const userID = cookies.get('LegitUser')?.user?.userID;
        if (!userID) {
          throw new Error('User ID not found.');
        }
        await this.$store.dispatch('updateCartItemQuantity', { prodID: item.prodID, quantity: item.quantity, userID });
        toast.success('Quantity updated successfully.', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      } catch (error) {
        toast.error('Unable to update quantity.', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        });
        console.error('Error updating quantity:', error);
      }
    },

    validateQuantity(quantity) {
      return Number.isInteger(quantity) && quantity > 0;
    },

    async clearCart() {
      try {
        const userID = cookies.get('LegitUser')?.user?.userID;
        if (!userID) {
          throw new Error('User ID not found.');
        }
        await this.$store.dispatch('clearCart', userID);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    },

    async payNow() {
      try {
        // Check if the cart is empty
        const cartItems = this.cartItems; 
        if (cartItems.length === 0) {
          toast.info('Your cart is empty. Add items to the cart before proceeding with payment.', {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_CENTER
          });
          return; 
        }
        // Proceed with the payment
        await this.$store.dispatch('payNow');
        toast.success('Successful, thank you for your purchase!', {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER
        });
      } catch (error) {
        toast.error('Payment failed. Please try again.', {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER
        });
        console.error('Payment error:', error);
      }
    }
  },
  
  created() {
    this.fetchCartItems();
  }
}
</script>


<style scoped>

.Removebtn{
  color: white;
  background-color: maroon;
}
.btn{
  color: white;
  background-color: maroon;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* Adjust the gap as needed */
  margin-bottom: 1rem;
}
.container-fluid{
  background: rgb(222, 138, 152);
}
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
img {
  width: 100px; 
  height: auto; 
  object-fit: contain; 
}
input[type="number"] {
  width: 100px; 
}
.total-row {
  font-weight: bold; 
}

/* Responsive Styles for Checkout Page */
@media (max-width: 992px) {
  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    display: none;
  }

  tbody {
    display: block;
    width: 100%;
  }

  tfoot {
    display: block;
    width: 100%;
  }

  tr {
    display: block;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }

  td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    padding: 10px;
    position: relative;
  }

  td:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }

  td:last-child {
    border-bottom: 0;
  }

  /* Add labels for each column */
  td:nth-child(1):before {
    content: "Product Name";
  }

  td:nth-child(2):before {
    content: "Category";
  }

  td:nth-child(3):before {
    content: "Product";
  }

  td:nth-child(4):before {
    content: "Price";
  }

  td:nth-child(5):before {
    content: "Quantity";
  }

  td:nth-child(6):before {
    content: "Action";
  }

  /* Ensure no labels for the total row */
  .total-row td {
    display: block;
    text-align: left;
    font-size: 13px;
    border-bottom: 0;
    padding: 10px;
    position: relative;
  }

  .total-row td:before {
    content: none;
  }

  
}


</style>
