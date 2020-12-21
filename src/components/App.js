import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import fbase from "fbase";
import {authService} from "fbase";

function App() {
  
  const [init,setInit] =useState(false);
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);

    });
    //유저의 상태 변화를 감시 // 이렇게 하는 이유는 
    //이렇게 하지 않으면  firebase가  다 로드 되기까지 기다려주질 않는다. 그래서 
    // 계속  isLoggedIn이  null 상태가 된다.

  },[])

  
  return (
    <>
     {init ? <AppRouter isLoggedIn={isLoggedIn}/> :"Initializing..."} 
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
