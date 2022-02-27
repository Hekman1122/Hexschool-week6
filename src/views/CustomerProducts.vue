<template>
  <div class="nav">
    <h1>
      <span>產品分類</span>
    </h1>
    <ul>
      <li @click="filter = ''" :class="{ active: filter === '' }">全部</li>
      <li @click="filter = '蛋糕'" :class="{ active: filter === '蛋糕' }">
        蛋糕
      </li>
      <li @click="filter = '小點'" :class="{ active: filter === '小點' }">
        點心
      </li>
      <li @click="filter = '甜甜圈'" :class="{ active: filter === '甜甜圈' }">
        甜甜圈
      </li>
    </ul>
  </div>
  <div class="product-list">
    <div class="card" v-for="item in productFilter" :key="item.id">
      <h2>{{ item.title }}</h2>
      <div class="col-1">
        <img :src="item.imageUrl" />
      </div>
      <div class="col-2">
        <h3>{{ item.description }}</h3>
        <h3 class="profile">
          <span>價格 : {{ item.price }}元</span>
          <span>數量 : {{ item.num }}個</span>
          <router-link :to= "`/customerProducts/${item.id}`"><span>更多..</span></router-link>
        </h3>
      </div>
      <button @click='addToCart($event,item.id)'>加入購物車</button>
    </div>
  </div>
</template>
<style lang="scss">
$font-color-1: #273c75;
$font-color-2: rgba(179, 0, 0, 0.89);
$bg-color-1: #ecf9ff;
$bg-color-2: #fff1c5;
$shadow-1: 1px 2px 2px $font-color-1, -1px -1px 2px #b1b1b1;
$shadow-2: -1px -2px 2px $font-color-1, 1px 1px 2px #b1b1b1;
.nav {
  display: flex;
  align-items: center;
  width: 70%;
  margin: 15px auto;
  height: 16%;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  border-bottom: 2px solid $font-color-2;
  h1 {
    font-size: 28px;
    letter-spacing: 2px;
    color: $font-color-1;
    flex: 0.5;
  }
  ul {
    flex: 1;
    text-align: left;
    li {
      color: $font-color-1;
      text-align: center;
      list-style: none;
      width: 156px;
      height: 50px;
      line-height: 50px;
      display: inline-block;
      font-size: 22px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      transition: all 0.4s;
      border-radius: 10px;
      &:hover {
        background-color: $bg-color-2;
        color: $font-color-2;
      }
      &.active {
        background-color: $bg-color-2;
        color: $font-color-2;
      }
    }
  }
  .cartTitle {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    span {
      &:first-child {
        flex: 1;
      }
      &:last-child {
        i {
          transition: all 0.4s;
          &:hover {
            color: $font-color-2;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.product-list {
  width: 84%;
  margin: 20px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
}
.card {
  width: 400px;
  height: 540px;
  border-radius: 15px;
  border: 3px solid $bg-color-2;
  text-align: center;
  box-shadow: 1px 1px 2px #aaa, -1px -1px 2px #ccc;
  position: relative;
  a {
    text-decoration: none;
  }
  h2 {
    width: 100%;
    background-color: $bg-color-2;
    letter-spacing: 2px;
    font-size: 24px;
    height: 50px;
    border-radius: 13px;
    line-height: 50px;
  }
  .col-1 {
    text-align: center;
    margin: 20px 0;
    img {
      width: 260px;
      height: 260px;
      border-radius: 12px;
      box-shadow: $shadow-1;
      transition: all 0.4s;
    }
  }
  .col-2 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;
    h3 {
      width: 90%;
      padding: 0 10px;
    }
    .profile {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 10px auto;
      width: 90%;
      padding: 0 10px;
      span {
        flex: 1;
      }
      span:last-child {
        cursor: pointer;
        color: $font-color-2;
        transition: all 0.4s;
        font-size: 16px;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
  button {
    background: transparent;
    outline: none;
    color: $font-color-1;
    border: 2px solid $font-color-1;
    background-color: $bg-color-2;
    padding: 10px;
    font-size: 18px;
    border-radius: 10px;
    width: 120px;
    transition: all 0.4s;
    opacity: 0.8;
    height: 50px;
    line-height: 30px;
    margin-top: 10px;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      opacity: 1;
      box-shadow: 1px 1px 2px #555;
    }
  }
  button.disable {
    pointer-events: none;
    cursor: default;
    opacity: 0.2;
  }
}
</style>
<script>
import emitter from '@/library/emitter.js'
export default {
  data () {
    return {
      url: process.env.VUE_APP_URL,
      path: process.env.VUE_APP_PATH,
      products: [],
      filter: ''
    }
  },
  computed: {
    productFilter () {
      if (this.filter) {
        const newP = []
        this.products.forEach((item) => {
          if (item.category === this.filter) {
            newP.push(item)
          }
        })
        return newP
      }
      return this.products
    }
  },
  methods: {
    getProducts () {
      this.$http
        .get(`${this.url}/api/${this.path}/products/all`)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    addToCart (e, id, qty = 1) {
      const data = {
        product_id: id,
        qty: qty
      }
      e.target.classList.add('disable')
      this.$http
        .post(`${this.url}/api/${this.path}/cart`, { data })
        .then((res) => {
          alert('已加入購物車')
          emitter.emit('cart-change')
          e.target.classList.remove('disable')
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
