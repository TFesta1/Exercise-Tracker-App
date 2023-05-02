<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { loadScript } from '@/model/myFetch';

    const mapDiv = ref<HTMLDivElement | null>(null);
    
    onMounted(() => {

    async function initMap(): Promise<void> {

        console.log(mapDiv.value);
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}`, "google-maps")
        // The location of New Paltz
        const position = { lat: 41.74712730980122, lng: -74.08695475575296 };

        const map = new google.maps.Map(
            mapDiv.value!,
            {
            zoom: 14,
            center: position,
            mapId: 'DEMO_MAP_ID',
            }
        );
        const marker = new google.maps.Marker({
            map: map,
            position: { lat: 41.74343715547202, lng: -74.08411595777686},
            title: 'Our Classroom'
        });
    }

    initMap();

})
</script>


<template>
    <div>
        <h1 class="title">
            Store Locations
        </h1>
        <div id="map" ref="mapDiv" ></div>
    </div>
</template>


<style scoped>
    #map {
        height: calc(100vh - 70px);
        top: 30px;
        left: 600px;
    }
</style>