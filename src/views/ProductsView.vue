<template>
    <NavBar/> 
    <div class="container">
        <div class="row">
            <h1 class="display-3">Products</h1>
        </div>
        <div class="row mb-3">
            <div class="col-md-4 mb-2">
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    class="form-control" 
                    placeholder="Search products..." 
                />
            </div>
            <div class="col-md-4 mb-2">
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
            <div class="col-md-4 mb-2">
                <select 
                    v-model="sortOrder" 
                    class="form-select"
                >
                    <option value="default">Sort by</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
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
                     <p class="lead"><span class="fw-bold amounty">Amount</span>: R{{ product.amount }}</p>
                    <div class="button-wrapper d-md-flex d-block justify-content-between">
                        
                        <router-link :to="{ name: 'product', params: { id: product.prodID } }">
                            <button class="btn btn-dark">View Product</button>
                        </router-link>
                       
                        <!-- Add to Cart Button -->
                        <button class="btn btn-dark" @click="addToCart(product)">Add to Cart</button>
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
const sortOrder = ref('default') // New ref for sorting order

// Extract unique categories from products
const categories = computed(() => {
    if (!products.value.length) return ['blue', 'purple', 'green', 'red']
    const allCategories = products.value.map(product => product.Category) // Use the backend field name
    return [...new Set(allCategories)] // Remove duplicates
})

// Filter and sort products based on search query, selected category, and sort order
const filteredProducts = computed(() => {
    let filtered = products.value
        .filter(product => {
            const matchesSearch = product.prodName.toLowerCase().includes(searchQuery.value.toLowerCase())
            const matchesCategory = selectedCategory.value ? product.Category === selectedCategory.value : true
            return matchesSearch && matchesCategory
        })
    
    // Apply sorting logic
    if (sortOrder.value === 'low-to-high') {
        filtered = filtered.sort((a, b) => a.amount - b.amount)
    } else if (sortOrder.value === 'high-to-low') {
        filtered = filtered.sort((a, b) => b.amount - a.amount)
    }

    return filtered
})



onMounted(() => {
    store.dispatch('fetchProducts')
    // console.log(this.products);
})

// Method to handle adding a product to the cart
const addToCart = (product) => {
    const cartItem = {
        ...product,
         quantity: 1,
    }
    store.dispatch('addToCart', cartItem)
}

</script>

<style scoped>
.btn{
  color: white;
  background-color: maroon;
}
.amounty{
    color: goldenrod
}
.card {
  max-width: 350px;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1; /* This ensures the card body takes up remaining space */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-wrapper {
  margin-top: 1rem; 
}

.btn {
  color: white;
  background-color: maroon;
}

</style>