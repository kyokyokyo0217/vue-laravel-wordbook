<template>
  <div>
    <div class="d-flex my-3">
      <h6 class="text-secondary font-weight-bolder my-auto flex-grow-1 text-center">Edit</h6>
      <div class="text-right">
        <button
         class="btn btn-sm btn-outline-secondary"
         @click="hideEditForm"
         ><i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="form-group mt-4">
      <label for="word">Word</label>
      <input
        type="text"
        name="word"
        class="form-control" id="word"
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
      <label for="memo">Memo</label>
      <textarea
        name="memo"
        class="form-control"
        id="memo" rows="4"
        v-model="word.memo"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="url">Link</label>
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
    activeWord: {
      id: Number,
      name: String,
      definition: String,
      memo: String,
      url: String,
      categoryId: Number,
    }
  },
  data() {
    // propsをdataに代入したい！！！
    return {
      word: {
        id: '',
        name: '',
        definition: '',
        memo: '',
        url: '',
      },
    }
  },
  // computedの方が適切？
  watch: {
    activeWord: {
      handler: function (val, oldVal) {
        this.word.id = this.activeWord.id;
        this.word.name = this.activeWord.name;
        this.word.definition = this.activeWord.definition;
        this.word.memo = this.activeWord.memo;
        this.word.url = this.activeWord.url;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    hideEditForm () {
      this.$emit('input');
    },
    submit() {
      axios
        .patch(`/api/categories/${this.activeWord.categoryId}/words/${this.activeWord.id}`, this.word);
      this.hideEditForm();
      this.$emit('getWords');
    }
  },
}
</script>
