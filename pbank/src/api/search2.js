import qs from 'qs';
import { http } from 'mfe'
import { downloadFile } from '@/utils'

export function get(id){
    return http.get('search2s/'+id)
}

export function insert(data){
    return http.post('search2s',data)
}

export function del(ids){
    return http.delete('search2s',{
        params:{ ids },
        paramsSerializer:(params)=> qs.stringify(params, {arrayFormat: 'repeat'})
    })
}

export function update(id,data){
    return http.put('search2s/'+id,data)
}

export function list(params){
    return http.get('search2s',{
        params,
        paramsSerializer:(params)=> qs.stringify(params, {arrayFormat: 'repeat'})
    })
}

export function download(params){
    return http.get('search2s/exports',{params,responseType:'blob'}).then(response => {
       downloadFile(response,'search2' , 'xls')
    }).catch(() => {})
}
