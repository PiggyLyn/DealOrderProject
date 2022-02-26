<template>
    <ul :class="props.isPlay ? 'play' : ''">
        <li></li>
        <li></li>
        <li></li>
    </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{ isPlay: boolean }>()
</script>

<style scoped lang="scss">
.play {
    li {
        &:nth-child(1) {
            background-image: linear-gradient(180deg, #ff4e65 0%, #dd3147 100%);
            animation: move1 0.6s linear infinite;
        }
        &:nth-child(2) {
            background-image: linear-gradient(180deg, #c1e74b 0%, #5ad15a 100%);
            animation: move2 0.6s linear infinite;
        }
        &:nth-child(3) {
            background-image: linear-gradient(180deg, #bcb1ff 0%, #7660ff 100%);
            animation: move3 0.6s linear infinite;
        }
    }
}
ul {
    list-style: none;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    border: 1px solid;
    margin: 0;
    padding: 0;
    li {
        width: 20%;
        height: 50%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
}
@keyframes move1 {
    0% {
        height: 10%;
    }
    50% {
        height: 60%;
    }
    100% {
        height: 10%;
    }
}
@keyframes move2 {
    0% {
        height: 70%;
    }
    50% {
        height: 20%;
    }
    100% {
        height: 70%;
    }
}
@keyframes move3 {
    0% {
        height: 20%;
    }
    50% {
        height: 80%;
    }
    100% {
        height: 20%;
    }
}
</style>
