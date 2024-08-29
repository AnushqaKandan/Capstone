<template>
  <div class="container">
    <div class="backdrop">
 <div class="row">
      <h2 class="display-2">Luminous Gems</h2>
    </div>
    <div class="row">
      <h4 class="display-4">Sparkle Your World, One Gem at a Time</h4>
    </div>
    </div>
   
  
  
  <section class="service">
    <div class="row mt-5 meh">
      <div class="col-3">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-3">
            <i class="bi bi-truck"></i>
          </div>
          <div class="col-5">
            <h5><b>Free shipping</b></h5>
            <p>Free Shipping On All Orders</p>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <div class="col-3">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-3">
            <i class="bi bi-check2-square"></i>
          </div>
          <div class="col-5">
            <h5><b>Money Guarantee</b></h5>
            <p>30 Day Money Back</p>
          </div>
          <div class="col-1"></div>
        </div>
        
      </div>
      <div class="col-3">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-3">
            <i class="bi bi-headset"></i>
          </div>
          <div class="col-5">
            <h5><b>Online Support 24/7</b></h5>
            <p>Technical Support 24/7</p>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <div class="col-3">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-3">
            <i class="bi bi-wallet2"></i>
          </div>
          <div class="col-5">
            <h5><b>Secure Payment</b></h5>
            <p>AI Cash Accepted</p>
          </div>
          <div class="col-1"></div>
        </div>
       
      </div>
    </div>
  </section>

    <h2>Recent Products</h2>
    <div class="row gap-2 justify-content-center" v-if="recentProducts">
      <Card v-for="product in recentProducts" :key="product.prodID">
        <template #cardHeader>
          <img :src="product.prodURL" loading="lazy" class="img-fluid" :alt="product.prodName">
        </template>
        <template #cardBody>
          <h5 class="card-title fw-bold">{{ product.prodName }}</h5>
          <p class="lead"><span class="text-success fw-bold">Amount</span>: R{{ product.amount }}</p>
        </template>
      </Card>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Spinner from '@/components/Spinner.vue'
export default {
  name: 'HomeView',
  components: {
    Card,
    Spinner
  },
  computed: {
    recentProducts() {
      return this.$store.state.recentProducts
    }
  },
  mounted() {
    this.$store.dispatch('recentProducts')
  }
}
</script>

<style scoped>
.backdrop { 
background-image: url('https://anushqakandan.github.io/Capstone_images/Main3.webp');
    background-size: cover; 
    background-repeat: no-repeat; 
    height: 85vh;
}

@media only screen and (max-width: 767px) {
    .backdrop {
        background-position: center; /* Adjust to display a different part for mobile view */
    }
}

.display-2 {
color: white;
}

.display-4{
  color: goldenrod;
  margin-top: 28rem;
}
.service{
    display:flex;
    justify-content: center;
  }
  .service h5{
    font-size:15px;
  }
  .service p{
    font-size:14px;
  }
  .service i{
    font-size:30px;
  }
  .service .meh{
    width:90vw;
  }

</style>