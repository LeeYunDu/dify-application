<template>
  <section class="view-component">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="icon-user" :src="imgPath('layout/icon-user.png')" alt="">
        <span class="username">{{ user.nickName }}</span>
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <section class="drop"></section>
  </section>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ArrowDown, UserFilled } from '@element-plus/icons-vue'
import { get } from 'lodash-es'
import { imgPath } from '@/utils'

const router = useRouter()
const store = useStore()

const user = computed<any>(() => get(store.getters.user,'user',{}))

async function onLogout (e: any) {
  try {
    e.stopPropagation()
    await store.dispatch('logout')
    router.push({ path: '/login' })
  } catch (error) {
    console.log(error)
  }
}

</script>
<style lang="scss" scoped>
.view-component {
  display: flex;
  align-items: center;
  .el-dropdown-link {
    .icon-user{
      width: 30px;
      margin-right: 12px;
    }
    display: flex;
    align-items: center;
    cursor: pointer;
    :deep {
      .el-icon {
        width: 24px;
      }
    }
    .username {
      margin: 0 4px;
    }
  }
  .avatar {
    width: 20px;
  }
}
</style>
