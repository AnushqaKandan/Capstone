<template>
  <NavBar/> 
  <div class="container-fluid">
    <div class="row">
     <h1 class="display-3">About</h1>  
    </div>

    <div class="card cardAbout">
     <div class="col text-black"> 
        <p>
          Welcome to Luminous Gems, where the timeless beauty of nature's finest treasures meets expert craftsmanship. Our store is dedicated to offering a curated selection of high-quality gemstones, each chosen for its unique brilliance, color, and character. Whether you're searching for the perfect piece to commemorate a special occasion or adding to your personal collection, our gemstones promise to captivate and inspire. We pride ourselves on our commitment to quality, authenticity, and customer satisfaction, ensuring that every purchase is as extraordinary as the gems themselves. Discover the allure of gemstones with us, where each stone tells a story of beauty and elegance.
        </p>
      </div>
    </div>

   <div class="Image">
    <img src="https://anushqakandan.github.io/Capstone_images/About.gif" alt="about" class="img-about" loading="lazy">
   </div>
    
   <div class="row">  
  <div class="card cardAbout2">
     <div class="col text-black"> 
      <h3>Our Story</h3>
        <p>
          Founded out of a deep passion for the natural beauty of gemstones, Luminious Gems began as a small, family-owned venture with a dream to share the world's most stunning stones with others. What started as a personal collection grew into a thriving business, driven by our love for unique, high-quality gems and a commitment to excellence. Over the years, we've expanded our reach, yet our core values remain the same: authenticity, integrity, and a dedication to our customers. Every gemstone we offer reflects our journey and the beauty we've discovered along the way.
        </p>
      </div>
</div>

    <div class="card cardAbout2">
     <div class="col text-black"> 
      <h3>Our Vision</h3>
        <p>
          At Luminous Gems, our vision is to become the leading destination for gemstone enthusiasts, where the beauty of nature's creations is celebrated and cherished. We aim to inspire a deep appreciation for the uniqueness of each gemstone, fostering connections that transcend mere transactions. By continuously curating an exceptional collection of gems and providing unparalleled customer experiences, we aspire to set new standards in the industry, ensuring that every piece we offer becomes a cherished part of our customers' lives.
        </p>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .container-fluid {
    padding: 20px;
    /* Gradient background with rich pink tones */
    background: rgb(222, 138, 152);
    color: #fff;
    min-height: 100vh;
  }

  /* Centered h1 with light color */
  h1 {
    text-align: center;
    margin-top: 0;
    color: black;
  }

  .cardAbout, .cardAbout2 {
    background: rgba(255, 255, 255, 0.1); /* Transparent background */
    padding: 20px;
    margin: 15px 0;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(114, 6, 64, 0.7), 0 0 15px rgba(254, 28, 149, 0.7) inset; /* Glowing effect with pink */
    backdrop-filter: blur(5px); /* Blur effect for transparency */
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 -15px;
    flex-wrap: wrap;
  }

  .cardAbout2 {
    flex: 1;
    margin: 15px;
    max-width: 40%;
    margin-top: -3rem;
  }

  h3 {
    color: black; 
    text-align: center;
  }

  .Image {
    text-align: center;
    margin: 20px 0;
    width: 100%; /* Ensure container takes full width */
    overflow: hidden; /* Prevent overflow of image */
  }

  .img-about {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  @media screen and (max-width: 1204px) {
    .cardAbout2 {
      max-width: 90%;
      margin: 10px 0;
    }

    .row {
      flex-direction: column; 
      align-items: center;
    }
  }


</style>

