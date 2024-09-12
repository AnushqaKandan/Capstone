<template>
  <NavBar/> 
 
  <div class="container-fluid">
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
            <h5>Free shipping</h5>
            <p>Free Shipping On All Orders over R20 000</p>
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
            <h5>Money Guarantee</h5>
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
            <h5>Online Support 24/7</h5>
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
            <h5>Secure Payment</h5>
            <p>All payment methods accepted</p>
          </div>
          <div class="col-1"></div>
        </div>
       
      </div>
    </div>
  </section>

    <h1>Recent Products</h1>
    <div class="row gap-2 justify-content-center" v-if="recentProducts">
      <Card v-for="product in recentProducts" :key="product.prodID" class="products">
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
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/CardComp.vue'
import Spinner from '@/components/SpinnerComp.vue'
export default {
  name: 'HomeView',
  components: {
    Card,
    Spinner,
    NavBar,
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
@import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');

.backdrop { 
background-image: url('https://anushqakandan.github.io/Capstone_images/Main3.webp');
    background-size: cover; 
    background-repeat: no-repeat; 
    height: 85vh;
    margin-top: 0.5rem;
}

@media only screen and (max-width: 767px) {
    .backdrop {
        background-position: center; 
    }
}

.display-2 {
color: white;
font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.display-4{
  color: goldenrod;
  margin-top: 2rem;
  font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
  
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
  .products{
    border: 1px solid black;
    margin-bottom: 1rem;
}

/* Responsive centering for smaller screens */
@media only screen and (max-width: 992px) {
  .meh .col-3 {
    flex: 0 0 50%; /* Take up 50% of the container width */
    max-width: 50%; /* Limit the maximum width to 50% */
  }
}

@media only screen and (max-width: 576px) {
  .meh .col-3 {
    flex: 0 0 100%; /* Take up 100% of the container width */
    max-width: 100%; /* Limit the maximum width to 100% */
  }
  
  /* Center content and force vertical layout on smaller screens */
  .meh .row > div {
    display: flex;
    flex-direction: column; /* Stack icon and text vertically */
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .meh .col-3 .row {
    flex-direction: column; /* Ensure icons and text stack vertically */
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

</style>