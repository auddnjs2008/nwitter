import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import fbase from "fbase";
import {authService} from "fbase";

function App() {
  
  const [init,setInit] =useState(false);
  const [userObj,setUserObj] =useState(null);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        //setUserObj(user); 전체 유저를 가져올경우 객체가 커진다.
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args)
        })
      }else{
        setUserObj(null);
      }
      setInit(true);

    });
    //유저의 상태 변화를 감시 // 이렇게 하는 이유는 
    //이렇게 하지 않으면  firebase가  다 로드 되기까지 기다려주질 않는다. 그래서 
    // 계속  isLoggedIn이  null 상태가 된다.

  },[]);
  const refreshUser = () =>{
    const user = authService.currentUser;
    //setUserObj(authService.currentUser);
    //이렇게 해주는 이유는  우리가 마이프로필 페이지에서 
    // 정보를 수정하면  그 수정한 정보가 네비게이터에도 적용 되게 할려고
    // 그런데  적용이 안되네??  이유는  authService.currentUser의 객체정보가 너무 커서
    // 리엑트가   이 상태가 전 상태와 같은 지 다른 지 판단하기 헷갈린다. 
    // 그래서 첫번쨰 방법: object의 크기를 줄여준다.
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args)
    })

    //두번째 방법은  user전체를 받아오고  setUserObj(Object.assign({},user));
    //이런식으로  빈객체에 user객체를 넣어 새로운 객체를 만들어서 리엑트가 인지하게 할 수 있다.
    // 하지만  가끔 이상한 경우가 있음 첫번째 방법을 더 추천

    
  
  }

  
  return (
    <>
     {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> :"Initializing..."} 
    
    </>
  );
}

export default App;
