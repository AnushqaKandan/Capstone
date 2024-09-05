import { createStore } from 'vuex';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import "vue3-toastify/dist/index.css";
import router from '@/router';
import { applyToken } from '@/service/AuthenticatedUser.js';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const apiURL = 'https://capstone-w1vm.onrender.com/';

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
   cart: {
      items: []
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    cartItems: state => state.cart.items,
    userRole: state => state.userRole,
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
      state.cart.items = items;
    },
    addToCart(state, item) {
      const existingItem = state.cart.items.find(i => i.prodID === item.prodID);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push(item);
      }
    },
    removeFromCart(state, prodID) {
      const index = state.cart.items.findIndex(item => item.prodID === prodID);
      if (index !== -1) {
        state.cart.items.splice(index, 1);
      }
    },
    updateCartItemQuantity(state, { prodID, quantity }) {
      const item = state.cart.items.find(i => i.prodID === prodID);
      if (item) {
        item.quantity = quantity;
      }
    },
    // setAuthenticated(state, status) {
    //   state.isAuthenticated = status;
    // },
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
        commit('setUsers', result);
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
     async login({ commit }, payload) {
      try {
        console.log(payload)
        const { err, user, token } = await (await axios.post(`${apiURL}users/login`, payload)).data;
        if (user) {
          commit('setUser', user);
          commit('setToken', token);
          commit('setUserRole', user.userRole);
          applyToken(token)
          // Store token and user role in cookies
          cookies.set('LegitUser', { token, user });
          console.log(user)
          console.log(token);
          
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
    router.push('/login');
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
        const { results } = await (await axios.get(`${apiURL}products`)).data;
        if (results) {
          context.commit('setProducts', results);
        } else {
          router.push({ name: 'login' });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
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
  async fetchCartItems({ commit, state }) {
    try {
      const { data } = await axios.get(`${apiURL}cart/${state.user.userID}`);
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
      const { msg } = await axios.post(`${apiURL}cart/${state.user.userID}`, payload);
      if (msg) {
        commit('addToCart', payload);
        toast.success(`${msg}`, {
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

  async removeFromCart({ commit }, prodID) {
    try {
      const { msg } = await axios.delete(`${apiURL}cart/${prodID}`);
      if (msg) {
        commit('removeFromCart', prodID);
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`Failed to remove item from cart: ${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
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
      toast.error(`Failed to update cart item quantity: ${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  async clearCart({ commit, state }) {
    try {
      const { msg } = await axios.delete(`${apiURL}cart/clear/${state.user.userID}`);
      if (msg) {
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
