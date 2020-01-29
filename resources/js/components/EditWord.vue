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

    <div v-if="wordErrorMessages" class="text-danger">
      <ul v-if="wordErrorMessages.name">
        <li v-for="msg in wordErrorMessages.name" :key="msg">{{ msg }}</li>
      </ul>
      <ul v-if="wordErrorMessages.definition">
        <li v-for="msg in wordErrorMessages.definition" :key="msg">{{ msg }}</li>
      </ul>
      <ul v-if="wordErrorMessages.memo">
        <li v-for="msg in wordErrorMessages.memo" :key="msg">{{ msg }}</li>
      </ul>
      <ul v-if="wordErrorMessages.url">
        <li v-for="msg in wordErrorMessages.url" :key="msg">{{ msg }}</li>
      </ul>
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
    return {
      word: {
        name: '',
        definition: '',
        memo: '',
        url: '',
      },
    }
  },

  computed:{
    apiStatus(){
      return this.$store.state.status.apiStatus
    },
    wordErrorMessages(){
      return this.$store.state.word.wordErrorMessages
    },
  },

  // computedの方が適切？
  watch: {
    activeWord: {
      handler: function (val, oldVal) {
        this.word.name = this.activeWord.name;
        this.word.definition = this.activeWord.definition;
        this.word.memo = this.activeWord.memo;
        this.word.url = this.activeWord.url;
        this.$store.commit('word/setWordErrorMessages', null)
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    hideEditForm () {
      this.$emit('input');
    },

    async submit() {
      await this.$store.dispatch('word/updateWord', {categoryId: this.activeWord.categoryId, wordId: this.activeWord.id, word: this.word})

      if(this.apiStatus){
        this.hideEditForm();
        this.$emit('getWords');
      }
    }
  },
}
</script>
