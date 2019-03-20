const formatParams = (params) => JSON.stringify(params).replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&');
const buildTree = (list) => {
    let map = {};
    let val = [];
    list.forEach(function (item) {
        delete item.children;
        map[item.id] = item;
    });
    list.forEach(function (item) {
        map[item.parentId] ? (map[item.parentId].children || (map[item.parentId].children = [])).push(item) : val.push(item);
    });
    return val;
};
const mergeRow = (arr, obj) => {
    let temp = [];
    let rowspan = 1;
    for (let i = 0; i < arr.length; i++) {
        temp.indexOf(arr[i][obj]) != -1 ? (arr[i - rowspan].rowspan = rowspan + 1, rowspan++) : (temp.push(arr[i][obj]), arr[i].rowspan = 1, rowspan = 1);
    }
    return arr;
};
const buildDeptTree = (tree) => {
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
const roleTree = (tree) => {
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
const buildselTree = (tree) => {
    const result = []
    // 遍历 tree
    tree.forEach((item) => {
        // 解构赋值
        let {
            CODE: value,
            NAME: label,
        } = item


        result.push({
            value,
            label,
        })
    })
    return result;
}
const buildRoleTree = (list) => {
    let map = {};
    let val = [];
    list.forEach(function (item) {
        delete item.children;
        map[item.id] = item;
    });
    list.forEach(function (item) {
        map[item.pId] ? (map[item.pId].children || (map[item.pId].children = [])).push(item) : val.push(item);
    });
    return val;
};
const format = (date) => {
    let newdate = new Date(date);
    let month = (newdate.getMonth() + 1) < 10 ? '0' + (newdate.getMonth() + 1) : (newdate.getMonth() + 1);
    return newdate.getFullYear() + '-' + month + '-' + newdate.getDate();
};

const formatMonthStart = (date) => {
    let newdate = new Date(date);
    let month = (newdate.getMonth() + 1) < 10 ? '0' + (newdate.getMonth() + 1) : (newdate.getMonth() + 1);
    return newdate.getFullYear() + '-' + month+'-'+'01  00:00:00';
};
const formatMonthEnd = (date) => {
    let newdate = date?new Date(date):new Date();
    let month = (newdate.getMonth() + 2) < 12 ?'0' + (newdate.getMonth() + 2) : (newdate.getMonth() + 2)!=12?(newdate.getMonth() -9 ):newdate.getMonth() + 2;
    return newdate.getFullYear() + '-' + month+'-'+'01  00:00:00';
};
const formatYearStart = (date) => {
    let newdate = new Date(date);
    return newdate.getFullYear() + '-01-01 00:00:00';
};

const formatYearEnd = (date) => {
    let newdate = new Date(date);
    return (newdate.getFullYear()+1) + '-01-01 00:00:00';
};


export default {
    formatParams,
    buildTree,
    format,
    buildDeptTree,
    buildRoleTree,
    roleTree,
    mergeRow,
    formatMonthStart,
    formatMonthEnd,
    formatYearStart,
    formatYearEnd,
    formatMonth,
    buildselTree
};
