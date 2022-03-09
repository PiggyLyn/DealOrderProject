<template>
    <div class="FilterContainer">
        <div class="filterHeader">
            <ion-button
            :class="{'isSelected': item.isSelected, 'noSelected': !item.isSelected}"
            fill="clear"
            @click="showFilter(item)"
            v-for="item in filterBtn"
            :key="item.btnID">
                {{item.btn}}
                <ion-icon :icon="caretDownOutline">
                </ion-icon>
            </ion-button>
        </div>
        <div class="filterContent" v-show="isShow">
            <div v-if="currentFilter.item.btnID==='allType'" class="allType">
                <ion-list class="leftMenu">
                    <ion-item
                    @click="chooseLeft(leftItem)"
                    :class="{'isSelected' : leftItem.isSelected}"
                    class="leftItem"
                    v-for="leftItem in currentFilter.item.List"
                    :key="leftItem.typeID"
                    button
                    >
                    {{leftItem.typeName}}
                    <!-- <ion-badge slot="end">{{leftItem.total}}</ion-badge> -->
                    </ion-item>
                </ion-list>
                <ion-list class="rightMenu">
                    <ion-item
                    @click="chooseRight(rightItem)"
                    :class="{'isSelected' : rightItem.isSelected}"
                    class="rightItem"
                    v-for="rightItem in rightMenu.List"
                    :key="rightItem.id"
                    button
                    detail=false
                    >
                    {{rightItem.name}}
                    <ion-badge slot="end">{{rightItem.num}}</ion-badge>
                    </ion-item>
                </ion-list>
            </div>

            <div v-if="currentFilter.item.btnID==='order'" class="order">
                <ion-list>
                    <ion-item
                    @click="chooseOrder(item)"
                    :class="{'isSelected' : item.isSelected}"
                    class="orderItem"
                    v-for="item in currentFilter.item.List"
                    :key="item.id"
                    button
                    detail=false
                    >
                    {{item.name}}
                    </ion-item>
                </ion-list>
            </div>

            <div v-if="currentFilter.item.btnID==='other'" class="other">
                <div
                class="container"
                v-for="item in currentFilter.item.List"
                :key="item.id"
                >
                    {{item.title}}
                    <div class="btnContainer">
                        <ion-button
                        @click="chooseOther(item, ele)"
                        class="otherItem"
                        :class="{'isSelected' : ele.isSelected}"
                        v-for="ele in item.btns"
                        :key="ele.btnID"
                        fill="outline"
                        >
                            <ion-icon :icon="checkmarkOutline" v-show="ele.isSelected"></ion-icon>
                            {{ele.btnName}}
                        </ion-button>
                    </div>
                </div>
                <div class="bottomContainer">
                    <ion-button class="clear" @click="clearBtn">重置</ion-button>
                    <ion-button class="confirm" @click="confirmBtn">确定</ion-button>
                </div>
            </div>
        </div>
        <ion-backdrop class="filterBackdrop" v-if="isShow" @ionBackdropTap="ionBackdropTap"></ion-backdrop>
    </div>
</template>

<script lang="ts" setup>
import { IonBackdrop, IonItem } from '@ionic/vue';
import { reactive, ref, watch } from 'vue';
import { caretDownOutline, checkmarkOutline } from 'ionicons/icons'
import { IonBadge } from '@ionic/vue';
import { useRoute } from 'vue-router';

const route = useRoute()
// 控制是否显示筛选内容
const isShow = ref(false)
// 筛选的数据，从外面传过来
const filterBtn:any = [{
    btnID: 'allType',
    btn: '分类',
    isSelected: false,
    List: [{
        typeID: 'Bread',
        typeName: '包子',
        types: [{
            id: 'bread',
            name: '包子',
            num: 10
        }, {
            id: 'porridge',
            name: '粥',
            num: 8
        }]
    }, {
        typeID: 'Fruit',
        typeName: '果蔬生鲜',
        types: [{
            id: 'fruit',
            name: '水果',
            num: 11
        }, {
            id: 'vegetable',
            name: '蔬菜',
            num: 9
        }]
    }, {
        typeID: 'Cake',
        typeName: '蛋糕',
        types: [{
            id: 'cupcake',
            name: '烘培',
            num: 20
        }, {
            id: 'birthcake',
            name: '生日蛋糕',
            num: 7
        }]
    }, ]
}, {
    btnID: 'order',
    btn: '排序',
    isSelected: false,
    List: [{
        id: 'sellMost',
        name: '销量最高'
    }, {
        id: 'costLowest',
        name: '起送价最低'
    }, {
        id: 'postageFastest',
        name: '配送速度最快'
    }, {
        id: 'starHighest',
        name: '评分最高'
    }, ]
}, {
    btnID: 'other',
    btn: '筛选',
    isSelected: false,
    List: [{
        id: 'property',
        title: '商家属性（可以多选）',
        btns: [{
            btnID: 'onTime',
            btnName: '准时达'
        }, {
            btnID: 'ticket',
            btnName: '开发票'
        }, {
            btnID: 'new',
            btnName: '新店'
        }, {
            btnID: 'safe',
            btnName: '外卖保'
        }, ]
    }, {
        id: 'deliver',
        title: '配送方式',
        btns: [{
            btnID: 'bee',
            btnName: '蜂鸟专送'
        }]
    }]
}]
// 当前展示的筛选条件的id
let currentNode = ''
// 分类筛选:当前展示的筛选条件
let currentFilter:any = reactive({
    item: filterBtn[0]
})
// 分类筛选:当前左侧菜单对应的右侧内容
let rightMenu:any = reactive({
    List: currentFilter.item.List[0].types
})
// 是否第一次选择分类筛选的右边菜单，用来判断第一次进来默认选中菜单第一项
let isFirstChoose = true

const emit = defineEmits<{
    (e: 'closeFilter', data: any): void
}>();

// 监听props的变化
watch(() => isShow.value, () => {
    if(isShow.value && isFirstChoose) {
        // 从home进来，默认选中对应右边菜单第一项
        // if (currentFilter.item.btnID === 'allType' && isFirstChoose) {
            const leftMenu = filterBtn[0].List.find((ele:any) => ele.typeID === route.params.code)
            if (leftMenu) {
                leftMenu.isSelected = true
                rightMenu.List[0].isSelected = true
            }
        // }
    }
});

/**
 * @desc 打开、关闭、切换筛选内容
 */
const showFilter = (item:any) => {
    // 如果跟上一次打开的一样
    isShow.value = item.btnID === currentNode && isShow.value ? !isShow.value : true
    // 把其他的isSelected设置为false
    filterBtn.forEach((ele:any) => {
        ele.isSelected = false
    })
    item.isSelected = isShow.value
    currentFilter.item = item
    currentNode = item.btnID
}

/**
 * @desc 分类筛选:点击左侧菜单，保存右侧内容
 */
const chooseLeft = (item:any) => {
    currentFilter.item.List.forEach((ele:any) => {
        ele.isSelected = false
    })
    item.isSelected = true
    rightMenu.List = item.types
}

/**
 * @desc 分类筛选:点击右侧菜单
 */
const chooseRight = (item:any) => {
    isFirstChoose = false
    // 把上一次选中的清除
    // const allType = filterBtn.find((ele:any) => ele.btnID === 'allType')
    currentFilter.item.List.forEach((ele:any) => {
        ele.types.map((el:any) => el.isSelected = false)
    })
    item.isSelected = true
    closeFilter()
}

/**
 * @desc 排序筛选:点击
 */
const chooseOrder = (item:any) => {
    // 把上一次选中的清除
    currentFilter.item.List.forEach((ele:any) => {
        ele.isSelected = false
    })
    item.isSelected = true
    closeFilter()
}

/**
 * @desc 其他筛选:点击里面的按钮
 */
const chooseOther = (item:any, ele:any) => {
    const obj = item.btns.find((el:any) => el.btnID === ele.btnID)
    obj.isSelected = !obj.isSelected
    // obj.isSelected = ele.isSelected !== undefined ? !obj.isSelected : true
}

/**
 * @desc 其他筛选:点击重置按钮
 */
const clearBtn = () => {
    console.log(currentFilter.item.List)
    // currentFilter.item.List.forEach(item => {

    // })
    currentFilter.item.List.forEach((ele:any) => {
        ele.btns.map((el:any) => el.isSelected = false)
    })
}

/**
 * @desc 其他筛选:点击确定按钮
 */
const confirmBtn = () => {
    closeFilter()
}

/**
 * @desc 点击遮罩
 */
const ionBackdropTap = () => {
    closeFilter()
}

/**
 * @desc 关闭filter并通知父组件
 */
const closeFilter = () => {
    filterBtn.forEach((ele:any) => {
        ele.isSelected = false
    })
    isShow.value = false
    emit('closeFilter', {filterBtn});
}
</script>
<style lang="scss" scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

.FilterContainer {
    .filterHeader {
        display: flex;
        height: 3.5rem;
        border-bottom: 1px solid #dfdddd;
        background: #fff;
        z-index: 4;
        ion-button {
            height: 100%;
            --color: #666;
            font-size: 1.4rem;
            --background: #fff;
            --border-radius: 0;
            flex: 1;
            margin: 0;
            z-index: 4;
            ion-icon {
                font-size: 1.4rem;
                margin-left: .3rem;
            }
        }
        .isSelected {
            ion-icon {
                transform: rotate(180deg);
                transition: all 0.2s ease 0s;
            }
        }
        .noSelected {
            ion-icon {
                transition: all 0.2s ease 0s;
            }
        }
    }
    .filterContent {
        animation: fadeIn .5s;
        position: absolute;
        width: 100%;
        max-height: 40rem;
        background: #fff;
        z-index: 3;
        .allType {
            display: flex;
        }
        .other {
            padding: .8rem;
            .container {
                display: flex;
                flex-direction: column;
                .btnContainer {
                    display: flex;
                    flex-wrap: wrap;
                    // justify-content: center;
                    ion-button {
                        width: 32%;
                        --padding-end: 0;
                        --padding-start: 0;
                        height: 3rem;
                        --border-radius: 0;
                        --border-color: #eee;
                        --color: #666;
                        font-size: 1.2rem;
                    }
                    ion-icon {
                        color:  #3880ff;
                    }
                }
            }
            .bottomContainer {
                display: flex;
                .clear, .confirm {
                    flex: 1;
                    --border-radius: .5rem;
                }
                .clear {
                    --background: #f1f1f1;
                    color: #000;
                    margin-right: .5rem;
                    --background-activated: #e0e0e0;
                }
                .confirm {

                }
            }
        }
        .leftMenu, .rightMenu {
            flex: 1;
            overflow-y: auto;
        }
        .leftMenu {
            background: #f1f1f1;
        }
        .leftItem, .rightItem, .orderItem {
            --padding-start: 1rem;
            --inner-padding-end: 0;
            --inner-border-width: 0;
            font-size: 1.4rem;
            color: #666;
        }
        .leftItem {
            --background: #f1f1f1;
        }
        .leftItem.isSelected {
            --background: #fff;
        }
        .rightItem.isSelected {
            color: #3880ff;
        }
        .orderItem.isSelected {
            color: #3880ff;
        }
    }
    .filterContent.closeFilter {
        animation: fadeOut .2s;
    }
    .filterBackdrop {
        height: calc(100vh - 4.4rem - 3.5rem);
        position: absolute;
        opacity: .5;
        top: calc(4.4rem + 3.5rem);
    }
}
</style>