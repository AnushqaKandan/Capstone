<template>
    <NavBar/> 
    <div class="container">
        <div class="row">
            <h2 class="display-2">Products</h2>
        </div>
        <div class="row gap-2 justify-content-center my-2" v-if="products">
            <Card v-for="product in products" :key="product.prodID" class="products">
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
                        <button class="btn btn-dark">Cart</button>
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
import { computed, onMounted } from 'vue'
import Spinner from '@/components/SpinnerComp.vue'
import Card from '@/components/CardComp.vue'
const store = useStore()
const products = computed(
    () => store.state.products
)
onMounted(() => {
    store.dispatch('fetchProducts')
}) 
</script>

<style scoped>
.products{
    border: 1px solid black;
}

</style>