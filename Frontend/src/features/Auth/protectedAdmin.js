import { useSelector } from "react-redux";
import { selectloggedInUser } from "./authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../User/userSlice";
export default function Protected({children}){
    const user=useSelector(selectloggedInUser)
    const userInfo=useSelector(selectUserInfo);
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(userInfo && userInfo.role!=='admin'){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}