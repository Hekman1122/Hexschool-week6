<template>
  <banner></banner>
  <div class="mid-line">
    <h1>百分百手作的堅持，只為那每一口的品質。</h1>
  </div>
</template>

<script>
import banner from '../components/BannerList.vue'
export default {
  components: {
    banner
  }
}
</script>

<style lang="scss" scoped>
$font-color-1: #273c75;
$font-color-2: rgba(179, 0, 0, 0.89);
$bg-color-1: #ecf9ff;
$bg-color-2: #fff1c5;
$shadow-1: 1px 2px 2px $font-color-1, -1px -1px 2px #b1b1b1;
$shadow-2: -1px -2px 2px $font-color-1, 1px 1px 2px #b1b1b1;

.mid-line {
  width: 70%;
  margin: 25px auto;
  font-family: 'Dancing Script', cursive;

  h1 {
    font-size: 40px;
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 15px;
    transform: skew(-18deg);
  }
}
</style>
