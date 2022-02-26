<template>
    <div class="noMore">
        <hr class="line">
        <span class="text">已显示全部内容</span>
        <hr class="line">
    </div>
</template>

<style lang="scss" scoped>
.noMore {
    color: #868686;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 1rem;
    .text {
        margin: 0 1.5rem;
    }
    .line {
        border-top: 0.5px solid #dddddd;
        display: inline-block;
        width: 5rem;
        vertical-align: middle;
    }
}
</style>