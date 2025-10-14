<template>
  <section class="layout-header">
    <section class="left">
      <span class="title">AI 应用中心</span>
    </section>
    <section class="center">
      <div class="nav-list">
        <div
          v-for="item in headerNav"
          :key="item.path"
          :class="{'active': navIndex === headerNav.indexOf(item)}"
          class="nav-item"
          @click="onClick(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </section>
    <section class="right">
      <section class="item">
        <HeaderPersonal />
      </section>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import HeaderPersonal from './header/personal.vue'
import { useRoute, useRouter } from 'vue-router'
import WeatherTime from './header/weather-time.vue'
import { FieldItem } from '@/typings/items'
// hooks
const router = useRouter()
// fns
function onClick(item: FieldItem) {
  console.log(item.title)

  navIndex.value = headerNav.value.indexOf(item)
  router.push({ path: item.path })
}

let headerNav = ref<FieldItem>([
  {  title: '首页', path: '/home/index',  icon:''   },
  // {  title: '知识库', path: '',  icon:''   },
  // {  title: '智能体开发', path: '',  icon:''   },
  {  title: '精选应用', path: '/application',  icon:''   },
  // {  title: '插件市场', path: '',  icon:''   },
  // {  title: '开放平台', path: '',  icon:''   },
])


let navIndex = ref(0)

</script>
<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: $primary-bg-header;
  .left {
  }
  .right {
    width: 24%;
  }
  .left {
    padding-left: 26px;
    .title {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #000;
      line-height: 28px;
      cursor: pointer;
    }
    img {
      width: 28px;
      cursor: pointer;
    }
  }
  .center {
    flex: 1;
    text-align: center;
    .nav-list{
      display: flex;
      gap: 0 12px;
      margin-left: 12px;
      position: relative;
      padding-left: 12px;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background:rgb(203 207 214 / .8);
      }

      .nav-item{
        font-size: 14px;
        padding: 0 12px;
        height: 32px;
        line-height: 32px;
        color: #666;
        cursor: pointer;
        border-radius: 4px;


        &:hover{
          color: rgb(85,119,255);
        }

        &.active{
          background-color:  rgb(237,240,255);
          color: rgb(85,119,255);

        }

        .icon{
          margin-right: 4px;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 24px;
    .item {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 15px;
      img {
        width: 20px;
      }
      .icon_download{
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background: rgba($color: #fff, $alpha: 0.5);
        color: #fff;
        cursor: pointer;
        svg{
          width: 70%;
          height: 70%;
        }
      }
      &.control {
        cursor: pointer;
      }
    }
  }
}

</style>
