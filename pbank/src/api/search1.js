import qs from 'qs';
import { http } from 'mfe'
import { downloadFile } from '@/utils'

export function get(id){
    return http.get('search1s/'+id)
}

export function insert(data){
    return http.post('search1s',data)
}

export function del(ids){
    return http.delete('search1s',{
        params:{ ids },
        paramsSerializer:(params)=> qs.stringify(params, {arrayFormat: 'repeat'})
    })
}

export function update(id,data){
    return http.put('search1s/'+id,data)
}

export function list(params){
    return http.get('search1s',{
        params,
        paramsSerializer:(params)=> qs.stringify(params, {arrayFormat: 'repeat'})
    })
}

export function download(params){
    return http.get('search1s/exports',{params,responseType:'blob'}).then(response => {
       downloadFile(response,'search1' , 'xls')
    }).catch(() => {})
}
