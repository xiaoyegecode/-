// 点击去注册账号让 登录框隐藏，注册框显示
$("#link_reg").click(() => {
  $(".login-box").hide();
  $(".reg-box").show();
});
// 点击去登录让 注册框隐藏，登录框显示
$("#link_login").click(() => {
  $(".login-box").show();
  $(".reg-box").hide();
});


// 从 LayUI 中获取 form 对象
const form = layui.form;
// 获取 layui 弹窗
const layer = layui.layer;

form.verify({
  // 自定义一个叫 pwd 的校验规则
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  // 校验两次密码是否一致的规则
  repwd: (val) => {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    const pwd = $(".reg-box [name=password]").val();
    if (pwd !== val) return "两次密码不一致"
  },
});

//表单注册事件
$('#form_reg').on('submit', function (e) {
  e.preventDefault()
  const data = $(this).serialize()
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data,
    success: res => {
      const { status, message } = res
      if (status !== 0) return layer.msg(message)
      layer.msg("注册成功！");
      $("#link_login").click();
    }
  })
})

//表单登录事件
$('#form_login').on('submit', function (e) {
  e.preventDefault()
  const data = $(this).serialize()
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: res => {
      // console.log(res);
      const { status, message, token } = res
      if (status !== 0) return layer.msg(message)
      localStorage.setItem("token", token)
      location.href = '/index.html'
    }
  })
})

