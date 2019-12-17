<template>
  <div class="ChargeBox">
     <el-dialog
        title="打印"
        :visible.sync="dialogVisible_billprint"
        width="30%">
        <div id="wrap_a" ref="printBill" class="printBox wrap">
         <div style="font-size: 18px;text-align:center">{{billDetail.merchantName}}收费单据</div>
         <br>
         <table>
             <tr>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>病历号：{{patientDetail.caseNo}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;">
                     <span>姓名：{{patientDetail.name}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>单据编号：{{billDetail.billNo}}</span>
                 </td>
             </tr>
             <tr>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">收费项目</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">单价</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">数量</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">单位</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">折扣%</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">金额</td>
             </tr>
             <tr v-for="(item,index) in billDetail.details" :key="index">
                 <td style="border-left: 1px solid #eeeeee;">{{item.projectName}}</td>
                 <td>{{item.unitPrice / 100}}</td>
                 <td>{{item.itemNum}}</td>
                 <td>{{item.projectUnit}}</td>
                 <td>{{item.itemDisUnitPrice / 100 }}</td>
                 <td style="border-right: 1px solid #eeeeee;">{{item.itemDiscountAmount / 100}}</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;" height="60" colspan="6"></td>
             </tr>
             <tr>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>本次费用：{{billDetail.originalAmount / 100}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee">
                     <span>整单折扣：{{billDetail.discountNum / 100}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>本次应收：{{billDetail.reallyAmount / 100}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="2" style="border-left: 1px solid #eeeeee;">
                     <span>整单优惠：{{(billDetail.originalAmount - billDetail.reallyAmount) / 100}}</span>
                 </td>
                 <td colspan="2">
                     <span>欠费：{{billDetail.debtAmount / 100}}</span>
                 </td>
                 <td colspan="2" style="border-right: 1px solid #eeeeee;">
                     <span>实收：{{billDetail.payAmount / 100}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="6" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>备注：{{billDetail.remark}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>收款人：{{billDetail.remark2}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;">
                     <span>收款时间：{{billDetail.payTime}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>收款方式：{{billDetail.remark3}}</span>
                 </td>
             </tr>
         </table>
     </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelCancelBillModal">取 消</el-button>
        <el-button type="primary" @click="handleConfirmPrintBill">打印</el-button>
     </span>
    </el-dialog>
     <el-dialog
        title="打印"
        :visible.sync="dialogVisible_returnprint"
        width="30%">
        <div id="wrap_b" ref="printReturn" class="printBox wrap">
         <div style="font-size: 18px;text-align:center">{{payRecordInfo.billOperate ? payRecordInfo.billOperate.merchantName : ''}}收费单据</div>
         <br>
         <table>
             <tr>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>病历号：{{patientDetail.caseNo}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>姓名：{{patientDetail.name}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="2" style="border-left: 1px solid #eeeeee;">
                     <span>就诊时间：{{payRecordInfo.billOperate ? payRecordInfo.billOperate.clinicTime : ''}}</span>
                 </td>
                 <td colspan="2" style="border-right: 1px solid #eeeeee;">
                     <span>单据编号：{{payRecordInfo.billOperate ? payRecordInfo.billOperate.billCode : ''}}</span>
                 </td>
             </tr>
             <tr>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">交易类型</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">应收</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">实收</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">退费</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;">
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'PAY' : ''">收费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'DEBT' :''">收欠费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'REFUND' :''">退款</span>
                 </td>
                 <td>{{payRecordInfo.payment ? payRecordInfo.payment.receivableAmt : ''}} </td>
                 <td>{{ payRecordInfo.payment ? payRecordInfo.payment.billPayAmount :''}}</td>
                 <td style="border-right: 1px solid #eeeeee;">{{payRecordInfo.paymentpayAmount}}</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;" height="60" colspan="6"></td>
             </tr>
             <tr>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>退费人：{{payRecordInfo.billOperate?payRecordInfo.billOperate.memberNameGuid:''}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>退费时间：{{payRecordInfo.billOperate?payRecordInfo.billOperate.createDate:''}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="4" style="border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>退费方式：{{payRecordInfo.payment?payRecordInfo.payment.payTypeName:''}}</span>
                 </td>
             </tr>
         </table>
     </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelCancelBillModal">取 消</el-button>
        <el-button type="primary" @click="handleConfirmPrintReturn">打印</el-button>
     </span>
    </el-dialog>
     <el-dialog
        title="打印"
        :visible.sync="dialogVisible_collectprint"
        width="30%">
        <div id="wrap_c" ref="printCollect" class="printBox wrap">
         <div style="font-size: 18px;text-align:center">{{payRecordInfo.billOperate ? payRecordInfo.billOperate.merchantName : ''}}收费单据</div>
         <br>
         <table>
             <tr>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>病历号：{{patientDetail.caseNo}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;">
                     <span>姓名：{{patientDetail.name}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>单据编号：{{payRecordInfo.billOperate ? payRecordInfo.billOperate.billCode :''}}</span>
                 </td>
             </tr>
             <tr>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">交易类型</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">应收欠费</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">欠费折扣</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">折后欠费</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">实收</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">欠费</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;">
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'PAY' : ''">收费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'DEBT' :''">收欠费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'REFUND' :''">退款</span>
                 </td>
                 <td>{{payRecordInfo.payment && payRecordInfo.payment.receivableAmt ? payRecordInfo.payment.receivableAmt / 100 : ''}}</td>
                 <td>{{payRecordInfo.billOperate && payRecordInfo.billOperate.discountNum ? payRecordInfo.billOperate.discountNum / 100: ''}}</td>
                 <td>{{payRecordInfo.billOperate && payRecordInfo.billOperate.debtAmt ? payRecordInfo.billOperate.debtAmt / 100 : ''}}</td>
                 <td>{{payRecordInfo.billOperate && payRecordInfo.billOperate.payAmount ? payRecordInfo.billOperate.payAmount / 100 : '' }}</td>
                 <td style="border-right: 1px solid #eeeeee;">{{payRecordInfo.payment ? ((payRecordInfo.payment.receivableAmt -payRecordInfo.billOperate.payAmount ) / 100  > 0 ? (payRecordInfo.payment.receivableAmt -payRecordInfo.billOperate.payAmount ) / 100 : 0 ): '' }}</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;" height="60" colspan="6"></td>
             </tr>
             <tr>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>收款人：{{payRecordInfo.payment ? payRecordInfo.payment.recieverName : ''}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;">
                     <span>交易时间：{{payRecordInfo.payment ? payRecordInfo.payment.createDate : ''}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>收款方式：{{payRecordInfo.payment ? payRecordInfo.payment.payTypeName : ''}}</span>
                 </td>
             </tr>
         </table>
     </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelCancelBillModal">取 消</el-button>
        <el-button type="primary" @click="handleConfirmPrintCollect">打印</el-button>
     </span>
    </el-dialog>
     <div class="topHeader clearfix">
         <div class="pull-left">
             <el-radio-group v-model="radioChecked" @change="handelListTypeTogle">
                <el-radio-button label="billrecord">账单记录</el-radio-button>
                <el-radio-button label="payrecord">支付记录</el-radio-button>
            </el-radio-group>
         </div>
         <div class="pull-right">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreateBill">新建账单</el-button>
            <!-- <el-button type="success" icon="el-icon-tickets">收欠费</el-button> -->
         </div>
     </div>

     <!-- 创建账单 -->
     <CreateBill v-if="isShowCreateBill" ref="CreateBill" :patientDetail="patientDetail" :billDetail="billDetail" :operKey="operKey" @IsShowCreateBill="handleIsShowCreateBill"></CreateBill>
     <!-- 收费 -->
     <CollectArrea v-if="isShowCollectArrea" ref="CollectArrea" :currentBillRow="currentBillRow" :patientDetail="patientDetail" :operKey="operKey" @IsShowCreateBill="handleIsShowCreateBill"></CollectArrea>
     <!-- 支付记录详情 -->
     <PayRecordInfo v-if="isShowPayRecordInfo" ref="PayRecord" :payRecordInfo="payRecordInfo" :operKey="operKey" @IsShowCreateBill="handleIsShowCreateBill"></PayRecordInfo>

     <!-- 账单记录列表 -->
     <div class="billRecordBox" v-if="!isShowCreateBill && !isShowCollectArrea && !isShowPayRecordInfo && radioChecked === 'billrecord'">
         <el-tabs  v-model="activeTabName" @tab-click="handleClickTab">
            <el-tab-pane name="wait">
               <span slot="label" style="font-size: 18px"><i class="el-icon-time" style="margin-right: 10px"></i>待处理</span>
               <el-table
                    :data="waitHandleList"
                    style="width: 100%"
                    v-if="activeTabName === 'wait'"
                >
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                             <span v-if="scope.row.process === 'UNCHECK'">待审核</span>
                             <span v-if="scope.row.process === 'UNPAY'">待收费</span>
                             <span v-if="scope.row.process === 'UNREFUND'">待退费</span>
                             <span v-if="scope.row.process === 'FINISH'">已处理</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="merchantName" label="操作诊所"></el-table-column>
                    <el-table-column prop="memberNameGuid" label="创建人"> </el-table-column>
                    <el-table-column prop="createDate" label="创建时间" width="150"> </el-table-column>
                    <el-table-column prop="clinicTime" label="就诊时间" width="150"> </el-table-column>
                    <el-table-column label="类型">
                        <template slot-scope="scope">
                             <span v-if="scope.row.operateType === 'PAY'">收费</span>
                             <span v-if="scope.row.operateType === 'DEBT'">收欠费</span>
                             <span v-if="scope.row.operateType === 'REFUND'">退款</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="doctorName" label="医生"> </el-table-column>
                    <el-table-column prop="originalAmount" label="原价">
                        <template slot-scope="scope">
                            {{scope.row.originalAmount? scope.row.originalAmount / 100 : ''}}
                        </template>
                    </el-table-column>
                    <el-table-column label="应收">
                        <template slot-scope="scope">
                            {{scope.row.reallyAmount / 100}}
                        </template>
                    </el-table-column>
                    <el-table-column label="实收">
                        <template slot-scope="scope">
                            {{scope.row.payAmount / 100}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注"> </el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEditWaitBill(scope.row)">编辑</el-button>
                            <el-button type="text" v-if="scope.row.operateType === 'PAY' && scope.row.process === 'UNPAY'" @click="handleEditWaitBill(scope.row)">收费</el-button>
                            <el-button type="text" v-if="scope.row.operateType === 'DEBT' " @click="handleCollectArrea(scope.row)">收欠费</el-button>
                            <el-button type="text" v-if="scope.row.operateType === 'REFUND' && scope.row.process === 'UNREFUND'" @click="handleWaitReturnCharge(scope.row)">退费</el-button>
                            <el-button type="text" @click="handleCancelWaitBill(scope.row)">作废</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <el-pagination
                    @current-change="handlePageQueryWait"
                    :current-page="waitPagination.currentPage"
                    :page-size="waitPagination.limit"
                    background
                    layout="total, prev, pager, next"
                    :total="waitPagination.total"
                ></el-pagination>
            </el-tab-pane>
            <el-tab-pane name="already">
                <span slot="label" style="font-size: 18px"><i class="el-icon-circle-check" style="margin-right: 10px"></i>已收费</span>
                <div style="margin: 20px 0 30px 0; text-align:center">
                    <el-checkbox label="结清" value="FINISH" v-model="payStatus1" @change="handleSearchAlreadyList"></el-checkbox>
                    <el-checkbox label="欠费" value="ARREARAGE" v-model="payStatus2" @change="handleSearchAlreadyList"></el-checkbox>
                    <el-checkbox label="退费" value="RT" v-model="rtStatus" @change="handleSearchAlreadyList"></el-checkbox>
                    <el-checkbox label="作废" value="CANCEL" v-model="status" @change="handleSearchAlreadyList"></el-checkbox>
                </div>
               <el-table :data="alreadyChargeList" style="width: 100%">
                    <el-table-column prop="merchantName" label="操作诊所"></el-table-column>
                    <el-table-column prop="payTime" label="首次收费时间"></el-table-column>
                    <el-table-column label="账单状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payStatus === 'UNPAY'">待收费</span>
                            <span v-if="scope.row.payStatus === 'FINISH'">已结清</span>
                            <span v-if="scope.row.payStatus === 'ARREARAGE'">未结清</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="clinicTime" label="就诊时间"></el-table-column>
                    <el-table-column prop="remark1" label="医生"></el-table-column>
                    <el-table-column label="应收">
                        <template slot-scope="scope">
                            {{scope.row.reallyAmount / 100}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="实收">
                        <template slot-scope="scope">
                            {{scope.row.payAmount / 100}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="欠费">
                        <template slot-scope="scope">
                            {{scope.row.debtAmount / 100}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column label="操作" width="250" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="handleEditAlreadyBill(scope.row)">编辑</el-button>
                            <el-button size="mini" type="text" @click="handlePrintBill(scope.row)">打印</el-button>
                            <el-button size="mini" type="text" v-if="scope.row.status === 'NORMAL' && scope.row.rtStatus === 'RT'" @click="handleReturnCharge(scope.row)">退费</el-button>
                            <el-button size="mini" type="text" v-if="scope.row.payStatus === 'ARREARAGE' && scope.row.status === 'NORMAL'" @click="handleCollectArrea(scope.row)">收欠款</el-button>
                            <el-button size="mini" type="text" v-if="scope.row.status === 'NORMAL'" @click="handleCancelAlreadyPayBill(scope.row)">作废</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <el-pagination
                    @current-change="handlePageQueryAlready"
                    :current-page="alreadyPagination.currentPage"
                    :page-size="alreadyPagination.limit"
                    background
                    layout="total, prev, pager, next"
                    :total="alreadyPagination.total"
                ></el-pagination>
            </el-tab-pane>
         </el-tabs>
     </div>

     <!-- 支付记录列表 -->
     <div v-if="!isShowCreateBill && !isShowCollectArrea && !isShowPayRecordInfo && radioChecked === 'payrecord'">
        <div class="sumBox">
            <span>实收总额：<i class="success">{{ paymentSumObj.payAmount ? paymentSumObj.payAmount / 100 : 0}}</i></span>
            <span>欠费总额：<i class="error">{{ paymentSumObj.debtAmount ? paymentSumObj.debtAmount / 100 : 0}}</i></span>
            <span>退款总额：<i class="warning">{{paymentSumObj.rtAmount ? paymentSumObj.rtAmount / 100 : 0}}</i></span>
        </div>
        <el-table :data="payRecordList" style="width: 100%">
            <el-table-column prop="merchantName" label="操作诊所"></el-table-column>
            <el-table-column prop="createDate" label="交易时间"></el-table-column>
            <el-table-column label="交易类型">
               <template slot-scope="scope">
                   <span v-if="scope.row.bizType === 'PAY'">收费</span>
                   <span v-if="scope.row.bizType === 'DEBT'">收欠费</span>
                   <span v-if="scope.row.bizType === 'REFUND'">退款</span>
               </template>
            </el-table-column>
            <el-table-column prop="recieverName" label="收费人"></el-table-column>
            <el-table-column label="应收">
               <template slot-scope="scope">
                   {{scope.row.receivableAmt / 100}}
               </template>
            </el-table-column>
            <el-table-column label="实收">
               <template slot-scope="scope">
                   {{scope.row.payAmount / 100}}
               </template>
            </el-table-column>
            <el-table-column label="退费">
               <template slot-scope="scope">
                   {{scope.row.payAmount / 100}}
               </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="handlePayRecordInfo(scope.row)">详情</el-button>
                    <el-button type="text" v-if="scope.row.bizType === 'REFUND'" @click="handlePrintReturn(scope.row)">打印</el-button>
                    <el-button type="text" v-if="scope.row.bizType === 'DEBT'" @click="handlePrintCollect(scope.row)">打印</el-button>
                    <el-button type="text" @click="handleCancelPayRecord(scope.row)">作废</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination
            @current-change="handlePageQueryPayRecord"
            :current-page="payRecordPagination.currentPage"
            :page-size="payRecordPagination.limit"
            background
            layout="total, prev, pager, next"
            :total="payRecordPagination.total"
        ></el-pagination>
     </div>

     <!-- 退费申请 -->
     <el-dialog
        title="退费申请"
        :visible.sync="dialogVisible_return"
        width="30%">
        <br>
        <el-radio-group v-model="refundType" @change="handleReturnType" size="mini">
            <el-radio-button label="ALL">退整单</el-radio-button>
            <el-radio-button label="PART">退金额</el-radio-button>
        </el-radio-group>
        <br><br>
        <el-table
            :data="billProjectList"
            @selection-change="handleSelectionChange"
            ref="tableCheckbox"
            >
            <el-table-column prop="projectName" label="项目名称" :key="Math.random()"></el-table-column>
            <el-table-column label="单价" v-if="refundType !== 'PART'" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.unitPrice / 100}}
                </template>
            </el-table-column>
            <el-table-column prop="itemNum" label="数量" v-if="refundType !== 'PART'" :key="Math.random()"></el-table-column>
            <el-table-column label="应收" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.itemDiscountAmount}}
                </template>
            </el-table-column>
             <el-table-column label="退实收" v-if="refundType === 'PART'" :key="Math.random()">
                <template slot-scope="scope">
                   <el-input v-model="scope.row.returnReallyAmount" @keyup.native="number" placeholder="请输入内容" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="可退数量">
                <template slot-scope="scope">
                    {{scope.row.itemNum - scope.row.rtNum}}
                </template>
            </el-table-column>
            <el-table-column label="需退数量">
                <template slot-scope="scope">
                    <span>{{scope.row.returnNum}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="totalBox">
            <span>应收：{{billDetail.reallyAmount / 100}}</span>
            <span>实收：{{billDetail.payAmount / 100 }}</span>
            <span>退实收：{{ returnReallyAmount / 100}}</span>
            <span>退后应收：{{backReallyAmount / 100}}</span>
            <span>退后实收：{{backPayAmount / 100}}</span>
        </div>
        <div class="returnInfo">
            <span>退费人: {{patientDetail.name}}</span>
            <span>退费总额: <i>{{returnReallyAmount /100 }}</i></span>
        </div>
        <el-form :inline="true" ref="formReturnAmount" label-width="100px" :model="formReturnAmount" :rules="formReturnAmountRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <el-form-item label="退费方式" prop="payType">
                <el-select v-model="formReturnAmount.payType" placeholder="活动区域">
                    <el-option label="暂无" value=""></el-option>
                    <el-option v-for="item in payTypeList" :key="item.code" :label="item.lableName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退费时间"  prop="refundTimeStr">
                <el-date-picker
                    v-model="formReturnAmount.refundTimeStr"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="formReturnAmount.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancelReturnModal">关闭</el-button>
            <el-button type="primary" @click="handleSubmitApply">提交</el-button>
        </span>
      </el-dialog>

      <!-- 退费 -->
     <el-dialog
        title="退费"
        :visible.sync="dialogVisible_waitreturn"
        width="30%">
        <br>
        退款类型: <span v-if="billOperate ? billOperate.refundType ==='ALL' : ''">退整单</span><span v-if="billOperate? billOperate.refundType ==='PART' : ''">退金额</span>
        <br><br>
        <el-table
            :data="billProjectList"
            ref="tableCheckbox"
            >
            <el-table-column prop="projectName" label="项目名称" :key="Math.random()"></el-table-column>
            <el-table-column label="单价" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.unitPrice / 100}}
                </template>
            </el-table-column>
            <el-table-column prop="itemNum" label="数量" :key="Math.random()"></el-table-column>
            <el-table-column label="应收" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.itemDiscountAmount}}
                </template>
            </el-table-column>
             <el-table-column label="退实收" :key="Math.random()">
                <template slot-scope="scope">
                    {{scope.row.returnReallyAmount}}
                </template>
            </el-table-column>
            <el-table-column label="可退数量">
                <template slot-scope="scope">
                    {{scope.row.itemNum - scope.row.rtNum}}
                </template>
            </el-table-column>
            <el-table-column label="需退数量">
                <template slot-scope="scope">
                    <span>{{scope.row.returnNum}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="totalBox">
            <span>应收：{{billDetail.reallyAmount / 100}}</span>
            <span>实收：{{billDetail.payAmount / 100 }}</span>
            <span>退实收：{{ returnReallyAmount / 100}}</span>
            <span>退后应收：{{backReallyAmount / 100}}</span>
            <span>退后实收：{{backPayAmount / 100}}</span>
        </div>
        <div class="returnInfo">
            <span>退费人: {{patientDetail.name}}</span>
            <span>退费总额: <i>{{returnReallyAmount /100 }}</i></span>
        </div>
        <el-form :inline="true" ref="formReturnAmount" label-width="100px" :model="formApproveCharge" :rules="formApproveChargeRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <el-form-item label="退费方式" prop="payType">
                <el-select v-model="formApproveCharge.payType" placeholder="活动区域">
                    <el-option label="暂无" value=""></el-option>
                    <el-option v-for="item in payTypeList" :key="item.code" :label="item.lableName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退费时间"  prop="refundTimeStr">
                <el-date-picker
                    v-model="formApproveCharge.refundTimeStr"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="formApproveCharge.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancelReturnModal">关闭</el-button>
            <el-button type="primary" v-if="optType ==='REFUND'" @click="handleConfirmReturn">退费</el-button>
            <el-button type="primary" v-if="optType ==='SVAE'" @click="handleConfirmReturn">保存</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="绩效分配至"
        :visible.sync="dialogVisible_edit"
        width="30%">
        <br>
        <el-table
            :data="billProjectList"
            style="width: 100%">
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
            <el-table-column label="医生">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.doctorNo" size="mini" placeholder="请选择" class="pull-right">
                        <el-option
                            v-for="(item,index) in appVuex.shop_doctor"
                            :key="index"
                            :label="item.memberName"
                            :value="item.memberNo">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="护士">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.assistantNo" size="mini" placeholder="请选择" class="pull-right">
                        <el-option
                            v-for="(item,index) in appVuex.shop_nurse"
                            :key="index"
                            :label="item.memberName"
                            :value="item.memberNo">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="咨询师">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.advisoryNo" size="mini" placeholder="请选择" class="pull-right">
                        <el-option
                            v-for="(item,index) in appVuex.shop_advisory"
                            :key="index"
                            :label="item.memberName"
                            :value="item.memberNo">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible_edit = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveEditAlreadyBill">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="作废"
        :visible.sync="dialogVisible_cancel"
        width="30%">
        <el-form :inline="true" ref="formCancelBill" label-width="100px" :model="formCancelBill" :rules="formCancelBillRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <el-form-item label="备注" prop="remark">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="formCancelBill.remark"
                    style="width: 400px"
                    >
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancelCancelBillModal">关闭</el-button>
            <el-button type="primary" @click="handleSubmitCancelBill">作废</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {mapState } from 'vuex'
import storage from "@/tools/local_storage.js";
import CreateBill from './CreateBill'
import CollectArrea from './CollectArrea'
import PayRecordInfo from './PayRecordInfo'
// import Print from '@/tools/Print.js'

export default {
  components:{
    CreateBill,
    CollectArrea,
    PayRecordInfo
  },
  props:{
    patientNo:{
        type: String,
        default: ''
    },
    patientDetail: {
        type: Object,
        default: {}
    }
  },
  data(){
    return {
        radioChecked: 'billrecord',
        refundType: 'ALL',
        activeTabName: 'wait',
        isShowCreateBill: false,     // 新建账单/编辑账单/收费
        isShowCollectArrea: false,   // 收欠费
        isShowPayRecordInfo: false,  // 已支付列表详情
        dialogVisible_billprint: false,  // 账单打印
        dialogVisible_returnprint: false, // 退款打印
        dialogVisible_collectprint: false,  // 收欠费打印
        dialogVisible_waitreturn: false,  // 待处理列表确认退费
        isEditWaitApproval:  false,  // 已收费列表中提交退款或编辑提交退款
        operKey: 'add',              // 新建账单/编辑账单/收费唯一标识
        dialogVisible_return: false,
        dialogVisible_edit: false,
        dialogVisible_cancel: false,
        billDetail: {},
        billOperate: {},
        billProjectList: [],
        alreadyChargeList: [],
        waitHandleList: [],
        payStatus1: '',
        payStatus2: '',
        rtStatus: '',
        status: '',
        returnProList: [],
        payTypeList: [],
        cancelKey: 'already',    // 作废唯一标识
        currentBillRow: {},
        payRecordList: [],
        payRecordInfo: {},
        paymentSumObj: {},
        optType: '',
        formReturnAmount:{
          payType: '',
          refundTimeStr: '',
          remark: ''
        },
        formApproveCharge:{
          payType: '',
          refundTimeStr: '',
          remark: ''
        },
        formApproveChargeRules: {
            payType:[
              { required: true, message: '请选择收费方式', trigger: 'change' },
            ],
            refundTimeStr:[
              { required: true, message: '请选择收费时间', trigger: 'change' },
            ]
        },
        formCancelBill: {
          remark: ''
        },
        formCancelBillRules: {
            remark:[
              { required: true, message: '请输入备注', trigger: 'blur' },
            ]
        },
        formReturnAmountRules: {
            payType:[
              { required: true, message: '请选择收费方式', trigger: 'change' },
            ],
            refundTimeStr:[
              { required: true, message: '请选择收费时间', trigger: 'change' },
            ]
        },
        waitPagination: {
            currentPage: 1,
            limit: 10,
            total: 1
        },
        alreadyPagination: {
            currentPage: 1,
            limit: 10,
            total: 1,

        },
        payRecordPagination: {
            currentPage: 1,
            limit: 10,
            total: 1,

        },
        alreadySearchOptions: {
            payStatus: '',
            status:'',
            rtStatus:''
        }
    }
  },
  watch:{},
  computed:{
    ...mapState({
      appVuex: state => state["appVuex"]
    }),

    // 退实收
    returnReallyAmount: (_this) => {

       // 退金额
       if( _this.refundType === 'PART') {
           // 所有项目的退款总额
            let amount = 0
            _this.returnProList.forEach(item=>{
              amount += parseInt(item.returnReallyAmount) * 100
            })
           return amount
       } else {

           //退整单
           return  _this.billDetail.payAmount

       }

    },

    // 退后应收
    backReallyAmount: (_this) => {
        // 退金额
        if( _this.refundType === 'PART') {

            // 剩余实收金额
            let amount = (_this.billDetail.payAmount  ) - ( _this.returnReallyAmount)

            // 如果大于应付金额，返回0，如果小于，应付金额-剩余实收金额
            if( amount >= ( _this.billDetail.reallyAmount ) ) {
                return 0
            } else {
                return ( _this.billDetail.reallyAmount ) - amount
            }

        } else {
           // 退整单
           return _this.billDetail.reallyAmount
        }

    },

    // 退后实收
    backPayAmount: (_this) => {

       // 退金额
       if( _this.refundType === 'PART') {
            // 所有项目的退款总额
            let amount = 0
            _this.returnProList.forEach(item=>{
              amount += parseInt(item.returnReallyAmount ) * 100
            })

            // 实收总额 > 退款总额
            if(  _this.billDetail.payAmount > amount ) {
                return _this.billDetail.payAmount- amount
            } else {
                return 0
            }
       } else {
           // 退整单
           return 0
       }
    }
  },
  methods:{

      // 只能输入整数
      number(){　　
        let returnAmount = 0
        let amount = (this.billDetail.payAmount/100) - (this.billDetail.rtAmount / 100)
        this.billProjectList.forEach((item,index)=>{
            if( parseInt(item.returnReallyAmount) > item.itemDiscountAmount) {
                item.returnReallyAmount =  item.itemDiscountAmount
            }
            returnAmount += parseInt(item.returnReallyAmount)

            if( amount < returnAmount) {
                const num = parseInt(item.returnReallyAmount) - (returnAmount - amount)
                if(num >= 0 ){
                    if(num > item.itemDiscountAmount) {
                       item.returnReallyAmount = item.itemDiscountAmount
                    } else {
                       item.returnReallyAmount = num
                    }
                } else {
                    item.returnReallyAmount = 0
                }
            }

        })

　　  },

      // 打印账单
      handlePrintBill(row){
        this.getBillDetail(row,true,()=>{
            this.dialogVisible_billprint = true
        })
      },

      // 打印退费
      handlePrintReturn(row) {
        this.getPayRecordInfo(row,()=>{
             this.dialogVisible_returnprint = true
        })
      },

      // 打印收欠费
      handlePrintCollect(row) {
         this.getPayRecordInfo(row,()=>{
             this.dialogVisible_collectprint = true
        })
      },

      // 确定打印账单
      handleConfirmPrintBill() {
            this.$print(this.$refs.printBill)
            // Print('#wrap_a', {
            //     onStart: function () {
            //       console.log('onStart', new Date())
            //     },
            //     onEnd: function () {
            //       console.log('onEnd', new Date())
            //     }
            // })
      },

      // 确定打印退费
      handleConfirmPrintReturn() {
          this.$print(this.$refs.printReturn)
            // Print('#wrap_b', {
            //     onStart: function () {
            //       console.log('onStart', new Date())
            //     },
            //     onEnd: function () {
            //       console.log('onEnd', new Date())
            //     }
            // })
      },

      // 确定打印收欠费
      handleConfirmPrintCollect() {
          this.$print(this.$refs.printCollect)
            // Print('#wrap_c', {
            //     onStart: function () {
            //       console.log('onStart', new Date())
            //     },
            //     onEnd: function () {
            //       console.log('onEnd', new Date())
            //     }
            // })
      },

      // 列表切换
      handelListTypeTogle(val) {
        if( val === 'billrecord') {
            if( this.activeTabName === 'wait'){
                this.getWaitHandleList()
            } else {
                this.getAlreadyChargeList()
            }
        } else {
            this.getPayRecordList();
            this.getPaymentSum()
        }
        this.isShowCreateBill = false     // 新建账单/编辑账单/收费
        this.isShowCollectArrea= false  // 收欠费
        this.isShowPayRecordInfo= false  // 已支付列表详情
        this.dialogVisible_billprint= false  // 账单打印
        this.dialogVisible_returnprint= false // 退款打印
        this.dialogVisible_collectprint= false  // 收欠费打印
        this.dialogVisible_waitreturn= false  // 待处理列表确认退费
        this.isEditWaitApproval= false  // 已收费提交退款或编辑提交退款
        this.operKey = 'add'
        this.cancelKey = 'already'

      },

      // 账单记录子列表切换
      handleClickTab(tab) {
         this.activeTabName = tab.name
         if( tab.name === 'wait'){
            this.getWaitHandleList()
         } else {
            this.getAlreadyChargeList()
         }
      },

      // 取消或返回
      handleIsShowCreateBill(keyname) {
         this.isShowCreateBill = false
         this.isShowCollectArrea = false
         this.isShowPayRecordInfo = false
         this.operKey = 'add'
         if(keyname === 'wait') {
            this.activeTabName = 'wait'
            this.getWaitHandleList()
         } else if (keyname === 'already') {
            this.activeTabName = 'already'
            this.getAlreadyChargeList();
         }
      },

      // 分页1
      handlePageQueryWait(currentPage) {
        this.waitPagination.currentPage = currentPage;
        this.getWaitHandleList();
      },

      // 分页2
      handlePageQueryAlready(currentPage) {
        this.alreadyPagination.currentPage = currentPage;
        this.getAlreadyChargeList();
      },

      // 分页3
      handlePageQueryPayRecord(currentPage) {
        this.payRecordPagination.currentPage = currentPage;
        this.getPayRecordList();
      },

      // 筛选查询已收费列表
      handleSearchAlreadyList() {
          const { payStatus1,payStatus2,rtStatus,status } = this
          if( payStatus1 && !payStatus2 ) {
              this.alreadySearchOptions.payStatus = 'FINISH'
          }
          if( !payStatus1 && payStatus2 ) {
              this.alreadySearchOptions.payStatus = 'ARREARAGE'
          }
          if( payStatus1 &&  payStatus2) {
              this.alreadySearchOptions.payStatus = ''
          }
          if( !payStatus1 &&  !payStatus2) {
              this.alreadySearchOptions.payStatus = ''
          }
          if( rtStatus ) {
            this.alreadySearchOptions.rtStatus = 'RT'
          } else {
            this.alreadySearchOptions.rtStatus = ''
          }
          if( status ) {
            this.alreadySearchOptions.status = 'CANCEL'
          } else {
            this.alreadySearchOptions.status = ''
          }
          this.getAlreadyChargeList()
      },

      // 新建账单
      handleCreateBill() {
        this.isShowCreateBill = true
        this.isShowCollectArrea = false
        this.isShowPayRecordInfo = false
        if(this.operKey === 'edit'){
          this.$refs.CreateBill.clearEditData()
          this.operKey = 'add'
          this.billDetail = { }
        }
      },

      // 编辑已收费账单
      handleEditAlreadyBill(row) {
         this.getBillDetail(row,true,()=>{
            this.dialogVisible_edit = true
         })
      },

      // 编辑待处理账单
      handleEditWaitBill(row){

         // 弹出退款
         if( row.operateType === 'REFUND') {
            this.getBillDetail(row,false,()=>{
                this.getPayTypeList(()=>{
                    this.optType = 'SVAE'
                    this.dialogVisible_waitreturn = true
                })
            })
         }
         // 弹出编辑账单
         else{
            this.getBillDetail(row,false,()=>{
                this.isShowCreateBill = true
                this.isShowCollectArrea = false
                this.operKey = 'edit'
            })
         }
      },

      // 退费
      handleReturnCharge(row) {
        this.getBillDetail(row,true,()=>{
            this.getPayTypeList(()=>{
                this.dialogVisible_return = true
            })
        })
      },

      // 待处理列表退费
      handleWaitReturnCharge(row) {
        this.getBillDetail(row,false,()=>{
            this.getPayTypeList(()=>{
                this.optType = 'REFUND'
                this.dialogVisible_waitreturn = true
            })
        })
      },

      // 收欠款
      handleCollectArrea(row) {
        this.isShowCollectArrea = true
        this.isShowCreateBill = false
        this.currentBillRow = row
      },

      // 作废已收费账单
      handleCancelAlreadyPayBill(row) {
         this.dialogVisible_cancel = true
         this.currentBillRow = row
         this.cancelKey = 'already'
      },

      // 作废支付记录列表
      handleCancelPayRecord(row) {
         this.dialogVisible_cancel = true
         this.currentBillRow = row
         this.cancelKey = 'payrecord'
      },

      // 支付记录详情
      handlePayRecordInfo(row) {
        this.getPayRecordInfo(row,()=>{
            this.isShowCollectArrea = false
            this.isShowCreateBill = false
            this.isShowPayRecordInfo = true
        })
      },

      // 切换退费类型
      handleReturnType(val) {
        if( val === 'ALL' || val === 'PART') {
           this.returnProList = this.billProjectList
        } else  if( val === 'ITEM') {
           this.returnProList = []
           this.$refs.tableCheckbox.clearSelection()
        }
      },

      // 多选退费项目
      handleSelectionChange(val) {
        this.returnProList = val
      },


      // 关闭退费弹窗
      handleCancelReturnModal() {
        this.isEditWaitApproval = false
        this.dialogVisible_return = false
        this.dialogVisible_waitreturn = false
      },

      // 关闭作废弹窗
      handleCancelCancelBillModal() {
        this.dialogVisible_cancel = false
        this.currentBillRow = {}
        this.dialogVisible_billprint = false
        this.dialogVisible_returnprint = false
        this.dialogVisible_collectprint = false
      },

      // 确认退费
      handleConfirmReturn() {
         const { refundCode ,payTypeName,recieverNo,recieverName,memberNoGuid,memberNameGuid} = this.billDetail.billOperate
         const { payType,refundTimeStr ,remark} = this.formApproveCharge
         this.$http.post('/api/hx/bill/refund.do',{
           code:refundCode,
           optType: this.optType,
           payType,
           payTypeName: this.payTypeList.find(item=>item.code === payType)['lableName'],
           refundGdNo:recieverNo,
           refundGdName:recieverName,
           memberNoGuid,
           memberNameGuid,
           refundTimeStr:refundTimeStr,
           remark
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data
            if (result) {
                this.getWaitHandleList()
                this.dialogVisible_waitreturn = false
                if(this.optType === 'SAVE') {
                    this.$message({
                        type: "success",
                        message: '保存成功！'
                    })
                 } else{
                    this.$message({
                        type: "success",
                        message: '退费成功！'
                    })
                 }
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
         })
      },

      // 提交退费申请
      handleSubmitApply() {
        const {
            memberNoGuid,
            memberNameGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        const {code,payAmount, refundCode, billOperate} = this.billDetail
        const { payType,refundTimeStr ,remark} = this.formReturnAmount
        const detailsJson = this.returnProList.map(item=>({
            projectCode: item.projectCode,
            projectName: item.projectName,
            returnNum: this.refundType === 'PART' ? 0 : item.itemNum - item.rtNum,
            returnAmount: this.refundType === 'PART' ? item.returnReallyAmount : 0
        }))

        this.$refs['formReturnAmount'].validate((valid) => {
            if (valid) {
                    const formData = {
                        billCode: code,
                        payType,
                        payTypeName: this.payTypeList.find(item=>item.code === payType)['lableName'],
                        rtAmount: this.returnReallyAmount,
                        refundGdNo: this.patientDetail.code,
                        refundGdName: this.patientDetail.name,
                        refundTimeStr,
                        refundType: this.refundType,
                        memberNoGuid,
                        memberNameGuid,
                        remark,
                        detailsJson: JSON.stringify(detailsJson)
                    }
                    if( this.isEditWaitApproval ) {
                        this.$http.post('/api/hx/bill/refund/applyEdit.do',{
                            code:  billOperate.refundCode ,
                            ...formData
                        }).then(res=>{
                            const { result, errorMessage, returnObject } = res.data
                            if (result) {
                                this.$message({
                                    type: "success",
                                    message: '编辑成功！'
                                })
                                if(this.activeTabName === 'wait'){
                                    this.getWaitHandleList()
                                } else{
                                    this.getAlreadyChargeList()
                                }

                            } else {
                                this.$message({
                                    type: "error",
                                    message: errorMessage
                                });
                            }
                        })
                    } else {
                       this.$http.post('/api/hx/bill/refund/apply.do',{
                            ...formData
                        }).then(res=>{
                            const { result, errorMessage, returnObject } = res.data
                            if (result) {
                                this.$message({
                                    type: "success",
                                    message: '申请退费成功！'
                                })
                                if(this.activeTabName === 'wait'){
                                    this.getWaitHandleList()
                                } else{
                                    this.getAlreadyChargeList()
                                }
                            } else {
                                this.$message({
                                    type: "error",
                                    message: errorMessage
                                });
                            }
                        })
                    }

                    this.dialogVisible_return = false
                    this.isEditWaitApproval = false
            } else {
              console.log('error submit!!');
              return false;
            }
        })

      },


      // 账单支付类型列表
      getPayTypeList(callback) {
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          this.$http.post('/api/hx/projectPrice/payType/list.do',{
             start: (1 - 1) * 10000,
             limit: 10000,
             merchantNo: memberNoMerchant
          }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    const { total, rows } = returnObject
                    this.payTypeList = rows
                    if(callback)callback()
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
          })
      },

      // 获取支付统计
      getPaymentSum() {
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          const { code } = this.patientDetail
          this.$http.post('/api/hx/bill/payment/sum.do',{
            merchantNo:memberNoMerchant,
            patientNo: code
          }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                this.paymentSumObj = returnObject ? returnObject : {}
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
          })
      },


      // 保存编辑已收费账单
      handleSaveEditAlreadyBill() {
          const { code } = this.billDetail
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")

          const detailsJson = this.billProjectList.map(item=>({
            ...item,
            doctorName: item.doctorNo ? this.appVuex.shop_doctor.find(sssitem=>sssitem.memberNo ===item.doctorNo )['memberName'] : '',
            advisoryName: item.advisoryNo ? this.appVuex.shop_advisory.find(sssitem=>sssitem.memberNo ===item.advisoryNo )['memberName'] : '',
            assistantName: item.assistantNo ?this.appVuex.shop_nurse.find(sssitem=>sssitem.memberNo ===item.assistantNo )['memberName'] : '',
          }))
          this.$http.post('/api/hx/bill/editMember.do',{
            code,
            UpdateId: memberNoGuid,
            detailsJson: JSON.stringify(detailsJson)
          }).then(res=>{
                const { result, errorMessage, returnObject } = res.data
                if (result) {
                    this.$message({
                        type: "success",
                        message: '编辑成功！'
                    })
                    this.dialogVisible_edit = false
                    this.getAlreadyChargeList()
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
          })

      },

      // 账单详情
      getBillDetail(row,isAlready,callback) {
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")

          this.$http.post('/api/hx/bill/detail.do',{
              merchantNo:memberNoMerchant,
              code:  isAlready ? '' : row.code,
              billCode: isAlready ? row.code : row.billCode
          }).then(res=>{
                const { result, errorMessage, returnObject } =  res.data
                if(result){
                    this.billDetail = returnObject
                    this.billOperate = returnObject.billOperate
                    this.billProjectList =  returnObject.details.map(item=> ({
                        ...item,
                        returnNum:  this.isEditWaitApproval ? item.currentRtNum : item.itemNum - item.rtNum,
                        returnReallyAmount: this.isEditWaitApproval ? item.currentRtAmount : item.itemDiscountAmount / 100,
                        itemDiscountAmount: item.itemDiscountAmount / 100,
                    }))
                    this.returnProList = this.billProjectList
                    if(this.isEditWaitApproval) {
                        this.formReturnAmount = {
                            payType: returnObject.billOperate.payType,
                            refundTimeStr:  returnObject.billOperate.payTime,
                            remark:  returnObject.billOperate.remark,
                        }
                        this.refundType = returnObject.billOperate.refundType
                    } else {
                        this.number()
                    }

                    if( !isAlready ) {
                       this.formApproveCharge = {
                        payType: returnObject.billOperate.payType,
                        refundTimeStr:  returnObject.billOperate.payTime,
                        remark:  returnObject.billOperate.remark,
                       }
                    }

                    if(callback)callback()
                }else{
                    this.$message({
                      type:'error',
                      message: errorMessage
                    })
                }
          })
      },

      // 支付记录详情
      getPayRecordInfo(row,callback){
            const {
                memberNoGuid,
                memberNameGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            this.$http.post('/api/hx/bill/payment/detail.do',{
                merchantNo: memberNoGuid,
                code: row.code
            }).then(res=>{
                    const { result, errorMessage, returnObject } =  res.data
                    if(result){
                        this.payRecordInfo = returnObject
                        if(callback) callback()
                    }else{
                        this.$message({
                        type:'error',
                        message: errorMessage
                        })
                    }
            })
      },


      // 提交作废已收费账单
      handleSubmitCancelBill() {
            const {
                memberNoGuid,
                memberNameGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            const formData = {
                code: this.currentBillRow.code,
                memberNoGuid,
                memberNameGuid,
                remark: this.formCancelBill.remark
            }
            this.$refs['formCancelBill'].validate((valid) => {
                if (valid) {
                    if(  this.cancelKey === 'already' ) {
                        this.$http.post('/api/hx/bill/cancel.do',{
                            ...formData
                        }).then(res=>{
                                const { result, errorMessage } =  res.data
                                if(result){
                                    this.$message({
                                        type: "success",
                                        message: '操作成功!'
                                    })
                                    this.getAlreadyChargeList()
                                }else{
                                    this.$message({
                                    type:'error',
                                    message: errorMessage
                                    })
                                }
                        })
                    } else {
                       this.$http.post('/api/hx/bill/payment/cancel.do',{
                            ...formData
                        }).then(res=>{
                                const { result, errorMessage } =  res.data
                                if(result){
                                    this.$message({
                                        type: "success",
                                        message: '操作成功!'
                                    })
                                    this.getPayRecordList()
                                    this.getPaymentSum()
                                }else{
                                    this.$message({
                                    type:'error',
                                    message: errorMessage
                                    })
                                }
                        })
                    }

                    this.dialogVisible_cancel = false
                    this.currentBillRow = {}
            } else {
              console.log('error submit!!');
              return false;
            }
        })

      },

      // 作废待处理账单
      handleCancelWaitBill(row) {
         this.$confirm('真的要作废吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/api/hx/bill/untreatedCancel.do',{
                  code: row.code
                }).then(res=>{
                    const { result, errorMessage } =  res.data
                    if(result){
                        this.$message({
                            type: "success",
                            message: '操作成功!'
                        })
                        this.getWaitHandleList()
                    }else{
                        this.$message({
                        type:'error',
                        message: errorMessage
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消作废`
                });
            })
      },

      // 获取支付记录列表
      getPayRecordList() {
        const { currentPage , limit} = this.payRecordPagination
        const {
            memberNoGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        this.$http.post('/api/hx/bill/payment/list.do',{
            start: (currentPage - 1) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            patientNo: this.patientNo,
            billCode: ''
        }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                const { total, rows } = returnObject
                this.payRecordList = rows
                this.payRecordPagination.total = total
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                })
            }
        })
      },

      // 获取待处理列表
      getWaitHandleList() {
          const { currentPage , limit} = this.waitPagination
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          this.$http.post('/api/hx/bill/untreatedList.do',{
               start: (currentPage - 1) * limit,
               limit: limit,
               merchantNo: memberNoMerchant,
               patientNo: this.patientNo
          }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    const { total, rows } = returnObject
                    this.waitHandleList = rows
                    this.waitPagination.total = total
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    })
                }
          })
      },

      // 已收费列表
      getAlreadyChargeList() {
          const { currentPage , limit } = this.alreadyPagination
          const { payStatus,status,rtStatus } = this.alreadySearchOptions
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          this.$http.post('/api/hx/bill/haspayList.do',{
               start: (currentPage - 1) * limit,
               limit: limit,
               merchantNo: memberNoMerchant,
               patientNo: this.patientNo,
               payStatus,
               status,
               rtStatus
          }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    const { total, rows } = returnObject
                    this.alreadyChargeList = rows
                    this.alreadyPagination.total = total
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    })
                }

          })
      }
  },
  created(){},
  mounted(){
      const { radioChecked , activeTabName} = this
      if(radioChecked === 'billrecord' && activeTabName === 'wait'){
        this.getWaitHandleList()
      }
  }
}
</script>
<style lang="less" scoped>
.topHeader{
    margin: 20px 0;
}
.billRecordBox{
    .titleBox{
        font-size: 18px;
        i{
            margin-right: 10px;
        }
    }
}
.totalBox{
    text-align: center;
    span{
        display: inline-block;
        margin: 20px 30px 20px 0;
        font-size: 18px;
    }
}
.returnInfo{
    padding: 30px 0;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
    text-align: center;
    span{
        display: inline-block;
        margin-right: 100px;
        i{
            font-size: 24px;
            color: red;
        }
    }
}
.sumBox{
    font-size: 20px;
    padding: 20px 0 30px 0;
    span{
        margin-right: 50px;
        .success{
           color:#67C23A
        }
        .error{
            color: red
        }
        .warning{
            color:#E6A23C
        }
    }
}


.printBox{
    width: 100%;
    table{
        width: 100%;
    }
    tr td {
        padding: 10px;
        text-align: left;
        font-size: 12px;
    }
}
</style>
