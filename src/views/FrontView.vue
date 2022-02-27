<template>
    <div class="header">
    <h1>
      <i>H&H</i>
    </h1>
    <ul>
      <router-link to="/admin"><li>ToBackEnd</li></router-link>
      <router-link to="/"><li>Home</li></router-link>
      <router-link to="/customerProducts"><li>Product</li></router-link>
      <router-link to="/carts"><i class="fas fa-shopping-cart"></i><span class="amountOfCarts">{{amount}}</span></router-link>
    </ul>
  </div>
  <router-view></router-view>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Poppins:ital,wght@0,200;0,300;1,200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Inconsolata:wght@400;500&display=swap');

$font-color-1: #273c75;
$font-color-2: rgba(179, 0, 0, 0.89);
$bg-color-1: #ecf9ff;
$bg-color-2: #fff1c5;
$shadow-1: 1px 2px 2px $font-color-1 ,-1px -1px 2px #b1b1b1;
$shadow-2: -1px -2px 2px $font-color-1,1px 1px 2px #b1b1b1;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: $font-color-1;
}
body {
  position: relative;
  scroll-behavior: smooth;
}
.header {
  display: flex;
  align-items: center;
  width: 84%;
  margin: 5px auto 0;
  height: 15%;
  padding: 0 20px;
  a {
    text-decoration: none;
  }
  h1 {
    font-size: 36px;
    cursor: pointer;
    letter-spacing: 2px;
    flex: 1;
    font-family: 'Dancing Script', cursive;
    a {
      text-decoration: none;
    }
  }
  ul {
    flex: 1;
    text-align: right;
    li {
      list-style: none;
      display: inline-block;
      margin: 0 28px;
      font-size: 18px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      position: relative;
      &::after {
        content: '';
        width: 0;
        height: 2px;
        background-color: $font-color-2;
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.3s;
      }
      &:hover::after {
        width: 60%;
      }
    }
    a.now {
      li {
        color : $font-color-2;
      }
      i {
        color : $font-color-2;
      }
    }
    i {
      font-size: 20px;
      transition: all 0.4s;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
        color: $font-color-2;
        transform: scale(1.1);
      }
    }
  }
  .amountOfCarts {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-color: $font-color-2;
    color: #fff;
    line-height: 22px;
    text-align: center;
    border-radius: 5px;
    font-size: 14px;
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
      cartData: {},
      amount: ''
    }
  },
  methods: {
    getCarts () {
      this.$http
        .get(`${this.url}/api/${this.path}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.amount = this.cartData.carts.length
        })
        .catch((err) => {
          console.dir(err)
        })
    }
  },
  mounted () {
    this.getCarts()
    emitter.on('cart-change', () => {
      this.getCarts()
    })
  }
}
</script>
