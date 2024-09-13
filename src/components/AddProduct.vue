<template>
    <button
      type="button"
      class="btn"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal1"
    >
      Add Product
    </button>
    <div
      class="modal fade"
      id="exampleModal1"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel"> Add Product</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="Product Name"
                  v-model="payload.prodName"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="number"
                  class="form-control w-50 mx-auto"
                  placeholder="Product Amount"
                  v-model="payload.amount"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="Product Category"
                  v-model="payload.category"
                  required
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control w-50 mx-auto"
                  placeholder="Product URL"
                  v-model="payload.prodURL"
                  required
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger close"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  @click="addingProduct"
                  class="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "addProduct",
    data() {
      return {
        payload: {
          prodID: null,
          prodName: "",
          amount: null,
          category: "",
          prodURL: "",
        },
      };
    },
    methods: {
       async addingProduct() {
        try {
          await this.$store.dispatch("addProduct", this.payload);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  <style scoped>
 .close{
  color: white;  
  background-color: maroon;
}
</style>