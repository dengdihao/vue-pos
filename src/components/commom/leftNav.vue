<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="icon iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="icon iconfont icon-tongji"></i>
        <div>统计</div>
      </li>
      <li>
        <i class="icon iconfont icon-shezhi"></i>
        <div>设置</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "leftNav",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.left-nav {
  color: #ffffff;
  font-size: .9rem;
  height: 100%;
  background-color: #1d8ce0;
  float: left;
  width: 5%;

  ul {
    padding: 0px;
    margin: 0px;
    list-style: none;

    li {
      text-align: center;
      border-bottom: 1px solid #20a0ff;
      padding: 10px;
    }
  }
}

.iconfont {
  font-size: 1rem;
}
</style>
