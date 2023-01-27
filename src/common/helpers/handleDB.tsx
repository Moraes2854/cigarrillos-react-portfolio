import defaultApi from '../../api/defaultApi';
import { fireErrorToast, fireSuccessToast } from "./toast";
import moment from 'moment';



export const requestApi = async <Response, >(url:string, method:'GET'|'POST'|'PATCH'|'PUT'|'DELETE', data?:any):Promise<Response>=>{
    return new Promise((resolve, reject)=>{
        defaultApi.request<Response>({
            method,
            url,
            data,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')!}`}
        })
        .then((axiosResponse)=>resolve(axiosResponse.data))
        .catch((error)=>reject(error))
    })
}


export const downloadBackupDB = async()=>{
    const fileName = `DATABASEBACKUP${moment().format('DD-MM-YYYY-HH-mm-ss')}.pgsql`;
    defaultApi.post('/backup', {
        responseType: 'blob',
        headers:{ 'Content-Type': 'application/txt' }
    })
    .then((response) => {
        const temp = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = temp;
        link.setAttribute('download', fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        fireSuccessToast(`Se ha descargado el archivo ${fileName}`)
    })
    .catch((err) => {
        fireErrorToast((err as Error).message);
        console.log({err});
    })
}

