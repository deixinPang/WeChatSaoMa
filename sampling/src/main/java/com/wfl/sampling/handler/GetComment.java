package com.wfl.sampling.handler;

import net.sf.json.JSONObject;

import java.io.IOException;

public class GetComment {
    public static void main(String[] args) throws IOException{
        String URL = String.format(ACCESS_TOKEN, appid, secrect);
        String resp = HttpUtil.get(URL);
        String access_token = JSONObject.parseObject(resp).getString("access_token");
        String url = String.format("https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=%s&env=%s&name=%s",access_token,"916430b3c258ece1344b2bb84857ad39","comment");
        String r = HttpUtil.post(url,"{}");
        System.out.println(r);

    }

}
