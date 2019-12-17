<template>
  <div id="app">
    <router-view></router-view>
    <loading v-if="loading"/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import storage from '@/tools/local_storage.js'
export default {
  computed:mapGetters([
    'loading',
  ]),
  methods:{

  },
  mounted(){
  }
}
</script>

<style lang="less">
@import "./style/index";
@import "./style/base/_color";
</style>
