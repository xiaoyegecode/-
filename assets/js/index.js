const getUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: "/my/userinfo",
    data: null,
    success: res => {
      const { status, message } = res
      if (status !== 0) return layer.msg(message);
      // console.log(res);
      renderAvatar(res.data)
    }
  })
}

const renderAvatar = data => {
  let name = data.nickname || data.username
  $('#welcome').html(`欢迎${name}`)
  if (data.user_pic !== null) {
    $('.layui-nav-img').attr('src', data.user_pic).show()
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase()
    $(".text-avatar").html(firstName);
  }
}

getUserInfo()

$('#exitBtn').click(function () {
  layer.confirm("确定退出登录？", { icon: 3, title: "" }, function (index) {
    localStorage.removeItem("token");
    location.href = "/login.html";
  })
})