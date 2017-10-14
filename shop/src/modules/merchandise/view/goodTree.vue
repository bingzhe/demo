<template>
    <div id="good-tree">
        <div class="tree-title">商品列表</div>

        <z-tree ref="tree"></z-tree>
    </div>
</template>

<script>
import ZTree from '../components/tree/tree.vue';


export default {
    data() {
        return {

        };
    },
    components: {
        ZTree
    }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.tree-title {
    @include wh(100%, 40px);
    @include fc(14px, #666666);
    line-height: 40px;
    background-color: #F6F8FC;
    padding-left: 14px;
    margin-bottom: 40px;
}
</style>



