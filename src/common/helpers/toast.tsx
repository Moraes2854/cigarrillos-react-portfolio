// import { toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const fireErrorToast = (msg:string)=>{
    // toast.error(msg, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     toastId
    // });
}

export const fireSuccessToast = (msg:string)=>{

    const Toast = MySwal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        width:'250px',
    
    })
      
    Toast.fire({
        icon: 'success',
        title: msg
    });


}



