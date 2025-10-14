<template>
  <div class="page-application">
    <div class="page-title">
      <span>精选应用</span>
      <span class="blue">
        开箱即用
      </span>
    </div>
    <div class="page-section-title">
      <span>精选应用开箱即用，覆盖办公、创作等全场景</span>
    </div>


    <div class="tab-title">行业分类</div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
      </el-tab-pane>
    </el-tabs>


    <div v-for="(item,index) in useApp" :key="item.key" class="application-block">
      <img :src="item.banner" class="banner" alt="">

      <div class="app-list">
        <div
          v-for="(app,appIndex) in item.apps"
          :key="appIndex"
          class="app-item"
          @mouseenter="handleMouseEnter(app)"
          @mouseleave="handleMouseLeave(app)"
        >
          <div class="app-main">
            <div class="app-info">
              <div class="app-title">{{ app.name }}</div>
              <div class="app-content">
                {{ app.describes }}
              </div>

              <div v-show="app.showBtn" class="button-group">
                <el-button type="primary" @click="onClickOutside(app)"> 体验</el-button>
                <el-button type="default"> 订阅</el-button>
              </div>
            </div>

            <div class="app-icon">
              <img :src="app.icon" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FieldItem } from '@/typings/items'
import { imgPath } from '@/utils'
import { appType } from './json'

let router = useRouter()

let useApp = ref(appType)
let activeName = ref('1')

let tabList = ref<FieldItem[]>([
  {  label: '通用',  key: '1' ,icon:'home/block-12.png',path:'' },
  {  label: '政务',  key: '2' ,icon:'home/block-2.png',path:'' },
  {  label: '企业',  key: '3' ,icon:'home/block-3.png',path:'' },
])

// 鼠标移入事件
function handleMouseEnter(app) {
  app.showBtn = true
}

// 鼠标移出事件
function handleMouseLeave(app) {
  app.showBtn = false
}

function onClickOutside (app) {
  console.log(app)
  router.push({ path: app.path })
}

</script>

<style lang="scss" scoped>
.page-application {
  background-image: imgPathScss('application/block-13.png');
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 100%;
  padding: 60px;

  .tab-title{
    font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';
    font-size: 20px;
    line-height: 24px;
    color: rgb(38 42 48);
    margin-bottom: 24px;
  }

  .page-title{
    color: rgb(38 42 48);
    font-size: 32px;
    text-align: center;
    margin-bottom: 12px;
    font-weight: 600;
    font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';
    .blue{
          background-image: linear-gradient(57deg,#60CBFF,#5577FF,#8855FF);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
    }

  }

  .page-section-title{
    text-align: center;
    span{
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: rgb(92 98 107);
    }
  }
}

.application-block{
  border:  0 solid #e5e7eb;
  background: rgba($color: #e5e7eb, $alpha: .2);
  &~.application-block{
    margin-top: 16px;
  }
  .banner{
    width: 100%;
  }
}

.app-list{
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
  .app-item{
    width: 20%;
    padding: 12px 10px;
    .app-main{
      display: flex;
      justify-content: space-between;
      border-radius: 8px;
      background: white;
      position: relative;
      height: 126px;
      padding: 20px 16px;
      background: #FFFFFF;
      border: 1px solid #E9ECF0;
      border-radius: 8px;
      cursor: pointer;
        position: relative;
      height: 126px;
      padding: 20px 16px;
      background: #FFFFFF;
      border: 1px solid #E9ECF0;
      border-radius: 8px;
      &:hover{
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      }
    }

    .app-icon{
      flex:0 0 60px;
      width: 60px;
      height: 60px;
      margin-left: 12px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .app-info{
      flex: 1;
      .app-title{
        font-family: 'PingFang SC', 'Microsoft YaHei', '微软雅黑', '宋体', 'Arial', 'Helvetica', 'sans-serif';
        font-size: 18px;
        line-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        line-height: 1.5;
        word-break: break-all;
        color: #262A30;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .app-content{
        @include ellipsisMultiline(1)
        // word-break: break-all;
      }
    }
  }
}

.button-group{
  display: flex;
  align-items: center;
  margin-top: 12px;
  .button-item{

  }
}
</style>
