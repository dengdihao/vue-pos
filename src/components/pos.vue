<template>
  <div>
    <el-row>
      <el-col :span="8" class="pos-order" ref="orderlist">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsName" label="商品"></el-table-column>
              <el-table-column prop="count" label="数量" width="70"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="delSingleGoods(scope.row)" type="text" size="small">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="totalDiv">
              <small>数量：</small>
              {{totalCount}} &nbsp;&nbsp;
              <small>金额：</small>
              {{totalMoney}}
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods">删除</el-button>
              <el-button type="success" @click="checkout">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="16">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="(goods, index) in oftenGoods" :key="index" @click="addOrderList(goods)">
                <span>{{ goods.goodsName }}</span>
                <span class="o-price">{{ goods.price }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tabs>
              <el-tab-pane label="汉堡">
                <ul class="cookList">
                  <li
                    v-for="(goods, index) in type0Goods"
                    :key="index"
                    @click="addOrderList(goods)"
                  >
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class="cookList">
                  <li v-for="(goods, index) in type1Goods" :key="index">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class="cookList">
                  <li v-for="(goods, index) in type2Goods" :key="index">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class="cookList">
                  <li v-for="(goods, index) in type3Goods" :key="index">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {_getOftenGoods,_getTypeGoods} from '../services/service.js'

export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: null,
      type1Goods: null,
      type2Goods: null,
      type3Goods: null,
      totalMoney: 0,
      totalCount: 0
    };
  },
  mounted() {
    var orderHeight = document.body.clientHeight;
    this.$refs.orderlist.$el.style.height = orderHeight + "px";
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },

    addOrderList(goods) {
      this.totalCount = 0; //汇总数量清0
      this.totalMoney = 0;
      // 商品是否已经存在与订单例列表
      let isHave = false;

      // 判断是否这个商品已经存在于订单列表
      this.tableData.forEach((item, index) => {
        if (this.tableData[index].goodsId === goods.goodsId) {
          isHave = true;
        }
      });

      if (isHave) {
        //存在就进行数量添加
        let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        //不存在就推入数组
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }

      //进行数量和价格的汇总计算
      this.getAllMoney();
    },

    // 删除单个商品
    delSingleGoods(goods) {
      this.tableData = this.tableData.filter(
        item => item.goodsId != goods.goodsId
      );
      this.getAllMoney();
    },
    // 进行数量和价格的汇总计算
    getAllMoney() {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.tableData) {
        this.tableData.forEach(item => {
          this.totalCount += item.count;
          this.totalMoney = this.totalMoney + item.price * item.count;
        });
      }
    },
    // 删除所有商品
    delAllGoods() {
      this.tableData = [];
      this.totalCount = 0;
      this.totalMoney = 0;
    },
    // 模拟结账
    checkout(){
      if (this.totalCount!=0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;

        this.$message({
          message:'结账成功，感谢您！！！',
          type:'success'
        })
      }else{
        this.$message({
          message:'不能为空！！！',
          type:'error'
        })
      }
    }
  },
  created() {
    _getOftenGoods().then(res=>{
      console.log(res);
        this.oftenGoods = res.data;
    }).catch(err=>{
        console.log(err);
      alert("网络错误，不能访问");
    })

    _getTypeGoods().then(res=>{
      console.log(res);
        this.type0Goods = res.data[0];
        this.type1Goods = res.data[1];
        this.type2Goods = res.data[2];
        this.type3Goods = res.data[3];
    }).catch(err=>{
        console.log(err);
      alert("网络错误，不能访问");
    })
  }
};
</script>

<style lang="less" scoped>
.pos-order {
  background: #f9fafc;
  border-right: 1px solid #c0ccda;
  height: 100%;
  text-align: center;
  padding: 10px;
  .div-btn {
    margin-top: 10px;
  }
  .totalDiv {
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #d3dce6;
  }
}

.often-goods {
  .title {
    height: 20px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
    text-align: left;
  }

  .often-goods-list {
    ul {
      list-style: none;

      li {
        float: left;
        border: 1px solid #e5e9f2;
        padding: 10px;
        margin: 10px;
        background-color: #fff;
        border-radius: 1px;
        cursor: pointer;
        .o-price {
          color: #5887ff;
        }
      }
    }
  }
}

.goods-type {
  clear: both;
  padding: 10px;
  .cookList {
    list-style: none;

    li {
      width: 23%;
      border: 1px solid #e5e9f2;
      height: auto;
      overflow: hidden;
      background-color: #fff;
      padding: 2px;
      float: left;
      margin: 2px;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      span {
        display: block;
      }

      .foodImg {
        width: 40%;
        padding: 5px;
      }

      .foodName {
        // font-size: 1rem;
        padding-left: 10px;
        // padding-top: 10px;
        color: brown;
        font-size: .9rem;
      }

      .foodPrice {
        font-size: .9rem;
        padding-left: 10px;
        // padding-top: 10px;
      }
    }
  }
}
</style>
