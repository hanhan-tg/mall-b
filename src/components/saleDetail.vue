<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{span: 5}"
      :wrapper-col="{span: 12}"
    >
      <a-form-model-item
        ref="name"
        label="商品售价"
        prop="price"
        required
      >
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item
        label="折扣价格"
        prop="price_off"
      >
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item
        label="商品库存"
        prop="inventory"
      >
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item
        label="计量单位"
        prop="unit"
      >
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item
        class="next-btn"
        label=" "
      >
        <a-upload
          :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avator"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
      <a-form-model-item class="next-btn" label="" :wrapperCol="{span: 20}">
            <a-button type='default' @click="prev">上一步</a-button>
            <a-button type='primary' @click="next">提交</a-button>
        </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form'],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      rules: {

      },
      fileList: [
      ],
      loading: false,
    };
  },
  methods: {
    next() {
      this.$emit('next', this.form);
    },
    prev() {
      this.$emit('prev');
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(obj.originFileObj);
      }
      this.previewImage = obj.url || obj.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      console.log('handleChange');
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
  },
};
</script>

<style>
</style>
