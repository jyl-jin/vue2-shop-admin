// 品牌管理模块
import request from '@/utils/request'

// /admin/product/baseTrademark/{page}/{limit}   获取品牌列表
export const reqBaseTradmarkList=(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

// POST /admin/product/baseTrademark/save  新增品牌 "id": 0, "logoUrl": "string",  "tmName": "string"
// /admin/product/baseTrademark/update   修改品牌 
// 修改和新增传递参数基本相同，所以，氪以封装成一个，根据不传id调用不同的接口
export const reqAddOrEdit=(tradMark)=>{
    if(tradMark.id){
        // 有id修改
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradMark})
    }else{
        //meiyou id
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradMark})
    }
}

// DELETE /admin/product/baseTrademark/remove/{id}  删除
export const deleteProduct=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
