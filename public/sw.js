if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,r,i)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return n;case"module":return a;default:return e(s)}}))).then((e=>{const s=i(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0.14777d04a1a1df332158.worker.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/05d954cf.4c74614a77b64125f03c.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/commons.9b549cceddc4472f1953.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/d6797f08d74971b59e0f3a647ed96a24f62966d5.5f14eca50676da30727e.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/framework.461c3586ea965dd556df.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/main-860f85e100dc5c1003ce.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/pages/%5B[...index%5D%5D-d9f8a1bd480d99c6d0ed.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/pages/404-f6ef9c5693c2e32fdcfc.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/pages/_app-38931888837383d0258c.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/pages/_error-34d0758a185bea1aa54c.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/polyfills-2473c6643d514137e5d1.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/chunks/webpack-95c2b224bccf352ee870.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/css/ff9c07f8c1d72f56048a.css",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/dHYZCROoMqDBE17_Iy59N/_buildManifest.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/_next/static/dHYZCROoMqDBE17_Iy59N/_ssgManifest.js",revision:"dHYZCROoMqDBE17_Iy59N"},{url:"/fonts/Inter/Black.woff",revision:"f28878ba7d350d41d434de2198984b88"},{url:"/fonts/Inter/Black.woff2",revision:"bf86b77da9b231301af9baa25ee5e716"},{url:"/fonts/Inter/Bold.woff",revision:"86c52761754506e53f8fc52e5c092061"},{url:"/fonts/Inter/Bold.woff2",revision:"f8632aabbe660a5373460ca7201164f2"},{url:"/fonts/Inter/ExtraBold.woff",revision:"9702093362f9b9ed7ba9b4a9b621bbc1"},{url:"/fonts/Inter/ExtraBold.woff2",revision:"ac897e94d5ff6070b4b859a998d87fe9"},{url:"/fonts/Inter/ExtraLight.woff",revision:"9f9bf50d56e870d62b03895627d05f5d"},{url:"/fonts/Inter/ExtraLight.woff2",revision:"99e58318027487ac5b88e29e2c277aaf"},{url:"/fonts/Inter/Light.woff",revision:"81ead681a243d61ac436ce07f195d7c8"},{url:"/fonts/Inter/Light.woff2",revision:"be599afe65fff82af5c9a0363250b26b"},{url:"/fonts/Inter/Medium.woff",revision:"b873946da21e81c09a97d6eef51e1968"},{url:"/fonts/Inter/Medium.woff2",revision:"90c0b94dca7f186ef96e73e95d3a56d3"},{url:"/fonts/Inter/Regular.woff",revision:"8ad2b9c2ed49488ffad087c5cf91c57f"},{url:"/fonts/Inter/Regular.woff2",revision:"f2b9a1999d51e60cd9d3b07fe2c084ec"},{url:"/fonts/Inter/SemiBold.woff",revision:"d2693029d29165e43d2eacc3e4f1b468"},{url:"/fonts/Inter/SemiBold.woff2",revision:"a472b955014ecdbf64c2258edaf7ef03"},{url:"/fonts/Inter/Thin.woff",revision:"cbd196a0211678d5ef5da5683964f8d0"},{url:"/fonts/Inter/Thin.woff2",revision:"0357a9aeab2237d1e58ca38099345228"},{url:"/icons/icon-144x144.png",revision:"635b1abbc5ed9cdef184d8ef03418edc"},{url:"/icons/icon-192x192.png",revision:"bf814573a34e7336d60556d29b33692f"},{url:"/icons/icon-256x256.png",revision:"e19180ba2da6da0ae4a719c1a815a75d"},{url:"/icons/icon-384x384.png",revision:"712034b81c7859db0fd5f6f0c6a3f07f"},{url:"/icons/icon-48x48.png",revision:"ae518b14d58dd0957cee589abcb71b5c"},{url:"/icons/icon-512x512.png",revision:"92e4603ef4a532a18051b6a96511d2d9"},{url:"/icons/icon-72x72.png",revision:"8d08206951a00474a4ee7a4108b318f6"},{url:"/icons/icon-96x96.png",revision:"0fefbee4094bb3132a6db71698dcf42b"},{url:"/images/logo.png",revision:"aef99352785d87a3154296b63a8d992e"},{url:"/manifest.json",revision:"3da9f6ff438b2cb8c0067d19563119f5"},{url:"/sitemap.xml",revision:"4da5408dfedb2ee538c1d60cbb1ff4ff"},{url:"/svg/close.svg",revision:"250b3e74aada4715fa240469289fa53a"},{url:"/svg/code.svg",revision:"fa31174ab7dd03d97dcfc7577371c840"},{url:"/svg/dice.svg",revision:"12c968be56abce5993333006b3249d85"},{url:"/svg/download.svg",revision:"77fd2f6caa8941cf910cf0fc61ef6fb1"},{url:"/svg/footer-wave.svg",revision:"40c0ad4ea60681d7f796be6ebf89f798"},{url:"/svg/info.svg",revision:"31403226662cc61b966b3b04c21a28e2"},{url:"/svg/remove.svg",revision:"e3a75246a0322f051e4371b678541aaa"},{url:"/svg/slider-points-max.svg",revision:"040fe4ae3fa5583485c77c54951ffa7e"},{url:"/svg/slider-points-min.svg",revision:"af80a4ee1aa44b3aa0be9f1ab192065e"},{url:"/svg/slider-randomness-max.svg",revision:"a80cf4e317075db697b88de8827a9e81"},{url:"/svg/slider-randomness-min.svg",revision:"6bd4107c7460f2dd016606b9edb2973b"},{url:"/svg/transparency.svg",revision:"1d89fa7d9bf45f8fdbc3f74ec9bfe1d8"},{url:"/svg/wave-0.svg",revision:"a2e414e8bbcb542b3137b7cc580143d1"},{url:"/svg/wave-1.svg",revision:"09a92626cf73ea3f7a35771dd10b6a67"},{url:"/svg/wave-2.svg",revision:"690a82504fb9be9c3aad8784e282adfb"},{url:"/svg/wave-3.svg",revision:"6231ed865842b667ecd9d88449157b85"},{url:"/svg/wave-4.svg",revision:"861932c487702680d5014d46086f693e"},{url:"/svg/wave-5.svg",revision:"bc8928eeb57b0d24a21d43d9efd5dad7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
