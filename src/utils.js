const formatParams = (params) => JSON.stringify(params).replace(/{/g, '').replace(/}/g, '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&');
const buildTree=(list)=>{
    let map = {};
    let val = [];
    list.forEach(function (item) {
        delete item.children;
    });
    list.forEach(function (item) {
        map[item.id] = item;
    });
    list.forEach(function (item) {
        map[item.parentId]?(map[item.parentId].children || ( map[item.parentId].children = [] )).push(item):val.push(item);
    });
    return val;
}
export default {
    formatParams,
    buildTree
};
