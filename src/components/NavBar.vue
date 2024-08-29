<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div class="container-fluid" id="navbar">
            <!-- <router-link class="navbar-brand" to="/">
                <img src="https://anushqakandan.github.io/Capstone_images/logo.jpg" loading="lazy" alt="logo">
            </router-link> -->
            <router-link class="navbar-brand" to="/">
          <img src="https://anushqakandan.github.io/Capstone_images/logo.jpg" alt="logo" class="img-thumbnail" loading="lazy"/> 
        </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/checkout">Checkout</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin">Admin</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">Contact Info</router-link>
                    </li>
                    <!-- <ul class="userAccount navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/logout">Logout</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/signup">Register</router-link>
                        </li>
                    </ul> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    
}
</script>