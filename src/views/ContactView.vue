<template>
  <NavBar/>
  <div class="container-fluid contactback">
    <div class="d-flex justify-content-center align-items-center contact-container">
      <div class="contact-row">
        <!-- Contact Info Card -->
         <div class="info-wrapper">
        <div class="contact-card">
          <h3>Contact Information</h3>
          <p class="intro-text">
        We're here to help you with any inquiries or assistance you may need. Whether you have a question about our gemstones, need help with your order, or just want to learn more about Luminous Gems, our team is ready to assist you. Feel free to reach out to us using any of the methods below.
      </p>
          <div class="contact-info">
            <p>
              <i class="bi bi-telephone-forward-fill"></i> Phone: 061-369-9241
            </p>
            <p>
              <i class="bi bi-envelope"></i> Email: anushqakandan03@gmail.com
            </p>
            <p>
              <i class="bi bi-geo-alt-fill"></i> Address: Mitchells Plain, Cape Town
            </p>
          </div>
          <div class="social-icons">
            <i class="bi bi-instagram"></i>
            <i class="bi bi-facebook"></i>
            <i class="bi bi-twitter"></i>
          </div>
        </div>
      </div>

        <!-- Message Form Card -->
        <div class="contact-card">
          <h3>Send Us a Message</h3>
          <form action="/submit-contact-form" method="post">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Message</label>
            <textarea id="message" name="message" rows="6" required></textarea>

            <button type="submit" class="btn">Send Message</button>
            <button type="reset" class="btn">Clear</button>
          </form>
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
@import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');

.contactback {
  background-image: url('https://anushqakandan.github.io/Capstone_images/Contact7.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.contact-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px; /* Adds space between the cards */
  max-width: 1000px; /* Limits the total width */
}
/* .info{
   
} */

.info-wrapper {
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically */
  margin-top: 5rem;
}
.contact-card {
  border: 1px solid black;
  width: 30rem;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: black;
  text-align: center;
}

.contact-info p, .social-icons i {
  margin-bottom: 10px;
}

.social-icons i {
  font-size: 2rem;
  padding-right: 1rem;
}

h3 {
  margin-bottom: 10px;
  color: black;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 7px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
}

button {
  width: 9rem;
  /* height: 3rem; */
  border: 3px ridge #b91ee3;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 1s;
  border-radius: 0.3em;
}

button:hover {
  box-shadow: inset 0px 0px 25px #f120e0;
}

/* @media screen and (max-width: 768px) {
  .contact-row {
    flex-direction: column;
    align-items: center;
  }
} */

@media screen and (max-width: 1218px) {
  .contact-row {
    flex-direction: column; /* Stack cards vertically */
    align-items: center;
    gap: 20px; /* Space between stacked cards */
  }

  .info-wrapper {
    margin-top: 0; /* Remove top margin for stacked layout */
  }

  .contact-card{
    width: 90%;
  }
}

</style>
