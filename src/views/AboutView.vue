<template>
  <div class="container">
    <div class="row">
     <h1>About</h1>  
    </div>

    <div class="card cardAbout">
     <div class="col"> 
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
     <div class="col"> 
      <h3>Our Story</h3>
        <p>
          Founded out of a deep passion for the natural beauty of gemstones, Luminious Gems began as a small, family-owned venture with a dream to share the world's most stunning stones with others. What started as a personal collection grew into a thriving business, driven by our love for unique, high-quality gems and a commitment to excellence. Over the years, we've expanded our reach, yet our core values remain the same: authenticity, integrity, and a dedication to our customers. Every gemstone we offer reflects our journey and the beauty we've discovered along the way.
        </p>
      </div>
</div>

    <div class="card cardAbout2">
     <div class="col"> 
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
</script>

<style scoped>
  .container {
    padding: 20px;
  }

  /* h1 {
    text-align: center;
    margin-top: 0;
    color: #800000;
  } */

  .cardAbout, .cardAbout2 {
    background-color: #f57c6c;
    padding: 20px;
    margin: 15px 0;
    border-radius: 8px;
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
    color: #800000;
    text-align: center;
  }

  .Image {
    text-align: center;
    margin: 20px 0;
  }

  .img-about {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  @media screen and (max-width: 768px) {
    .cardAbout2 {
      max-width: 100%;
      margin: 10px 0;
    }
  }
</style>

