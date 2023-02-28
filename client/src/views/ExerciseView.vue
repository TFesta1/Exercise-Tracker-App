<script setup lang="ts">

</script>

<template>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="exerciseStyle.css">
        

        <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/> -->
        <!-- jQuery -->
        <!-- <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script> -->
        <title>Exercise Tracker</title>
    </head>
    <body>
        
        <section id="menu">
            <div class="logo">
                <!-- Adding the logo -->
                <img src="images/logo.png" alt="logo">
                <h2 class="dynamic">Dashboard</h2>

            </div>
            

            <div class="items">
                <ul>
                    <li><i class="fas fa-pie-chart" aria-hidden="true"><a href="#">Dashboard</a></i></li>
                    <li><i class="fas fa-user" aria-hidden="true"><a href="#">Statistics</a></i></li>
                    <li><i class="fas fa-id-badge" aria-hidden="true"><a href="#">Friends Activity</a></i></li>
                    <li><i class="fas fa-filter" aria-hidden="true"><a href="#">People Search</a></i></li>
                    <li><i class="fas fa-lock" aria-hidden="true"><a href="#">Admin</a></i></li>

                </ul>
                
                <!-- Font awesome icon for friends activity -->



                

            </div>
        </section>

        <section id="interface">
            <div class="navigation">
                <div class="n1" style="">
                    <!-- <div>
                        <i id="menu-btn" class="fa fa-bars"></i>
                    </div> -->
                    <div class="search">
                        <!-- Icon -->
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <!-- Input field -->
                        <input type="text" placeholder="Search">
                    </div>
                </div>

                <!-- Bell icon and pfp on top right -->
                <div class="profile">
                    <i class="fa fa-bell" aria-hidden="true"></i>
                    <img src="images/1.png" alt="pfp">
                </div>
            </div>

            <!-- The title -->
            <h3 class="i-name">
                <!-- Dashboard -->
                <button class="add-workout">
                    <i></i>
                    Add Workout
                </button>
            </h3>

            

            

            
        </section>
        
        
    </body>
    </html>


</template>

<style>
    @import "@/assets/exercise.css";


</style>