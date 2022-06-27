import request from '@/utils/request'
// 获取一级分类  GET /admin/product/getCategory1    
// 二级 /admin/product/getCategory2/{category1Id}
// 三级 /admin/product/getCategory3/{category2Id}

export const getOneClass=()=>request({url:'/admin/product/getCategory1',method:'get'})

export const getTwoClass=(category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})

export const getThrClass=(category2Id)=>request({url:`/admin/product/getCategory2/${category2Id}`,method:'get'})

// 获取平台商品数据  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getProductList=(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加属性接口   /admin/product/saveAttrInfo  post
export const updateList=(data)=>request({url:'/admin/product/saveAttrInfo',method:'post',data})