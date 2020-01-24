<template>
  <div>
    <div class="d-flex my-3">
      <h6 class="text-secondary font-weight-bolder my-auto flex-grow-1 text-center">Add Word</h6>
      <div class="text-right">
        <button
         class="btn btn-sm btn-outline-secondary"
         @click="hideAddForm"
         ><i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="form-group mt-4">
      <label for="word">Word</label>
      <input
        type="text"
        name="word"
        class="form-control"
        id="word"
        v-model="word.name"
      >
    </div>
    <div class="form-group">
      <label for="definition">Definition</label>
      <textarea
        name="definition"
        class="form-control"
        id="definition"
        rows="3"
        v-model="word.definition"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="memo">Memo (Optional)</label>
      <textarea
        name="memo"
        class="form-control"
        id="memo" rows="4"
        v-model="word.memo"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="url">Link (Optional)</label>
      <input
        type="url"
        name="url"
        class="form-control"
        id="url"
        v-model="word.url"
      >
    </div>
    <button
      class="btn btn-lg btn-primary btn-block"
      @click="submit"
    >Submit</button>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean,
    activeCategory: {
      id: Number,
      name: String,
    }
  },
  data() {
    return {
      word: {
        name: '',
        definition: '',
        memo: '',
        url: '',
        categoryId: '',
      },
    }
  },
  watch: {
    activeCategory: {
      handler: function (val, oldVal) {
        this.word.categoryId = this.activeCategory.id;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    hideAddForm () {
      this.$emit('input');
    },
    submit() {
      axios
        .post(`/api/categories/${this.activeCategory.id}/words`, this.word);
      this.hideAddForm();
      this.$emit('getWords');
    }
  },
}
</script>
