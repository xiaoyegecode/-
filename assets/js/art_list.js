// 定义一个查询的参数对象，将来请求数据的时候，
// 需要将请求参数对象提交到服务器
const q = {
  pagenum: 1, // 页码值，默认请求第一页的数据
  pagesize: 2, // 每页显示几条数据，默认每页显示2条
  cate_id: "", // 文章分类的 Id
  state: "", // 文章的发布状态
};

const initTable = () => {
  $.ajax({
    type: "GET",
    url: "/my/article/list",
    data: q,
    success: res => {
      const { status, message, data,total} = res 
      if (status !== 0) return layer.msg(message);
      let htmlStr = template("tpl-table", data);
      $("tbody").html(htmlStr);
      renderPage(total)
    }
  })
}

initTable()

const laypage = layui.laypage
const renderPage = total => {
  laypage.render({
    elem: 'pageBox', // 分页容器的 Id
    count: total, // 总数据条数
    limit: q.pagesize, // 每页显示几条数据
    curr: q.pagenum, // 设置默认被选中的分页
    layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
    limits: [2, 3, 5, 10],// 每页展示多少条
    jump: function (obj,first) {
      // 把最新的页码值，赋值到 q 这个查询参数对象中
      q.pagenum = obj.curr
      q.pagesize = obj.limit
      if (!first) {
        initTable()
      }
    }
  })
}

// 定义美化时间的过滤器
template.defaults.imports.dataFormat = function (date) {
  const dt = new Date(date)
  var y = dt.getFullYear()
  var m = padZero(dt.getMonth() + 1)
  var d = padZero(dt.getDate())
  var hh = padZero(dt.getHours())
  var mm = padZero(dt.getMinutes())
  var ss = padZero(dt.getSeconds())
  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

// 定义补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

const form = layui.form;
const initCate = () => {
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success: res => {
      console.log(res);
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message);
      let htmlStr = template("tpl-cate", data);
      $("[name=cate_id]").html(htmlStr);
      // 通过 layui 重新渲染表单区域的UI结构
      form.render();
    }
  })
}

initCate()

$('#form-search').on('submit', function (e) {
  e.preventDefault();
  let cate_id = $('[name=cate_id]').val()
  let state = $('[name=state]').val()
  q.cate_id = cate_id
  q.state = state
  initTable()
})

//删除功能
$('tbody').on('click', '.btn-delete', function () {
  let id = $(this).attr('data-id')
  let len = $('.btn-delete').length
  $.ajax({
    method: 'GET',
    url: '/my/article/delete/' + id,
    success: res => {
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      if (len === 1) {
        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
      }
      initTable()
    }
  })
})


