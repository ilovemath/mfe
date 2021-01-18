<template>
  <div class="search-bar">
    <el-input v-model="q.name" clearable size="small" placeholder="输入名称搜索" class="filter-item" />
    <el-date-picker
      v-model="q.createTime"
      size="small"
      class="filter-item date-picker"
      type="daterange"
      range-separator=":"
      value-format="timestamp"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <el-select v-model="q.enabled" size="small" placeholder="状态" class="filter-item">
      <el-option label="全部" :value="null" />
      <el-option label="启用" :value="true" />
      <el-option label="禁用" :value="false" />
    </el-select>
    <el-button size="small" type="success" icon="el-icon-search" @click="handleSearch">查询</el-button>
    <el-button size="small" type="warning" icon="el-icon-refresh-left" @click="handleReset">重置</el-button>
  </div>
</template>
<script>
export default {
  props: ["query"],
  data() {
    return {
      q: this.query
    };
  },
  watch: {
    q(val) {
      this.$emit("update:query", val);
    }
  },
  methods: {
    handleSearch() {
      this.$emit("search");
    },
    handleReset() {
      this.q = {
        name: "",
        enabled: null,
        createTime: null
      };
      this.$emit("reset");
    }
  }
};
</script>
<style lang="stylus" scoped>
.search-bar {
  display: flex;
  flex-wrap: wrap;

  .el-input {
    width: 200px;
  }

  .date-picker {
    width: 250px;
  }

  .el-select {
    width: 80px;
  }

  .filter-item {
    margin: 0 10px 10px 0;
  }

  >>>.el-button {
    margin: 0 10px 10px 0;
  }
}
</style>
