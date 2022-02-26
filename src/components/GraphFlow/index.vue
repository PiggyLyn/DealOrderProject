<template>
    <div :id="id"></div>
</template>

<script lang="ts" setup>
/**
 * 1. 流程图放到ISO"露头"的Modal（√）
 * 2. 流程图样式跟着设计稿来（√）
 * 3. 流程图有动画, 点击不同分支走不同的路，比如走左边左边的数有颜色，右边的没有
 * 4. 需要按需引入（√）
 * 5. 需要封装
 *      一、能够传入显示颜色（√）
 *      二、能够传事件，比如点击某一项能够触发事件（√）
 */
import dagreLayout from "@antv/f6/dist/extends/layout/dagreLayout"
import F6, { Graph, GraphData } from "@antv/f6"
import { onMounted, ref } from "vue"
import { fittingString } from "@/utils/common/graph"
/**
 * @description 节点属性
 * @member defaultFill 节点默认背景色
 * @member activeFill 节点选中背景色
 * @member defaultTextFill 文字默认颜色
 * @member activeTextFill 文字选中颜色
 */
export interface NodeStyle {
    defaultFill: string
    activeFill: string
    defaultTextFill: string
    activeTextFill: string
}
/**
 * @description 边线属性
 * @member stroke 线条默认颜色
 * @member activeStroke 线条选中颜色
 */
export interface EdgeStyle {
    stroke: string
    activeStroke: string
}
/**
 * @description 节点属性
 * @member id 节点id
 * @member label 节点文本
 * @member style 节点样式（可扩展）
 * @member clickEvent 节点的点击事件
 */
export interface GraphNodeConfig {
    id: string
    label: string
    style: NodeStyle
    clickEvent?: Function
}
/**
 * @description 两个节点之间的关联（用于生成边线）
 * @member id 线id
 * @member source 连接的起始节点id
 * @member target 连接的结束节点id
 * @member style 样式
 */
export interface GraphEdgeConfig {
    id: string
    source: string
    target: string
    style: EdgeStyle
}
/**
 * @description 配置项
 * @member width 图表的占位宽
 * @member height 图表的占位高
 * @member fontSize 字体大小
 * @member fontWeight 字体加粗
 * @member nodes 节点属性
 * @member edges 两个节点之间的关联（用于生成边线）
 */
export interface GraphOps {
    width: number
    height: number
    fontSize?: number
    fontWeight?: string
    nodes: GraphNodeConfig[]
    edges: GraphEdgeConfig[]
}

const id = "Graph" + Date.now()
// 容器宽度
const rectWidth = 150
const props = defineProps<{ graphOps: GraphOps }>()

// 将传进来的nodes转成f6插件需要的格式
const nodes = props.graphOps.nodes.map((node) => {
    return {
        ...node,
        label: fittingString(node.label, rectWidth - 35, Number(props.graphOps.fontSize) || 14),
        style: {
            fill: node.style.defaultFill,
        },
        labelCfg: {
            style: {
                fill: node.style.defaultTextFill,
                fontSize: props.graphOps.fontSize??"14",
                fontWeight: props.graphOps.fontWeight??"bold",
            },
        },
    }
})

// 将传进来的edges转成f6插件需要的格式
const edges = props.graphOps.edges.map((edge) => {
    return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
    }
})

const graph = ref<Graph>()

// 初始化表图
const initGraph = () => {
    F6.registerLayout("dagre", dagreLayout)
    F6.registerNode(
        "sql",
        {
            drawShape(cfg: any, group: any) {
                const rect = group.addShape("rect", {
                    attrs: {
                        x: -75,
                        y: -25,
                        width: rectWidth,
                        height: 50,
                        radius: 10,
                        fill: cfg.style.fill, // 容器背景色
                    },
                    name: "rect-shape",
                })
                return rect
            },
            // 响应状态变化
            setState(name, value, item) {
                const group = item?.getContainer()
                const shape = group?.get("children")[0] // 顺序根据 draw 时确定
                const node = props.graphOps.nodes.find((node) => node.id === group?.cfg.id)
                if (name === "active") {
                    if (value) {
                        shape.attr("fill", node?.style.activeFill)
                    } else {
                        shape.attr("fill", node?.style.defaultFill)
                    }
                }
            },
        },
        "single-node"
    )

    F6.registerEdge("flow-line", {
        draw(cfg: any, group: any) {
            const _edge = props.graphOps.edges.find((edge) => edge.id === cfg.id)
            const { startPoint, endPoint } = cfg
            const shape = group.addShape("path", {
                attrs: {
                    // _edge?.style.stroke、cfg.style.active.stroke
                    stroke: _edge?.style.stroke, // 线颜色
                    endArrow: {
                        // 箭头大小
                        path: F6.Arrow.triangle(10, 5, 0),
                        fill: "#409EFF",
                        stroke: "#409EFF",
                    },
                    lineWidth: 3, // 线粗
                    path: [
                        ["M", startPoint.x, startPoint.y],
                        ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
                        ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
                        ["L", endPoint.x, endPoint.y],
                    ],
                },
            })
            return shape
        },
        // 响应状态变化
        setState(name: any, value: any, item: any) {
            const group = item.getContainer()
            const shape = group.get("children")[0] // 顺序根据 draw 时确定
            const edge = props.graphOps.edges.find((edge) => edge.id === group.cfg.id)
            if (name === "active") {
                if (value) {
                    // 修改线颜色
                    shape.attr("stroke", edge?.style.activeStroke)
                    // 以下代码是线的动画
                    let index = 0
                    shape.animate(
                        () => {
                            index++
                            if (index > 9) {
                                index = 0
                            }
                            const res = {
                                lineDash: [4, 2, 1, 2],
                                lineDashOffset: -index,
                            }
                            return res
                        },
                        {
                            repeat: true,
                            duration: 3000,
                        }
                    )
                } else {
                    shape.attr("stroke", edge?.style.stroke)
                    // 结束动画
                    shape.stopAnimate()
                    // 清空 lineDash
                    shape.attr("lineDash", null)
                }
            }
        },
    })

    // 图的实例化
    graph.value = new F6.Graph({
        container: id, // dom id
        width: props.graphOps.width, // Number，必须，图的宽度
        height: props.graphOps.height, // Number，必须，图的高度
        pixelRatio: 2,
        fitView: true, // 是否开启画布自适应。开启后图自动适配画布大小
        linkCenter: true,
        fitCenter: true, // 开启后，图将会被平移，图的中心将对齐到画布中心，但不缩放。优先级低于 fitView
        layout: {
            type: "dagre",
            preventOverlap: true, // 希望节点不重叠
            nodeSize: 10, // 节点大小 nodeSize 用于算法中判断节点是否重叠
            // 节点间距（px）的回调函数，通过该参数可以对不同节点设置不同的节点间距
            nodesepFunc: (d: any) => {
                // if (d.id === "3") {
                //     return 500
                // }
                return 100
            },
            ranksep: 30, // 节点之间的垂直距离
            controlPoints: true, // 是否保留布局连线的控制点
        },
        // 配置全局节点样式
        defaultNode: {
            // 这里使用自定义的样式
            type: "sql",
        },
        // 配置全局边样式
        defaultEdge: {
            // 这里使用自定义的样式
            type: "flow-line",
        },
        edgeStateStyles: {
            active: {
                stroke: "red",
            },
        },
        // defaultEdge: {
        //     type: "polyline",
        //     style: {
        //         // radius: 0,
        //         // offset: 200,
        //         // 箭头
        //         endArrow: {
        //             // 箭头大小
        //             path: F6.Arrow.triangle(10, 5, 0),
        //             fill: "#409EFF",
        //             stroke: "#409EFF",
        //         },
        //         lineWidth: 2,
        //         stroke: "#C2C8D5", // 线的颜色
        //     },
        // },
        // 设置画布的交互模式（https://f6.antv.vision/zh/docs/manual/middle/states/mode
        modes: {
            default: ["drag-canvas", "zoom-canvas"],
        },
    })

    // 读取数据
    graph.value.data({
        nodes,
        edges,
    } as GraphData)

    // 点击事件
    graph.value.on("node:tap", (ev) => {
        const node = ev.item?._cfg?.model as any
        node.clickEvent && node.clickEvent()
    })

    graph.value.render() // 渲染图
    graph.value.fitView()
}

onMounted(() => {
    initGraph()
})

// 修改文字颜色（文字不能通过改变状态来改变颜色，因为没有提供方法，只能通过updateItem）
const updateTextStyle = (nodes: string[]) => {
    for (const node of props.graphOps.nodes) {
        const id = node.id
        const isSelect = nodes.includes(id)
        let fillText
        isSelect ? (fillText = node.style.activeTextFill) : (fillText = node.style.defaultTextFill)
        graph.value?.updateItem(id, {
            // 更新文本样式
            labelCfg: {
                style: {
                    fill: fillText,
                },
            },
        })
    }
}

// 修改节点颜色（改变状态）
const updateNodeStyle = (nodes: string[]) => {
    // 所有节点id的集合
    const _nodeArr = props.graphOps.nodes.map((edge) => {
        return edge.id
    })
    // 判断当前节点是否在高亮的集合里，是就将active状态改成true，反之改成false（然后在上面的registerNode的setState会自动监听状态来修改颜色）
    _nodeArr.forEach((node) => {
        if (nodes.includes(node)) {
            graph.value?.setItemState(node, "active", true)
        } else {
            graph.value?.setItemState(node, "active", false)
        }
    })
}

// 修改边线颜色（改变状态）
const changeEdgeStyle = (edges: string[]) => {
    // 所有边id的集合
    const _edgeArr = props.graphOps.edges.map((edge) => {
        return edge.id
    })
    // 判断当前边是否在高亮的集合里，是就将active状态改成true，反之改成false（然后在上面的registerEdge的setState会自动监听状态来修改颜色）
    _edgeArr.forEach((edge) => {
        if (edges.includes(edge)) {
            graph.value?.setItemState(edge, "active", true)
        } else {
            graph.value?.setItemState(edge, "active", false)
        }
    })
}

// 改变分支（外面可以通过ref获取当前组件然后调用此方法）
const toggleBranch = (nodes: string[], edges: string[]) => {
    updateTextStyle(nodes)
    updateNodeStyle(nodes)
    changeEdgeStyle(edges)
}

// 暴露方法给外部（vue3.2）
defineExpose({
    toggleBranch,
})
</script>

<style scoped lang="scss"></style>
