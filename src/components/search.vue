<template>
  <div class="search_box">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label='检索关键字'>
        <a-input
          v-model="searchForm.searchWord"
          placeholder="请输入关键字"
        >
        </a-input>
      </a-form-model-item>
      <a-form-model-item label='商品类目'>
        <a-select
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="c in categoryList"
            :value="c.id"
            :key="c.id"
          >
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/category';

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
      categoryList: [],
    };
  },
  created() {
    api.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    // 提交表单的时候触发
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less" scoped>
.search_box {
  padding: 10px 30px;
}
</style>
