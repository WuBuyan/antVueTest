<template>
    <a-row>
        <a-col>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-row class="line">
                    <a-col :span="8">
                        <a-form-item label="快速搜索">
                            <a-input placeholder="商机名称/商机编号"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col  :span="8">
                        <a-form-item label="归属部门">
                            <a-select placeholder="请选择(单选)">
                                <a-select-option v-for="(item,index)  in bInDepartmentList"
                                                 :key="item.key"  :value="item.value">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col  :span="8">
                        <a-button type="primary" icon="search" style="margin-left: 10px;">查询</a-button>
                        <a-button style="margin-left: 20px;">重置</a-button>
                    </a-col>
                </a-row>
                <a-row class="line">
                    <a-col  :span="8">
                        <a-form-item label="项目模式">
                            <a-select placeholder="请选择(单选)">
                                <a-select-option v-for="(item,index)  in bProjectModelList"
                                                 :key="item.key"  :value="item.value">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col  :span="8">
                        <a-form-item label="跟进阶段">
                            <a-select placeholder="请选择(单选)">
                                <a-select-option v-for="(item,index)  in bFollowStageList"
                                                 :key="item.key"  :value="item.value">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col  :span="8">
                        <a-form-item label="项目状态">
                            <a-select placeholder="请选择(单选)">
                                <a-select-option v-for="(item,index)  in bStatuesList"
                                                 :key="item.key"  :value="item.value">
                                    {{item.value}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>

            <a-row class="buttonLine">
                <router-link to="/views/opportunityManagement/aAdd">
                    <a-button type="primary" style="margin-right: 20px;" icon="plus" >
                        新建
                    </a-button>
                </router-link>
                <a-button icon="vertical-align-bottom">导入</a-button>
            </a-row>
            <a-row>
                <a-table :columns="columns" :data-source="dataList" :row-selection="rowSelection"  :scroll="{ x: 1500, y: 300 }">
                    <template slot="operation" slot-scope="text, record">
                        <a-popconfirm
                                v-if="dataSource.length"
                                title="Sure to delete?"
                                @confirm="() => onDelete(record.key)"
                        >
                            <a href="javascript:;">Delete</a>
                        </a-popconfirm>
                    </template>
                    <a slot="action" slot-scope="text">
                        <a href="" disabled="">重新发起</a>
                        <a href="" style="margin-left: 2em;">关闭</a>
                    </a>
                </a-table>
            </a-row>
        </a-col>
    </a-row>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios'
    const columns = [
        { title: '商机编号', width: 120, dataIndex: 'bID', key: 'bID', fixed: 'left' },
        { title: '项目名称', width: 150, dataIndex: 'bName', key: 'bName', fixed: 'left' },
        { title: '项目模式', dataIndex: 'bProjectModel', key: '0', width:'15%'},
        { title: '跟进阶段', dataIndex: 'bFollowStage', key: '1', width:'15%'},
        { title: '项目状态', dataIndex: 'bStatues', key: '2', width:'15%'},
        { title: '归属部门', dataIndex: 'bInDepartment', key: '3', width:'15%'},
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 180,
            scopedSlots: { customRender: 'action' },
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    export default {
        name: "initialRegistration",
        data() {
            return {
                // data,
                columns,
                rowSelection,

                bInDepartment:'',
                bInDepartmentList:[],
                bProjectModel:'',
                bProjectModelList:[],
                bFollowStage:'',
                bFollowStageList:[],
                bStatues:'',
                bStatuesList:[],
                dataList:[],
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),
            };
        },
        methods: {
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },

        },
        created() {
            axios.get('/user/inRegistration')
                .then(response => {
                    let result = response.data;
                    console.log(result);

                    this.bInDepartmentList = result.bInDepartmentList;
                    this.bProjectModelList = result.bProjectModelList;
                    this.bFollowStageList = result.bFollowStageList;
                    this.bStatuesList = result.bStatuesList;
                    this.dataList = result.dataList;
                })
                .catch(err =>{
                    console.log(err)
                })
        },
        mounted(){
        },
    }
</script>

<style scoped>
    .ant-form-item{
        margin-bottom: 0px ;
    }
    .ant-form-item-label{
        text-align: left;
    }
    .line{
        padding: 5px 0px 0px 0px;
        border-bottom: dashed 1px #E4E4E4;
    }
    .buttonLine{
        height: 50px;
        line-height: 50px;
    }

</style>