<script setup lang="ts">

</script>

<template>
    <!-- Creating the table -->
    <div class="board">
        <table width="100%">
            <thead>
                <!-- Add a row -->
                <tr> 
                    <!-- Add a column -->
                    <td>Name</td>
                    <td>Intensity</td>
                    <td>Workout</td>
                    <td>Rest</td>
                    <td>Streak</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="people">
                        <!-- Their pfp image -->
                        <img src="images/1.png" alt="pfp">
                        <div class="people-de">
                            <!-- Their name -->
                            <h5>John Doe</h5>
                            <!-- Their email -->
                            <p>john@example.com</p>
                        </div>
                    </td>

                    <td class="people-des">
                        <!-- Their intensity -->
                        <h5>Normal</h5>
                        <p>Go at a normal pace</p>
                    </td>

                    <td class="active"><p>Active</p></td>
                    <td class="role">
                        <p>Owner</p>
                    </td>

                    <td class="edit"><a href="#">Edit</a></td>
                </tr>
                <tr>
                    <td class="people">
                        <!-- Their pfp image -->
                        <img src="images/2.png" alt="pfp">
                        <div class="people-de">
                            <!-- Their name -->
                            <h5>John Doe</h5>
                            <!-- Their email -->
                            <p>john@example.com</p>
                        </div>
                    </td>

                    <td class="people-des">
                        <!-- Their intensity -->
                        <h5>Normal</h5>
                        <p>Go at a normal pace</p>
                    </td>

                    <td class="active"><p>Active</p></td>
                    <td class="role">
                        <p>Owner</p>
                    </td>

                    <td class="edit"><a href="#">Edit</a></td>
                </tr>
                <tr>
                    <td class="people">
                        <!-- Their pfp image -->
                        <img src="images/3.png" alt="pfp">
                        <div class="people-de">
                            <!-- Their name -->
                            <h5>John Doe</h5>
                            <!-- Their email -->
                            <p>john@example.com</p>
                        </div>
                    </td>

                    <td class="people-des">
                        <!-- Their intensity -->
                        <h5>Normal</h5>
                        <p>Go at a normal pace</p>
                    </td>

                    <td class="active"><p>Active</p></td>
                    <td class="role">
                        <p>Owner</p>
                    </td>

                    <td class="edit"><a href="#">Edit</a></td>
                </tr>
                
                
            </tbody>
        </table>
    </div>
</template>

<style>
    /* @import "assets/exercise.css"; */

</style>