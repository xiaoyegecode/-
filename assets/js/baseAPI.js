const baseUrl = "http://big-event-api-t.itheima.net";

$.ajaxPrefilter((option) => {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  if (option.url.includes('/my/')) {
    option.headers = {
      Authorization: localStorage.getItem('token')
    }
  }
  option.url = baseUrl + option.url;
  option.complete = res => {
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      localStorage.removeItem("token");
      location.href = "/login.html"
    } 
    
  }
});