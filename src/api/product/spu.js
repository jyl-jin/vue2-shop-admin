// spu管理模块
import request from '@/utils/request'

// 基本列表GET /admin/product/{page}/{limit}
export const reqSpuList= (page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})



// GET /admin/product/getSpuById/{spuId}   spu基本信息
export const reqBaseData =(spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

// 获取品牌信息 GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList =()=>request({url:`/admin/product/baseTrademark/getTrademarkList`,method:'get'})

//    获取sku图片  GET /admin/product/spuImageList/{spuId}
export const reqImg =(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取商品销售  GET /admin/product/baseSaleAttrList
export const getBaseSle=()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})
