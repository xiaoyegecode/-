const form = layui.form;
const layer = layui.layer;
form.verify({
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  samePwd: (val) => {
    if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
  },
  rePwd: (val) => {
    if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
  },
});

$('.layui-form').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    data: form.val('formPassword'),
    success: res => {
      // console.log(res);
      const { status, message } = res
      if (status !== 0) return layer.msg(message);
      $(".layui-form")[0].reset();
    }
  })
})