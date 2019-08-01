// Thu Aug 01 2019 09:26:51 GMT+0800 (GMT+08:00)


$(function () {
  try{
    $(".jCarouselLite").jCarouselLite({
      btnNext: ".next01",
      btnPrev: ".prev01",
      speed: 1000,
      auto: 3000,
      visible:1
        });
    } catch(e){}
})


// 存储页面基本信息
var owo = {
  // 页面默认入口 如果没有设置 则取第一个页面为默认页面
  entry: "home",
  // 全局方法变量
  tool: {},
  // 框架状态变量
  state: {}
};
/*
  存储每个页面的函数
  键名：页面名称
  键值：方法列表
*/

owo.script = {
  "home": {
    "template": {
      "newsList1": {
        "prop": {}
      },
      "newsList2": {
        "prop": {}
      },
      "newsList3": {
        "prop": {}
      },
      "imgTitleBar": {
        "prop": {
          "imgsrc": "./static/resource/title-1.png"
        }
      },
      "showImg": {
        "created": function created() {
          var _this = this;

          // 加载完毕默认高亮第一条
          this.query('.subsidiary-list')[0].innerHTML = this.query('.subsidiary-box .subsidiary-item')[0].innerHTML;
          this.query('.bar-list .text')[0].classList.add('active');
          this.query('.bar-list .bar')[0].classList.add('active');

          if (this.query('.subsidiary-item')[0].getElementsByTagName('span')[0]) {
            this.query('.main-box .info-text')[0].innerHTML = this.query('.subsidiary-item')[0].getElementsByTagName('span')[0].innerHTML;
          } else {
            this.query('.main-box .info-text')[0].innerHTML = '';
          }

          setTimeout(function () {
            // 默认显示第一幅图
            var main = _this.query('.main-image')[0];

            main.src = _this.query('.subsidiary-list img')[0].src;

            _this.query('.subsidiary-list li')[0].classList.add('active');

            _this.query('li').forEach(function (element) {
              element.onclick = function (e) {
                // 移除其它活跃标签
                _this.query('li').forEach(function (element) {
                  element.classList.remove('active');
                });

                e.target.classList.add('active');

                _this.changeMainImage(e.target.getElementsByTagName('img')[0].src);

                if (e.target.getElementsByTagName('span')[0]) {
                  _this.query('.main-box .info-text')[0].innerHTML = e.target.getElementsByTagName('span')[0].innerHTML;
                } else {
                  _this.query('.main-box .info-text')[0].innerHTML = '';
                }
              };
            });
          }, 0);
        },
        "changeBar": function changeBar() {
          var _this2 = this;

          var main = this.query('.main-image')[0];
          var text = this.query('.bar-list .text');
          var bar = this.query('.bar-list .bar');
          var subsidiary = this.query('.subsidiary-list'); // 清除所有高亮

          text.forEach(function (element) {
            element.classList.remove('active');
          });
          this.query('.bar-list .bar').forEach(function (element) {
            element.classList.remove('active');
          });
          var index = this.$event.target.getAttribute('ind'); // 高亮对应项

          bar[index].classList.add('active');
          text[index].classList.add('active');
          this.query('.subsidiary-list')[0].innerHTML = this.query('.subsidiary-box .subsidiary-item')[index].innerHTML; // 默认显示第一个

          setTimeout(function () {
            _this2.query('li').forEach(function (element) {
              element.onclick = function (e) {
                // 移除其它活跃标签
                _this2.query('li').forEach(function (element) {
                  element.classList.remove('active');
                });

                _this2.changeMainImage(e.target.getElementsByTagName('img')[0].src);

                if (e.target.getElementsByTagName('span')[0]) {
                  _this2.query('.main-box .info-text')[0].innerHTML = e.target.getElementsByTagName('span')[0].innerHTML;
                } else {
                  _this2.query('.main-box .info-text')[0].innerHTML = '';
                }
              };
            }); // 默认显示第一幅图


            setTimeout(function () {
              _this2.changeMainImage(_this2.query('.subsidiary-list img')[0].src);
            }, 0);
          }, 0);
        },
        "changeMainImage": function changeMainImage(src) {
          var mainBox = this.query('.main-box')[0];
          mainBox.style.backgroundImage = "url('".concat(src, "')");
          var main = this.query('.main-image')[0];
          main.style.opacity = 0;
          setTimeout(function () {
            main.src = src;
            main.style.opacity = 1;
          }, 500);
        },
        "prop": {}
      },
      "imgTitleBar1": {
        "prop": {
          "imgsrc": "./static/resource/title-2.png"
        }
      },
      "video": {
        "data": {
          "mySwiper": null
        },
        "created": function created() {
          this.data.mySwiper = new Swiper(this.query('.video-list')[0], {
            autoplay: 6000,
            loop: true,
            // 禁用鼠标点击
            simulateTouch: false,
            onlyExternal: true,
            slidesPerView: 3
          });
        },
        "last": function last() {
          this.data.mySwiper.swipePrev();
        },
        "next": function next() {
          this.data.mySwiper.swipeNext();
        },
        "prop": {}
      },
      "imgTitleBar2": {
        "prop": {
          "imgsrc": "./static/resource/title-3.png"
        }
      },
      "hudong": {
        "data": {
          "mySwiper": null
        },
        "created": function created() {
          var _this3 = this;

          this.data.mySwiper = new Swiper('#ueMobile', {
            autoplay: 2000,
            loop: true,
            // 禁用鼠标点击
            simulateTouch: false,
            onlyExternal: true,
            slidesPerView: 1,
            mode: "vertical",
            onSlideChangeStart: function onSlideChangeStart(swiper) {
              _this3.activeItem(swiper.activeIndex - 1);
            }
          });
          var list = this.query('.ueList li');

          var _loop = function _loop(ind) {
            list[ind].onclick = function () {
              _this3.goItem(ind);
            };
          };

          for (var ind = 0; ind < list.length; ind++) {
            _loop(ind);
          }
        },
        "activeItem": function activeItem(ind) {
          var list = this.query('.ueList li');
          list.forEach(function (element) {
            element.classList.remove('active');
          });
          if (list[ind]) list[ind].classList.add('active');else list[0].classList.add('active');
        },
        "goItem": function goItem(ind) {
          this.data.mySwiper.swipeTo(ind);
        },
        "prop": {}
      },
      "imgTitleBar3": {
        "prop": {
          "imgsrc": "./static/resource/title-4.png"
        }
      },
      "people": {
        "data": {
          "mySwiper": null
        },
        "created": function created() {
          this.data.mySwiper = new Swiper('.kelunSubBox', {
            autoplay: 6000,
            loop: true,
            // 禁用鼠标点击
            simulateTouch: false,
            onlyExternal: true,
            slidesPerView: 3
          });
        },
        "last": function last() {
          this.data.mySwiper.swipePrev();
        },
        "next": function next() {
          this.data.mySwiper.swipeNext();
        },
        "prop": {}
      },
      "imgTitleBar4": {
        "prop": {
          "imgsrc": "./static/resource/title-5.png"
        }
      },
      "cehua": {
        "prop": {}
      },
      "imgTitleBar5": {
        "prop": {
          "imgsrc": "./static/resource/title-6.png"
        }
      },
      "swiper": {
        "created": function created() {
          $('.p7_con ul').roundabout({
            easing: 'easeOutInCirc',
            duration: 600,
            minOpacity: 0.5
          });
        },
        "prop": {}
      }
    }
  }
};

/* 方法合集 */
var _owo = {
  /* 对象合并方法 */
  assign: function(a, b) {
    var newObj = {}
    for (var key in a){
      newObj[key] = a[key]
    }
    for (var key in b){
      newObj[key] = b[key]
    }
    return newObj
  },
  /* 运行页面初始化方法 */
  runCreated: function (pageFunction) {
    // 确保created事件只被执行一次
    if (pageFunction["_isCreated"]) {
      if (!pageFunction.show) return
      pageFunction.show.apply(_owo.assign(pageFunction, {
        data: pageFunction.data,
        activePage: window.owo.activePage
      }))
    } else {
      pageFunction["_isCreated"] = true
      if (!pageFunction.created) return
      pageFunction.created.apply(_owo.assign(pageFunction, {
        data: pageFunction.data,
        activePage: window.owo.activePage
      }))
    }
  }
}


/* owo事件处理 */
// 参数1: 当前正在处理的dom节点
// 参数2: 当前正在处理的模块名称
// 参数3: 当前正在处理的模块根dom
_owo.handleEvent = function (tempDom, templateName) {
  var activePage = window.owo.script[owo.activePage]
  
  if (tempDom.attributes) {
    for (let ind = 0; ind < tempDom.attributes.length; ind++) {
      var attribute = tempDom.attributes[ind]
      // 判断是否为owo的事件
      // ie不支持startsWith
      if (attribute.name[0] == ':') {
        var eventName = attribute.name.slice(1)
        var eventFor = attribute.textContent
        switch (eventName) {
          case 'show' : {
            // 初步先简单处理吧
            var temp = eventFor.replace(/ /g, '')
            // 取出条件
            var condition = temp.split("==")
            if (activePage.data[condition[0]] != condition[1]) {
              tempDom.style.display = 'none'
            }
            break
          }
          default: {
            // 处理事件 使用bind防止闭包
            tempDom["on" + eventName] = function(event) {
              // 复制eventFor防止污染
              let eventForCopy = eventFor
              // 判断页面是否有自己的方法
              var newPageFunction = window.owo.script[window.owo.activePage]
              // console.log(this.attributes)
              if (templateName && templateName !== owo.activePage) {
                // 如果模板注册到newPageFunction中，那么证明模板没有script那么直接使用eval执行
                if (newPageFunction.template) newPageFunction = newPageFunction.template[templateName]
              }
              // 待优化可以单独提出来
              // 取出参数
              var parameterArr = []
              var parameterList = eventForCopy.match(/[^\(\)]+(?=\))/g)
              
              if (parameterList && parameterList.length > 0) {
                // 参数列表
                parameterArr = parameterList[0].split(',')
                // 进一步处理参数
                
                for (var i = 0; i < parameterArr.length; i++) {
                  var parameterValue = parameterArr[i].replace(/(^\s*)|(\s*$)/g, "")
                  // console.log(parameterValue)
                  // 判断参数是否为一个字符串
                  
                  if (parameterValue.charAt(0) === '"' && parameterValue.charAt(parameterValue.length - 1) === '"') {
                    parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1)
                  }
                  if (parameterValue.charAt(0) === "'" && parameterValue.charAt(parameterValue.length - 1) === "'") {
                    parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1)
                  }
                  // console.log(parameterArr[i])
                }
              }
              eventForCopy = eventFor.replace(/\(.*\)/, '')
              // console.log(newPageFunction, eventForCopy)
              // 如果有方法,则运行它
              if (newPageFunction && newPageFunction[eventForCopy]) {
                // 绑定window.owo对象
                newPageFunction.$event = event
                newPageFunction[eventForCopy].apply(newPageFunction, parameterArr)
              } else {
                // 如果没有此方法则交给浏览器引擎尝试运行
                eval(eventFor)
              }
            }
          }
        }
      }
    }
  }
  
  // 判断是否有子节点需要处理
  if (tempDom.children) {
    // 递归处理所有子Dom结点
    for (var i = 0; i < tempDom.children.length; i++) {
      // 获取子节点实例
      var childrenDom = tempDom.children[i]

      // 每个子节点均要判断是否为模块
      if (childrenDom.attributes['template'] && childrenDom.attributes['template'].textContent) {
        // 如果即将遍历进入模块 设置即将进入的模块为当前模块
        // 获取模块的模块名
        _owo.handleEvent(childrenDom, childrenDom.attributes['template'].textContent)
      } else {
        _owo.handleEvent(childrenDom, templateName)
      }
    }
  } else {
    console.info('元素不存在子节点!')
    console.info(tempDom)
  }
}// 单页面-页面资源加载完毕事件
_owo.showPage = function() {
  var page = owo.entry
  owo.activePage = page
  // 查找入口
  var entryDom = document.querySelector('.ox[template="' + page + '"]')
  if (entryDom) {
    _owo.handlePage(window.owo.script[page], entryDom)
    _owo.handleEvent(entryDom, null)
  } else {
    console.error('找不到页面入口! 设置的入口为: ' + page)
  }
}

/*
 * 传递函数给whenReady()
 * 当文档解析完毕且为操作准备就绪时，函数作为document的方法调用
 */
_owo.ready = (function() {               //这个函数返回whenReady()函数
  var funcs = [];             //当获得事件时，要运行的函数
  
  //当文档就绪时,调用事件处理程序
  function handler(e) {
    // 确保事件处理程序只运行一次
    if(window.owo.state.isRrady) return
    window.owo.state.isRrady = true
    //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
    if(e.type === 'onreadystatechange' && document.readyState !== 'complete') {
      return
    }
    
    // 运行所有注册函数
    for(var i=0; i<funcs.length; i++) {
      funcs[i].call(document);
    }
    funcs = null;
  }
  //为接收到的任何事件注册处理程序
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false)
    document.addEventListener('readystatechange', handler, false)            //IE9+
    window.addEventListener('load', handler, false)
  } else if(document.attachEvent) {
    document.attachEvent('onreadystatechange', handler)
    window.attachEvent('onload', handler)
  }
  //返回whenReady()函数
  return function whenReady (fn) {
    if (window.owo.state.isRrady) {
      fn.call(document)
    } else {
      funcs.push(fn)
    }
  }
})()

// 执行页面加载完毕方法
_owo.ready(_owo.showPage)




/* 运行页面所属的方法 */
_owo.handlePage = function (newPageFunction, entryDom) {
  // console.log(entryDom)
  newPageFunction['$el'] = entryDom
  // 快速选择器
  newPageFunction['query'] = function (str) {
    return this.$el.querySelectorAll(str)
  }
  /* 判断页面是否有自己的方法 */
  if (!newPageFunction) return
  // console.log(newPageFunction)
  // 如果有created方法则执行
  if (newPageFunction.created) {
    _owo.runCreated(newPageFunction)
  }
  // debugger
  // 判断页面是否有下属模板,如果有运行所有模板的初始化方法
  for (var key in newPageFunction.template) {
    var templateScript = newPageFunction.template[key]
    // 待修复,临时获取方式,这种方式获取到的dom不准确
    var childDom = entryDom.querySelectorAll('[template="' + key +'"]')[0]
    if (!childDom) {
      console.error('组件丢失！')
      continue
    }
    // 递归处理
    _owo.handlePage(templateScript, childDom)
  }
}