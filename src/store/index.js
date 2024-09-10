import { createStore } from 'vuex';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import router from '@/router';
import { applyToken } from '@/service/AuthenticatedUser.js';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const apiURL = 'http://localhost:3005/';

applyToken(cookies.get('LegitUser')?.token)
export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    recentProducts: null,
    product: null,
    isAuthenticated: false,
    userRole: null,
    token: localStorage.getItem('token') || '',
   cartItems: [],

  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userRole: state => state.userRole,
    cartItems: state => state.cartItems,
    cartTotal: state => {
    return state.cartItems.reduce((total, item) => {
      return total + (item.quantity * item.amount);
    }, 0).toFixed(2);
  }
  },
  mutations: {
    setUsers(state, value) {
      state.users = value;
      state.isAuthenticated = true;
    },
    setUser(state, value) {
      state.user = value;
    },
    setProducts(state, value) {
      state.products = value;
    },
    setRecentProducts(state, value) {
      state.recentProducts = value;
    },
    setProduct(state, value) {
      state.product = value;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    setCartItems(state, items) {
      state.cartItems = items;
    },
    addToCart(state, item) {
      const existingItem = state.cartItems.find(cartItem => cartItem.prodID === item.prodID);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({...item, quantity: 1});
      }
    },
    removeFromCart(state, { userID, prodID }) {
      state.cartItems = state.cartItems.filter(item => item.prodID !== prodID || item.userID !== userID);
    },
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userRole = null;
    },
  },
  actions: {
    // Users
    async fetchUsers({ commit }) {
      try {
        let { result } = await (await axios.get(`${apiURL}users`)).data;
        if(result){
          commit('setUsers', result);
        }
      } catch (error) {
        toast?.error(`Failed to fetch users: ${error.message}`, { autoClose: 2000 });
      }
    },

    async fetchUser({ commit }, userId) {
      try {
        let { data } = await axios.get(`${apiURL}users/${userId}`);
        commit('setUser', data.results);
      } catch (error) {
        toast?.error(`Failed to fetch user: ${error.message}`, { autoClose: 2000 });
      }
    },

    async register(context, payload) {
      try {
        const { msg, err, token } = await (await axios.post(`${apiURL}users/register`, payload)).data;
        if (token) {
          context.dispatch('fetchUsers');
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
          context.commit('setToken', token); // Set token on register
          cookies.set('LegitUser', { token, msg });
          applyToken(token);
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async updateUser(context, payload) {
      console.log(payload.data);
      try {
        const { msg, err } = await (await axios.patch(`${apiURL}users/${payload.id}`, payload.data)).data
        if (msg) {
          context.dispatch('fetchUsers')
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast?.error(`${e.msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },

    
    async deleteUser(context, id) {
      try {
        const { msg } = await (await axios.delete(`${apiURL}users/${id}`)).data
        if (msg) {
          context.dispatch('fetchUsers')
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast?.error(`Unable to delete a user`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },

  // ===== LOGIN =======
  // Login and Token Management
async login({ commit }, payload) {
  try {
    const { err, user, token } = await (await axios.post(`${apiURL}users/login`, payload)).data;
    if (user) {
      commit('setUser', user);
      commit('setToken', token);
      commit('setUserRole', user.userRole);
      commit('setAuthenticated', true); 
      applyToken(token);
     
      // Store token and user in cookies
      cookies.set('LegitUser', { token, user });

      // Redirect based on user role
      router.push(user.userRole === 'Admin' ? { name: 'admin' } : { name: 'home' });
    } else {
      toast.error(`${err}`, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
    }
  } catch (e) {
    toast.error(`${e.message}`, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
  }
},

  
  logout({ commit }) {
    commit('logout');
    cookies.remove('LegitUser');
    router.push('/');
  },
      
// logout({ commit }) {
//   commit('setAuthenticated', false);
//   commit('setUserRole', null);
// },
    // async logout(context) {
    //   context.commit('clearToken');
    //   context.commit('setUser', null);
    //   cookies.remove('LegitUser');
    //   router.push({ name: 'auth-options' });
    // },

    // ==== Product =====
    async fetchProducts(context) {
      try {
        const { results, msg } = await (await axios.get(`${apiURL}products`)).data;
        console.log(results);
        
        if (results) {
          context.commit('setProducts', results);
        } else {
          toast.error(`${msg}`, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
        }
      } catch (e) {
        toast.error(`${e.message}`, { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
      }
    },
    

    async recentProducts(context) {
      try {
        const { results, msg } = await (await axios.get(`${apiURL}products/recent`)).data;
        if (results) {
          context.commit('setRecentProducts', results);
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchProduct(context, id) {
      try {
        const { result, msg } = await (await axios.get(`${apiURL}products/${id}`)).data;
        if (result) {
          context.commit('setProduct', result);
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addProduct(context, payload) {
      try {
        const { msg } = await (await axios.post(`${apiURL}products/add`, payload)).data;
        if (msg) {
          context.dispatch('fetchProducts');
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async updateProduct(context, payload) {
      try {
        const { msg, err } = await (await axios.patch(`${apiURL}products/${payload.prodID}`, payload)).data;
        if (msg) {
          context.dispatch('fetchProducts');
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(err, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(e.message, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async deleteProduct(context, id) {
      try {
        const { msg } = await (await axios.delete(`${apiURL}products/${id}`)).data;
        if (msg) {
          context.dispatch('fetchProducts');
          toast.success(msg, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error('Unable to delete a product', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

  // ==== Cart =====
  async fetchCartItems({ commit }, userID) {
    try {
      const { data } = await axios.get(`${apiURL}cart/${userID}`);
      commit('setCartItems', data.results);
    } catch (e) {
      toast.error(`Failed to fetch cart items: ${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async addToCart({ commit, state }, payload) {
    try {
        const response = await axios.post(`${apiURL}cart/addToCart`, {
            prodID: payload.prodID,
            userID: state.user.userID, 
        });
        if (response.data.msg) {
            commit('addToCart', payload);
            toast.success(response.data.msg, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    } catch (e) {
        toast.error(`Failed to add item to cart: ${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }
},

async removeFromCart({ dispatch }, { prodID, userID }) {
  try {
    const { msg } = await (await axios.delete(`${apiURL}cart/${userID}/${prodID}`)).data;
    if (msg) {
      // Fetch updated cart items after removal
      await dispatch('fetchCartItems', userID);
      toast.success(msg, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  } catch (e) {
    toast.error('Unable to remove item from cart', {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_CENTER
    });
    console.error('Error removing item from cart:', e);
  }
},

  async updateCartItemQuantity({ commit }, payload) {
    try {
      const { msg } = await axios.patch(`${apiURL}cart/${payload.prodID}`, { quantity: payload.quantity });
      if (msg) {
        commit('updateCartItemQuantity', payload);
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async clearCart({ commit, state }) {
    try {
      // Make a DELETE request to clear the cart for the current user
      const { msg } = await axios.delete(`${apiURL}cart/${state.user.userID}`);
      
      if (msg) {
        // If successful, clear the cart items in the state
        commit('setCartItems', []);
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`Failed to clear cart: ${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  },
  modules: {},
});
