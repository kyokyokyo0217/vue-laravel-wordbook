<template>
  <div class="row">
    <div class="col-md-2 px-0">
        <div class="list-group list-group-flush">
          <!-- title colomun -->
          <div class="list-group-item list-group-item-dark d-flex justify-content-center text-center border-right">
              <div class="my-auto flex-grow-1">
                <h5 class="my-auto font-weight-bolder">Categories</h5>
              </div>
              <div class="text-right">
                <button
                  v-if="!showNewCategoryForm"
                  class="btn btn-secondary btn-sm-circle"
                  @click="showNewCategoryForm = true;"
                 ><i class="fas fa-plus"></i>
                </button>
                  <button
                    v-if="!toggled && !noCategoriesYet"
                    class="btn btn-secondary btn-sm btn-smaller"
                    @click="toggled =! toggled"
                    ><i class="fas fa-wrench"></i>
                  </button>
                  <button
                    v-if="toggled && !noCategoriesYet"
                    class="btn btn-sm btn-outline-secondary btn-smaller"
                    @click="toggled =! toggled"
                    ><i class="fas fa-times"></i>
                  </button>
              </div>
          </div>

          <!-- in case there is no category -->
          <div v-if="noCategoriesYet && !showNewCategoryForm">
            <h6 class="text-center pt-4">No Categories Yet</h6>
          </div>

          <!-- add new category -->
          <div
            v-if="showNewCategoryForm"
            class="list-group-item d-flex"
           >
           <input
            type="text"
            name="category"
            class="form-control form-control-sm mr-3"
            id="category"
            v-model="newCategory"
            v-on:keyup.enter="submit"
            >
            <button
               class="btn btn-sm btn-outline-secondary btn-smaller"
               @click="showNewCategoryForm = false;"
               ><i class="fas fa-times"></i>
            </button>
          </div>

          <!-- category-items -->
          <div v-if="!toggled">
            <div
              class="btn list-group-item list-group-item-action"
              @click="selectCategory(category)"
              v-for="(category, index) in categories"
              :key="index"
              :class="{active: category === activeCategory}"
             >{{ category.name }}
            </div>
          </div>
          <div v-if="toggled">
            <div
              class="list-group-item text-left"
              v-for="(category, index) in categories"
              :key="index"
              :class="{active: category === activeCategory}"
             >
             <div v-if="activeEditCategory !== category" class="d-flex justify-content-between">
               {{ category.name }}
               <div class="text-right">
                 <button
                   type="button"
                   class="btn btn-secondary btn-sm btn-smaller"
                   @click="selectEditCategory(category)"
                 ><i class="fas fa-pen"></i>
                 </button>
                 <button
                   type="button"
                   class="btn btn-secondary btn-sm btn-smaller"
                   @click="deleteCategory(category.id)"
                 ><i class="fas fa-trash-alt"></i>
                 </button>
               </div>
             </div>
             <div v-if="activeEditCategory === category" class="d-flex justify-content-between">
               <input
                type="text"
                name="category"
                class="form-control form-control-sm mr-3"
                id="category"
                <!-- 保存しなくても見た目的に変更されてしまう -->
                v-model="activeEditCategory.name"
                v-on:keyup.enter="update"
                >
                <button
                   class="btn btn-sm btn-outline-secondary btn-smaller"
                   @click="activeEditCategory = null"
                   ><i class="fas fa-times"></i>
                </button>
             </div>
            </div>
          </div>
        </div>
    </div>
    <div class="col-md-10 px-0">
      <word-list v-if="showWordList" :active-category="activeCategory"></word-list>
    </div>
  </div>
</template>
<script>
  import WordList from "./WordList";

  export default {
    components: {
      WordList
    },
    data() {
      return {
        categories: null,
        activeCategory: null,
        activeEditCategory: null,
        showWordList: false,
        showNewCategoryForm: false,
        newCategory: null,
        toggled: false,
        // びみょう
        noCategoriesYet: false,
      };
    },
    created() {
        this.getCategories();
    },
    methods: {
      selectCategory(category) {
        // この行が無駄
        this.showWordList = true;
        this.activeCategory = category;
      },
      selectEditCategory(category){
        this.activeEditCategory = category;
      },
      getCategories(){
        axios.get("/api/categories").then(response => {
          this.categories = response.data.data;
          if(this.categories.length === 0){
            this.noCategoriesYet = true;
          }else{
            this.noCategoriesYet = false;
          }
        });
      },
      submit(){
        axios
          .post("/api/categories", {category_name: this.newCategory});
        this.getCategories();
        this.showNewCategoryForm = false;
        this.newCategory = null;

      },
      update(){
        axios
          .patch(`/api/categories/${this.activeEditCategory.id}`, this.activeEditCategory);
        this.getCategories();
        this.activeEditCategory = null;
      },
      deleteCategory(id){
        axios
          .delete(`/api/categories/${id}`, { data: { category_id: id } });
        this.getCategories();
      },
    },
    computed: {
    }
  };
</script>
<style scoped>
.btn-smaller{
  padding: 0.1rem 0.25rem;
}
.list-group-item{
  padding-right: 0.5rem;
}
</style>
