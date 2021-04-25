<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current === 0" @next="next" :form="form"></basic-detail>
      <sale-detail v-else @next="next" @prev="prev" :form="form"></sale-detail>
    </div>
  </div>
</template>
<script>
import basicDetail from '@/components/basicDetail.vue';
import saleDetail from '@/components/saleDetail.vue';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
    };
  },
  components: {
    basicDetail,
    saleDetail,
  },
  methods: {
    next(form) {
      console.log(form);
      this.form = {
        ...this.form,
        ...form,
      };
      if (this.current === 1) {
        console.log('111');
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped lang='less'>
.product-detail{
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
  .product-steps{
    width: 50%;
    margin: 20px auto;
  }
}
</style>
