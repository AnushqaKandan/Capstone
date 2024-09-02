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
    token: localStorage.getItem('token') || '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
  mutations: {
    setUsers(state, value) {
      state.users = value;
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
  },
  actions: {
    // Users
    async fetchUsers(context) {
      try {
        const { results, msg } = await (await axios.get(`${apiURL}users`)).data;
        if (results) {
          context.commit('setUsers', results);
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
    async fetchUser(context, id) {
      try {
        const { result, msg } = await (await axios.get(`${apiURL}users/${id}`)).data;
        if (result) {
          context.commit('setUser', result);
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
          // router.push({ name: 'login' });
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
      try {
        const { msg, err } = await (await axios.patch(`${apiURL}users/${payload.userID}`, payload)).data;
        if (msg) {
          context.dispatch('fetchUsers');
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
    async deleteUser(context, id) {
      try {
        const { msg, err } = await (await axios.delete(`${apiURL}users/${id}`)).data;
        if (msg) {
          context.dispatch('fetchUsers');
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
    
    // ===== LOGIN =======
    async login(context, payload) {
      try {
        const { msg, result, token } = await (await axios.post(`${apiURL}users/login`, payload)).data;

        if (result) {
          toast.success(`${msg}😎`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
          context.commit('setUser', result);
          context.commit('setToken', token); // Set token on login
          cookies.set('LegitUser', { token, msg, result });
          applyToken(token);
          router.push({ name: 'products' });
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
    async logout(context) {
      context.commit('clearToken');
      context.commit('setUser', null);
      cookies.remove('LegitUser');
      router.push({ name: 'auth-options' });
    },
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
  },
  modules: {},
});