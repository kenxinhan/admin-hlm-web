<template>
  <el-pagination
    @current-change="handlePageQuery"
    :current-page="currentPage"
    :page-size="pageSize"
    background
    layout="total, prev, pager, next"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  components: {},
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      // 分页
    handlePageQuery(currentPage) {
      this.$emit('handlePageQuery',currentPage)
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>