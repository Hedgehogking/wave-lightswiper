<style scoped>
    .lower-wave-wrapper {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        width: 600px;
        margin: 0 auto;
    }
    
    .lower-wave-wrapper a {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 50px 0;
        text-align: center;
        margin-right: 10px;
        background-color: lightblue;
    }
    
    .lower-wave-wrapper a.goLeft {
        /*-webkit-transition: -webkit-transform .2s linear;
        -webkit-transform: translateX(-10px);
        transition: transform .2s linear;
        transform: translateX(-10px);*/
    }
    
    .lower-wave-wrapper a.goRight {
        /*-webkit-transition: -webkit-transform .2s linear;
        -webkit-transform: translateX(10px);
        transition: transform .2s linear;
        transform: translateX(10px);*/
    }
    
    .lower-wave-wrapper a.active {
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
    <div class="lower-wave-wrapper">
        <a href='javascript:;' v-for='list in lists' v-text='list' @focus='getFocus($event)'></a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lis: null,
                waveDistance: 10,
                waveInterval: 200,
                // 记录第几次点击
                curWave: 0,
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
                    this.curWave++;
                    this.lis.forEach((li, idx) => {
                        li.classList.remove('active');
                        li.style.transform = '';
                    });
                    // 先等浏览器上一轮渲染完毕
                    setTimeout(() => {
                        tag.classList.add('active');
                        const pre = tag.previousElementSibling;
                        const next = tag.nextElementSibling;
                        if (!!pre) {
                            this.wave(pre, 'left', this.curWave);
                        }
                        if (!!next) {
                            this.wave(next, 'right', this.curWave);
                        }
                    }, 16)
                }  
            },
            wave(tag, direction, curWave) {
                this.move(tag, direction, curWave, () => {
                    if (direction === 'left') {
                        if (!!tag.previousElementSibling) {
                            this.wave(tag.previousElementSibling, direction, curWave);
                        }
                    } else {
                        if (!!tag.nextElementSibling) {
                            this.wave(tag.nextElementSibling, direction, curWave);
                        }
                    }
                });
            },
            move(tag, direction, curWave, callback) {
                 let startTime = new Date().getTime();
                 const tmpDir = direction === 'left' ? -1 : 1;
                 const tmpInterval = setInterval(() => {
                    // 判断移动时是否有了新的点击
                    if (curWave !== this.curWave) {
                        clearInterval(tmpInterval);
                        return ;
                    }
                    const tmpTime = new Date().getTime();
                    if (tmpTime - startTime <= this.waveInterval) {
                        const tmpDis = (tmpTime - startTime) / this.waveInterval * this.waveDistance * tmpDir;
                        tag.style.transform = 'translateX(' + tmpDis + 'px)';
                    } else {
                        clearInterval(tmpInterval);
                        callback();
                    }
                 }, 0)
            },
        },
        ready() {
            this.lis = document.querySelectorAll('.lower-wave-wrapper a');
        },
    }

</script>