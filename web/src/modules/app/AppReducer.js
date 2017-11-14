import * as types from '../../redux/CommonConstant'

export default function(state = {data:[],loading: false,routeurl:'/'}, action){
    let reState = JSON.parse(JSON.stringify(state)) 
    //console.log(reState)
    switch(action.type){
        case types.REQUEST:
            console.log('REQUEST')
            break
        case types.SUCCESS:

            console.log('SUCCESS')

            break
        case types.FAILURE:
            console.log('FAILURE')
            break
    }
    return reState;
}