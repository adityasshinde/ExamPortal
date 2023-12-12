import { signOut } from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth } from "../../firebase";


export function getAuthToken(){
  const token=localStorage.getItem("token");
  if (token){
    return token;
  }else{
    return null;
  }
}

export function checkAuthLoader(){
  const token=getAuthToken();
  if(!token){
    return redirect('/auth/login');
  }
  return token;
}


export async function LogoutAction(){
   await signOut(auth);
   console.log('logout')
  localStorage.removeItem('token');
  localStorage.removeItem('persist:exam');
  localStorage.removeItem('persist:test');
  return redirect('/');
}