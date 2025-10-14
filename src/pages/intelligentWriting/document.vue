<template>
  <div class="application-container">
    <Portal
      :content="state.params.richText"
    />
    <RichText
      v-if="state.init"
      v-model="state.params.richText"
    />
  </div>
</template>


<script lang="ts" setup>
import { ref ,reactive,onMounted } from 'vue'
import RichText from '@/components/UI/richText/index.vue'
import Portal from './components/portal.vue'
import  { useRoute } from 'vue-router'
let route = useRoute()

let state = reactive({
  init:false,
  params: {
    richText: ''
  }
})

onMounted(() => {
  setTimeout(() => {
    state.init = true
  }, 0)
  if(route.query.documentId){
    let richText = sessionStorage.getItem(route.query.documentId + 'richText') || ''
    state.params.richText = richText
  }

})
</script>


<style scoped lang="scss">
.application-container {
  width: 100%;
  height: calc(100vh);
  background: #fff;
  border-radius: 0;

}
</style>
