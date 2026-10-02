import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// In-memory cache for WeChat token & jsapi ticket
let cachedAccessToken = "";
let tokenExpireTime = 0;

let cachedTicket = "";
let ticketExpireTime = 0;

async function getAccessToken(appId: string, appSecret: string): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpireTime) {
    return cachedAccessToken;
  }

  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  if (data.access_token) {
    cachedAccessToken = data.access_token;
    tokenExpireTime = now + (data.expires_in - 200) * 1000;
    return cachedAccessToken;
  }
  throw new Error(`Failed to get access token: ${data.errmsg || JSON.stringify(data)}`);
}

async function getJsApiTicket(accessToken: string): Promise<string> {
  const now = Date.now();
  if (cachedTicket && now < ticketExpireTime) {
    return cachedTicket;
  }

  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`,
    { cache: "no-store" }
  );
  const data = await res.json();

  if (data.ticket) {
    cachedTicket = data.ticket;
    ticketExpireTime = now + (data.expires_in - 200) * 1000;
    return cachedTicket;
  }
  throw new Error(`Failed to get ticket: ${data.errmsg || JSON.stringify(data)}`);
}

export async function GET(req: NextRequest) {
  const appId = process.env.WECHAT_APP_ID;
  const appSecret = process.env.WECHAT_APP_SECRET;

  if (!appId || !appSecret) {
    return NextResponse.json({
      success: false,
      message: "WECHAT_APP_ID or WECHAT_APP_SECRET not configured in environment variables",
    });
  }

  const searchParams = req.nextUrl.searchParams;
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { success: false, message: "Missing url parameter" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getAccessToken(appId, appSecret);
    const ticket = await getJsApiTicket(accessToken);

    const nonceStr = Math.random().toString(36).substring(2, 17);
    const timestamp = Math.floor(Date.now() / 1000);

    // Signature formula specified by WeChat official doc:
    // jsapi_ticket=...&noncestr=...&timestamp=...&url=...
    const stringToSign = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${targetUrl}`;
    const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

    return NextResponse.json({
      success: true,
      appId,
      timestamp,
      nonceStr,
      signature,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to generate WeChat JSSDK signature",
      },
      { status: 500 }
    );
  }
}
