<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showEditDialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      :model="forms"
      :rules="rules"
      ref="editForms"
      class="edit-forms"
      label-position="left"
      :label-width="labelWidth"
    >
      <el-form-item label="网关IP" prop="ip">
        <el-input v-model="forms.name"
          placeholder="请填入短信网关服务器IP"
        ></el-input>
      </el-form-item>
      <el-form-item label="网关端口" prop="port">
        <el-input
          v-model="forms.port"
          placeholder="请填入短信网关服务器端口"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业服务号码" prop="ispno">
        <el-input v-model="forms.desc" placeholder="请填入短信网关企业服务号码"></el-input>
      </el-form-item>
      <el-form-item label="连接密码" prop="password">
        <el-input v-model="forms.url" placeholder="请填入短信网关连接密码"></el-input>
      </el-form-item>
      <el-form-item label="超时时间(秒)" prop="timeout">
        <el-input v-model="forms.phone" placeholder="请填入发送短信超时时间,默认30秒"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  Required,
  Url,
  Float2,
  RequiredAndPhone,
  StrongPassword,
  FillerFieldRules
} from "@/utils/validateRules";

import { fillerLeft, resetObject } from "@/utils/common";

export default {
  props: {
    title: {
      type: String,
      default: "短信网关服务器配置"
    },
    dialogWidth: {
      type: String,
      default: "700px"
    },
    labelWidth: {
      type: String,
      default: "120px"
    },
    showEditDialog: Boolean
  },
  data() {
    return {
      forms: {
        name: "",
        desc: "",
        test: "",
        url: "",
        phone: "",
        password: ""
      },
      rules: {
        ...FillerFieldRules(["ip", "port","ispno","password"], Required),
        phone: RequiredAndPhone, //or [Required, Phone]
        url: [Required, Url],
        test: Float2,
        password: [Required, StrongPassword]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.editForms.validate(valid => {
        if (valid) {
          this.$message({
            message: "字段验证通过，提交请求，成功后刷新分页！",
            type: "success"
          });
          this.$emit("success"); //通知列表分页刷新
          // add(this.forms)
          //   .then(r => {
          //     this.$message({
          //       message: "创建机构成功！",
          //       type: "success"
          //     });
          //     this.$emit("success");
          //   })
          //   .catch(() => {});
        } else {
          this.$message({
            message: "请按照提示正确填写内容！",
            type: "warning"
          });
          return false;
        }
      });
    },
    openDialog() {
      resetObject(this.forms);
      this.$set(this.forms, "id", null);
      this.$refs.editForms.resetFields();
    },
    FillerFormField(id, data) {
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      this.$set(this.forms, "id", id);
      fillerLeft(this.forms, data);
    }
  }
};
</script>
