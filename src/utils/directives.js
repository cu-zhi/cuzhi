export const directives = {
  // dom拖拽指令
  drag: {
    inserted(el) {
      let flag = false;
      let elT,
        elL,
        x,
        y = 0;
      // 鼠标点击事件
      el.addEventListener("mousedown", (e) => {
        if (e.target._prevClass !== "el-dialog__header") return;
        flag = false;
        // 获取鼠标按下时的位置
        x = e.clientX;
        y = e.clientY;

        // 获取dom位于浏览器窗口的偏移量
        elL = el.offsetLeft;
        elT = el.offsetTop;
        // 修改鼠标样式
        el.style.cursor = "move";
        // 鼠标移动事件
        el.addEventListener("mousemove", (e2) => {
          if (flag) return;
          // 获取当前鼠标位置
          let nx = e2.clientX;
          let ny = e2.clientY;

          let nl = nx - (x - elL);
          let nt = ny - (y - elT);

          // 修改dom位置
          el.style.left = nl + "px";
          el.style.top = nt + "px";

          // 鼠标抬起事件
          window.addEventListener("mouseup", () => {
            el.style.cursor = "default";
            flag = true;
          });
        });
      });
    },
  },
  // dom事件防抖指令
  debounce: {
    inserted(el, binding) {
      let times = null;
      let timeDelay = 0;
      // 元素添加单击事件
      el.addEventListener("click", () => {
        // 判断当前点击事件与上一次点击时间的间隔
        if (+new Date() - timeDelay < 500) clearTimeout(times);
        // 延时执行
        times = setTimeout(() => {
          binding.value();
        }, 500);
        timeDelay = +new Date();
      });
    },
  },
  // 元素懒加载
  lazy: {
    inserted(el, binding) {
      let flag = 0;
      let observer = new IntersectionObserver((e) => {
        // 判断是否在可视区
        if (e[0].isIntersecting) {
          // 判断是否存在方法，并且是否是第一次进入
          if (
            binding.value &&
            typeof binding.value == "function" &&
            flag == 0
          ) {
            binding.value();
            flag = 1;
          }
          // 显示元素
          el.style.visibility = "visible";
        } else {
          // 隐藏元素
          el.style.visibility = "hidden";
        }
      });
      observer.observe(el);
    },
  },
  "img-lazy": {
    inserted(el, binding) {
        console.log(el.width);
      // 默认图片
      let defaultImg = `http://via.placeholder.com/${el.width}x${el.height}/999999/000000.png&text=Loading...`;
      // 获取图片正确地址
      let src = el.getAttribute("src");
      // 设置占位图
      el.setAttribute("src", binding.value || defaultImg);
      // 检查元素是否进入可视区
      let observer = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) {
          // 创建图片元素并赋值
          let img = new Image();
          img.src = src;
          // 监听图片是否加载完毕，完成后使用正确的图片
          img.onload = (e) => {
            el.setAttribute("src", src);
          };
        }
      });
      observer.observe(el);
    },
  },
};
