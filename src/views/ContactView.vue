<template>
  <NavBar/> 
  <div class="container-fluid contactback">
    <div class="row">
      <h1>Contact Us</h1>
      <p class="intro-text">
        We're here to help you with any inquiries or assistance you may need. Whether you have a question about our gemstones, need help with your order, or just want to learn more about Luminous Gems, our team is ready to assist you. Feel free to reach out to us using any of the methods below.
      </p>
    </div>

    <div class="row contact-row">
  <div class="row form-row">
      <div class="contact-form">
        <h3>Send Us a Message</h3>
        <form action="/submit-contact-form" method="post">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>

          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>

          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" required>

          <label for="message">Message</label>
          <textarea id="message" name="message" rows="6" required></textarea>

          <button type="submit">Send Message</button>
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
.contactback{
  background-image: url('https://anushqakandan.github.io/Capstone_images/login6.jpg');
    background-size: cover; 
    background-repeat: no-repeat;
    background-position: center; 
    /* height: 85vh;
    margin-top: 0.5rem; */
}

  .container {
    padding: 20px;
  }

  h1 {
    text-align: center;
    margin-top: 0;
    color: #800000;
  }

  .intro-text {
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.2em;
    color: #555;
  }

  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .contact-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
  }


  h3 {
    color: #800000;
    margin-bottom: 10px;
    text-align: center;
  }

  a {
    color: #fff;
    text-decoration: underline;
  }

  .form-row {
    justify-content: center;
  }


  .contact-form {
    border: 1px solid black;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    border-radius: 8px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
    backdrop-filter: blur(3px); /* Apply the blur effect */
    -webkit-backdrop-filter: blur(10px); /* Support for Safari */
}

.intro-text{
  color: white;
}


  label {
    display: block;
    margin-bottom: 5px;
    color: black;
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 4px;
  }

  /* button {
    width: 100%;
    padding: 10px;
    background-color: #800000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  } */

  button {
  width: 10em;
  position: relative;
  height: 3.5em;
  border: 3px ridge #149CEA;
  outline: none;
  background-color: transparent;
  color: black;
  transition: 1s;
  border-radius: 0.3em;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
  
button::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 3%;
  width: 95%;
  height: 40%;
  /* background-color: #212121; */
  transition: 0.5s;
  transform-origin: center;
}

button::before {
  content: "";
  transform-origin: center;
  position: absolute;
  top: 80%;
  left: 3%;
  width: 95%;
  height: 40%;
  /* background-color: #212121; */
  transition: 0.5s;
}

button:hover::before, button:hover::after {
  transform: scale(0)
}

button:hover {
  box-shadow: inset 0px 0px 25px #1479EA;
}

  /* button:hover {
    background-color: #990000;
  } */

  @media screen and (max-width: 768px) {
    .contact-row {
      flex-direction: column;
    }

  
  }
</style>
