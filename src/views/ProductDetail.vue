<template>
  <div>
    <div class="showDetail">
      <h1>產品細節</h1>
      <div class="itemContent">
        <div class="col-1">
          <img class="largepic" :src="temp.imageUrl" />
          <ul>
            <li v-for="(item, i) in temp.imagesUrl" :key="i">
              <img class="smallpic" :src="item" />
            </li>
          </ul>
        </div>

        <div class="col-2">
          <h2>
            {{ temp.title }} <span>{{ temp.category }}</span>
          </h2>
          <p>商品描述 : {{ temp.description }}</p>
          <p>商品內容 : {{ temp.content }}</p>
          <p>
            產品售價 : 超激價! {{ temp.price }}
            <span class="originPrice">{{ temp.origin_price }}</span> 個 / 元
          </p>
          <p>產品熱量 : {{ temp.calorie }}千卡</p>
          <p>尚有數量 : {{ temp.num }} {{ temp.unit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$font-color-1: #273c75;
$font-color-2: rgba(179, 0, 0, 0.89);
$bg-color-1: #ecf9ff;
$bg-color-2: #fff1c5;
$shadow-1: 1px 2px 2px $font-color-1, -1px -1px 2px #b1b1b1;
$shadow-2: -1px -2px 2px $font-color-1, 1px 1px 2px #b1b1b1;
.showDetail {
  height: 520px;
  width: 1050px;
  margin: 40px auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: $shadow-1;
  font-weight: 550;
  h1 {
    text-align: center;
    margin: 20px 0;
  }
  .itemContent {
    display: flex;
    align-items: center;
    justify-content: center;
    .col-1 {
      flex: 1;
      padding: 10px 20px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 20px;
      li {
        list-style-type: none;
        margin-bottom: 8px;
      }
      img {
        border-radius: 15px;
        box-shadow: 1px 2px 4px #000, -1px -2px 4px #95a5a6;
      }
      .largepic {
        width: 370px;
        height: 370px;
      }
      .smallpic {
        width: 180px;
        height: 180px;
      }
    }
    .col-2 {
      flex: 1;
      padding: 10px 20px;
      display: flex;
      gap: 30px;
      flex-direction: column;
      opacity: 0.85;
      h2 {
        letter-spacing: 3px;
        font-size: 30px;
        span {
          font-size: 20px;
          display: inline-block;
          background-color: $font-color-2;
          margin-left: 20px;
          width: 80px;
          text-align: center;
          padding: 5px;
          border-radius: 10px;
          color: #fdfdfd;
          line-height: 20px;
        }
      }
      p {
        font-size: 22px;
      }
      .originPrice {
        text-decoration: line-through;
      }
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      url: process.env.VUE_APP_URL,
      path: process.env.VUE_APP_PATH,
      temp: {}
    }
  },
  methods: {
    customerGetProduct () {
      const { id } = this.$route.params
      this.$http
        .get(`${this.url}/api/${this.path}/product/${id}`)
        .then((res) => {
          this.temp = {
            ...res.data.product
          }
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.customerGetProduct()
  }
}
</script>
