<template>
  <div>
    <!-- data 属性指定树形数据 -->
    <!-- props 指定当前节点名称字段名, 和下属节点数据字段名
    默认 label 是名称, children 是下属节点 -->
    <!-- default-expand-all 指定自动展开所有的节点 -->
    <el-tree
      :default-expand-all="true"
      :data="treeData"
      :props="{label: 'name'}"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          // 树形结构数据一当前接待吗的名称
          name: '服饰',
          // 树形结构的数据二, 下属节点的数组
          children: [
            {
              name: '男装'
            },
            {
              name: '女装',
              children: [
                {
                  name: '连衣裙'
                },
                {
                  name: '晚礼服'
                }
              ]
            }
          ]
        },
        {
          name: '数码',
          children: [
            {
              name: '手机'
            },
            {
              name: '电脑'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>
