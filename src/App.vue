<style></style>
<template>
    <div>
        <wave :lists='slides'></wave>
        <swiper :slides='slides'></swiper>
    </div>
</template>
<script>
    import Wave from './Wave';
    import Swiper from './Swiper';
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
        }
    }
</script>