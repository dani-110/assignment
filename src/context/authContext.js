import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, useEffect, useState} from 'react';

import axios from '../@core/services/utilsfunctions'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const register = async(params) => {
    setIsLoading(true);

    return axios._postApi('/signup', params).then(res => {
      console.log(res, ' in auth')
        if (res.status == 200) {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            return res
        }else{
            return res
        }
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (params) => {
    setIsLoading(true);
   return axios._postApi('/login', params).then(res => {
        if (res.status == 200) {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            return res
        }else{
            return res
        }
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    // setIsLoading(true);
    // axios
    //   .post(
    //     `${BASE_URL}/logout`,
    //     {},
    //     {
    //       headers: {Authorization: `Bearer ${userInfo.access_token}`},
    //     },
    //   )
    //   .then(res => {
    //     console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
      //   setIsLoading(false);
      // })
      // .catch(e => {
      //   console.log(`logout error ${e}`);
      //   setIsLoading(false);
      // });
  };

  const isLoggedIn = async () => {
    try {

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};