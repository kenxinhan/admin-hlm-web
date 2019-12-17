<template>
  <div>
    <Pending :patientDetail="patientDetail" :payTypeList="payTypeList" @showCreateBill="showCreateBill" @hideCreateBill="hideCreateBill" @showCollection="showCollection"></Pending>
    <Hascharge :patientDetail="patientDetail" :payTypeList="payTypeList" @showCreateBill="showCreateBill" @hideCreateBill="hideCreateBill" @showCollection="showCollection"></Hascharge>
  </div>
</template>

<script>
import Pending from './Pending.vue'
import Hascharge from './Hascharge.vue'

export default {
  components:{
    Pending,
    Hascharge
  },
  props:{
    patientDetail: {
      type: Object,
      default: {}
    },
    payTypeList: {
      type: Array,
      default: ()=> []
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    // 新建/修改/收费显示
    showCreateBill(row,operKey) {
      this.$emit('showCreateBill',row,operKey)
    },
    // 新建/修改/收费显示
    showCollection(row,operKey,listKey) {
      this.$emit('showCollection',row,operKey,listKey)
    },
    //新建/修改/收费隐藏
    hideCreateBill() {
       this.$emit('hideCreateBill')
    },
  },
  created(){},
  mounted(){
    
  }
}
</script>
<style lang="less" scoped>
</style>