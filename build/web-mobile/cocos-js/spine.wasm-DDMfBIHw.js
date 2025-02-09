System.register(["./_virtual_cc-DtVkgM4C.js"],(function(n){"use strict";var t;return{setters:[function(n){t=n._}],execute:function(){var e;n("default",(e="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,function(n){var r,i,o;void 0===n&&(n={}),r||(r=void 0!==n?n:{}),r.ready=new Promise((function(n,t){i=n,o=t}));var a=Object.assign({},r),u="";"undefined"!=typeof document&&document.currentScript&&(u=document.currentScript.src),e&&(u=e),u=0!==u.indexOf("blob:")?u.substr(0,u.replace(/[?#].*/,"").lastIndexOf("/")+1):"";var s,c=r.printErr||console.error.bind(console);Object.assign(r,a),a=null,r.wasmBinary&&(s=r.wasmBinary),r.noExitRuntime,"object"!=typeof WebAssembly&&I("no native wasm support detected");var f,l,h,p,d,v,y,m,g,b=!1;function w(){var n=f.buffer;r.HEAP8=l=new Int8Array(n),r.HEAP16=p=new Int16Array(n),r.HEAP32=v=new Int32Array(n),r.HEAPU8=h=new Uint8Array(n),r.HEAPU16=d=new Uint16Array(n),r.HEAPU32=y=new Uint32Array(n),r.HEAPF32=m=new Float32Array(n),r.HEAPF64=g=new Float64Array(n)}var F,T=[],C=[],P=[];function A(){var n=r.preRun.shift();T.unshift(n)}var k,W=0,O=null;function I(n){throw r.onAbort&&r.onAbort(n),c(n="Aborted("+n+")"),b=!0,n=new WebAssembly.RuntimeError(n+". Build with -sASSERTIONS for more info."),o(n),n}function E(n){return n.startsWith("data:application/octet-stream;base64,")}if(!E(k="spine.wasm")){var S=k;k=r.locateFile?r.locateFile(S,u):u+S}function G(n){try{if(n==k&&s)return new Uint8Array(s);throw"both async and sync fetching of the wasm failed"}catch(n){I(n)}}function R(n){return s||"function"!=typeof fetch?Promise.resolve().then((function(){return G(n)})):fetch(n,{credentials:"same-origin"}).then((function(t){if(!t.ok)throw"failed to load wasm binary file at '"+n+"'";return t.arrayBuffer()})).catch((function(){return G(n)}))}function j(n,t,e){return R(n).then((function(n){return WebAssembly.instantiate(n,t)})).then((function(n){return n})).then(e,(function(n){c("failed to asynchronously prepare wasm: "+n),I(n)}))}function H(n,t){var e=k;return s||"function"!=typeof WebAssembly.instantiateStreaming||E(e)||"function"!=typeof fetch?j(e,n,t):fetch(e,{credentials:"same-origin"}).then((function(r){return WebAssembly.instantiateStreaming(r,n).then(t,(function(r){return c("wasm streaming compile failed: "+r),c("falling back to ArrayBuffer instantiation"),j(e,n,t)}))}))}function U(n){for(;0<n.length;)n.shift()(r)}function L(n){switch(n){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+n)}}var _=void 0;function M(n){for(var t="";h[n];)t+=_[h[n++]];return t}var J={},x={},K={};function N(n){if(void 0===n)return"_unknown";var t=(n=n.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return 48<=t&&57>=t?"_"+n:n}function V(n,t){var e;return(e={},e[n=N(n)]=function(){return t.apply(this,arguments)},e)[n]}function D(n){var t=Error,e=V(n,(function(t){this.name=n,this.message=t,void 0!==(t=Error(t).stack)&&(this.stack=this.toString()+"\n"+t.replace(/^Error(:[^\n]*)?\n/,""))}));return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},e}var z=void 0;function B(n){throw new z(n)}var Z=void 0;function X(n){throw new Z(n)}function Y(n,t,e){function r(t){(t=e(t)).length!==n.length&&X("Mismatched type converter count");for(var r=0;r<n.length;++r)$(n[r],t[r])}n.forEach((function(n){K[n]=t}));var i=Array(t.length),o=[],a=0;t.forEach((function(n,t){x.hasOwnProperty(n)?i[t]=x[n]:(o.push(n),J.hasOwnProperty(n)||(J[n]=[]),J[n].push((function(){i[t]=x[n],++a===o.length&&r(i)})))})),0===o.length&&r(i)}function $(n,t){if(!("argPackAdvance"in t))throw new TypeError("registerType registeredInstance requires argPackAdvance");var e=t.name;if(n||B('type "'+e+'" must have a positive integer typeid pointer'),x.hasOwnProperty(n)){if({}.qa)return;B("Cannot register type '"+e+"' twice")}x[n]=t,delete K[n],J.hasOwnProperty(n)&&(t=J[n],delete J[n],t.forEach((function(n){return n()})))}function q(n){B(n.F.I.G.name+" instance already deleted")}var Q=!1;function nn(){}function tn(n){--n.count.value,0===n.count.value&&(n.L?n.M.S(n.L):n.I.G.S(n.H))}function en(n,t,e){return t===e?n:void 0===e.J||null===(n=en(n,t,e.J))?null:e.ha(n)}var rn={},on=[];function an(){for(;on.length;){var n=on.pop();n.F.U=!1,n.delete()}}var un=void 0,sn={};function cn(n,t){for(void 0===t&&B("ptr should not be undefined");n.J;)t=n.W(t),n=n.J;return sn[t]}function fn(n,t){return t.I&&t.H||X("makeClassHandle requires ptr and ptrType"),!!t.M!=!!t.L&&X("Both smartPtrType and smartPtr must be specified"),t.count={value:1},ln(Object.create(n,{F:{value:t}}))}function ln(n){return"undefined"==typeof FinalizationRegistry?(ln=function(n){return n},n):(Q=new FinalizationRegistry((function(n){tn(n.F)})),nn=function(n){Q.unregister(n)},(ln=function(n){var t=n.F;return t.L&&Q.register(n,{F:t},n),n})(n))}function hn(){}function pn(n,t,e){if(void 0===n[t].K){var r=n[t];n[t]=function(){return n[t].K.hasOwnProperty(arguments.length)||B("Function '"+e+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+n[t].K+")!"),n[t].K[arguments.length].apply(this,arguments)},n[t].K=[],n[t].K[r.T]=r}}function dn(n,t){r.hasOwnProperty(n)?(B("Cannot register public name '"+n+"' twice"),pn(r,n,n),r.hasOwnProperty(void 0)&&B("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"),r[n].K[void 0]=t):r[n]=t}function vn(n,t,e,r,i,o,a,u){this.name=n,this.constructor=t,this.P=e,this.S=r,this.J=i,this.ia=o,this.W=a,this.ha=u,this.la=[]}function yn(n,t,e){for(;t!==e;)t.W||B("Expected null or instance of "+e.name+", got an instance of "+t.name),n=t.W(n),t=t.J;return n}function mn(n,t){return null===t?(this.$&&B("null is not a valid "+this.name),0):(t.F||B('Cannot pass "'+Un(t)+'" as a '+this.name),t.F.H||B("Cannot pass deleted object as a pointer of type "+this.name),yn(t.F.H,t.F.I.G,this.G))}function gn(n,t){if(null===t){if(this.$&&B("null is not a valid "+this.name),this.Z){var e=this.ma();return null!==n&&n.push(this.S,e),e}return 0}if(t.F||B('Cannot pass "'+Un(t)+'" as a '+this.name),t.F.H||B("Cannot pass deleted object as a pointer of type "+this.name),!this.Y&&t.F.I.Y&&B("Cannot convert argument of type "+(t.F.M?t.F.M.name:t.F.I.name)+" to parameter type "+this.name),e=yn(t.F.H,t.F.I.G,this.G),this.Z)switch(void 0===t.F.L&&B("Passing raw pointer to smart pointer is illegal"),this.pa){case 0:t.F.M===this?e=t.F.L:B("Cannot convert argument of type "+(t.F.M?t.F.M.name:t.F.I.name)+" to parameter type "+this.name);break;case 1:e=t.F.L;break;case 2:if(t.F.M===this)e=t.F.L;else{var r=t.clone();e=this.na(e,Hn((function(){r.delete()}))),null!==n&&n.push(this.S,e)}break;default:B("Unsupporting sharing policy")}return e}function bn(n,t){return null===t?(this.$&&B("null is not a valid "+this.name),0):(t.F||B('Cannot pass "'+Un(t)+'" as a '+this.name),t.F.H||B("Cannot pass deleted object as a pointer of type "+this.name),t.F.I.Y&&B("Cannot convert argument of type "+t.F.I.name+" to parameter type "+this.name),yn(t.F.H,t.F.I.G,this.G))}function wn(n){return this.fromWireType(v[n>>2])}function Fn(n,t,e,r){this.name=n,this.G=t,this.$=e,this.Y=r,this.Z=!1,this.S=this.na=this.ma=this.da=this.pa=this.ka=void 0,void 0!==t.J?this.toWireType=gn:(this.toWireType=r?mn:bn,this.O=null)}function Tn(n,t){r.hasOwnProperty(n)||X("Replacing nonexistant public symbol"),r[n]=t,r[n].T=void 0}function Cn(n,t){var e=[];return function(){if(e.length=0,Object.assign(e,arguments),n.includes("j")){var i=r["dynCall_"+n];i=e&&e.length?i.apply(null,[t].concat(e)):i.call(null,t)}else i=F.get(t).apply(null,e);return i}}function Pn(n,t){var e=(n=M(n)).includes("j")?Cn(n,t):F.get(t);return"function"!=typeof e&&B("unknown function pointer with signature "+n+": "+t),e}var An=void 0;function kn(n){var t=M(n=Yn(n));return Xn(n),t}function Wn(n,t){var e=[],r={};throw t.forEach((function n(t){r[t]||x[t]||(K[t]?K[t].forEach(n):(e.push(t),r[t]=!0))})),new An(n+": "+e.map(kn).join([", "]))}function On(n){for(;n.length;){var t=n.pop();n.pop()(t)}}function In(n,t,e,r,i){var o=t.length;2>o&&B("argTypes array size mismatch! Must at least get return value and 'this' types!");var a=null!==t[1]&&null!==e,u=!1;for(e=1;e<t.length;++e)if(null!==t[e]&&void 0===t[e].O){u=!0;break}var s="void"!==t[0].name,c=o-2,f=Array(c),l=[],h=[];return function(){if(arguments.length!==c&&B("function "+n+" called with "+arguments.length+" arguments, expected "+c+" args!"),h.length=0,l.length=a?2:1,l[0]=i,a){var e=t[1].toWireType(h,this);l[1]=e}for(var o=0;o<c;++o)f[o]=t[o+2].toWireType(h,arguments[o]),l.push(f[o]);if(o=r.apply(null,l),u)On(h);else for(var p=a?1:2;p<t.length;p++){var d=1===p?e:f[p-2];null!==t[p].O&&t[p].O(d)}return s?t[0].fromWireType(o):void 0}}function En(n,t){for(var e=[],r=0;r<n;r++)e.push(y[t+4*r>>2]);return e}function Sn(n,t,e){return n instanceof Object||B(e+' with invalid "this": '+n),n instanceof t.G.constructor||B(e+' incompatible with "this" of type '+n.constructor.name),n.F.H||B("cannot call emscripten binding method "+e+" on deleted object"),yn(n.F.H,n.F.I.G,t.G)}var Gn=new function(){this.N=[void 0],this.aa=[],this.get=function(n){return this.N[n]},this.has=function(n){return void 0!==this.N[n]},this.ea=function(n){var t=this.aa.pop()||this.N.length;return this.N[t]=n,t},this.fa=function(n){this.N[n]=void 0,this.aa.push(n)}};function Rn(n){n>=Gn.ba&&0==--Gn.get(n).oa&&Gn.fa(n)}var jn=function(n){return n||B("Cannot use deleted val. handle = "+n),Gn.get(n).value},Hn=function(n){switch(n){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:return Gn.ea({oa:1,value:n})}};function Un(n){if(null===n)return"null";var t=typeof n;return"object"===t||"array"===t||"function"===t?n.toString():""+n}function Ln(n,t){switch(t){case 2:return function(n){return this.fromWireType(m[n>>2])};case 3:return function(n){return this.fromWireType(g[n>>3])};default:throw new TypeError("Unknown float type: "+n)}}function _n(n,t,e){switch(t){case 0:return e?function(n){return l[n]}:function(n){return h[n]};case 1:return e?function(n){return p[n>>1]}:function(n){return d[n>>1]};case 2:return e?function(n){return v[n>>2]}:function(n){return y[n>>2]};default:throw new TypeError("Unknown integer type: "+n)}}var Mn="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function Jn(n,t){var e=x[n];return void 0===e&&B(t+" has unknown type "+kn(n)),e}var xn={};function Kn(){var n=r.SpineWasmUtil,t=n.getCurrentListenerID(),e=n.getCurrentTrackEntry(),i=n.getCurrentEvent();n=n.getCurrentEventType(),globalThis.TrackEntryListeners.emitListener(t,e,i,n)}function Nn(){var n=r.SpineWasmUtil,t=n.getCurrentListenerID(),e=n.getCurrentEventType(),i=n.getCurrentTrackEntry();n=n.getCurrentEvent(),globalThis.TrackEntryListeners.emitTrackEntryListener(t,i,n,e)}r._spineListenerCallBackFromJS=Kn,r._spineTrackListenerCallback=Nn;for(var Vn=Array(256),Dn=0;256>Dn;++Dn)Vn[Dn]=String.fromCharCode(Dn);_=Vn,z=r.BindingError=D("BindingError"),Z=r.InternalError=D("InternalError"),hn.prototype.isAliasOf=function(n){if(!(this instanceof hn&&n instanceof hn))return!1;var t=this.F.I.G,e=this.F.H,r=n.F.I.G;for(n=n.F.H;t.J;)e=t.W(e),t=t.J;for(;r.J;)n=r.W(n),r=r.J;return t===r&&e===n},hn.prototype.clone=function(){if(this.F.H||q(this),this.F.V)return this.F.count.value+=1,this;var n=ln,t=Object,e=t.create,r=Object.getPrototypeOf(this),i=this.F;return(n=n(e.call(t,r,{F:{value:{count:i.count,U:i.U,V:i.V,H:i.H,I:i.I,L:i.L,M:i.M}}}))).F.count.value+=1,n.F.U=!1,n},hn.prototype.delete=function(){this.F.H||q(this),this.F.U&&!this.F.V&&B("Object already scheduled for deletion"),nn(this),tn(this.F),this.F.V||(this.F.L=void 0,this.F.H=void 0)},hn.prototype.isDeleted=function(){return!this.F.H},hn.prototype.deleteLater=function(){return this.F.H||q(this),this.F.U&&!this.F.V&&B("Object already scheduled for deletion"),on.push(this),1===on.length&&un&&un(an),this.F.U=!0,this},r.getInheritedInstanceCount=function(){return Object.keys(sn).length},r.getLiveInheritedInstances=function(){var n,t=[];for(n in sn)sn.hasOwnProperty(n)&&t.push(sn[n]);return t},r.flushPendingDeletes=an,r.setDelayFunction=function(n){un=n,on.length&&un&&un(an)},Fn.prototype.ja=function(n){return this.da&&(n=this.da(n)),n},Fn.prototype.ca=function(n){this.S&&this.S(n)},Fn.prototype.argPackAdvance=8,Fn.prototype.readValueFromPointer=wn,Fn.prototype.deleteObject=function(n){null!==n&&n.delete()},Fn.prototype.fromWireType=function(n){function t(){return this.Z?fn(this.G.P,{I:this.ka,H:e,M:this,L:n}):fn(this.G.P,{I:this,H:n})}var e=this.ja(n);if(!e)return this.ca(n),null;var r=cn(this.G,e);if(void 0!==r)return 0===r.F.count.value?(r.F.H=e,r.F.L=n,r.clone()):(r=r.clone(),this.ca(n),r);if(r=this.G.ia(e),!(r=rn[r]))return t.call(this);r=this.Y?r.ga:r.pointerType;var i=en(e,this.G,r.G);return null===i?t.call(this):this.Z?fn(r.G.P,{I:r,H:i,M:this,L:n}):fn(r.G.P,{I:r,H:i})},An=r.UnboundTypeError=D("UnboundTypeError"),Gn.N.push({value:void 0},{value:null},{value:!0},{value:!1}),Gn.ba=Gn.N.length,r.count_emval_handles=function(){for(var n=0,t=Gn.ba;t<Gn.N.length;++t)void 0!==Gn.N[t]&&++n;return n};var zn,Bn={p:function(){},t:function(n,t,e,r,i){var o=L(e);$(n,{name:t=M(t),fromWireType:function(n){return!!n},toWireType:function(n,t){return t?r:i},argPackAdvance:8,readValueFromPointer:function(n){if(1===e)var r=l;else if(2===e)r=p;else{if(4!==e)throw new TypeError("Unknown boolean type size: "+t);r=v}return this.fromWireType(r[n>>o])},O:null})},c:function(n,t,e,r,i,o,a,u,s,c,f,l,h){f=M(f),o=Pn(i,o),u&&(u=Pn(a,u)),c&&(c=Pn(s,c)),h=Pn(l,h);var p=N(f);dn(p,(function(){Wn("Cannot construct "+f+" due to unbound types",[r])})),Y([n,t,e],r?[r]:[],(function(t){if(t=t[0],r)var e=t.G,i=e.P;else i=hn.prototype;t=V(p,(function(){if(Object.getPrototypeOf(this)!==a)throw new z("Use 'new' to construct "+f);if(void 0===s.R)throw new z(f+" has no accessible constructor");var n=s.R[arguments.length];if(void 0===n)throw new z("Tried to invoke ctor of "+f+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(s.R).toString()+") parameters instead!");return n.apply(this,arguments)}));var a=Object.create(i,{constructor:{value:t}});t.prototype=a;var s=new vn(f,t,a,h,e,o,u,c);s.J&&(void 0===s.J.X&&(s.J.X=[]),s.J.X.push(s)),e=new Fn(f,s,!0,!1),i=new Fn(f+"*",s,!1,!1);var l=new Fn(f+" const*",s,!1,!0);return rn[n]={pointerType:i,ga:l},Tn(p,t),[e,i,l]}))},f:function(n,e,r,i,o,a,u){var s=En(r,i);e=M(e),a=Pn(o,a),Y([],[n],(function(n){function i(){Wn("Cannot call "+o+" due to unbound types",s)}var o=(n=n[0]).name+"."+e;e.startsWith("@@")&&(e=Symbol[e.substring(2)]);var c=n.G.constructor;return void 0===c[e]?(i.T=r-1,c[e]=i):(pn(c,e,o),c[e].K[r-1]=i),Y([],s,(function(i){if(i=In(o,[i[0],null].concat(i.slice(1)),null,a,u),void 0===c[e].K?(i.T=r-1,c[e]=i):c[e].K[r-1]=i,n.G.X)for(var s,f=t(n.G.X);!(s=f()).done;){var l=s.value;l.constructor.hasOwnProperty(e)||(l.constructor[e]=i)}return[]})),[]}))},h:function(n,t,e,r,i,o,a,u){t=M(t),o=Pn(i,o),Y([],[n],(function(n){var i=(n=n[0]).name+"."+t,s={get:function(){Wn("Cannot access "+i+" due to unbound types",[e])},enumerable:!0,configurable:!0};return s.set=u?function(){Wn("Cannot access "+i+" due to unbound types",[e])}:function(){B(i+" is a read-only property")},Object.defineProperty(n.G.constructor,t,s),Y([],[e],(function(e){e=e[0];var i={get:function(){return e.fromWireType(o(r))},enumerable:!0};return u&&(u=Pn(a,u),i.set=function(n){var t=[];u(r,e.toWireType(t,n)),On(t)}),Object.defineProperty(n.G.constructor,t,i),[]})),[]}))},d:function(n,t,e,r,i,o){0<t||I();var a=En(t,e);i=Pn(r,i),Y([],[n],(function(n){var e="constructor "+(n=n[0]).name;if(void 0===n.G.R&&(n.G.R=[]),void 0!==n.G.R[t-1])throw new z("Cannot register multiple constructors with identical number of parameters ("+(t-1)+") for class '"+n.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return n.G.R[t-1]=function(){Wn("Cannot construct "+n.name+" due to unbound types",a)},Y([],a,(function(r){return r.splice(1,0,null),n.G.R[t-1]=In(e,r,null,i,o),[]})),[]}))},a:function(n,t,e,r,i,o,a,u){var s=En(e,r);t=M(t),o=Pn(i,o),Y([],[n],(function(n){function r(){Wn("Cannot call "+i+" due to unbound types",s)}var i=(n=n[0]).name+"."+t;t.startsWith("@@")&&(t=Symbol[t.substring(2)]),u&&n.G.la.push(t);var c=n.G.P,f=c[t];return void 0===f||void 0===f.K&&f.className!==n.name&&f.T===e-2?(r.T=e-2,r.className=n.name,c[t]=r):(pn(c,t,i),c[t].K[e-2]=r),Y([],s,(function(r){return r=In(i,r,n,o,a),void 0===c[t].K?(r.T=e-2,c[t]=r):c[t].K[e-2]=r,[]})),[]}))},b:function(n,t,e,r,i,o,a,u,s,c){t=M(t),i=Pn(r,i),Y([],[n],(function(n){var r=(n=n[0]).name+"."+t,f={get:function(){Wn("Cannot access "+r+" due to unbound types",[e,a])},enumerable:!0,configurable:!0};return f.set=s?function(){Wn("Cannot access "+r+" due to unbound types",[e,a])}:function(){B(r+" is a read-only property")},Object.defineProperty(n.G.P,t,f),Y([],s?[e,a]:[e],(function(e){var a=e[0],f={get:function(){var t=Sn(this,n,r+" getter");return a.fromWireType(i(o,t))},enumerable:!0};if(s){s=Pn(u,s);var l=e[1];f.set=function(t){var e=Sn(this,n,r+" setter"),i=[];s(c,e,l.toWireType(i,t)),On(i)}}return Object.defineProperty(n.G.P,t,f),[]})),[]}))},s:function(n,t){$(n,{name:t=M(t),fromWireType:function(n){var t=jn(n);return Rn(n),t},toWireType:function(n,t){return Hn(t)},argPackAdvance:8,readValueFromPointer:wn,O:null})},m:function(n,t,e){e=L(e),$(n,{name:t=M(t),fromWireType:function(n){return n},toWireType:function(n,t){return t},argPackAdvance:8,readValueFromPointer:Ln(t,e),O:null})},e:function(n,t,e,r,i){t=M(t),-1===i&&(i=4294967295),i=L(e);var o=function(n){return n};if(0===r){var a=32-8*e;o=function(n){return n<<a>>>a}}e=t.includes("unsigned")?function(n,t){return t>>>0}:function(n,t){return t},$(n,{name:t,fromWireType:o,toWireType:e,argPackAdvance:8,readValueFromPointer:_n(t,i,0!==r),O:null})},r:function(n,t){var e="std::string"===(t=M(t));$(n,{name:t,fromWireType:function(n){var t=y[n>>2],r=n+4;if(e)for(var i=r,o=0;o<=t;++o){var a=r+o;if(o==t||0==h[a]){if(i){var u=i,s=h,c=u+(a-i);for(i=u;s[i]&&!(i>=c);)++i;if(16<i-u&&s.buffer&&Mn)u=Mn.decode(s.subarray(u,i));else{for(c="";u<i;){var f=s[u++];if(128&f){var l=63&s[u++];if(192==(224&f))c+=String.fromCharCode((31&f)<<6|l);else{var p=63&s[u++];65536>(f=224==(240&f)?(15&f)<<12|l<<6|p:(7&f)<<18|l<<12|p<<6|63&s[u++])?c+=String.fromCharCode(f):(f-=65536,c+=String.fromCharCode(55296|f>>10,56320|1023&f))}}else c+=String.fromCharCode(f)}u=c}}else u="";if(void 0===d)var d=u;else d+=String.fromCharCode(0),d+=u;i=a+1}}else{for(d=Array(t),o=0;o<t;++o)d[o]=String.fromCharCode(h[r+o]);d=d.join("")}return Xn(n),d},toWireType:function(n,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var r,i,o="string"==typeof t;if(o||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int8Array||B("Cannot pass non-string to std::string"),e&&o)for(r=i=0;r<t.length;++r){var a=t.charCodeAt(r);127>=a?i++:2047>=a?i+=2:55296<=a&&57343>=a?(i+=4,++r):i+=3}else i=t.length;if(a=(i=Zn(4+(r=i)+1))+4,y[i>>2]=r,e&&o){if(o=a,a=r+1,r=h,0<a){a=o+a-1;for(var u=0;u<t.length;++u){var s=t.charCodeAt(u);if(55296<=s&&57343>=s&&(s=65536+((1023&s)<<10)|1023&t.charCodeAt(++u)),127>=s){if(o>=a)break;r[o++]=s}else{if(2047>=s){if(o+1>=a)break;r[o++]=192|s>>6}else{if(65535>=s){if(o+2>=a)break;r[o++]=224|s>>12}else{if(o+3>=a)break;r[o++]=240|s>>18,r[o++]=128|s>>12&63}r[o++]=128|s>>6&63}r[o++]=128|63&s}}r[o]=0}}else if(o)for(o=0;o<r;++o)255<(u=t.charCodeAt(o))&&(Xn(a),B("String has UTF-16 code units that do not fit in 8 bits")),h[a+o]=u;else for(o=0;o<r;++o)h[a+o]=t[o];return null!==n&&n.push(Xn,i),i},argPackAdvance:8,readValueFromPointer:wn,O:function(n){Xn(n)}})},u:function(n,t){$(n,{ra:!0,name:t=M(t),argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},j:function(n,t,e){n=jn(n),t=Jn(t,"emval::as");var r=[],i=Hn(r);return y[e>>2]=i,t.toWireType(r,n)},g:Rn,k:function(n,t){return n=jn(n),t=jn(t),Hn(n[t])},o:function(n){var t=xn[n];return Hn(void 0===t?M(n):t)},i:function(n){On(jn(n)),Rn(n)},n:function(n,t){return n=(n=Jn(n,"_emval_take_value")).readValueFromPointer(t),Hn(n)},l:function(){I("")},q:function(n){var t=h.length;if(2147483648<(n>>>=0))return!1;for(var e=1;4>=e;e*=2){var r=t*(1+.2/e);r=Math.min(r,n+100663296);var i=Math;r=Math.max(n,r);n:{i=i.min.call(i,2147483648,r+(65536-r%65536)%65536)-f.buffer.byteLength+65535>>>16;try{f.grow(i),w();var o=1;break n}catch(n){}o=void 0}if(o)return!0}return!1},w:Kn,v:Nn};function Zn(){return(Zn=r.asm.A).apply(null,arguments)}function Xn(){return(Xn=r.asm.B).apply(null,arguments)}function Yn(){return(Yn=r.asm.C).apply(null,arguments)}function $n(){function n(){if(!zn&&(zn=!0,r.calledRun=!0,!b)){if(U(C),i(r),r.onRuntimeInitialized&&r.onRuntimeInitialized(),r.postRun)for("function"==typeof r.postRun&&(r.postRun=[r.postRun]);r.postRun.length;){var n=r.postRun.shift();P.unshift(n)}U(P)}}if(!(0<W)){if(r.preRun)for("function"==typeof r.preRun&&(r.preRun=[r.preRun]);r.preRun.length;)A();U(T),0<W||(r.setStatus?(r.setStatus("Running..."),setTimeout((function(){setTimeout((function(){r.setStatus("")}),1),n()}),1)):n())}}if(function(){function n(n){if(n=n.exports,r.asm=n,f=r.asm.x,w(),F=r.asm.z,C.unshift(r.asm.y),W--,r.monitorRunDependencies&&r.monitorRunDependencies(W),0==W&&O){var t=O;O=null,t()}return n}var t={a:Bn};if(W++,r.monitorRunDependencies&&r.monitorRunDependencies(W),r.instantiateWasm)try{return r.instantiateWasm(t,n)}catch(n){c("Module.instantiateWasm callback failed with error: "+n),o(n)}H(t,(function(t){n(t.instance)})).catch(o)}(),r.__embind_initialize_bindings=function(){return(r.__embind_initialize_bindings=r.asm.D).apply(null,arguments)},O=function n(){zn||$n(),zn||(O=n)},r.preInit)for("function"==typeof r.preInit&&(r.preInit=[r.preInit]);0<r.preInit.length;)r.preInit.pop()();return $n(),n.ready}))}}}));
//# sourceMappingURL=spine.wasm-DDMfBIHw.js.map
