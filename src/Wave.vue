<style>
    ul,
    li {
        list-style: none;
    }
    
    .wave-wrapper {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        width: 600px;
        margin: 0 auto;
    }
    
    .wave-wrapper a {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 100px 0;
        text-align: center;
        margin-right: 10px;
        background-color: lightblue;
    }
    
    .wave-wrapper a.goLeft {
        -webkit-transition: -webkit-transform .2s linear;
        -webkit-transform: translateX(-10px);
        transition: transform .2s linear;
        transform: translateX(-10px);
    }
    
    .wave-wrapper a.goRight {
        -webkit-transition: -webkit-transform .2s linear;
        -webkit-transform: translateX(10px);
        transition: transform .2s linear;
        transform: translateX(10px);
    }
    
    .wave-wrapper a.active {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        outline: none;
        -webkit-animation: breat 2s linear infinite;
        animation: breat 2s linear infinite;
    }
    
    @-webkit-keyframes breat {
        0% {
            box-shadow: 0px 0px 5px 1px palevioletred;
        }
        50% {
            box-shadow: 0px 0px 20px 1px palevioletred;
        }
        100% {
            box-shadow: 0px 0px 5px 1px palevioletred;
        }
    }
    
    @keyframes breat {
        0% {
            box-shadow: 0px 0px 5px 1px palevioletred;
        }
        50% {
            box-shadow: 0px 0px 20px 1px palevioletred;
        }
        100% {
            box-shadow: 0px 0px 5px 1px palevioletred;
        }
    }
</style>
<template>
    <div class="wave-wrapper">
        <a href='javascript:;' v-for='list in lists' v-text='list' @focus='getFocus($event)'></a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lis: null,
            };
        },
        props: {
            lists: {
                type: Array,
                default: () => {
                    return [];
                },
            }
        },
        methods: {
            getFocus(event) {
                const tag = event.target;
                if (tag.tagName.toLowerCase() === 'a') {
                    this.lis.forEach((li, idx) => {
                        li.removeEventListener('webkitTransitionEnd', this.wave);
                        li.removeEventListener('transitionend', this.wave);
                        li.classList.remove('active');
                        li.classList.remove('goLeft');
                        li.classList.remove('goRight');
                    });
                    // 先等浏览器上一轮渲染完毕
                    setTimeout(() => {
                        this.lis.forEach((li, idx) => {
                            if (li !== tag) {
                                li.addEventListener('webkitTransitionEnd', this.wave);
                                li.addEventListener('transitionend', this.wave);
                            }
                        });
                        tag.classList.add('active');
                        const pre = tag.previousElementSibling;
                        const next = tag.nextElementSibling;
                        if (!!pre) {
                            pre.classList.add('goLeft');
                        }
                        if (!!next) {
                            next.classList.add('goRight');
                        }
                    }, 16)
                }  
            },
            wave(event) {
                var tag = event.target;
                if (tag.className.match(/left/i)) {
                    if (!!tag.previousElementSibling) {
                        tag.previousElementSibling.classList.add('goLeft');
                    }
                } else if(tag.className.match(/right/i)) {
                    if (!!tag.nextElementSibling) {
                        tag.nextElementSibling.classList.add('goRight');
                    }
                }
            },
        },
        ready() {
            this.lis = document.querySelectorAll('.wave-wrapper a');
        },
    }

</script>