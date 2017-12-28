<template>
  <el-form :model="model"
           :rules="rules"
           @submit="submit">
    <el-form-item label="UserName"
                  prop="userName">
      <el-input placeholder="Please enter userName."
                v-model="model.userName"></el-input>
    </el-form-item>
    <el-form-item label="Password"
                  prop="pwd">
      <el-input type="password"
                placeholder="Please enter password."
                v-model="model.pwd" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      model: {
        userName: '',
        pwd: '',
      },
      rules: {
        userName: [
          {
            required: true,
            trigger: 'blur',
            message: 'required.',
          },
        ],
        pwd: [
          {
            required: true,
            trigger: 'blur',
            message: 'required.',
          },
        ],
      },
    }
  },
  methods: {
    submit() {
      this.$message.success('login success.')
    },
  },
}
</script>
