//处理 ajax 返回数据和一些状态管理
//发起 ajax 请求前 => show up loading
//ajax 完成之后 => loading hided $.get('url', function(response){})  => {status: true, data: [{}]}
// action => store = createStroe(reducer, 中间件) => reducer

import * as types from '../../redux/CommonConstant'

export default function(state = {data:[],loading: false,routeurl:'/'}, action){
    let reState = JSON.parse(JSON.stringify(state)) 
    switch(action.type){
        case types.REQUEST:
            console.log('REQUEST')
            break
        case types.SUCCESS:
            reState.data = action.payload
            console.log('SUCCESS')
            break
        case types.FAILURE:
            
            console.log('FAILURE')
            break
    }
    return reState;
}