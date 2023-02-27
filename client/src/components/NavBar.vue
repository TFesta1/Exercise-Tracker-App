<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    // Ctrl-Space after the word, import RouterLink Vue

    const isMenuActive = false;
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation" style="background-color: rgba(0, 209, 178, 1);">
        <div class="container">
        
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="22" height="22" />

                </a>
        
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" :class="{ 'is-active': isMenuActive }" @click="isMenuActive = !isMenuActive" >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        
            <div id="navbarBasicExample" class="navbar-menu"  :class="{ 'is-active': isMenuActive }">
                <div class="navbar-start">
                    <a class="navbar-item">
                        Home
                    </a>

                    <RouterLink to="/" class="navbar-item">Home</RouterLink>
                    <RouterLink to="/about" class="navbar-item">About</RouterLink>
        
                    <a class="navbar-item">
                        Documentation
                    </a>
        
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>
        
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>
        
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <!-- <i class="fa fa-download has-text-white" style="font-size:20px;"  aria-hidden="true">Download</i> -->

                            <a class="button is-primary mr-3" href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip">
                                <span class="icon is-hidden-touch is-hidden-desktop-only">
                                    <i class="fa fa-download"></i>
                                </span>
                                <span>Download</span>
                            </a>
                            
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>