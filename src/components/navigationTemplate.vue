<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu
                    :default-selected-keys="['1']"
                    :default-open-keys="['sub1']"
                    mode="inline"
                    theme="dark"
                    :inline-collapsed="collapsed"
            >
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="mail" /><span>客户管理</span></span>
                    <a-menu-item key="1">
                        客户类型
                    </a-menu-item>
                    <a-menu-item key="2">
                        客户列表
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <span slot="title"><a-icon type="mail" /><span>商机管理</span></span>
                    <a-menu-item key="3">
                        <router-link to="/views/opportunityManagement/a">初次登记</router-link>
<!--                        <router-link :to="{path:'/views/opportunityManagement/a',query:{path:pathN}}">全部商机</router-link>-->
                    </a-menu-item>
                    <a-menu-item key="4">
                        <router-link to="/views/opportunityManagement/b">备案登记</router-link>
                    </a-menu-item>
                    <a-menu-item key="5">
                        立项登记
                    </a-menu-item>
                    <a-menu-item key="6">
                        投标决策
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub3">
                    <span slot="title"><a-icon type="appstore" /><span>投标管理</span></span>
                    <a-menu-item key="7">
                        投标登记
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                    <span slot="title"><a-icon type="appstore" /><span>签约管理</span></span>
                    <a-menu-item key="8">
                        签约登记
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub5">
                    <span slot="title"><a-icon type="appstore" /><span>合同管理</span></span>
                    <a-menu-item key="9">
                        合同管理
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub6">
                    <span slot="title"><a-icon type="appstore" /><span>全部项目</span></span>
                    <a-menu-item key="10">
                        商机信息
                    </a-menu-item>
                    <a-menu-item key="11">
                        投标信息
                    </a-menu-item>
                    <a-menu-item key="12">
                        签约信息
                    </a-menu-item>
                    <a-menu-item key="13">
                        合同信息
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub7">
                    <span slot="title"><a-icon type="appstore" /><span>报表中心</span></span>
                    <a-menu-item key="14">
                        中标项目报表
                    </a-menu-item>
                    <a-menu-item key="15">
                        签约项目报表
                    </a-menu-item>
                    <a-menu-item key="16">
                        项目销售纰漏
                    </a-menu-item>
                    <a-menu-item key="17">
                        阶段金额变化报表
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub8">
                    <span slot="title"><a-icon type="appstore" /><span>系统设置</span></span>
                    <a-menu-item key="18">
                        视野控制
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"
                />
            </a-layout-header>
            <a-layout-content
                    :style="{ margin: '14px 16px 24px  16px', padding: '24px', background: '#fff', }"
            >
<!--                Content-->
<!--                <a-page-header-->
<!--                        style="border: 1px solid rgb(235, 237, 240)"-->
<!--                        title="Title"-->
<!--                        :breadcrumb="{ props: { routes } }"-->
<!--                        sub-title="This is a subtitle"-->
<!--                />-->
                <router-view>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "navigationTemplate",
        data() {
            return {
                collapsed: false,
                // routes: [
                //     {
                //         path: 'index',
                //         breadcrumbName: 'First-level Menu',
                //     },
                //     {
                //         path: 'first',
                //         breadcrumbName: 'Second-level Menu',
                //     },
                //     {
                //         path: 'second',
                //         breadcrumbName: 'Third-level Menu',
                //     },
                // ],
            };
        },
        methods: {
            toggleCollapsed() {
                this.collapsed = !this.collapsed;
            },
        },
        created() {
            axios.get('/user/navtemp')
                .then((res,response) => {
                    console.log(res,response)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        mounted:function() {

        },
    }
</script>

<style scoped>
    /*ant-layout-content{*/
    /*    min-height: 0px !important;*/
    /*}*/
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
    /*.ant-layout-sider{*/
    /*    z-index: 10;*/
    /*    height: 100vh;*/
    /*    position: fixed;*/
    /*}*/
    /*.ant-layout-header{*/
    /*    position: relative;*/
    /*    width: 100%;*/
    /*    z-index: 5;*/
    /*    !*margin-left: 200px;*!*/
    /*}*/
    .ant-layout-content{
        min-height: 750px;
        /*position: relative;*/
    }



    /*.ant-layout-sider{*/
    /*    flex: 0 0 256px !important;*/
    /*    width: auto !important;*/
    /*    max-width:none !important;*/
    /*    height:100vh;*/
    /*    position:relative;*/
    /*    z-index:10;*/
    /*    left:0px;*/
    /*}*/
    /*.ant-layout-sider-collapsed{*/
    /*    position:fixed;*/
    /*    left:-80px;*/
    /*    transition: all .5s;*/
    /*}*/
    /*.ant-layout-header{*/
    /*    background:#fff;*/
    /*    padding: 0;*/
    /*    position: fixed;*/
    /*    width: 100%;*/
    /*    z-index: 5;*/
    /*}*/
    /*.ant-layout-content{*/
    /*    padding:0px;*/
    /*    background:none;*/
    /*    position:relative;*/
    /*    margin-top:64px;*/
    /*    height: 100vh;*/
    /*}*/

</style>