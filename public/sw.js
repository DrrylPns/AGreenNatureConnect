if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let i={};const n=e=>s(e,t),d={module:{uri:t},exports:i,require:n};a[t]=Promise.all(c.map((e=>d[e]||n(e)))).then((e=>(r(...e),i)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"66f077729f9157bafe41d3033eb1a986"},{url:"/_next/static/ZTIlLcvbrYkd4mtLr9qUd/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/ZTIlLcvbrYkd4mtLr9qUd/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/00cbbcb7-4d55a8414cd90bcb.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/07115393-0b857206f2a2b535.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1052-8526e5eca2044564.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1126-b02d685f807a6232.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/12038df7-bec6317868498dda.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1220-796b8172f8a8bf1f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1270-65af856f82edead0.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1283-0ed2f1d8822437e0.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1368-cea35a166b0446ab.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/140-9e14899ce3175f39.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1518-cf6f3e9917ee19ae.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1727-89937051cd59038c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1749-81b7715699658312.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1821-84c3eb0d92ce59b5.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/1964-5502195e86f91e9f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/2221-542d353d733aaf9c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/2299-d84045504ffddfef.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/2311-b271883418fc3ceb.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/234-8371511209cede0a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/243dde97.ee9b7ff69b7ca52b.js",revision:"ee9b7ff69b7ca52b"},{url:"/_next/static/chunks/248-d73bd41d5d9a184a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/2598-c9df6912f0048a34.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/2644-c5f3df211f0ea6a4.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/2802.d3451d83f7b5a281.js",revision:"d3451d83f7b5a281"},{url:"/_next/static/chunks/2908.346c27658cd52e97.js",revision:"346c27658cd52e97"},{url:"/_next/static/chunks/2936-82540eeea07dbb17.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3133-69eb886eeec094aa.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3173-f8c41a7b82006d47.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3308-bac89847169921c5.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3319-27cfd8d204418ebe.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3359.7bf4aca665642789.js",revision:"7bf4aca665642789"},{url:"/_next/static/chunks/3477.109c6395cd06de91.js",revision:"109c6395cd06de91"},{url:"/_next/static/chunks/35-1b3df5bb20b0daf0.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3548-9e17a2ee9f542743.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3590-417355782c40e449.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3600-3ca9acf20b499eea.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3623-1076b0f52dbf0175.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3627521c-502f3a115ad15333.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3663-2897f1c96a1569ad.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3694-cd3413304ac2321a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3841-cda8bbfe338d3417.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/3888.e8341d1fe473a1bc.js",revision:"e8341d1fe473a1bc"},{url:"/_next/static/chunks/3889-03829fb9201c9d0d.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/39209d7c-67806e8de87289d1.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/4046-a2fd15ae5af39d21.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/4139-fdf737e1290fa170.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/4268-5bc2eaaf9548b0d1.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/434-604d05aae1283b8a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/4806-7fe32072670b8dda.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/48507feb-8ebe3b1684dd8bb1.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/4948-728afd60160e6052.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/4b494101-94f6447b09604404.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/4f9d9cd8-44798aed65155f86.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5209-16255ca065de5d2f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5229-c04c9cfa2fc96a04.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5250-e06f6de43eca918e.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/530-a6a9b4ace9979af3.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5301-0a5bda66f4d6caca.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5414-4e6a578f896b66d1.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5597-82faa8288447b35f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5706-74f25a0e34fb02ea.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5950-72535f0aed05bd9a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/5964-80ca6bc72d47a472.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/607-3f22d382d11350b0.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/6113-1ae994589688594a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/6449-2793763740e322fa.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/6656-8b6a964e4b194332.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/6665-2dc5019184623abd.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/6687.68d5a83edaef18c0.js",revision:"68d5a83edaef18c0"},{url:"/_next/static/chunks/6753-0b0a5aba8764dd1b.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/6770-4520ae860d9903ab.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/737dfa3e-1e71234fbbba03d2.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7381-9848da845f067968.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7590-215f5523a9d3daa8.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7644-31cf7d2873b142a3.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7692-3384cc179f92a86e.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7783-1c9f788a6d842f79.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7912-769707ce5ceed8d2.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7937.d8b9e6ce453484ef.js",revision:"d8b9e6ce453484ef"},{url:"/_next/static/chunks/7942-1c92573b6c952da9.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/7986-936cfe80bd739aba.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8069-d308bb86c665ce63.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8174-d3b7a4648161d9d8.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8261-76230089be850a07.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8328.23a910b975e62e17.js",revision:"23a910b975e62e17"},{url:"/_next/static/chunks/8355-6fefacd2eb2f7023.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8364-e61c35406c3981bf.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/855-28e4d21f035c8192.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8631-453fc1fb0180cb5f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8927-8afee85dc6dfc1c5.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/8dc5345f-1c76f9985f603a56.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9081a741-064d9e002bb8927d.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9268-2d85309900928ad6.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9317-170f304763908650.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9470-8bf5cde4de962862.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9484-b48ce124ef86948b.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9616-196a28445ea37a05.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9623.c49052e1b4d6c091.js",revision:"c49052e1b4d6c091"},{url:"/_next/static/chunks/967-d46ab339f00c2521.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9751.972f7f445fce79af.js",revision:"972f7f445fce79af"},{url:"/_next/static/chunks/98.a63d8aa5f635a311.js",revision:"a63d8aa5f635a311"},{url:"/_next/static/chunks/9826-bf498aa33d7856bd.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/9834-95d4c6c71749e317.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/98916abf-98d362e58b78d1c9.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/aaea2bcf-a4309fb1d75072c5.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(auth)/changepassword/page-821772e525f70c46.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(auth)/forgetpassword/page-ce00f64b3b3f6a96.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(auth)/layout-098df62768251b63.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(auth)/new-password/page-25d7c86abf2f4803.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(auth)/new-verification/page-07e987984812f1c9.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(auth)/reset/page-e576372e2d23afd3.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/about/Bagbag/page-78192324fa5d1c4c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/about/BagongSilangan/page-f7290e4a839a210f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/about/Contact/page-03d8a68aa1ef18e6.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/about/HelpPage/page-8512a8391674b378.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/about/NovaProper/page-e9f6b363604c53fb.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/about/page-d158cda5e3be7389.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/layout-e16809e35da0c348.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/page-367fb2ea586c56c6.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/termsPolicy/layout-c0723ef49bdaaaa8.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(landing-page)/termsPolicy/page-6243f63a80a56bdb.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/buy-now/page-0700bd2fc9a8fcb7.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/buy-now/payment/%5Bmethod%5D/page-a70cac96233be0be.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/page-509bf20142e03ec5.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/payment/%5Bmethod%5D/page-45aa5d46482bf9b9.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/success/page-c2ba632673774842.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/cart/page-783c51b7a9c8ee79.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/error-812b2a776fe33871.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/layout-e2e3479c804d4228.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/loading-6eb9c574f96c6197.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/order-status/%5BtransactionId%5D/page-1385d3b10a21f891.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/order-status/page-308d0f03e10df679.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(markethub)/shipping-information/page-06a29b7237a7a53e.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/(read&learn)/article/page-84ca21f191f5c266.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/(read&learn)/blogs/%5Bslug%5D/page-c2d5e4fbad4b74ec.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/(read&learn)/blogs/page-59ce066ae99e2c9d.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/(read&learn)/learningMaterials/page-47307ce5757d2757.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/(read&learn)/videotutorial/page-442a5b5454f03107.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/discussion/%5Btopic%5D/%5BpostId%5D/page-3fd9ecb8ea077fdb.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/discussion/%5Btopic%5D/page-ee8b77568e7536b8.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/discussion/create-post/page-b081e2a52c8fa783.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/discussion/page-438545efaa6c9c4b.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/discussion/user/%5Busername%5D/page-3e6fcf51aecc741a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/edit/%5Btopic%5D/%5BpostId%5D/page-cf1d2f515a20159d.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/edit/%5Btopic%5D/page-f635448e85c0bf48.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/layout-21e10290ef26f910.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/markethub/community/%5BcommunityName%5D/page-23bce3c54b5afbf1.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/markethub/free-products/page-013967761b6e0da8.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/markethub/page-5470c6ffdcdd4b23.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/markethub/reviews/%5BproductId%5D/page-5dc25a2c4faade9d.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/markethub/reviews/add-review/page-18693e272bae3ffd.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/markethub/search/%5BproductName%5D/page-0451fe29b0efede4.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/message/%5BchatroomId%5D/page-5395601d009ec8c5.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/message/page-b0b23992a85dfe5e.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/profile/edit/page-cd25045f195c7fc8.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/profile/page-fe73bce655e9a0ab.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/search/%5Bquery%5D/page-80a3866408691e60.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/(user)/searchplant/page-bf26338ad282205f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/_not-found-dfd143c3da05c494.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/add-employee/page-0f0955093baa9983.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/article-requests/page-3e95b14890efc742.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/blog-requests/page-1a36d15807f38c9b.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/community/page-451749e805233544.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/create-community/page-a30c633533b799d1.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/inventory/page-91508b67e680eb9e.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/layout-4844e7b8fcb8b98c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/manage-employees/%5Bslug%5D/page-240dfd4cf80c32ca.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/manage-employees/page-474dd1c8b4d4f10c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/material-requests/page-416dd2bae960f07b.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/page-96ef40589175758e.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/products/page-0d6b48936bb71138.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/reports/page-62317bac75d329f2.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/admin/video-requests/page-5839d7afd7ea02d6.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/archived-products/page-99035806fba7696d.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/create-blog/page-3c0fbb11d494b7e0.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/create-materials/page-dcfc4880725a0424.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/create-products/page-57e1aa82541b4425.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/create-topic/page-552c90a57f0b3f72.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/create-video/page-9de6b9cfd8507ec0.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/edit-blog/%5Bslug%5D/page-170e78bc6f9b542a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/history/page-2e6745f64820e205.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/inventory/%5Bslug%5D/page-0262ae3d63c3de6a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/inventory/addstocks/%5Bslug%5D/page-19793aecb42b5847.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/inventory/page-1108982a9e7e14cf.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/inventory/updatestocks/%5Bslug%5D/page-90aa1000270c4665.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/layout-cbfbca4ea9b66578.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/message/%5BchatroomId%5D/page-7af09440a38c3532.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/message/page-91516b41283957cc.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/page-586c0ea6eb06e04c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/report-history/page-96eea292adba5738.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/employee/reports/page-b11474b22c2682bb.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/orders/layout-6a5a9d1645b25924.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/app/orders/page-d11d3d2331a51f6e.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/bc9c3264-1b1e5fcff6a8fd34.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/d52199b0-6554fdea82bfed5f.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/d622d42c-f99492c1028b939c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/e685ae08-209d449cb981b40a.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/fd9d1056-f181900810e6e983.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/main-aeefbb9db3d94890.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/main-app-b61ccd70c289e937.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/reactPlayerDailyMotion.83f3c336f9b9b762.js",revision:"83f3c336f9b9b762"},{url:"/_next/static/chunks/reactPlayerFacebook.5ef329df8bf27c98.js",revision:"5ef329df8bf27c98"},{url:"/_next/static/chunks/reactPlayerFilePlayer.17751eedc162c43f.js",revision:"17751eedc162c43f"},{url:"/_next/static/chunks/reactPlayerKaltura.ff56910eaf0428e5.js",revision:"ff56910eaf0428e5"},{url:"/_next/static/chunks/reactPlayerMixcloud.b4d05ac04722c8e2.js",revision:"b4d05ac04722c8e2"},{url:"/_next/static/chunks/reactPlayerPreview.1ce1156fda2eefc4.js",revision:"1ce1156fda2eefc4"},{url:"/_next/static/chunks/reactPlayerSoundCloud.0e47fab8a924c1c9.js",revision:"0e47fab8a924c1c9"},{url:"/_next/static/chunks/reactPlayerStreamable.5382fbaa4c3864f3.js",revision:"5382fbaa4c3864f3"},{url:"/_next/static/chunks/reactPlayerTwitch.b9ce9cccb76a4062.js",revision:"b9ce9cccb76a4062"},{url:"/_next/static/chunks/reactPlayerVidyard.f189c71afaef4e5a.js",revision:"f189c71afaef4e5a"},{url:"/_next/static/chunks/reactPlayerVimeo.5682da9d908aa858.js",revision:"5682da9d908aa858"},{url:"/_next/static/chunks/reactPlayerWistia.9a67bb7850e0447a.js",revision:"9a67bb7850e0447a"},{url:"/_next/static/chunks/reactPlayerYouTube.b4c928d4fdf72b01.js",revision:"b4c928d4fdf72b01"},{url:"/_next/static/chunks/webpack-9d074bfc3cd97c85.js",revision:"ZTIlLcvbrYkd4mtLr9qUd"},{url:"/_next/static/css/003289af103f0b47.css",revision:"003289af103f0b47"},{url:"/_next/static/css/053aa6c2b84855c6.css",revision:"053aa6c2b84855c6"},{url:"/_next/static/css/2d34d38e42c1167e.css",revision:"2d34d38e42c1167e"},{url:"/_next/static/css/36840340f3f01bb9.css",revision:"36840340f3f01bb9"},{url:"/_next/static/css/3cbd70ff48da2307.css",revision:"3cbd70ff48da2307"},{url:"/_next/static/css/b3010cc00e7383ae.css",revision:"b3010cc00e7383ae"},{url:"/_next/static/css/cc93e99adad1a963.css",revision:"cc93e99adad1a963"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/Account1.ec5527ba.png",revision:"4514741e9a6886011194bb8d3177f7bf"},{url:"/_next/static/media/BARANGAY CHAIRMAN 1.92e80e78.png",revision:"c8f0cb11d6aec41a2f6282b14f2c3418"},{url:"/_next/static/media/BARANGAY CHAIRMAN 2.6602fe57.png",revision:"e2bd370f275fcc2e7f2e5fa20a2edad4"},{url:"/_next/static/media/BARANGAY CHAIRMAN.645cbd8b.png",revision:"a7a40df2929e433d876cb9b6255fe13a"},{url:"/_next/static/media/BARANGAY SECRETARY.9487721f.png",revision:"d722ecf4ad92d4749e5704f102a4d443"},{url:"/_next/static/media/BagbagImage1.6789dc52.jpg",revision:"33c4fa5961895f81b301723db6939082"},{url:"/_next/static/media/BagbagImage2.6890fe30.jpg",revision:"4ccff273e9b47b10283f9c470e385fd6"},{url:"/_next/static/media/BagbagImage3.381aadb3.jpg",revision:"ad1c873c1f541b6bc04a9eb274bae3ca"},{url:"/_next/static/media/BagbagImage4.234e27be.jpg",revision:"55c9dab945c6c83d15983eb55e7dea68"},{url:"/_next/static/media/Free.55a1e331.png",revision:"e603eafc7652822213330143a653df37"},{url:"/_next/static/media/Greenland.718c75e1.png",revision:"b02d7d444dd6d4f7be28953fd028a77c"},{url:"/_next/static/media/Icon-help.bdf3aaa3.png",revision:"7736ccfe0b5318eeba0889456e7c02b5"},{url:"/_next/static/media/Members.2b087095.png",revision:"9bfd95926611c4437f5101e29087a480"},{url:"/_next/static/media/NovaProper1.b5489444.jpg",revision:"8d94755f098b60ed9add07685acda7bd"},{url:"/_next/static/media/NovaProper2.2d6b737e.jpg",revision:"1421e4b18c0b2fca9d9598b7a1b1a187"},{url:"/_next/static/media/NovaProper3.e9c96df7.jpg",revision:"30c88714381495236b4a6a8472268f3d"},{url:"/_next/static/media/NovaProper4.c8da876b.jpg",revision:"e1de556e4d9edd1de38ce65c9d00c246"},{url:"/_next/static/media/Sharon.3da2234b.png",revision:"ae777ea7f079e3f5e0b3369b7df939cc"},{url:"/_next/static/media/SoloParent.f44f0f74.png",revision:"b8d8921849cea10987db68d8145d1300"},{url:"/_next/static/media/Vector.030f4364.png",revision:"efe389b8023d8868f1eb257fd4ba7ee0"},{url:"/_next/static/media/arrowRight.c92f530d.png",revision:"744d6d74d8bb230ff431343500e405a7"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/curve.2204bd11.png",revision:"347e41a87785c8134adf3920bda84503"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/default-user.20579340.jpg",revision:"4aa4dc7ee7e3f768154414f8e5dd38e7"},{url:"/_next/static/media/deliveryIcon.a3789315.png",revision:"ef250e4f70984dcbc6d1e7dab7bc2635"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/email.fb026695.png",revision:"1129c19e60ceb2adce5dd6906242e262"},{url:"/_next/static/media/facebook.96459d2e.png",revision:"06d49edf684582b281bacd4ba83b7c6a"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/features.4b9804b8.png",revision:"4ec21422321b17be693ed9a0bdcfd5e3"},{url:"/_next/static/media/growthIcon.96b5cbe7.png",revision:"53660b7c5c238770954c16e8558e2436"},{url:"/_next/static/media/healthIcon.b46f2070.png",revision:"04fd067566190258031d343abc71d2b2"},{url:"/_next/static/media/image 1.2a714772.png",revision:"09ccdbf820c23a95afe6a3c77be7b87a"},{url:"/_next/static/media/image 2.16d16504.png",revision:"ad7c799acacdc95da660b18de5e5fd3f"},{url:"/_next/static/media/image 3.a6897396.png",revision:"52e1c4d4ec2c23e10c1e60a4f2bab287"},{url:"/_next/static/media/instagram.7169a408.png",revision:"938ea70301e5267c6d099b07d74b7a12"},{url:"/_next/static/media/knowledgeIcon.21d0cc32.png",revision:"7130adbecd05588225118ae65dacb4a9"},{url:"/_next/static/media/leaf.59412083.png",revision:"fc3d233cb7a0abd215b04f733a3490f9"},{url:"/_next/static/media/lightbulbIcon.c36e9a85.png",revision:"6bded421f0648c7fcf4c7e5f1082bee8"},{url:"/_next/static/media/location.b5e2fde8.png",revision:"7f9c204ecaad87b0a58afa9cf3019f5f"},{url:"/_next/static/media/logo.5572697d.png",revision:"868a1ac112617fcd4ba04956bad00f80"},{url:"/_next/static/media/padlock 1.d324aa1a.png",revision:"1d038b21b46838046ded0724309396a7"},{url:"/_next/static/media/phone.8d4c6ace.png",revision:"6238e02514d2dc256823c9c4b041a9e4"},{url:"/_next/static/media/store 1.cdd7880d.png",revision:"050b7e5f8836cb6f690382ae141474e0"},{url:"/_next/static/media/subheading.9d5d8228.png",revision:"72c4bf5ab123d49dbaf4028b36de4282"},{url:"/_next/static/media/tiktok.88b851bf.png",revision:"984965c48d8a12c9bdb318e99aff78c6"},{url:"/_next/static/media/tutorial 1.293fea0a.png",revision:"a814e72165bc4a777f15c76b2bbaa6cb"},{url:"/_next/static/media/twitter.51708049.png",revision:"a944f5730040605d8bf9d2a9f202845d"},{url:"/_next/static/media/web-page 1.b80b46d3.png",revision:"dc884490ec29a71ca4b680f72a21e4c3"},{url:"/icon-192x192.png",revision:"adcbe2cde976f9307a5665cb3ce58fb7"},{url:"/icon-256x256.png",revision:"66498dfcbd3c0152d517ed1a5868eead"},{url:"/icon-384x384.png",revision:"57640fc83dae8684fda2032acbb8cd6a"},{url:"/icon-512x512.png",revision:"8609caa672c04e450cb56a9bd213fe3b"},{url:"/images/BARANGAY CHAIRMAN 1.png",revision:"c8f0cb11d6aec41a2f6282b14f2c3418"},{url:"/images/BARANGAY CHAIRMAN 2.png",revision:"e2bd370f275fcc2e7f2e5fa20a2edad4"},{url:"/images/BARANGAY CHAIRMAN.png",revision:"a7a40df2929e433d876cb9b6255fe13a"},{url:"/images/BARANGAY SECRETARY.png",revision:"d722ecf4ad92d4749e5704f102a4d443"},{url:"/images/Greenland.png",revision:"b02d7d444dd6d4f7be28953fd028a77c"},{url:"/images/Icon-help.png",revision:"7736ccfe0b5318eeba0889456e7c02b5"},{url:"/images/Members.png",revision:"9bfd95926611c4437f5101e29087a480"},{url:"/images/Search-Icon.png",revision:"876f270825e904750ac8be012e9db511"},{url:"/images/Sharon.png",revision:"ae777ea7f079e3f5e0b3369b7df939cc"},{url:"/images/Slider 1.png",revision:"10044f726c29ad2e5422b2c103750865"},{url:"/images/Slider 2.png",revision:"de2a72adf774bf687b6a037e3821c7cd"},{url:"/images/Slider 3.png",revision:"9f47f5b0f648fd13c6c44698160c44d1"},{url:"/images/Slider 4.png",revision:"387e9f358113ef179c5dd62cbb508c6c"},{url:"/images/SoloParent.png",revision:"b8d8921849cea10987db68d8145d1300"},{url:"/images/Sun.png",revision:"00108f08876978802e01037fdc10565e"},{url:"/images/Vector.png",revision:"efe389b8023d8868f1eb257fd4ba7ee0"},{url:"/images/about.png",revision:"440d650a7c1f9632dcfdb516f4f5f83e"},{url:"/images/account1.png",revision:"4514741e9a6886011194bb8d3177f7bf"},{url:"/images/arrowRight.png",revision:"744d6d74d8bb230ff431343500e405a7"},{url:"/images/avatar-placeholder.jpg",revision:"35975c8078fbc7111ae9b9252293d710"},{url:"/images/bannerbg.png",revision:"b062ba2035fedc9f83e5ddfcbdd41f80"},{url:"/images/curve.png",revision:"347e41a87785c8134adf3920bda84503"},{url:"/images/default-user.jpg",revision:"4aa4dc7ee7e3f768154414f8e5dd38e7"},{url:"/images/deliveryIcon.png",revision:"ef250e4f70984dcbc6d1e7dab7bc2635"},{url:"/images/discover.png",revision:"efb0eb0433a5461a700d3d0508c33a94"},{url:"/images/email.png",revision:"1129c19e60ceb2adce5dd6906242e262"},{url:"/images/employee/done_upload.svg",revision:"e09807a7409403d5a1baf0f1c4f1f223"},{url:"/images/employee/not_paid.svg",revision:"5ac995978f632de7fc66d9583d07e6ff"},{url:"/images/employee/review.svg",revision:"8a931bdd820e4d3634902f745a913c2d"},{url:"/images/facebook.png",revision:"06d49edf684582b281bacd4ba83b7c6a"},{url:"/images/features.png",revision:"4ec21422321b17be693ed9a0bdcfd5e3"},{url:"/images/gcash.jpg",revision:"bbfaf86d95d31fe6f6b8c271a6b6e2dc"},{url:"/images/growthIcon.png",revision:"53660b7c5c238770954c16e8558e2436"},{url:"/images/healthIcon.png",revision:"04fd067566190258031d343abc71d2b2"},{url:"/images/image 1.png",revision:"09ccdbf820c23a95afe6a3c77be7b87a"},{url:"/images/image 2.png",revision:"ad7c799acacdc95da660b18de5e5fd3f"},{url:"/images/image 3.png",revision:"52e1c4d4ec2c23e10c1e60a4f2bab287"},{url:"/images/imagepost2.png",revision:"8c097f3a71c609c85f8f9c46ba9eae2e"},{url:"/images/information-section/articles.png",revision:"d0c895054e6501351d65729547041ad9"},{url:"/images/information-section/blogs.png",revision:"1f9a507d08a5b4c558528dc75e75726b"},{url:"/images/information-section/learning-materials.png",revision:"af7b6df43fde0b3e88cb064cb671e91d"},{url:"/images/information-section/video-thumbnail.jpg",revision:"9ebbb9319a9482ffb76a1ff1feba738a"},{url:"/images/information-section/video-tutorial.png",revision:"ef927d3bd374f64a867326f9c567c227"},{url:"/images/instagram.png",revision:"938ea70301e5267c6d099b07d74b7a12"},{url:"/images/knowledgeIcon.png",revision:"7130adbecd05588225118ae65dacb4a9"},{url:"/images/leaf.png",revision:"fc3d233cb7a0abd215b04f733a3490f9"},{url:"/images/lightbulbIcon.png",revision:"6bded421f0648c7fcf4c7e5f1082bee8"},{url:"/images/location.png",revision:"7f9c204ecaad87b0a58afa9cf3019f5f"},{url:"/images/padlock 1.png",revision:"1d038b21b46838046ded0724309396a7"},{url:"/images/page-not-found.jpg",revision:"38d92b3c3d22792972678b3af49b3b36"},{url:"/images/phone.png",revision:"6238e02514d2dc256823c9c4b041a9e4"},{url:"/images/store 1.png",revision:"050b7e5f8836cb6f690382ae141474e0"},{url:"/images/subheading.png",revision:"72c4bf5ab123d49dbaf4028b36de4282"},{url:"/images/tiktok.png",revision:"984965c48d8a12c9bdb318e99aff78c6"},{url:"/images/tutorial 1.png",revision:"a814e72165bc4a777f15c76b2bbaa6cb"},{url:"/images/twitter.png",revision:"a944f5730040605d8bf9d2a9f202845d"},{url:"/images/web-page 1.png",revision:"dc884490ec29a71ca4b680f72a21e4c3"},{url:"/logo.png",revision:"868a1ac112617fcd4ba04956bad00f80"},{url:"/manifest.json",revision:"4f60f449706fa6ea5f0885700d8cf9be"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/undraw/connect-now.svg",revision:"edecac09ff73b5849e1b21439aeade7f"},{url:"/undraw/no-result-found.svg",revision:"c82afcfcfcfab9cc81802eac6bcc92a5"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
