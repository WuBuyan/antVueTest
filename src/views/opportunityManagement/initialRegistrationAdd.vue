<template>
    <a-row>
        <a-form :form="form"  @submit="handleSubmit" class="baseForm">
            <a-row style="margin-left: 10px;">
                <a-col>
                    <a-page-header title="商机信息" @back="() => $router.go(-1)">
                        <template slot="extra">
<!--                            <a-button key="1" type="primary" html-type="submit">-->
<!--                                Submit-->
<!--                            </a-button>-->
                            <a-button key="1" type="primary" html-type="submit">
                                保存
                            </a-button>
                            <a-button key="2" >
                                关闭
                            </a-button>
                        </template>
                        <div class="content">
                            <div class="main">
                                <a-descriptions size="small" :column="2">
                                    <a-descriptions-item label="状态">
                                        {{bStatus}}
                                    </a-descriptions-item>
                                </a-descriptions>
                            </div>
                        </div>
                    </a-page-header>
                </a-col>
            </a-row>
            <div>
                <a-row style="margin-left: 35px;">
                        <a-icon type="container" />
                        <span style="font-size: 15px;font-weight: 600">基本信息</span>
                </a-row>
                <a-row>
                    <a-col :span="6">
                        <a-form-item label="商机编号">
                            <a-input v-model="bId"
                                     placeholder="自动生成" disabled />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="商机名称">
                            <a-input v-decorator="['bName', { rules: [{ required: true, message: '请输入商机编号!' }] }]"
                                     placeholder="请输入"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="商机发现日期">
                            <a-date-picker v-decorator="['bFoundDate',{rules:[{required:true,message:'请选择商机发现日期!'}]}]"
                                           placeholder="请选择(年月日)"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="跟进阶段">
                            <a-select v-decorator="['bFollowStage']"
                                      placeholder="请选择项目跟进阶段">
                                <a-select-option v-for="(item,index) in bFollowStageList"
                                                 :key="item.key" :value="item.value">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="6">
                        <a-form-item label="业务分类">
                            <a-select v-decorator="['bClassification',{ rules: [{ required: true, message: '请选择业务分类!' }] },]"
                                      placeholder="请选择">
                                <a-select-option v-for="(item,index) in bClassificationList"
                                                 :key="item.key" :value="item.key">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="归属部门">
                            <a-select v-decorator="['bInDepartment']"
                                      placeholder="默认当前操作人部门（可更改）">
                                <a-select-option v-for="(item,index) in bInDepartmentList"
                                                 :key="item.key" :value="item.key" >
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="市场负责人">
                            <a-select v-decorator="['bMarketHead',{ rules: [{ required: true, message: '请选择市场负责人!' }] },]"
                                      placeholder="默认当前操作人（可更改）">
                                <a-select-option  v-for="(item,index) in bMarketHeadList"
                                                  :key="item.key" :value="item.key" >
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="是否在本部门保密"  >
                            <div>
                                <a-radio-group v-decorator="['isConfidential',{initialValue:1},{rules:[{required:true}]}]"
                                               name="radioGroup"
                                                >
                                    <!--                                :default-value="1"-->
                                    <a-radio :value="1">
                                        保密
                                    </a-radio>
                                    <a-radio :value="2">
                                        不保密
                                    </a-radio>
                                </a-radio-group>
                            </div>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="业务类型">
                            <a-select v-decorator="['bType']"
                                      placeholder="请选择（字典值，可多选）"
                                      mode="multiple">
                                <a-select-option v-for="(item,index) in bTypeList"
                                                 :key="item.key" :value="item.key">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="项目模式">
                            <a-select v-decorator="['bProjectModel']"
                                      placeholder="请选择（字典值）" >
                                <a-select-option v-for="(item,index) in bProjectModelList"
                                                 :key="item.key" :value="item.key">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="业主单位">
                            <a-input v-model="bOwnerListNameShow"
                                     placeholder="请选择"
                                     @click="showModal" >
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="投标协助人">
                            <a-select v-decorator="['bHelpers']"
                                      placeholder="请选择（多选）"
                                      mode="multiple">
                                <a-select-option v-for="(item,index) in bHelpersList"
                                                 :key="item.key" :value="item.key">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="招标计划时间">
                            <a-date-picker v-decorator="['biddingPlanTime']"
                                           placeholder="请选择(年月日)"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="项目招标额(元)">
                            <a-input-number  v-decorator="['biddingAmount']"
                                             placeholder="请输入（仅限数字、小数点）"
                                             step='0.01'
                                             style="width:100%" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="6" >
                        <a-form-item label="项目所在区域">
                            <a-cascader v-decorator="['bArea',{ rules: [{ required: true, message: '请选择项目所在区域!' }] },]"
                                        :options="bAreaOptions"
                                        @change="getbArea"
                                        placeholder="请选择（省市区）" />
                        </a-form-item>

                    </a-col>
                    <a-col :span="6" >
                        <a-form-item label="项目详细地址">
                            <a-input v-decorator="['bAddress',{ rules: [{ required: true, message: '请输入项目详细地址!' }] },]"
                                     @change="getbAddress"
                                     placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="项目完整地区">
                            <a-input placeholder="自动生成（取[项目所在地]+[项目详细地址]）"
                                     v-model="bFullLocation"
                                     disabled />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-form-item label="项目概况">
                        <a-textarea v-decorator="['basicFacts']"
                                    placeholder="请输入（富文本）"
                                    allow-clear
                                    style="width:95%"
                        />
                    </a-form-item>
                </a-row>
            </div>

            <div>
                <a-row style="margin-left: 35px;">
                    <a-icon type="usergroup-delete" />
                    <span style="font-size: 15px;font-weight: 600">可见性管理</span>
                </a-row>
                <a-row style="margin:20px 0 10px 35px;">
                    <a-button type="primary" icon="plus-circle" @click="handleAdd">
                        添加
                    </a-button>
                </a-row>
                <a-row style="margin-left: 35px;">
                    <a-table bordered :data-source="dataSource" :columns="columnsAdd" style="width:95%">
                        <template slot="name" slot-scope="text, record">
                            <editable-cell :text="text" @change="onCellChange(record.key, 'peopleVisibleName', $event)" />
                        </template>
                        <template slot="operation" slot-scope="text, record">
                            <a-popconfirm
                                    v-if="dataSource.length"
                                    title="确定删除吗?"
                                    @confirm="() => onDelete(record.key)"
                            >
                                <a href="javascript:;">删除</a>
                            </a-popconfirm>
                        </template>
                    </a-table>
                </a-row>
            </div>
        </a-form>

        <div>
            <a-modal
                    title="选择客户"
                    width="60%"
                    :visible="visible"
                    :confirm-loading="confirmLoading"
                    @ok="handleOk" okText="确定"
                    @cancel="handleCancel" cancelText="取消"

            >
                <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                    <a-row>
                        <a-col :span="8">
                            <a-form-item label="关键词">
                                <a-input v-decorator="['bOwnerId']"
                                         placeholder="请输入客户编号/客户名称"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="客户类型" >
                                <a-select v-decorator="[bOwnerCustomerType]" placeholder="请选择">
                                    <a-select-option v-for="(item,index) in bOwnerCustomerTypeList"
                                                     :key="item.key" :value="item.key">
                                        {{item.value}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-button type="primary" icon="search" style="margin-right: 15px;">
                                查询
                            </a-button>
                            <a-button icon="sync">
                                重置
                            </a-button>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-table :row-selection="rowSelection" :columns="columnsSelect" :data-source="dataSelectList">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                        </a-table>
                    </a-row>
                </a-form>
            </a-modal>
        </div>

    </a-row>
</template>

<script>
    import axios from 'axios'
    const columnsSelect = [
        {title: '客户编号',dataIndex: 'ownerId',scopedSlots: { customRender: 'ownerId' },},
        {title: '客户名称',dataIndex: 'ownerName',},
        {title: '客户类型',dataIndex: 'ownerType',},
    ];
    const columnsAdd = [
        {title: '序号',dataIndex: 'peopleVisibleId',},
        {title: '指定可见人',dataIndex: 'peopleVisibleName',width: '30%',scopedSlots: { customRender: 'peopleVisibleName' },},
        {title: '添加人',dataIndex: 'peopleAdd',},
        {title: '更新时间',dataIndex: 'addUpdateTime',},
        {title: '操作',dataIndex: 'operation',scopedSlots: { customRender: 'operation' },},
    ]
    const EditableCell = {
        template: `
          <div class="editable-cell">
            <div v-if="editable" class="editable-cell-input-wrapper">
              <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
                type="check"
                class="editable-cell-icon-check"
                @click="check"
              />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ value || ' ' }}
              <a-icon type="edit" class="editable-cell-icon" @click="edit" />
            </div>
          </div>
        `,
        props: {
            text: String,
        },
        data() {
            return {
                value: this.text,
                editable: false,
            };
        },
        methods: {
            handleChange(e) {
                const value = e.target.value;
                this.value = value;
            },
            check() {
                this.editable = false;
                this.$emit('change', this.value);
            },
            edit() {
                this.editable = true;
            },

        },
    };

    export default {
        name: "initialRegistrationAdd",
        components: {
            EditableCell,
        },
        data() {
            return {
                bStatus:'',
                // bStatusList:[],
                bId:'',
                bName:'',
                bFoundDate:'',//商机发现时间
                bFollowStage:'',//跟进阶段
                bFollowStageList:[],

                bClassification:'',//业务分类
                bClassificationList:[],
                bInDepartment:'', //所属部门
                bInDepartmentList:[],
                bMarketHead:'', //市场负责人
                bMarketHeadList:'',
                isConfidential:'', //是否保密
                isConfidentialRadio:'',

                bType:'',  //业务类型
                bTypeList:[],
                bProjectModel:'', //项目模式
                bProjectModelList:[],
                bOwner:'',//业主单位
                bOwnerList:[],
                bOwnerListName:[],
                bOwnerListNameShow:'',
                bOwnerKeyWord:'',//关键词
                bOwnerCustomerType:'',//客户类型
                bOwnerCustomerTypeList:[],

                columnsSelect,
                dataSelectList:[],
                columnsAdd,
                dataSource:[],
                bOwnerId:'',
                bOwnerName:'',
                // ModalText: 'Content of the modal',
                visible: false,//显示弹框
                confirmLoading: false,

                bHelpers:'', //协助人
                bHelpersList:[],
                biddingPlanTime:'',//招标计划时间
                biddingAmount:'',//招标额

                bArea:'',//项目区域
                bAreaOptions: [],
                bAddress:'',//详细地址
                // bFullLocation:'',//完整地区

                basicFacts:'',//项目概况


                count: 2,
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),

            };
        },
        computed:{
            bFullLocation:function () {
                console.log("bFullLocation:function");
                if(this.bArea !="" && this.bArea !=null && this.bAddress!=""&& this.bAddress!=null){
                    return this.bArea +this.bAddress;
                }
            },
            rowSelection() {
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        this.bOwnerList=selectedRows;

                    },
                    getCheckboxProps: record => ({
                        props: {
                            disabled: record.name === 'Disabled User', // Column configuration not to be checked
                            name: record.name,
                        },
                    }),
                };
            },
        },
        methods:{
            getbArea(e){
                console.log(e);
                this.bArea=e;
            },
            getbAddress(e){
                console.log(e.target.value);
                this.bAddress = e.target.value;
            },

            //展示弹框
            showModal() {
                this.visible = true;
                console.log("showModal")
            },
            handleOk(e) {
                console.log("确定");
                console.log(this.bOwnerList)
                for (let item in this.bOwnerList) {
                    console.log(this.bOwnerList[item]);
                    this.bOwnerListName.push(this.bOwnerList[item].ownerName);
                }
                this.bOwnerListNameShow=this.bOwnerListName.toString();
                console.log(this.bOwnerListName)

                this.ModalText = '弹框即将在两秒后关闭';
                this.confirmLoading = true;
                setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                }, 500);
            },
            handleCancel(e) {
                console.log('Clicked cancel button');
                this.visible = false;
            },

            //添加可见用户
            onCellChange(key, dataIndex, value) {
                const dataSource = [...this.dataSource];
                const target = dataSource.find(item => item.key === key);
                if (target) {
                    target[dataIndex] = value;
                    this.dataSource = dataSource;
                }
            },
            onDelete(key) {
                const dataSource = [...this.dataSource];
                this.dataSource = dataSource.filter(item => item.key !== key);
            },
            handleAdd() {
                const { count, dataSource } = this;
                const newData = {
                    key: count,
                    name: `Edward King ${count}`,
                    age: 32,
                    address: `London, Park Lane no. ${count}`,
                };
                this.dataSource = [...dataSource, newData];
                this.count = count + 1;
            },

            //表单提交
            handleSubmit(e) {
                e.preventDefault();
                console.log('提交',e);
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },

        },
        created() {
            axios.get('/user/inRegistrationAdd')
                .then((res)=> {
                    console.log("---res",res)
                    let result = res.data;
                    console.log(result);
                    this.bStatus = result.bStatusList.value;
                    this.bId = result.bId;
                    this.bFollowStageList = result.bFollowStageList;
                    this.bClassificationList = result.bClassificationList;
                    this.bInDepartmentList = result.bInDepartmentList;
                    this.bMarketHeadList = result.bMarketHeadList;
                    this.bTypeList = result.bTypeList;
                    this.bProjectModelList = result.bProjectModelList;
                    this.bOwnerCustomerTypeList = result.bOwnerCustomerTypeList;
                    this.bHelpersList = result.bHelpersList;
                    this.dataSelectList = result.dataSelectList;
                    this.bAreaOptions = result.bAreaOptions;
                    this.dataSource = result.dataSource;

                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                })
        },
        // computed: {
        //     rowSelection() {
        //         return {
        //             onChange: (selectedRowKeys, selectedRows) => {
        //                 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //             },
        //             getCheckboxProps: record => ({
        //                 props: {
        //                     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //                     name: record.name,
        //                 },
        //             }),
        //         };
        //     },
        // }
    }


</script>

<style scoped>
    .baseForm .ant-col{
        padding-right: 80px;
    }
    .baseForm .ant-row{
        margin-left: 20px;
    }
    .baseForm .ant-col .ant-col ant-form-item-control-wrapper{
        width: 80%;
    }
    .baseForm .ant-calendar-picker {
        width:100%;
    }
</style>