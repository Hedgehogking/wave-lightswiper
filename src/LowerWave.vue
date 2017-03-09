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
        position: relative;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 50px 0;
        text-align: center;
        margin-right: 10px;
        background-color: lightskyblue;
    }
    
    .lower-wave-wrapper a.active {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        outline: none;
        background-color: greenyellow;
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
        <a href='javascript:;' v-for='list in listObjArr' v-text='list.item' @focus='getFocus($event, $index)'
            :class='{active: $index === curLi}' 
            :style='{left: list.left + "px", "margin-right": waveDistance + "px"}'></a>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                listObjArr: null,
                curLi: null,
                // 列表间的距离
                waveDistance: 15,
                // 每个列表项移动的时间
                waveInterval: 300,
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
            getFocus(event, idx) {
                const tag = event.target;
                if (tag.tagName.toLowerCase() === 'a') {
                    this.curWave++;
                    this.listObjArr.map((item, idx) => {
                        item.left = 0;
                    });
                    this.curLi = idx;
                    if (idx > 0) {
                        this.wave(idx - 1, 'left', this.curWave);
                    }
                    if (idx < this.listObjArr.length - 1) {
                        this.wave(idx + 1, 'right', this.curWave);
                    }
                }  
            },
            wave(idx, direction, curWave) {
                this.move(idx, direction, curWave, () => {
                    if (direction === 'left') {
                        if (idx > 0) {
                            this.wave(idx - 1, direction, curWave);
                        }
                    } else {
                        if (idx < this.listObjArr.length - 1) {
                            this.wave(idx + 1, direction, curWave);
                        }
                    }
                });
            },
            move(idx, direction, curWave, callback) {
                 let startTime = new Date().getTime();
                 const tmpDir = direction === 'left' ? -1 : 1;
                 const tmpInterval = setInterval(() => {
                    // 判断正在移动时是否有了新的点击
                    if (curWave !== this.curWave) {
                        clearInterval(tmpInterval);
                        return ;
                    }
                    const tmpTime = new Date().getTime();
                    if (tmpTime - startTime <= this.waveInterval) {
                        const tmpDis = (tmpTime - startTime) / this.waveInterval * this.waveDistance * tmpDir;
                        this.listObjArr[idx].left = tmpDis;
                    } else {
                        clearInterval(tmpInterval);
                        callback();
                    }
                 }, 0);
            },
        },
        ready() {
            this.listObjArr = this.lists.map((li, idx) => {
                return {
                    item: li,
                    left: 0,
                    active: false,
                };
            });
        },
    }

</script>