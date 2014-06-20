"use strict";function p(a){throw a;}var s=void 0,t=!1;var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
"undefined"!==typeof module&&module.exports&&(module.exports=sjcl);
sjcl.cipher.aes=function(a){this.k[0][0][0]||this.C();var b,d,c,e,f=this.k[0][4],g=this.k[1];b=a.length;var h=1;4!==b&&(6!==b&&8!==b)&&p(new sjcl.exception.invalid("invalid aes key size"));this.b=[c=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){d=c[a-1];if(0===a%b||8===b&&4===a%b)d=f[d>>>24]<<24^f[d>>16&255]<<16^f[d>>8&255]<<8^f[d&255],0===a%b&&(d=d<<8^d>>>24^h<<24,h=h<<1^283*(h>>7));c[a]=c[a-b]^d}for(b=0;a;b++,a--)d=c[b&3?a:a-4],e[b]=4>=a||4>b?d:g[0][f[d>>>24]]^g[1][f[d>>16&255]]^g[2][f[d>>8&255]]^g[3][f[d&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return y(this,a,0)},decrypt:function(a){return y(this,a,1)},k:[[[],[],[],[],[]],[[],[],[],[],[]]],C:function(){var a=this.k[0],b=this.k[1],d=a[4],c=b[4],e,f,g,h=[],k=[],l,q,n,m;for(e=0;0x100>e;e++)k[(h[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!d[f];f^=l||1,g=k[g]||1){n=g^g<<1^g<<2^g<<3^g<<4;n=n>>8^n&255^99;d[f]=n;c[n]=f;q=h[e=h[l=h[f]]];m=0x1010101*q^0x10001*e^0x101*l^0x1010100*f;q=0x101*h[n]^0x1010100*n;for(e=0;4>e;e++)a[e][f]=q=q<<24^q>>>8,b[e][n]=m=m<<24^m>>>8}for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function y(a,b,d){4!==b.length&&p(new sjcl.exception.invalid("invalid aes block size"));var c=a.b[d],e=b[0]^c[0],f=b[d?3:1]^c[1],g=b[2]^c[2];b=b[d?1:3]^c[3];var h,k,l,q=c.length/4-2,n,m=4,u=[0,0,0,0];h=a.k[d];a=h[0];var r=h[1],v=h[2],w=h[3],x=h[4];for(n=0;n<q;n++)h=a[e>>>24]^r[f>>16&255]^v[g>>8&255]^w[b&255]^c[m],k=a[f>>>24]^r[g>>16&255]^v[b>>8&255]^w[e&255]^c[m+1],l=a[g>>>24]^r[b>>16&255]^v[e>>8&255]^w[f&255]^c[m+2],b=a[b>>>24]^r[e>>16&255]^v[f>>8&255]^w[g&255]^c[m+3],m+=4,e=h,f=k,g=l;for(n=0;4>
n;n++)u[d?3&-n:n]=x[e>>>24]<<24^x[f>>16&255]<<16^x[g>>8&255]<<8^x[b&255]^c[m++],h=e,e=f,f=g,g=b,b=h;return u}
sjcl.bitArray={bitSlice:function(a,b,d){a=sjcl.bitArray.O(a.slice(b/32),32-(b&31)).slice(1);return d===s?a:sjcl.bitArray.clamp(a,d-b)},extract:function(a,b,d){var c=Math.floor(-b-d&31);return((b+d-1^b)&-32?a[b/32|0]<<32-c^a[b/32+1|0]>>>c:a[b/32|0]>>>c)&(1<<d)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var d=a[a.length-1],c=sjcl.bitArray.getPartial(d);return 32===c?a.concat(b):sjcl.bitArray.O(b,c,d|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var d=a.length;b&=31;0<d&&b&&(a[d-1]=sjcl.bitArray.partial(b,a[d-1]&2147483648>>b-1,1));return a},partial:function(a,b,d){return 32===a?b:(d?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return t;var d=0,c;for(c=0;c<a.length;c++)d|=a[c]^b[c];return 0===
d},O:function(a,b,d,c){var e;e=0;for(c===s&&(c=[]);32<=b;b-=32)c.push(d),d=0;if(0===b)return c.concat(a);for(e=0;e<a.length;e++)c.push(d|a[e]>>>b),d=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);c.push(sjcl.bitArray.partial(b+a&31,32<b+a?d:c.pop(),1));return c},G:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.codec.utf8String={fromBits:function(a){var b="",d=sjcl.bitArray.bitLength(a),c,e;for(c=0;c<d/8;c++)0===(c&3)&&(e=a[c/4]),b+=String.fromCharCode(e>>>24),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],d,c=0;for(d=0;d<a.length;d++)c=c<<8|a.charCodeAt(d),3===(d&3)&&(b.push(c),c=0);d&3&&b.push(sjcl.bitArray.partial(8*(d&3),c));return b}};
sjcl.codec.base64={I:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,d){var c="",e=0,f=sjcl.codec.base64.I,g=0,h=sjcl.bitArray.bitLength(a);d&&(f=f.substr(0,62)+"-_");for(d=0;6*c.length<h;)c+=f.charAt((g^a[d]>>>e)>>>26),6>e?(g=a[d]<<6-e,e+=26,d++):(g<<=6,e-=6);for(;c.length&3&&!b;)c+="=";return c},toBits:function(a,b){a=a.replace(/\s|=/g,"");var d=[],c,e=0,f=sjcl.codec.base64.I,g=0,h;b&&(f=f.substr(0,62)+"-_");for(c=0;c<a.length;c++)h=f.indexOf(a.charAt(c)),
0>h&&p(new sjcl.exception.invalid("this isn't base64!")),26<e?(e-=26,d.push(g^h>>>e),g=h<<32-e):(e+=6,g^=h<<32-e);e&56&&d.push(sjcl.bitArray.partial(e&56,g,1));return d}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};sjcl.hash.sha256=function(a){this.b[0]||this.C();a?(this.q=a.q.slice(0),this.n=a.n.slice(0),this.h=a.h):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.q=this.M.slice(0);this.n=[];this.h=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,d=this.n=sjcl.bitArray.concat(this.n,a);b=this.h;a=this.h=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)z(this,d.splice(0,16));return this},finalize:function(){var a,b=this.n,d=this.q,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.h/
4294967296));for(b.push(this.h|0);b.length;)z(this,b.splice(0,16));this.reset();return d},M:[],b:[],C:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}var b=0,d=2,c;a:for(;64>b;d++){for(c=2;c*c<=d;c++)if(0===d%c)continue a;8>b&&(this.M[b]=a(Math.pow(d,0.5)));this.b[b]=a(Math.pow(d,1/3));b++}}};
function z(a,b){var d,c,e,f=b.slice(0),g=a.q,h=a.b,k=g[0],l=g[1],q=g[2],n=g[3],m=g[4],u=g[5],r=g[6],v=g[7];for(d=0;64>d;d++)16>d?c=f[d]:(c=f[d+1&15],e=f[d+14&15],c=f[d&15]=(c>>>7^c>>>18^c>>>3^c<<25^c<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+f[d&15]+f[d+9&15]|0),c=c+v+(m>>>6^m>>>11^m>>>25^m<<26^m<<21^m<<7)+(r^m&(u^r))+h[d],v=r,r=u,u=m,m=n+c|0,n=q,q=l,l=k,k=c+(l&q^n&(l^q))+(l>>>2^l>>>13^l>>>22^l<<30^l<<19^l<<10)|0;g[0]=g[0]+k|0;g[1]=g[1]+l|0;g[2]=g[2]+q|0;g[3]=g[3]+n|0;g[4]=g[4]+m|0;g[5]=g[5]+u|0;g[6]=
g[6]+r|0;g[7]=g[7]+v|0}
sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,d,c,e){var f,g=b.slice(0),h=sjcl.bitArray,k=h.bitLength(d)/8,l=h.bitLength(g)/8;e=e||64;c=c||[];7>k&&p(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(f=2;4>f&&l>>>8*f;f++);f<15-k&&(f=15-k);d=h.clamp(d,8*(15-f));b=sjcl.mode.ccm.K(a,b,d,c,e,f);g=sjcl.mode.ccm.o(a,g,d,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,d,c,e){e=e||64;c=c||[];var f=sjcl.bitArray,g=f.bitLength(d)/8,h=f.bitLength(b),k=f.clamp(b,h-e),l=f.bitSlice(b,
h-e),h=(h-e)/8;7>g&&p(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(b=2;4>b&&h>>>8*b;b++);b<15-g&&(b=15-g);d=f.clamp(d,8*(15-b));k=sjcl.mode.ccm.o(a,k,d,l,e,b);a=sjcl.mode.ccm.K(a,k.data,d,c,e,b);f.equal(k.tag,a)||p(new sjcl.exception.corrupt("ccm: tag doesn't match"));return k.data},K:function(a,b,d,c,e,f){var g=[],h=sjcl.bitArray,k=h.G;e/=8;(e%2||4>e||16<e)&&p(new sjcl.exception.invalid("ccm: invalid tag length"));(0xffffffff<c.length||0xffffffff<b.length)&&p(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data"));
f=[h.partial(8,(c.length?64:0)|e-2<<2|f-1)];f=h.concat(f,d);f[3]|=h.bitLength(b)/8;f=a.encrypt(f);if(c.length){d=h.bitLength(c)/8;65279>=d?g=[h.partial(16,d)]:0xffffffff>=d&&(g=h.concat([h.partial(16,65534)],[d]));g=h.concat(g,c);for(c=0;c<g.length;c+=4)f=a.encrypt(k(f,g.slice(c,c+4).concat([0,0,0])))}for(c=0;c<b.length;c+=4)f=a.encrypt(k(f,b.slice(c,c+4).concat([0,0,0])));return h.clamp(f,8*e)},o:function(a,b,d,c,e,f){var g,h=sjcl.bitArray;g=h.G;var k=b.length,l=h.bitLength(b);d=h.concat([h.partial(8,
f-1)],d).concat([0,0,0]).slice(0,4);c=h.bitSlice(g(c,a.encrypt(d)),0,e);if(!k)return{tag:c,data:[]};for(g=0;g<k;g+=4)d[3]++,e=a.encrypt(d),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:c,data:h.clamp(b,l)}}};
sjcl.mode.gcm={name:"gcm",encrypt:function(a,b,d,c,e){var f=b.slice(0);b=sjcl.bitArray;c=c||[];a=sjcl.mode.gcm.o(!0,a,f,c,d,e||128);return b.concat(a.data,a.tag)},decrypt:function(a,b,d,c,e){var f=b.slice(0),g=sjcl.bitArray,h=g.bitLength(f);e=e||128;c=c||[];e<=h?(b=g.bitSlice(f,h-e),f=g.bitSlice(f,0,h-e)):(b=f,f=[]);a=sjcl.mode.gcm.o(t,a,f,c,d,e);g.equal(a.tag,b)||p(new sjcl.exception.corrupt("gcm: tag doesn't match"));return a.data},Y:function(a,b){var d,c,e,f,g,h=sjcl.bitArray.G;e=[0,0,0,0];f=b.slice(0);
for(d=0;128>d;d++){(c=0!==(a[Math.floor(d/32)]&1<<31-d%32))&&(e=h(e,f));g=0!==(f[3]&1);for(c=3;0<c;c--)f[c]=f[c]>>>1|(f[c-1]&1)<<31;f[0]>>>=1;g&&(f[0]^=-0x1f000000)}return e},g:function(a,b,d){var c,e=d.length;b=b.slice(0);for(c=0;c<e;c+=4)b[0]^=0xffffffff&d[c],b[1]^=0xffffffff&d[c+1],b[2]^=0xffffffff&d[c+2],b[3]^=0xffffffff&d[c+3],b=sjcl.mode.gcm.Y(b,a);return b},o:function(a,b,d,c,e,f){var g,h,k,l,q,n,m,u,r=sjcl.bitArray;n=d.length;m=r.bitLength(d);u=r.bitLength(c);h=r.bitLength(e);g=b.encrypt([0,
0,0,0]);96===h?(e=e.slice(0),e=r.concat(e,[1])):(e=sjcl.mode.gcm.g(g,[0,0,0,0],e),e=sjcl.mode.gcm.g(g,e,[0,0,Math.floor(h/0x100000000),h&0xffffffff]));h=sjcl.mode.gcm.g(g,[0,0,0,0],c);q=e.slice(0);c=h.slice(0);a||(c=sjcl.mode.gcm.g(g,h,d));for(l=0;l<n;l+=4)q[3]++,k=b.encrypt(q),d[l]^=k[0],d[l+1]^=k[1],d[l+2]^=k[2],d[l+3]^=k[3];d=r.clamp(d,m);a&&(c=sjcl.mode.gcm.g(g,h,d));a=[Math.floor(u/0x100000000),u&0xffffffff,Math.floor(m/0x100000000),m&0xffffffff];c=sjcl.mode.gcm.g(g,c,a);k=b.encrypt(e);c[0]^=k[0];
c[1]^=k[1];c[2]^=k[2];c[3]^=k[3];return{tag:r.bitSlice(c,0,f),data:d}}};sjcl.misc.hmac=function(a,b){this.L=b=b||sjcl.hash.sha256;var d=[[],[]],c,e=b.prototype.blockSize/32;this.m=[new b,new b];a.length>e&&(a=b.hash(a));for(c=0;c<e;c++)d[0][c]=a[c]^909522486,d[1][c]=a[c]^1549556828;this.m[0].update(d[0]);this.m[1].update(d[1]);this.F=new b(this.m[0])};
sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a){this.P&&p(new sjcl.exception.invalid("encrypt on already updated hmac called!"));this.update(a);return this.digest(a)};sjcl.misc.hmac.prototype.reset=function(){this.F=new this.L(this.m[0]);this.P=t};sjcl.misc.hmac.prototype.update=function(a){this.P=!0;this.F.update(a)};sjcl.misc.hmac.prototype.digest=function(){var a=this.F.finalize(),a=(new this.L(this.m[1])).update(a).finalize();this.reset();return a};
sjcl.misc.pbkdf2=function(a,b,d,c,e){d=d||1E3;(0>c||0>d)&&p(sjcl.exception.invalid("invalid params to pbkdf2"));"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));e=e||sjcl.misc.hmac;a=new e(a);var f,g,h,k,l=[],q=sjcl.bitArray;for(k=1;32*l.length<(c||1);k++){e=f=a.encrypt(q.concat(b,[k]));for(g=1;g<d;g++){f=a.encrypt(f);for(h=0;h<f.length;h++)e[h]^=f[h]}l=l.concat(e)}c&&(l=q.clamp(l,c));return l};
sjcl.prng=function(a){this.c=[new sjcl.hash.sha256];this.i=[0];this.D=0;this.r={};this.B=0;this.J={};this.N=this.d=this.j=this.V=0;this.b=[0,0,0,0,0,0,0,0];this.f=[0,0,0,0];this.w=s;this.A=a;this.p=t;this.u={progress:{},seeded:{}};this.l=this.U=0;this.s=1;this.t=2;this.R=0x10000;this.H=[0,48,64,96,128,192,0x100,384,512,768,1024];this.S=3E4;this.Q=80};
sjcl.prng.prototype={randomWords:function(a,b){var d=[],c;c=this.isReady(b);var e;c===this.l&&p(new sjcl.exception.notReady("generator isn't seeded"));if(c&this.t){c=!(c&this.s);e=[];var f=0,g;this.N=e[0]=(new Date).valueOf()+this.S;for(g=0;16>g;g++)e.push(0x100000000*Math.random()|0);for(g=0;g<this.c.length&&!(e=e.concat(this.c[g].finalize()),f+=this.i[g],this.i[g]=0,!c&&this.D&1<<g);g++);this.D>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.i.push(0));this.d-=f;f>this.j&&(this.j=f);this.D++;
this.b=sjcl.hash.sha256.hash(this.b.concat(e));this.w=new sjcl.cipher.aes(this.b);for(c=0;4>c&&!(this.f[c]=this.f[c]+1|0,this.f[c]);c++);}for(c=0;c<a;c+=4)0===(c+1)%this.R&&A(this),e=B(this),d.push(e[0],e[1],e[2],e[3]);A(this);return d.slice(0,a)},setDefaultParanoia:function(a,b){0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b&&p("Setting paranoia=0 will ruin your security; use it only for testing");this.A=a},addEntropy:function(a,b,d){d=d||"user";var c,e,f=(new Date).valueOf(),
g=this.r[d],h=this.isReady(),k=0;c=this.J[d];c===s&&(c=this.J[d]=this.V++);g===s&&(g=this.r[d]=0);this.r[d]=(this.r[d]+1)%this.c.length;switch(typeof a){case "number":b===s&&(b=1);this.c[g].update([c,this.B++,1,b,f,1,a|0]);break;case "object":d=Object.prototype.toString.call(a);if("[object Uint32Array]"===d){e=[];for(d=0;d<a.length;d++)e.push(a[d]);a=e}else{"[object Array]"!==d&&(k=1);for(d=0;d<a.length&&!k;d++)"number"!==typeof a[d]&&(k=1)}if(!k){if(b===s)for(d=b=0;d<a.length;d++)for(e=a[d];0<e;)b++,
e>>>=1;this.c[g].update([c,this.B++,2,b,f,a.length].concat(a))}break;case "string":b===s&&(b=a.length);this.c[g].update([c,this.B++,3,b,f,a.length]);this.c[g].update(a);break;default:k=1}k&&p(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string"));this.i[g]+=b;this.d+=b;h===this.l&&(this.isReady()!==this.l&&C("seeded",Math.max(this.j,this.d)),C("progress",this.getProgress()))},isReady:function(a){a=this.H[a!==s?a:this.A];return this.j&&this.j>=a?this.i[0]>this.Q&&
(new Date).valueOf()>this.N?this.t|this.s:this.s:this.d>=a?this.t|this.l:this.l},getProgress:function(a){a=this.H[a?a:this.A];return this.j>=a?1:this.d>a?1:this.d/a},startCollectors:function(){this.p||(this.a={loadTimeCollector:D(this,this.$),mouseCollector:D(this,this.aa),keyboardCollector:D(this,this.Z),accelerometerCollector:D(this,this.T)},window.addEventListener?(window.addEventListener("load",this.a.loadTimeCollector,t),window.addEventListener("mousemove",this.a.mouseCollector,t),window.addEventListener("keypress",
this.a.keyboardCollector,t),window.addEventListener("devicemotion",this.a.accelerometerCollector,t)):document.attachEvent?(document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)):p(new sjcl.exception.bug("can't attach event")),this.p=!0)},stopCollectors:function(){this.p&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,t),window.removeEventListener("mousemove",
this.a.mouseCollector,t),window.removeEventListener("keypress",this.a.keyboardCollector,t),window.removeEventListener("devicemotion",this.a.accelerometerCollector,t)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.p=t)},addEventListener:function(a,b){this.u[a][this.U++]=b},removeEventListener:function(a,b){var d,c,e=this.u[a],f=[];for(c in e)e.hasOwnProperty(c)&&
e[c]===b&&f.push(c);for(d=0;d<f.length;d++)c=f[d],delete e[c]},Z:function(){E(1)},aa:function(a){sjcl.random.addEntropy([a.x||a.clientX||a.offsetX||0,a.y||a.clientY||a.offsetY||0],2,"mouse");E(0)},$:function(){E(2)},T:function(a){a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z;if(window.orientation){var b=window.orientation;"number"===typeof b&&sjcl.random.addEntropy(b,1,"accelerometer")}a&&sjcl.random.addEntropy(a,2,"accelerometer");E(0)}};
function C(a,b){var d,c=sjcl.random.u[a],e=[];for(d in c)c.hasOwnProperty(d)&&e.push(c[d]);for(d=0;d<e.length;d++)e[d](b)}function E(a){window&&window.performance&&"function"===typeof window.performance.now?sjcl.random.addEntropy(window.performance.now(),a,"loadtime"):sjcl.random.addEntropy((new Date).valueOf(),a,"loadtime")}function A(a){a.b=B(a).concat(B(a));a.w=new sjcl.cipher.aes(a.b)}function B(a){for(var b=0;4>b&&!(a.f[b]=a.f[b]+1|0,a.f[b]);b++);return a.w.encrypt(a.f)}
function D(a,b){return function(){b.apply(a,arguments)}}sjcl.random=new sjcl.prng(6);
a:try{var F,G,H,I;if(I="undefined"!==typeof module){var J;if(J=module.exports){var K;try{K=require("crypto")}catch(L){K=null}J=(G=K)&&G.randomBytes}I=J}if(I)F=G.randomBytes(128),F=new Uint32Array((new Uint8Array(F)).buffer),sjcl.random.addEntropy(F,1024,"crypto['randomBytes']");else if(window&&Uint32Array){H=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(H);else if(window.msCrypto&&window.msCrypto.getRandomValues)window.msCrypto.getRandomValues(H);
else break a;sjcl.random.addEntropy(H,1024,"crypto['getRandomValues']")}}catch(M){"undefined"!==typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(M))}
sjcl.json={defaults:{v:1,iter:1E3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},X:function(a,b,d,c){d=d||{};c=c||{};var e=sjcl.json,f=e.e({iv:sjcl.random.randomWords(4,0)},e.defaults),g;e.e(f,d);d=f.adata;"string"===typeof f.salt&&(f.salt=sjcl.codec.base64.toBits(f.salt));"string"===typeof f.iv&&(f.iv=sjcl.codec.base64.toBits(f.iv));(!sjcl.mode[f.mode]||!sjcl.cipher[f.cipher]||"string"===typeof a&&100>=f.iter||64!==f.ts&&96!==f.ts&&128!==f.ts||128!==f.ks&&192!==f.ks&&0x100!==f.ks||2>f.iv.length||4<
f.iv.length)&&p(new sjcl.exception.invalid("json encrypt: invalid parameters"));"string"===typeof a?(g=sjcl.misc.cachedPbkdf2(a,f),a=g.key.slice(0,f.ks/32),f.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.publicKey&&(g=a.kem(),f.kemtag=g.tag,a=g.key.slice(0,f.ks/32));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));"string"===typeof d&&(d=sjcl.codec.utf8String.toBits(d));g=new sjcl.cipher[f.cipher](a);e.e(c,f);c.key=a;f.ct=sjcl.mode[f.mode].encrypt(g,b,f.iv,d,f.ts);return f},encrypt:function(a,
b,d,c){var e=sjcl.json,f=e.X.apply(e,arguments);return e.encode(f)},W:function(a,b,d,c){d=d||{};c=c||{};var e=sjcl.json;b=e.e(e.e(e.e({},e.defaults),b),d,!0);var f;d=b.adata;"string"===typeof b.salt&&(b.salt=sjcl.codec.base64.toBits(b.salt));"string"===typeof b.iv&&(b.iv=sjcl.codec.base64.toBits(b.iv));(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"===typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&0x100!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)&&p(new sjcl.exception.invalid("json decrypt: invalid parameters"));
"string"===typeof a?(f=sjcl.misc.cachedPbkdf2(a,b),a=f.key.slice(0,b.ks/32),b.salt=f.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.secretKey&&(a=a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0,b.ks/32));"string"===typeof d&&(d=sjcl.codec.utf8String.toBits(d));f=new sjcl.cipher[b.cipher](a);d=sjcl.mode[b.mode].decrypt(f,b.ct,b.iv,d,b.ts);e.e(c,b);c.key=a;return sjcl.codec.utf8String.fromBits(d)},decrypt:function(a,b,d,c){var e=sjcl.json;return e.W(a,e.decode(b),d,c)},encode:function(a){var b,d=
"{",c="";for(b in a)if(a.hasOwnProperty(b))switch(b.match(/^[a-z0-9]+$/i)||p(new sjcl.exception.invalid("json encode: invalid property name")),d+=c+'"'+b+'":',c=",",typeof a[b]){case "number":case "boolean":d+=a[b];break;case "string":d+='"'+escape(a[b])+'"';break;case "object":d+='"'+sjcl.codec.base64.fromBits(a[b],0)+'"';break;default:p(new sjcl.exception.bug("json encode: unsupported type"))}return d+"}"},decode:function(a){a=a.replace(/\s/g,"");a.match(/^\{.*\}$/)||p(new sjcl.exception.invalid("json decode: this isn't json!"));
a=a.replace(/^\{|\}$/g,"").split(/,/);var b={},d,c;for(d=0;d<a.length;d++)(c=a[d].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i))||p(new sjcl.exception.invalid("json decode: this isn't json!")),b[c[2]]=c[3]?parseInt(c[3],10):c[2].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(c[4]):unescape(c[4]);return b},e:function(a,b,d){a===s&&(a={});if(b===s)return a;for(var c in b)b.hasOwnProperty(c)&&(d&&(a[c]!==s&&a[c]!==b[c])&&p(new sjcl.exception.invalid("required parameter overridden")),
a[c]=b[c]);return a},da:function(a,b){var d={},c;for(c in a)a.hasOwnProperty(c)&&a[c]!==b[c]&&(d[c]=a[c]);return d},ca:function(a,b){var d={},c;for(c=0;c<b.length;c++)a[b[c]]!==s&&(d[b[c]]=a[b[c]]);return d}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.ba={};
sjcl.misc.cachedPbkdf2=function(a,b){var d=sjcl.misc.ba,c;b=b||{};c=b.iter||1E3;d=d[a]=d[a]||{};c=d[c]=d[c]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)};d=b.salt===s?c.firstSalt:b.salt;c[d]=c[d]||sjcl.misc.pbkdf2(a,d,b.iter);return{key:c[d].slice(0),salt:d.slice(0)}};