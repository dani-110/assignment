package com.daniyaltest;

public class SingletonClass {
    private static SingletonClass uniqInstance;
    public String accessToken = "";
    private SingletonClass() {
    }
    public static SingletonClass getInstance() {
        if (uniqInstance == null)
            uniqInstance = new SingletonClass();
        return uniqInstance;
    }
    public void setAccessToken(String accessToken)
    {
        this.accessToken = accessToken;

    }
    public String getAccessToken()
    {
        return this.accessToken;

    }
}