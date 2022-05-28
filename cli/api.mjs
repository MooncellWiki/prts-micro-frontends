import got from "got";
import { CookieJar } from "tough-cookie";
const entry = "https://prts.wiki/api.php";
const cookieJar = new CookieJar();
async function request({ method = "GET", body, query }) {
  return got(entry, {
    method,
    cookieJar,
    form: body,
    searchParams: query,
  }).json();
}
export async function getCsrfToken() {
  const resp = await request({
    method: "GET",
    query: {
      action: "query",
      meta: "tokens",
      format: "json",
      type: "csrf",
    },
  });
  return resp;
}
async function getLoginToken() {
  const resp = await request({
    query: {
      action: "query",
      meta: "tokens",
      format: "json",
      type: "login",
    },
  });
  return resp?.query?.tokens?.logintoken;
}
export async function login(name, password) {
  let token = await getLoginToken();
  if (!token) {
    throw new Error("get login token failed");
  }
  const resp = await request({
    method: "POST",
    body: {
      action: "login",
      lgname: name,
      lgpassword: password,
      lgtoken: token,
      format: "json",
    },
  });
  if (resp?.login?.result?.toLowerCase() !== "success") {
    throw new Error(resp);
  }
}
