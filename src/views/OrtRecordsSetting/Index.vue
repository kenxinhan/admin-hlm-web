<template>
  <div class="">
    <el-tabs v-model="activeName" @tab-click="handleToogleTab">
      <el-tab-pane label="正畸计划配置" name="first">
        <ProjectConfig v-if="activeName === 'first'" :TemplateList="TemplateList"></ProjectConfig>
      </el-tab-pane>
      <el-tab-pane label="正畸过程配置" name="second">
        <ProcessConfig v-if="activeName === 'second'" :ProcessConfigList="ProcessConfigList"></ProcessConfig>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from 'moment'
import qs from 'qs'

import ProjectConfig from './components/ProjectConfig'
import ProcessConfig from './components/ProcessConfig'

export default {
  components: {
    ProjectConfig,
    ProcessConfig,

  },
  props:{},
  data() {
    return {
      activeName: 'first',
      TemplateList: [
        {
          code: '1',
          levelCode: 1,
          type: '1',
          name: '目录',
          children: [
            {
              code: '2',
              levelCode: 2,
              type: '1',
              name: '诊断配置',
              children: [
                {
                  code: '3',
                  levelCode: 3,
                  type: '1',
                  name: '牙型与牙骨',
                  children: [
                    {
                      code: '4',
                      levelCode: 4,
                      type: '2',
                      name: '牙骨',
                      children: []
                    },
                    {
                      code: '5',
                      levelCode: 4,
                      type: '2',
                      name: '牙型',
                      children: []
                    }
                  ]
                },
                {
                  code: '6',
                  levelCode: 3,
                  type: '2',
                  name: '主诉',
                  children: []
                },
                {
                  code: '7',
                  levelCode: 3,
                  type: '2',
                  name: '问题',
                  children: []
                },
                {
                  code: '8',
                  levelCode: 3,
                  type: '2',
                  name: '矫治目标',
                  children: []
                },
              ]
            },
            {
              code: '9',
              levelCode: 2,
              type: '1',
              name: '知情同意书',
              children: [
                {
                  code: '10',
                  levelCode: 3,
                  type: '2',
                  name: '知情同意书',
                  children: []
                }
              ]
            },
            {
              code: '11',
              levelCode: 2,
              type: '2',
              name: '治疗步骤',
              children: []
            },
            {
              code: '12',
              levelCode: 2,
              type: '2',
              name: '治疗方案',
              children: []
            },
          ],
        }
      ],
      ProcessConfigList: [],

    }
  },
  mounted() {

  },
  methods:{
    // tab切换
    handleToogleTab(val) {
       if ( val.name === "first" ) {
         
       }
       if( val.name === "second" ){

       }
    },
    //获取模板目录
    // getTopMenu () {
    //   this.$http.post('/api/hx/medical/templateList/list.do',{}).then( res => {
    //     if (res.data.result) {
    //       let arr = []
    //       // this.cascaderData = this.addDisabled(res.data.returnObject)
    //       arr = res.data.returnObject
    //       arr = JSON.parse(JSON.stringify(arr))
    //       this.TemplateList = arr
    //     } else {
    //       this.$message.error(res.data.errorMessage)
    //     }
    //
    //   })
    // },

  },


}
</script>

<style lang="less" scoped>

</style>
