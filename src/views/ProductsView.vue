<template>
    <NavBar/> 
    <div class="container">
        <div class="row">
            <h2 class="display-2">Products</h2>
        </div>
        <div class="row mb-3">
            <div class="col-md-6 mb-2">
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    class="form-control" 
                    placeholder="Search products..." 
                />
            </div>
            <div class="col-md-6 mb-2">
                <select 
                    v-model="selectedCategory" 
                    class="form-select"
                >
                    <option value="">All Categories</option>
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row gap-2 justify-content-center my-2" v-if="filteredProducts.length">
            <Card v-for="product in filteredProducts" :key="product.prodID" class="products">
                <template #cardHeader>
                    <img :src="product.prodURL" loading="lazy" class="img-fluid" :alt="product.prodName">
                </template>
                <template #cardBody>
                    <h5 class="card-title fw-bold">{{ product.prodName }}</h5>
                    <p class="lead"><span class="text-success fw-bold">Amount</span>: R{{ product.amount }}</p>
                    <div class="button-wrapper d-md-flex d-block justify-content-between">
                        <router-link :to="{ name: 'products', params: { id: product.prodID } }">
                            <button class="btn btn-success">View</button>
                        </router-link>
                        <!-- Add to Cart Button -->
                        <button class="btn btn-dark" @click="addToCart(product)">Cart</button>
                    </div>
                </template>
            </Card>
        </div>
        <div v-else>
            <Spinner />
        </div>
    </div>
</template>


<script setup>
import NavBar from '@/components/NavBar.vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import Spinner from '@/components/SpinnerComp.vue'
import Card from '@/components/CardComp.vue'

const store = useStore()
const products = computed(() => store.state.products || [])
const searchQuery = ref('')
const selectedCategory = ref('')

// Extract unique categories from products
const categories = computed(() => {
    if (!products.value.length) return ['blue', 'purple', 'green', 'red']
    const allCategories = products.value.map(product => product.Category) // Use the backend field name
    return [...new Set(allCategories)] // Remove duplicates
})

// Filter products based on search query and selected category
// Filter products based on search query and selected category
const filteredProducts = computed(() => {
    if (!products.value.length) return [];
    return products.value
        .filter(product => {
            const matchesSearch = product.prodName.toLowerCase().includes(searchQuery.value.toLowerCase());
            const matchesCategory = selectedCategory.value ? product.Category === selectedCategory.value : true;
            return matchesSearch && matchesCategory;
        });
});


onMounted(() => {
    store.dispatch('fetchProducts')
})

// Method to handle adding a product to the cart
const addToCart = (product) => {
    const cartItem = {
        ...product,
        quantity: 1, // Set initial quantity to 1
    }
    store.dispatch('addToCart', cartItem)
}
</script>


<style scoped>
.products {
    border: 1px solid black;
}
</style>
