<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-9 px-0">
        <div class="list-group list-group-flush">
          <div class="list-group-item list-group-item-dark d-flex justify-content-center text-center">
              <div class="my-auto flex-grow-1">
                <h5 class="my-auto font-weight-bolder">Wordlist</h5>
              </div>
              <div
                class="text-right"
                ><button
                  class="btn btn-secondary btn-sm-circle"
                  @click="showAddForm = true; showEditForm = false"
                  :disabled="showAddForm"
                ><i class="fas fa-plus"></i>
                </button>
              </div>
          </div>

          <!-- in case there is no word -->
          <div v-if="noWordsYet">
            <h6 class="text-center pt-4">No Words In This Category Yet</h6>
          </div>

          <div
            class="list-group-item"
            v-for="(word, index) in words" :key="index"
          >
            <div class="d-flex justify-content-between">
              <h5 class="font-weight-bolder">{{ word.name }}</h5>
              <div class="text-right">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  @click="showEditForm = true;
                    selectWord(word)"
                  :disabled="showEditForm && word === activeWord"
                ><i class="fas fa-pen"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  @click="deleteWord(word.id)"
                ><i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <p class="ml-4 my-3">{{ word.definition }}</p>
            <p class="text-muted ml-4">{{ word.memo }}</p>
            <a v-if="word.url" :href="word.url">{{ word.url }}</a>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <edit-word v-if="showEditForm" v-model="showEditForm" :active-word="activeWord" @getWords="getWords"></edit-word>
        <add-word v-if="showAddForm" v-model="showAddForm" :active-category="activeCategory" @getWords="getWords"></add-word>
      </div>
    </div>
  </div>
</template>
<script>
import EditWord from './EditWord';
import AddWord from './AddWord';

  export default {
    components: {
      EditWord,
      AddWord
    },
    props: {
      activeCategory: {
        id: Number,
        name: String,
      }
    },
    data() {
      return {
        words: null,
        showEditForm: false,
        showAddForm: false,
        activeWord: null,
        // びみょう
        noWordsYet: false,
      };
    },
    //created()とwatch必要？
    watch: {
      activeCategory: {
        handler: function (val, oldVal) {
          this.getWords();
        },
        immediate: true,
      }
    },
    methods: {
      getWords(){
        axios
          .get(`/api/categories/${this.activeCategory.id}/words`)
          .then(response => {
            this.words = response.data.data;
            if(this.words.length === 0){
              this.noWordsYet = true;
            }else{
              this.noWordsYet = false;
            }
          });
      },
      selectWord(word) {
        this.activeWord = word;
      },
      //びみょう
      deleteWord(id) {
        axios
          .delete(`/api/categories/${this.activeCategory.id}/words/${id}`, { data: { word_id: id } })
        this.getWords();
      }
    },
  };
</script>
