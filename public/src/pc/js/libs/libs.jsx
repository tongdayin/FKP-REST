var lodash = require('lodash');

var getOffset = function(el){
    if(!el)el=window;
    if(el===window){
      var
      top  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
  		left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      height = document.documentElement.scrollHeight || document.body.scrollHeight || 0,
      width = document.documentElement.scrollWidth || document.body.scrollWidth || 0;

      return {
          top: top,
          left: left,
          width: height,
          height: width
      };
    }else{
      var parent,pbox;
			var box = el.getBoundingClientRect(),
      doc = el.ownerDocument,
      body = doc.body,
      docElem = doc.documentElement,

      // for ie
      clientTop = docElem.clientTop || body.clientTop || 0,
      clientLeft = docElem.clientLeft || body.clientLeft || 0,

      // In Internet Explorer 7 getBoundingClientRect property is treated as physical,
      // while others are logical. Make all logical, like in IE8.

      zoom = 1;

      if (body.getBoundingClientRect) {
          var bound = body.getBoundingClientRect();
          zoom = (bound.right - bound.left)/body.clientWidth;
      }
      if (zoom > 1){
          clientTop = 0;
          clientLeft = 0;
      }

			var node = el.parentNode;
			while(CurrentStyle(node).position!=='relative'||CurrentStyle(node).position!=='absolute'){
					// parent=node.parentNode;
					node = node.parentNode;
					if(CurrentStyle(node).position==='relative'){
							parent = node;
							pbox = parent.getBoundingClientRect();
							var ptop = pbox.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
				      pleft = pbox.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;
							break;
					}
			}

      var top = box.top/zoom + (window.pageYOffset || docElem && docElem.scrollTop/zoom || body.scrollTop/zoom) - clientTop,
      left = box.left/zoom + (window.pageXOffset|| docElem && docElem.scrollLeft/zoom || body.scrollLeft/zoom) - clientLeft;



			top  = parent ? top-ptop : top;
			left = parent ? left-pleft : left;

			top  = top - parseInt(CurrentStyle(el).paddingTop);
			// left = left - parseInt(CurrentStyle(el).paddingLeft);

      var diff_height = box.bottom-box.top,
      diff_width = box.right - box.left,
      bottom = top + diff_height,
      right = left + diff_width;

      return {
          top: top+'px',
          bottom: bottom+'px',
          left: left+'px',
          right: right+'px',
          width: diff_width+'px',
          height: diff_height+'px'
      };
    }
}


function DocmentView(){
    var doch = window.innerHeight||document.documentElement.offsetHeight||document.body.clientHieght;
    var docw = window.innerWidth||document.documentElement.offsetWidth||document.body.clientWidth;
    var docST = document.documentElement.scrollTop||document.body.scrollTop;
    var docSL = document.documentElement.scrollLeft||document.body.scrollLeft;
    return {width:docw,height:doch,scrollTop:docST,scrollLeft:docSL};
};


//兼容addEventListener和attachEvent
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent('on' + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}

//兼容removeEventListener和detachEvent
function rmvEvent(elm, evType, fn, useCapture) {
    if (elm.removeEventListener) {
        elm.removeEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.detachEvent) {
        var r = elm.detachEvent('on' + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = null; //DOM 0
    }
}


function extend(Child, Parent) {
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
}

/*
判断obj是什么类型的变量
Numeric
Object
Function
String
..
*/
function getObjType(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};

//类数组对象转换成数组
function arg2arr(s){
     try{
         return Array.prototype.slice.call(s);
     } catch(e){
         var arr = [];
         for(var i = 0,len = s.length; i < len; i++){
             //arr.push(s[i]);
           arr[i] = s[i];  //据说这样比push快
         }
        return arr;
     }
 }

/*
 * 动态插入style到head，并带有简单的兼容效果
*/
function addSheet() {
    var doc, tmpCssCode, cssCode, id;
    if (arguments.length == 1) {
        doc = document;
        tmpCssCode = arguments[0]
    } else if (arguments.length == 2) {
        doc = arguments[0];
        tmpCssCode = arguments[1];
    } else {
        alert("addSheet函数最多接受两个参数!");
    }
    if(libs.getObjType(tmpCssCode)==='Array'){
        id = tmpCssCode[1];
        cssCode = tmpCssCode[0];
    }
    if (! +"\v1") {//增加自动转换透明度功能，用户只需输入W3C的透明样式，它会自动转换成IE的透明滤镜
        var t = cssCode.match(/opacity:(\d?\.\d+);/);
        if (t != null) {
            cssCode = cssCode.replace(t[0], "filter:alpha(opacity=" + parseFloat(t[1]) * 100 + ")")
        }
    }
    cssCode = cssCode + "\n"; //增加末尾的换行符，方便在firebug下的查看。
    var headElement = doc.getElementsByTagName("head")[0];
    var styleElements = headElement.getElementsByTagName("style");
    // if (styleElements.length == 0) {//如果不存在style元素则创建
    //     if (doc.createStyleSheet) {    //ie
    //         doc.createStyleSheet();
    //     } else {
    //         var tempStyleElement = doc.createElement('style'); //w3c
    //         tempStyleElement.setAttribute("type", "text/css");
    //         headElement.appendChild(tempStyleElement);
    //     }
    // }
    // var styleElement = styleElements[0];

    var tempStyleElement = doc.createElement('style'); //w3c
    tempStyleElement.setAttribute("rel", "stylesheet");
    tempStyleElement.setAttribute("type", "text/css");
    tempStyleElement.setAttribute("id", id);
    headElement.appendChild(tempStyleElement);
    var styleElement = document.getElementById(id);

    var media = styleElement.getAttribute("media");
    if (media != null && !/screen/.test(media.toLowerCase())) {
        styleElement.setAttribute("media", "screen");
    }
    if (styleElement.styleSheet) {    //ie
        styleElement.styleSheet.cssText += cssCode;
    } else if (doc.getBoxObjectFor) {
        styleElement.innerHTML += cssCode; //火狐支持直接innerHTML添加样式表字串
    } else {
        styleElement.appendChild(doc.createTextNode(cssCode))
    }
}

var node = {
    remove: function(el){
        if(el.removeNode)
            el.removeNode(true);
        else
            el.remove();
    }
}

module.exports = {
  getOffset: getOffset,
  DocmentView: DocmentView,
  addEvent: addEvent,
  rmvEvent: rmvEvent,
  extend: extend,
  getObjType: getObjType,
  arg2arr: arg2arr,
  addSheet: addSheet,
  lodash: lodash,
  node: node
}
