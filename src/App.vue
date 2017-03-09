<style></style>
<template>
    <div>
        <wave :lists='slides'></wave>
        <swiper :slides='slides'></swiper>
        <lower-wave :lists='slides'></lower-wave>
    </div>
</template>
<script>
    import Wave from './Wave';
    import Swiper from './Swiper';
    import LowerWave from './LowerWave';
    export default {
        data() {
            const slides = Array.from({length: 6}).map((item, idx) => {
                return idx + 1;
            });
            return {
                slides,
            };
        },
        components: {
            Wave,
            Swiper,
            LowerWave,
        }
    }
</script>