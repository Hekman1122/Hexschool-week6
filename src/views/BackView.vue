<template>
    <div class="header">
    <h1>
      <i>商品管理介面</i>
    </h1>
    <ul>
      <router-link to="/"><li>ToFrontEnd</li></router-link>
      <router-link to="/admin/products"><li>Products</li></router-link>
      <li @click='signOut'>Log-Out</li>
    </ul>
  </div>
  <router-view v-if="checkState"></router-view>
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
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      checkState: false
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexSchool\s*=\s*([^;]*).*$)|^.*$/,
        '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        const url = `${process.env.VUE_APP_URL}`
        this.$http.post(`${url}/api/user/check`)
          .then((res) => {
            this.checkState = true
          })
          .catch((error) => {
            alert('請先登入')
            console.log(error.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('尚未登入')
        this.$router.push('/login')
      }
    },
    signOut () {
      document.cookie = 'hexSchool=;expires=;'
      alert('用戶已登出')
      this.$router.push('/login')
    }
  }
}
</script>
