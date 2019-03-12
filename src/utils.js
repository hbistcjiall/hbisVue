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
const format =(date)=>{
    let newdate=new Date(date);
    let month=(newdate.getMonth()+1)<10?'0'+(newdate.getMonth()+1):(newdate.getMonth()+1);
    return newdate.getFullYear()+'-'+month+'-'+newdate.getDate();
}
export default {
    formatParams,
    buildTree,
    format
};
