<template>
    <div class="page">
        <ul>
            <li :class='{disable : !pages.has_pre}' @click='toPrev'>
                Prev
            </li>
            <li class="mid" :class='{active : page === pages.current_page}' v-for="page in pages.total_pages" :key='page +333' @click='$emit("change-page" , page)'>
            {{page}}
            </li>
            <li :class='{disable : !pages.has_next}' @click='toNex'>
                Next
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    .page ul {
        display:flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .page li{
        list-style: none;
        border: 1px solid #30336b;
        padding:2px 6px;
        cursor: pointer;
        opacity: 0.8;
        transition:all 0.5s;
    }
    .page li:hover{
        opacity: 1;
    }
    .page li.mid{
        width:30px;
    }
    .page li:first-child{
        border-radius: 8px 0 0 8px;
    }
    .page li:last-child{
        border-radius: 0 8px 8px 0;
    }
    .page .disable {
        color:#636e72;
    }
    .page .active {
        color:#fff;
        background-color:#3b3f97;
    }
</style>

<script>
export default {
  props: ['pages'],
  emits: ['change-page'],
  methods: {
    toPrev () {
      if (this.pages.has_pre) {
        this.$emit('change-page', this.pages.current_page - 1)
      }
    },
    toNex () {
      if (this.pages.has_next) {
        this.$emit('change-page', this.pages.current_page + 1)
      }
    }
  }
}
</script>
