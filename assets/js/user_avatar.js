const layer = layui.layer;
// 1.1 获取裁剪区域的 DOM 元素
let $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)

$('#updateBtn').on('click', function () {
  $('#file').click()
})

$('#file').change(function (e) {
  let files = e.target.files;
  if (files.length === 0) return layer.msg('请选择上传文件')
  let file = files[0]
  let imgURL = URL.createObjectURL(file);
  $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", imgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
})

$('#uploadBtn').click(function () {
  const dataURL = $image.cropper("getCroppedCanvas", {
    // 创建一个 Canvas 画布
    width: 100,
    height: 100,
  })
    .toDataURL("image/png");
  $.ajax({
    type: "POST",
    url: "/my/update/avatar",
    data: {
      avatar: dataURL,
    },
    success: (res) => {
      const { status, message } = res
      if (status !== 0) return layer.msg(message);
      layer.msg(message);
      window.parent.getUserInfo()
    }
  })
})