package com.wfl.sampling.handler;
import java.text.SimpleDateFormat;
import net.sf.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @ClassName ： getAccessTokenController
 * @Description ：
 * @Author ： dexin
 * @Date 2020-3-28  18:23
 * @Version ： 1.0
 **/

@Component
public class AutoGetAccessToken {
  private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
  private static final String APPID = "wxe2be82d5b60afd67";
  private static final String APPSECRET = "916430b3c258ece1344b2bb84857ad39";

  @Scheduled(fixedDelay = 60*115*1000)
  public static String getAccessToken() throws Exception{
    String accessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="
        +APPID+ "&secret="+APPSECRET;
    System.out.println("URL for getting accessToken accessTokenUrl="+accessTokenUrl);

    URL url = new URL(accessTokenUrl);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();

    connection.setRequestMethod("GET");
    connection.setDoOutput(true);
    connection.setDoInput(true);
    connection.connect();

    //获取返回的字符
    InputStream inputStream = connection.getInputStream();
    int size =inputStream.available();
    byte[] bs =new byte[size];
    inputStream.read(bs);
    String message=new String(bs,"UTF-8");

    //获取access_token
    JSONObject jsonObject = JSONObject.fromObject(message);
    String accessToken = jsonObject.getString("access_token");
    String expires_in = jsonObject.getString("expires_in");
    System.out.println("accessToken="+accessToken);
    System.out.println("expires_in="+expires_in);
    return accessToken;

    //存数据库
    Date date = new Date();
    String gmtString = date.toLocaleString();
    AccessToken Token = new AccessToken();
    Token.setAccess_token(accesstoken);
    Token.setUpdate_date(gmtString);

    mettingService.accessToken(Token);

  }

}
