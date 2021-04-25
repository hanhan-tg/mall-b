<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{span: 5}"
      :wrapper-col="{span: 12}"
    >
      <a-form-model-item
        ref="name"
        label="标题"
        prop="title"
        required
      >
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item
        label="商品描述"
        prop="desc"
      >
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item
        label="商品类目"
        required
        prop="category"
      >
        <a-select
          v-model="form.category"
          placeholder="请选择商品类别"
          @change="changeCategory"
        >
          <a-select-option
            :value="c.id"
            :key="c.id"
            v-for="c in categoryList"
          >
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select
          v-model="form.c_items"
          placeholder="请选择子类目"
        >
          <a-select-option
            :value="c"
            :key="c"
            v-for="c in categoryItems"
          >
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        label="商品标签"
        prop="tags"
        required
      >
        <a-select
          mode="tags"
          placeholder="Please select"
          :default-value="['包邮最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value='包邮，最晚次日达'>
            包邮最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
        <a-form-model-item class="next-btn" label="" :wrapperCol="{span: 20}">
            <a-button type='primary' @click="next">下一步</a-button>
        </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  props: ['form'],
  data() {
    return {
      rules: {},
      categoryList: [],
      categoryItems: [],
    };
  },
  created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      console.log('category');
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          console.log('下一步');
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>

<style lang='less'>
.basic-detail{
    .next-btn{
        text-align: center;
    }
}
</style>
