const form = layui.form;
const layer = layui.layer;
form.verify({
  // 自定义一个叫 pwd 的校验规则
  email: [/@/, "邮箱格式错误"],
  // 校验两次密码是否一致的规则
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
  },
});

// 初始化用户信息
const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: (res) => {
      const { status, message,data } = res
      if (status !== 0) return layer.msg(message);
      // console.log(res);
      form.val('formUserInfo',data)

    },
  });
};

initUserInfo();
//重置
$('#resetBtn').click(function (e) {
  e.preventDefault();
  initUserInfo();
})
//提交修改
$('.layui-form').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: form.val('formUserInfo'),
    success: res => {
      // console.log(res);
      const { status, message } = res
      if (status !== 0) return layer.msg(message);
      window.parent.getUserInfo()
    }
  })
})