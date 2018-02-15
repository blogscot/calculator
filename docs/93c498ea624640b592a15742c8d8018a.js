require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({6:[function(require,module,exports) {

},{}],4:[function(require,module,exports) {
"use strict";exports.__esModule=!0,require("./style.scss");var e,r=document.querySelector("#wrapper"),t=r.querySelector(".display"),n=r.querySelector(".display-top-left"),a=r.querySelector(".display-top-right"),c=r.querySelector(".display-bottom"),l=r.querySelectorAll(".digit"),o=r.querySelectorAll(".operator"),u=r.querySelectorAll(".memory"),i=r.querySelectorAll(".power");!function(e){e[e.OFF=0]="OFF",e[e.ON=1]="ON"}(e||(e={}));var s=function(){var r=e.OFF,l=[],o=null,u=null,i=null,s=0,f=!1;function d(e){void 0===e&&(e=0);var r=String(e).length;r>23||(r>=20?c.classList.add("extended_number"):c.classList.remove("extended_number"),c.innerText=String(e))}function p(e){void 0===e&&(e=!0),n.innerText=e?"M":""}function w(e){a.innerText=e}function y(){a.innerText=""}function v(){y(),c.innerText=""}function h(e,r,t){if(null!==e&&null!==r&&t)switch(f&&(f=!1,r/=100),l=[],t){case"+":return e+r;case"×":return e*r;case"-":return e-r;case"÷":return e/r;default:throw new Error("evaluate: Invalid parameter")}return null}return{save:function(e){var r=(l=l.concat([e])).reduce(function(e,r){return e+r},"");o=Number(r),d(r)},getValue:function(){return o||0},setValue:function(e){l=[],d(o=e)},setOperator:function(e){o&&(i?(d(u=h(u,o,i)),i=e):(i=e,u=o),l=[],o=0,w(e))},setPercentage:function(e){w(e),f=!0},applyMemoryKey:function(e){switch(e){case"MC":s=0,p(!1);break;case"MR":d(o=s);break;case"M+":p(),s+=o,l=[];break;case"M-":p(),s-=o,l=[];break;default:console.log("What memory key was that? ",e)}},showResult:function(){var e=h(u,o,i);null!==e?(y(),i=null,d(e),o=e):d(o)},clearValue:function(){l=[],v()},clearAll:function(){l=[],o=null,i=null,y(),d()},powerOff:function(){t.classList.remove("powered"),r=e.OFF,this.clearAll(),v()},powerOn:function(){t.classList.add("powered"),r=e.ON,this.clearAll()},isPoweredUp:function(){return r===e.ON}}},f=s();function d(e){if(f.isPoweredUp()){var r=e.target.innerText;String(f.getValue()).includes(".")&&"."===r||f.save(r)}}function p(e){if(f.isPoweredUp()){var r,t=e.target.innerText;switch(t){case"C":f.clearValue();break;case"AC":f.clearAll();break;case"√":r=f.getValue(),f.setValue(Math.sqrt(r));break;case"±":r=f.getValue(),f.setValue(-1*r);break;case"+":case"×":case"-":case"÷":f.setOperator(t);break;case"=":f.showResult();break;case"%":f.setPercentage(t);break;default:console.log("What operator was that?",t)}}}function w(e){if(f.isPoweredUp()){var r=e.target.innerText;f.applyMemoryKey(r)}}function y(e){switch(e.target.innerText){case"AC":f.isPoweredUp()||f.powerOn();break;case"OFF":default:f.isPoweredUp()&&f.powerOff()}}l.forEach(function(e){return e.addEventListener("click",d)}),o.forEach(function(e){return e.addEventListener("click",p)}),u.forEach(function(e){return e.addEventListener("click",w)}),i.forEach(function(e){return e.addEventListener("click",y)});
},{"./style.scss":6}]},{},[4])