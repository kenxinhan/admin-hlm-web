<template>
    <div id="workspace">
        <div class="error-content">
              <div class="ivu-card ivu-card-bordered">
                  <div class="ivu-card-body">
                        <p class="error-title">4<span class="error-icon"><i class="el-icon-warning"></i></span>4</p>
                        <p class="error-message">哎呀...您访问的页面不存在</p>
                        <!-- <p class="error-btn">
                            <el-button type="success" round>返回登录页</el-button> 
                        </p> -->
                  </div>
                </div>  
        </div>
    </div>
</template>
<script>
    export default {
        name: 'notFound',
        data() {

            return {
            }
        },
        methods: {
        },
        created: function () {

        },
        mounted: function () {
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    body{
    height: 100%;
    overflow: hidden;
    color: #30313E;
    background: #F8F9FD;
    }
   #workspace{
        height: 100%;
        min-width: 1200px;
        overflow: hidden;
        .error-content{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 700px;
            height: 500px;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            .ivu-card-bordered{
                .ivu-card-body{
                    padding: 16px;
                    .error-title{
                        text-align: center;
                        font-size: 240px;
                        font-weight: 700;
                        color: #2d8cf0;
                        height: 260px;
                        line-height: 260px;
                        .error-icon{
                            display: inline-block;
                            color: #19be6b;
                            font-size: 180px;
                            -webkit-animation: identifier 3s ease 0s infinite alternate;
                            animation: identifier 3s ease 0s infinite alternate;
                            .icon-c{
                                display: inline-block;
                                font-style: normal;
                                font-weight: 400;
                                font-variant: normal;
                                text-transform: none;
                                text-rendering: auto;
                                line-height: 1;
                                -webkit-font-smoothing: antialiased;
                            }
                        }
                    }
                    .error-message{
                        display: block;
                        text-align: center;
                        font-size: 30px;
                        font-weight: 500;
                        letter-spacing: 4px;
                        color: #dddde2;
                    }
                    .error-btn{
                        text-align: center;
                        padding: 20px 0;
                        margin-bottom: 40px;
                    }
                }
            }
            .ivu-card{
                background: #fff;
                border-radius: 4px;
                font-size: 14px;
                position: relative;
                transition: all .2s ease-in-out;
            }
        }
   }
   @keyframes identifier {
        0% {
                -webkit-transform: rotateZ(0deg);
                transform: rotateZ(0deg);
        }
        20% {
                -webkit-transform: rotateZ(-60deg);
                transform: rotateZ(-60deg);
            }
        40% {
                -webkit-transform: rotateZ(-10deg);
                transform: rotateZ(-10deg);
        }
        60% {
                -webkit-transform: rotateZ(50deg);
                transform: rotateZ(50deg);
        }
        80% {
                -webkit-transform: rotateZ(-20deg);
                transform: rotateZ(-20deg);
        }
        100% {
                -webkit-transform: rotateZ(0deg);
                transform: rotateZ(0deg);
        }
   }
</style>