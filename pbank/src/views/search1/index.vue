<template>
  <div class="container">
    <!--工具栏-->
    <div class="header">
      <search :query.sync="query" @search="getData" />
      <crud
        type="crud"
        :data="data.content"
        :selected="selected"
        @add="handleAdd"
        @delete="handleDelete"
        @update="handleUpdate"
        @download="handleDownload"
      />
    </div>
    <!--表格渲染-->
    <el-table
      ref="table"
      :data="data.content"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeEnabled(scope.row, scope.row.enabled)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <!--   编辑与删除   -->
      <el-table-column label="操作" width="200px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      hide-on-single-page
      :total="data.total"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size.sync="pagin.size"
      :current-page.sync="pagin.page"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="getData"
      @current-change="getData"
    />
    <!--表单渲染-->
    <el-dialog :visible.sync="showForm" :title="title" width="500px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
          <el-radio-group v-model="form.enabled">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="showForm=false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import * as http from "@/api/search1";
import Crud from "@/components/Crud";
import Search from "@/components/Search";
export default {
  name: "Search1",
  components: {
    Crud,
    Search
  },
  props: [],
  data() {
    return {
      title: "",
      showForm: false,
      selected: [],
      query: {
        name: "",
        enabled: null,
        createTime: null
      },
      pagin: {
        page: 1,
        size: 5
      },
      data: {
        total: 0,
        content: []
      },
      form: {
        id: 0,
        name: "",
        enabled: true
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        enabled: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  methods: {
    parseTime,
    handleAdd() {
      this.title = "新增Search1";
      this.form = { id: 0, name: "", enabled: true };
      this.showForm = true;
    },
    handleUpdate(data) {
      this.title = "编辑Search1";
      this.form = data ? data : this.selected[0];
      this.showForm = true;
    },
    handleDelete(id) {
      const ids = [];
      if (id) {
        ids.push(id);
      } else {
        for (const s of this.selected) {
          ids.push(s.id);
        }
      }
      this.$confirm(`确认删除选中的${ids.length}条数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http.del(ids).then(() => this.getData());
      });
    },
    handleDownload() {
      http.download();
    },
    async handleConfirm() {
      const data = this.form;
      const id = data.id;
      try {
        if (id == 0) {
          await http.insert(data);
        } else {
          await http.update(id, data);
        }
        await this.getData();
        this.showForm = false;
      } catch (e) {
        this.showForm = false;
        console.log(e);
      }
    },
    handleSelectionChange(val) {
      this.selected = val;
    },
    // 改变状态
    changeEnabled(data, val) {
      const opt = val == true ? "启用" : "禁用";
      this.$confirm(`此操作将${opt}${data.name}, 是否继续？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http.update(data.id, data);
        })
        .catch(() => {
          data.enabled = !data.enabled;
        });
    },
    async getData() {
      const query = {
        ...this.query,
        ...this.pagin
      };
      let res = await http.list(query);
      this.data = {
        content: res.content,
        total: res.totalElements
      };
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="stylus" scoped>
.container {
  padding: 20px;

  .header {
    padding-bottom: 20px;
  }
}
</style>
