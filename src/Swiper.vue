<style>
    .swiper-wrapper {
        position: relative;
        margin: 0 auto;
        width: 600px;
        height: 400px;
        overflow: hidden;
    }
    .swiper-slide {
        position: absolute;
        width: 100%;
        height: 100%;
        right: -100%;
        text-align: center;
    }
    .swiper-slide.active {
        transition: transform 1s ease-in;
        transform: translate3d(-100%, 0, 0);
    }
    .swiper-slide.next {
        transition: transform 1s ease-in;
        transform: translate3d(0, 0, 0);
    }
    .swiper-slide.prev {
        transition: transform 1s ease-in;
        transform: translate3d(-200%, 0, 0);
    }
</style>
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='slide in slides' v-text='slide' track-by='$index' 
                :class='{active: cur === $index, next: next === $index, prev: prev === $index}'></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                cur: 0,
            };
        },
        computed: {
            next() {
                return this.cur < this.slides.length - 1 ? this.cur + 1 : 0;
            },
            prev() {
                return this.cur > 0 ? this.cur - 1 : this.slides.length - 1;
            },
        },
        props: {
            slides: {
                type: Array,
                default: () => {
                    return [];
                },
            }
        },
        methods: {
            goNext() {
                this.cur = this.next;
            },
            /*goPrev() {
                // 如果要启用向前，则需要css配合
                this.cur = this.prev;
            },*/
        },
        ready() {
            setInterval(() => {
                this.goNext();
            }, 3000)
        },
    }
</script>