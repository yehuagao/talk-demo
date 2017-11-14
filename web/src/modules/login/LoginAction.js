import * as constants from '../../redux/CommonConstant'
import http from '../../redux/HttpClient.js'

export function login(name, pwd) {
    return {
        types: ['REQUEST', 'SUCCESS', 'FAILURE'],
        path: 'login',
        method: 'get'
    }
}