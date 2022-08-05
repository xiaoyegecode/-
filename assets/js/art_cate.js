const layer = layui.layer;
const form = layui.form;

let indexAdd = null;
let indexEdit = null;

const initArtCateList = () => {
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: res => {
      const htmlStr = template("tpl-table", res);
      $("tbody").empty().html(htmlStr);
    }
  })
}
initArtCateList()
//添加分类
$("#btnAddCate").click(() => {
  indexAdd = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "添加文章分类",
    content: $('#dialog-add').html()
  });
});

$('body').on('submit', '#form-add', function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/addcates",
    data: $(this).serialize(),
    success: function (res) {
      const { status, message } = res
      layer.msg(message);
      if (status !== 0) return
      initArtCateList();
      layer.close(indexAdd);
    }
  })
})

// 编辑分类
$("tbody").on("click", ".btn-edit", function () {
  // 弹出修改文章分类的弹窗
  indexEdit = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "修改文章分类",
    content: $("#dialog-edit").html(),
  });
  let id = $(this).attr('data-id')
  $.ajax({
    method: "GET",
    url: "/my/article/cates/" + id,
    success: res => {
      // console.log(res);
      const { status, message,data} = res
      if (status !== 0) return layer.msg(message);
      form.val("form-edit",data);
    }
  })
});

//修改分类
$("body").on("submit", "#form-edit", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/article/updatecate",
    data: form.val("form-edit"),
    success:  res => {
      // console.log(res);
      const { status, message } = res
      layer.msg(message);
      if (status !== 0) return
      initArtCateList();
      layer.close(indexEdit);
    }
  })
})

//删除分类
$("tbody").on("click", ".btn-delete", function () {
  let id = $(this).attr('data-id')
  layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
    $.ajax({
      type: "GET",
      url: "/my/article/deletecate/" + id,
      success: res => {
        // console.log(res);
        const { status, message } = res
        layer.msg(message);
        if (status !== 0) return 
        layer.close(index);
        initArtCateList();
      }
    })
  })
});
