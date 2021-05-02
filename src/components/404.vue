<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div id="background"></div>
      <div class="content">
        <h1 style="padding-top: 250px;color: white">{{ message }}</h1>
        <h3 style="padding-top: 40px;color: red">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</h3>
        <div>
          <mu-button class="demo-button" @click="back" color="error">
            <mu-ripple class="mu-ripple-demo demo-2" :opacity="0.7">
              返回首页
            </mu-ripple>
          </mu-button>
        </div>

      </div>

      <h3 class="footer">Copyright © 2020-2021 Yifelix All Rights Reserved.</h3>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Page404',
    computed: {
      message() {
        return '网管说这个页面你不能进......'
      }
    },
    methods: {
      back() {
        this.$router.push({path: '/'})
      }
    }
  }
</script>

<style scoped>
  #background {
    background: url("../assets/404_images/404.png");
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }
  .wscn-http404-container{
    margin: 0;
    padding: 0;
  }
  .content{
    width: 100%;
    position: fixed;
    text-align: center;
  }
  .footer {
    text-align: center;
    color: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
</style>
