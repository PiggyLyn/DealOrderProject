<template>
    <!-- 这里加了ion-content，后续可能会有问题，官网说明一个页面应只有一个content组件。这里是为了解决slides和infinite组件结合导致的bug -->
        <ion-content class="shopComment">
            <ion-list>
                <ion-item
                class="commentItem"
                v-for="item in commentList.list"
                :key="item.commentID"
                >
                    <ion-avatar slot="start">
                        <img src="@/assets/images/IndexPage/purple.png"/>
                    </ion-avatar>
                    <div class="contentContainer">
                        <span class="name">{{item.userName}}</span>
                        <div class="starContainer">
                            <ion-icon
                            :class="{'isSelected': ele < item.star || ele === item.star}"
                            v-for="ele of 5"
                            :key="ele"
                            :icon="star">
                            </ion-icon>
                        </div>
                        <span class="content">{{item.content}}</span>
                    </div>
                </ion-item>
            </ion-list>
            <ion-infinite-scroll
            @ionInfinite="loadData($event)"
            threshold="100px"
            id="infinite-scroll"
            :disabled="isDisabled"
            >
                <ion-infinite-scroll-content
                loading-spinner="bubbles">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
</template>

<script lang="ts" setup>
import { IonAvatar, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import { star, chevronDownOutline } from 'ionicons/icons'
import { onMounted, reactive, ref } from 'vue';
import { getShopComment } from '@/api/home';
import { ResultEnum } from '@/utils/http/types';

const commentList:any = reactive({
    list: [{
        commentID: '1',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user1',
        userName: '用户1',
        date: '2022-03-23', // 评价日期
        star: 4, // 评分
    }, {
        commentID: '3',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user3',
        userName: '用户3',
        date: '2022-03-29', // 评价日期
        star: 5, // 评分
    }, {
        commentID: '2',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user2',
        userName: '用户2',
        date: '2022-03-25', // 评价日期
        star: 3, // 评分
    }, {
        commentID: '1',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user1',
        userName: '用户1',
        date: '2022-03-23', // 评价日期
        star: 4, // 评分
    }, {
        commentID: '3',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user3',
        userName: '用户3',
        date: '2022-03-29', // 评价日期
        star: 5, // 评分
    }, {
        commentID: '2',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user2',
        userName: '用户2',
        date: '2022-03-25', // 评价日期
        star: 3, // 评分
    }, {
        commentID: '1',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user1',
        userName: '用户1',
        date: '2022-03-23', // 评价日期
        star: 4, // 评分
    }, {
        commentID: '3',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user3',
        userName: '用户3',
        date: '2022-03-29', // 评价日期
        star: 5, // 评分
    }, {
        commentID: '2',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user2',
        userName: '用户2',
        date: '2022-03-25', // 评价日期
        star: 3, // 评分
    }]
})
// 测试用
const commentList1:any = reactive({
    list: [{
        commentID: '1',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user1',
        userName: '用户1',
        date: '2022-03-23', // 评价日期
        star: 4, // 评分
    }, {
        commentID: '3',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user3',
        userName: '用户3',
        date: '2022-03-29', // 评价日期
        star: 5, // 评分
    }, {
        commentID: '2',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user2',
        userName: '用户2',
        date: '2022-03-25', // 评价日期
        star: 3, // 评分
    }, {
        commentID: '2',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user2',
        userName: '用户2',
        date: '2022-03-25', // 评价日期
        star: 3, // 评分
    }, {
        commentID: '1',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user1',
        userName: '用户1',
        date: '2022-03-23', // 评价日期
        star: 4, // 评分
    }, {
        commentID: '3',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user3',
        userName: '用户3',
        date: '2022-03-29', // 评价日期
        star: 5, // 评分
    }, {
        commentID: '2',
        content: '很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃很好吃',
        userID: 'user2',
        userName: '用户2',
        date: '2022-03-25', // 评价日期
        star: 3, // 评分
    }]
})

let pageIndex = 1;
let isDisabled = ref(false);

onMounted(() => {
    queryShopComment(pageIndex)
})

/**
 * @description 获取商家评价列表
 * @param index 页码
 */
const queryShopComment = async(index:number) => {
    // const { ReturnData, RetCode } = await getShopComment({ pageIndex:index, pageSize: 10 })
    // if (RetCode === ResultEnum.SUCCESS) {
    //     // 如果是第一页，则直接赋值；否则拼接（加载更多）
    //     if (index===1) {
    //         commentList.list = ReturnData.commentList;
    //     } else {
    //         commentList.list = [...commentList.list, ...ReturnData.commentList];
    //     }
    //     // 如果已经加载了全部数据，则禁用上拉加载功能                                                     
    //     isDisabled.value = commentList.list.length === ReturnData.num
    // }
    if (pageIndex === 2) {
        commentList.list = [...commentList.list, ...commentList1.list];
        isDisabled.value = true
    }
}

/**
 * 上拉加载更多
 */
const loadData = (ev: CustomEvent) => {
    pageIndex++;
    setTimeout(() => {
        queryShopComment(pageIndex).then(() => {
            (ev.target as any).complete();
        });
    }, 500);
}
</script>

<style lang='scss' scoped>
 .shopComment {
    height: 100%;
    overflow-y: auto;
    .commentItem {
        --padding-start: 1rem;
        --padding-end: 1rem;
        --padding-top: 1rem;
        --padding-bottom: 1rem;
        --inner-padding-end: 0;
        --inner-border-width: 0;
        --border-width: 0 0 1px 0;
        ion-avatar {
            margin: 0 1.5rem 0 0;
        }
        .contentContainer {
            display: flex;
            flex-direction: column;
            min-height: 8.5rem;
            justify-content: space-between;
            .name, .content {
                color: #666;
                font-size: 1.4rem;
            }
            .starContainer {
                display: flex;
                font-size: 1.2rem;
                color: #c8c7cc;
            }
            .starContainer .isSelected {
                color: #ff9a0d;
            }
        }
    }
    .commentItem::part(native) {
        align-items: flex-start;
    }
}
</style>

