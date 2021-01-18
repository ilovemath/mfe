<template>
  <div class="crud-bar">
    <el-button
      v-if="type.includes('c')"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      @click="toAdd()"
    >新增</el-button>
    <el-button
      v-if="type.includes('u')"
      size="mini"
      type="success"
      icon="el-icon-edit"
      :disabled="selected.length !== 1"
      @click="toEdit()"
    >修改</el-button>
    <el-button
      v-if="type.includes('d')"
      type="danger"
      icon="el-icon-delete"
      size="mini"
      :disabled="selected.length === 0"
      @click="toDelete()"
    >删除</el-button>
    <el-button
      v-if="type.includes('r')"
      :disabled="data&&!data.length"
      size="mini"
      type="warning"
      icon="el-icon-download"
      @click="toDownload()"
    >导出</el-button>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "crud"
    },
    selected: {
      type: Array
    },
    data: {
      type: Array
    }
  },
  methods: {
    toAdd() {
      this.$emit("add");
    },
    toDelete() {
      this.$emit("delete");
    },
    toEdit() {
      this.$emit("update");
    },
    toDownload() {
      this.$emit("download");
    }
  }
};
</script>

<style lang="stylus" scoped>
.crud-bar {
  display: flex;
  flex-wrap: wrap;

  >>>.el-button {
    margin: 0 10px 10px 0;
  }
}
</style>