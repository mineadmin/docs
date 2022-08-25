# Vue3 setup语法

:::tip
setup是Vue3.0后推出的语法糖，并且在Vue3.2版本进行了大更新，像写普通JS一样写vue组件，对于开发者更加友好了。按需引入computed、watch、directive等选项，一个业务逻辑可以集中编写在一起，让代码更加简洁便于浏览。
:::

## 基本用法
- 只需在 `script` 标签里添加一个 `setup` 属性，编译时会把里的代码编译成一个 `setup` 函数。每次组件实例被创建的时候执行。
```html
<script setup>
console.log('hello script setup')
</script>
```

## data和methods
在语法糖里声明的变量和函数，不需要 return 暴露出去，就可以直接在 template 使用
```html
<script setup>
import { ref, reactive } from 'vue'    
// 普通变量
const msg = 'Hello!'
 
// 响应式变量
let num = ref(1111)         // ref声明基本类型变量
const obj = reactive({        // reactive声明对象类型变量，如Object、Array、Date...
    key: 'this is a object'
})
 
// 函数
function log() {
    console.log(msg)          // Hello
    console.log(num.value)    // 1111（可根据input输入值而改变）
    console.log(obj.key)      // this is a object
}
</script>
 
<template>
    <h1>{{ msg }}</h1>
    <p>{{obj.key}}</p>
    <input v-model="num" type="text" />
    <button @click="log">打印日志</button>
</template>
```

## 计算属性computed
```html
<script setup>
import { ref, computed } from 'vue'
 
let count = ref(0)
const countPlus = computed(()=>{
    return count.value+1
})
</script>
 
<template>
    <h1>计数：{{ countPlus }}</h1>
</template>
```

## 监听器watch
- watch监听器除了使用方式有区别之外，其他的与vue2.0没啥变化

```html
<script setup>
import { ref, reactive, watch } from 'vue'
 
// 监听ref
let count = ref(0)
watch(count, (newVal, oldVal)=> {
    console.log('修改后', newVal)
    console.log('修改前', oldVal)
})
 
// 监听reactive属性
const obj = reactive({
    count: 0
})
watch(
    ()=> obj.count,     // 一个函数，返回监听属性
    (newVal, oldVal)=> {
        console.log('修改后', newVal)
        console.log('修改前', oldVal)
    },
    {
        immediate: true,     // 立即执行，默认为false
        deep: true     // 深度监听，默认为false
    }
)
 
const onChange = function(){
    count.value++
    obj.count++
}
</script>
 
<template>
```

## import导入的内容可直接使用
- 导入的模块内容，不需要通过 methods 来暴露它
```js
// utils.js 
export const onShow = function(name) {
    return 'my name is ' + name
}
```
```html
// Show.vue
<script setup>
    import { onShow } from './utils.js'
</script>
<template>
    <div>{{ onShow('jack') }}</div>
</template>
```

- 导入外部组件，不需要通过components注册使用
```html
// Child.vue
<template>
    <div>I am a child</div>
</template>
```

```html
// Parent.vue
<script setup>
    import Child from './Child.vue'
</script>
<template>
    <child></child>
</template>
```

## 声明props和emits
- 使用 defineProps 和 defineEmits API 来声明 props 和 emits
```html
// Child.vue
<script setup>
import { defineProps, defineEmits } from 'vue'
 
// 声明props
const props = defineProps({
    info: {
        type: String,
        default: ''
    }
})
 
// 声明emits
const $emit = defineEmits(['change'])
 
const onChange = function() {
    $emit('change', 'child返回值')
}
</script>
 
<template>
    <h1>信息：{{ info }}</h1>
    <button @click="onChange">点击我</button>
</template>
```

```html
// Parent.vue
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
 
const msg = ref('hello setup !')    // 响应式变量
 
const onAction = function(event) {
    console.log(event)    // child返回值
}
</script>
 
<template>
    <child :info="msg" @change="onAction"></child>
</template>
```

:::warning 总结
本文档只讲解部分常用功能，其他更多使用方法还需要翻阅 Vue3.0 的文档
:::