const formatParams = (params) => JSON.stringify(params).replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&');
const buildTree=(list)=>{
    let map = {};
    let val = [];
    list.forEach(function (item) {
        delete item.children;
        map[item.id] = item;
    });
    list.forEach(function (item) {
        map[item.parentId]?(map[item.parentId].children || ( map[item.parentId].children = [] )).push(item):val.push(item);
    });
    return val;
};
const buildDeptTree=(tree)=>{
    const result = []
    // 遍历 tree
    tree.forEach((item) => {
        // 解构赋值
        let {
            nodeId: value,
            text: label,
            nodes: children
        } = item

        // 如果有子节点，递归
        if (children) {
            children = buildDeptTree(children)
        }

        result.push({
            value,
            label,
            children
        })
    })
    return result;
}
const roleTree=(tree)=>{
    const result = []
    // 遍历 tree
    tree.forEach((item) => {
        // 解构赋值
        let {
            id: id,
            name: title,
            children: children
        } = item

        // 如果有子节点，递归
        if (children) {
            children = roleTree(children)
        }

        result.push({
            id,
            title,
            children
        })
    })
    return result;

}
const buildRoleTree=(list)=>{
    let map = {};
    let val = [];
    list.forEach(function (item) {
        delete item.children;
        map[item.id] = item;
    });
    list.forEach(function (item) {
        map[item.pId]?(map[item.pId].children || ( map[item.pId].children = [] )).push(item):val.push(item);
    });
    return val;
};
const format =(date)=>{
    let newdate=new Date(date);
    let month=(newdate.getMonth()+1)<10?'0'+(newdate.getMonth()+1):(newdate.getMonth()+1);
    return newdate.getFullYear()+'-'+month+'-'+newdate.getDate();
}

export default {
    formatParams,
    buildTree,
    format,
    buildDeptTree,
    buildRoleTree,
    roleTree,

};
