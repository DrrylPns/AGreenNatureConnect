if(!self.define){let e,a={};const s=(s,n)=>(s=new URL(s+".js",n).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),h={module:{uri:c},exports:t,require:r};a[c]=Promise.all(n.map((e=>h[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"8bdc28553ceab27a684fb0e4d115680f"},{url:"/_next/static/chunks/00cbbcb7-4d55a8414cd90bcb.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/07115393-0b857206f2a2b535.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1047-a88c1711034ff759.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1052-3c0bc69d1061a6fb.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1126-03d1ac9ff080f32f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/12038df7-0fcab841bcb0077c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1220-76a6d51027525371.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1270-614e1b132b4b6d4d.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/132-bdda59e7faac8e7e.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1368-1f6c6588da03d015.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1518-39895e82fe946383.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1749-541b4b8457196c06.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1796-553019ff02aa99d5.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/1802-a64b8effbd99645d.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/2017-0f912068ee6d3885.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/2173-f3a6cab438f8f7bf.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/2239-a7e0b5a9474f42d7.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/243dde97.ee9b7ff69b7ca52b.js",revision:"ee9b7ff69b7ca52b"},{url:"/_next/static/chunks/248-d73bd41d5d9a184a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/2598-c9df6912f0048a34.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/2790-fcfd66c2b7abb6ba.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/2802.d3451d83f7b5a281.js",revision:"d3451d83f7b5a281"},{url:"/_next/static/chunks/2875-06629e0a91b4c0b2.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/2908.346c27658cd52e97.js",revision:"346c27658cd52e97"},{url:"/_next/static/chunks/2932-d279cfe8c9142652.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3080-adcb4fb5af4699b9.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3173-f8c41a7b82006d47.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3226-2e3f535911fbcde9.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3308-330ecd9a8bf40c21.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3359.7bf4aca665642789.js",revision:"7bf4aca665642789"},{url:"/_next/static/chunks/3477.109c6395cd06de91.js",revision:"109c6395cd06de91"},{url:"/_next/static/chunks/351-69482816f1cd71db.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3553-e46aa05961d4a0f9.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3627521c-502f3a115ad15333.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3823-b28df530898f7338.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3841-f275e388ef90bedb.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/3888.e8341d1fe473a1bc.js",revision:"e8341d1fe473a1bc"},{url:"/_next/static/chunks/39209d7c-67806e8de87289d1.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/406-be105153248ba5ca.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/4080-ea2068d1d39b48a8.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/4139-2f1bc438a2e84fa5.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/4806-01762711014432b8.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/4948-0634b0c9a7ce0cef.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/4b494101-94f6447b09604404.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/4f9d9cd8-44798aed65155f86.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/5250-f99c6523d01220e0.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/530-157b9ff13bcbc1f8.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/5494-1d86a117cb8d0673.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/5613-ee12807c4a361b4b.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/5846-df08c1d405eda40a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/5942-b0df4d8e18e45c53.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/5979-b39e7d95400cf797.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6242-87d6c23c1a63127e.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6376-d6ead6d1773c213b.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6449-82aac62290460e83.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/654-d17addf86b81b6ef.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6627-aefcbb6deff8d60e.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6656-c04d7dcff336d028.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6665-41be3b678b08ea72.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6687.68d5a83edaef18c0.js",revision:"68d5a83edaef18c0"},{url:"/_next/static/chunks/6753-c1909a7402284ef0.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6787-da6bba9261285f25.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6910-63539f060948a700.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/6942-939e68c0190d30f6.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/737dfa3e-1e71234fbbba03d2.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/7778-4087cfa7be73d7ed.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/7894-9c37e24570e3c19a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/7912-90b5748ae015d971.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/7937.d8b9e6ce453484ef.js",revision:"d8b9e6ce453484ef"},{url:"/_next/static/chunks/7942-a313e8c75d21204c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8069-77e4ef13e5be0f83.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8117-0fd148535189733c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8174-88317bb44d139474.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8261-851d71fa691f8c20.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8328.23a910b975e62e17.js",revision:"23a910b975e62e17"},{url:"/_next/static/chunks/8355-9518f83a521cb2d6.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8631-617c831a3a2df4d1.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8821-5739a32f530ae849.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8927-9f58b304d66d641c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/8dc5345f-71b29897c0cb6b84.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9081a741-064d9e002bb8927d.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9268-bddd0b1c444e112c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/931-f5d919bd1cd82917.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9317-19a3a891d3b21683.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9470-93aa7729979357a9.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9546-a57042245fc7e6c2.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9595-22c7d9f7e003521f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9623.c49052e1b4d6c091.js",revision:"c49052e1b4d6c091"},{url:"/_next/static/chunks/9652-a1404ec2faf5eefc.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/967-b8703d326f35d9ce.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/9751.972f7f445fce79af.js",revision:"972f7f445fce79af"},{url:"/_next/static/chunks/98.a63d8aa5f635a311.js",revision:"a63d8aa5f635a311"},{url:"/_next/static/chunks/9834-041fdb73fd8c2dcd.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/98916abf-98d362e58b78d1c9.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(auth)/changepassword/page-a2000427c4b61b5a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(auth)/forgetpassword/page-e351b39730bec33e.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(auth)/layout-ac2a8f365d280c2d.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(auth)/new-password/page-6406b984131434fe.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(auth)/new-verification/page-d9a8203bda17aeec.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(auth)/reset/page-abbbe67953179016.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/about/Bagbag/page-7a392cca8bc0260e.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/about/BagongSilangan/page-7993638294ed7341.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/about/NovaProper/page-f743f36e4aa4bc39.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/about/page-849082804a5c4310.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/layout-29d994ab3c6be37c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/page-b464a34ecca48150.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/termsPolicy/layout-2dffffb88b349d42.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(landing-page)/termsPolicy/page-700b1dbcce9132e3.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/buy-now/page-5d1a4af631c535cb.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/buy-now/payment/%5Bmethod%5D/page-65621e5e52819f2a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/page-ce6021eb57cbc908.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/payment/%5Bmethod%5D/page-c27e099fae2415ce.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/success/page-422d134533f3c1d3.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/cart/page-9bd57de57920f592.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/error-812b2a776fe33871.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/layout-53f48744b0ba5aa1.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/loading-4851986859a66813.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/order-status/%5BtransactionId%5D/page-76c06263f784f7ce.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/order-status/page-5c5704cf6f631177.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(markethub)/shipping-information/page-dd82221ff64ca10c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/(read&learn)/article/page-581a27c1d2873d73.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/(read&learn)/blogs/%5Bslug%5D/page-a158dc8139f8026b.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/(read&learn)/blogs/page-2ee8336669ba5150.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/(read&learn)/learningMaterials/page-5c0de72da4b4e877.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/(read&learn)/videotutorial/page-1605e2b1c483a54f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/discussion/%5Btopic%5D/%5BpostId%5D/page-c42a7f25e589c991.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/discussion/%5Btopic%5D/page-38ec8416b7a7ce80.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/discussion/create-post/page-9e8dd32fb9be3ba7.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/discussion/page-2ed13ba2b42e5f52.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/discussion/user/%5Busername%5D/page-f2f19b4d8718bd2f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/layout-4e9000c61ce67f9e.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/markethub/community/%5BcommunityName%5D/page-d9d8a836e8ef50c5.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/markethub/free-products/page-e2ffaa847f3f27eb.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/markethub/page-56f14bdbfdc6b4c8.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/markethub/search/%5BproductName%5D/page-b57634af7afdf2a0.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/profile/edit/page-096c5829a45d0ecd.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/profile/page-566fd517a6e0a293.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/searchplant/page-9115ec0cd71f32e9.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/(user)/settings/page-442599e82136b7d7.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/_not-found-eb28304a64387495.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/add-employee/page-6c98ea95eeaad191.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/article-requests/page-4aa05b0d2382e38f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/blog-requests/page-de582a33350f3c1a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/community/page-73549eafc6d3ec8a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/create-community/page-ee9b100eaad3372f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/inventory/page-cf882a0d03be3b16.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/layout-bff155e6b4754c92.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/manage-employees/%5Bslug%5D/page-a04c22bd0fe686d7.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/manage-employees/page-a25e04e811f0f8f3.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/material-requests/page-0e248db6ec806992.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/page-127edcf196436416.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/products/page-95300136d6150291.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/reports/page-fb6fc8235e019b6a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/admin/video-requests/page-027011ef81ae6144.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/archived-products/page-2e5331f90c419e63.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/create-blog/page-f800341b6fe54094.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/create-materials/page-2b047f6b42e2637a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/create-products/page-3fd989f0d8f32f83.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/create-topic/page-32a83ccb7a811cb8.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/create-video/page-9d1e208037a1ee52.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/edit-blog/%5Bslug%5D/page-975e2f3c51b64054.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/history/page-f1976b8c83639b19.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/inventory/%5Bslug%5D/page-db7a64f062102c6f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/inventory/addstocks/%5Bslug%5D/page-b6f2c1aaf77bc103.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/inventory/page-48c979d69709a0be.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/layout-3d12d79ef8d40f4d.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/page-284a13e52f5c510a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/report-history/page-eb4140633fbed073.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/employee/reports/page-52a61c5977747c32.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/orders/layout-f54119a2b1543608.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/app/orders/page-8b2ff1cf2c399afd.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/bc9c3264-1b1e5fcff6a8fd34.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/d52199b0-6554fdea82bfed5f.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/d622d42c-f99492c1028b939c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/e685ae08-209d449cb981b40a.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/fd9d1056-d1cca500bec9da33.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/main-0c705102b8482fe4.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/main-app-b61ccd70c289e937.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/reactPlayerDailyMotion.83f3c336f9b9b762.js",revision:"83f3c336f9b9b762"},{url:"/_next/static/chunks/reactPlayerFacebook.5ef329df8bf27c98.js",revision:"5ef329df8bf27c98"},{url:"/_next/static/chunks/reactPlayerFilePlayer.17751eedc162c43f.js",revision:"17751eedc162c43f"},{url:"/_next/static/chunks/reactPlayerKaltura.ff56910eaf0428e5.js",revision:"ff56910eaf0428e5"},{url:"/_next/static/chunks/reactPlayerMixcloud.b4d05ac04722c8e2.js",revision:"b4d05ac04722c8e2"},{url:"/_next/static/chunks/reactPlayerPreview.1ce1156fda2eefc4.js",revision:"1ce1156fda2eefc4"},{url:"/_next/static/chunks/reactPlayerSoundCloud.0e47fab8a924c1c9.js",revision:"0e47fab8a924c1c9"},{url:"/_next/static/chunks/reactPlayerStreamable.5382fbaa4c3864f3.js",revision:"5382fbaa4c3864f3"},{url:"/_next/static/chunks/reactPlayerTwitch.b9ce9cccb76a4062.js",revision:"b9ce9cccb76a4062"},{url:"/_next/static/chunks/reactPlayerVidyard.f189c71afaef4e5a.js",revision:"f189c71afaef4e5a"},{url:"/_next/static/chunks/reactPlayerVimeo.5682da9d908aa858.js",revision:"5682da9d908aa858"},{url:"/_next/static/chunks/reactPlayerWistia.9a67bb7850e0447a.js",revision:"9a67bb7850e0447a"},{url:"/_next/static/chunks/reactPlayerYouTube.b4c928d4fdf72b01.js",revision:"b4c928d4fdf72b01"},{url:"/_next/static/chunks/webpack-d6ada336ad15039b.js",revision:"nhFFeRkjlmYMXhhjNpXea"},{url:"/_next/static/css/1f74cdeb1b45f5c2.css",revision:"1f74cdeb1b45f5c2"},{url:"/_next/static/css/36840340f3f01bb9.css",revision:"36840340f3f01bb9"},{url:"/_next/static/css/3cbd70ff48da2307.css",revision:"3cbd70ff48da2307"},{url:"/_next/static/css/526a571d2f1f2dad.css",revision:"526a571d2f1f2dad"},{url:"/_next/static/css/b3010cc00e7383ae.css",revision:"b3010cc00e7383ae"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/10939feefdad71be-s.woff2",revision:"72b3ae37567ee5efdf2254b657c36ba9"},{url:"/_next/static/media/3828f203592f7603-s.woff2",revision:"e9fd398a43c9e51f9ee14e757eaf95d9"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/Free vegetables.55a1e331.png",revision:"e603eafc7652822213330143a653df37"},{url:"/_next/static/media/Greenland.718c75e1.png",revision:"b02d7d444dd6d4f7be28953fd028a77c"},{url:"/_next/static/media/Image2.83b6d420.png",revision:"2e557171d999247305dd03031aa3f547"},{url:"/_next/static/media/Image3.57a63e78.png",revision:"968769e31832a0de7eb1587ab8781266"},{url:"/_next/static/media/Image4.32f9d102.png",revision:"174e9ec2bde057d4ff5d56d99c9c4403"},{url:"/_next/static/media/Members.2b087095.png",revision:"9bfd95926611c4437f5101e29087a480"},{url:"/_next/static/media/Sharon.3da2234b.png",revision:"ae777ea7f079e3f5e0b3369b7df939cc"},{url:"/_next/static/media/Slider 3.b874f32b.png",revision:"9f47f5b0f648fd13c6c44698160c44d1"},{url:"/_next/static/media/SoloParent.f44f0f74.png",revision:"b8d8921849cea10987db68d8145d1300"},{url:"/_next/static/media/Vector.030f4364.png",revision:"efe389b8023d8868f1eb257fd4ba7ee0"},{url:"/_next/static/media/arrowRight.c92f530d.png",revision:"744d6d74d8bb230ff431343500e405a7"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/curve.2204bd11.png",revision:"347e41a87785c8134adf3920bda84503"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/d869208648ca5469-s.p.woff2",revision:"72993dddf88a63e8f226656f7de88e57"},{url:"/_next/static/media/default-user.20579340.jpg",revision:"4aa4dc7ee7e3f768154414f8e5dd38e7"},{url:"/_next/static/media/deliveryIcon.a3789315.png",revision:"ef250e4f70984dcbc6d1e7dab7bc2635"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/email.fb026695.png",revision:"1129c19e60ceb2adce5dd6906242e262"},{url:"/_next/static/media/facebook.96459d2e.png",revision:"06d49edf684582b281bacd4ba83b7c6a"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/features.4b9804b8.png",revision:"4ec21422321b17be693ed9a0bdcfd5e3"},{url:"/_next/static/media/growthIcon.96b5cbe7.png",revision:"53660b7c5c238770954c16e8558e2436"},{url:"/_next/static/media/healthIcon.b46f2070.png",revision:"04fd067566190258031d343abc71d2b2"},{url:"/_next/static/media/image 1.2a714772.png",revision:"09ccdbf820c23a95afe6a3c77be7b87a"},{url:"/_next/static/media/image 2.16d16504.png",revision:"ad7c799acacdc95da660b18de5e5fd3f"},{url:"/_next/static/media/image 3.a6897396.png",revision:"52e1c4d4ec2c23e10c1e60a4f2bab287"},{url:"/_next/static/media/instagram.7169a408.png",revision:"938ea70301e5267c6d099b07d74b7a12"},{url:"/_next/static/media/knowledgeIcon.21d0cc32.png",revision:"7130adbecd05588225118ae65dacb4a9"},{url:"/_next/static/media/leaf.59412083.png",revision:"fc3d233cb7a0abd215b04f733a3490f9"},{url:"/_next/static/media/lightbulbIcon.c36e9a85.png",revision:"6bded421f0648c7fcf4c7e5f1082bee8"},{url:"/_next/static/media/location.b5e2fde8.png",revision:"7f9c204ecaad87b0a58afa9cf3019f5f"},{url:"/_next/static/media/logo.5572697d.png",revision:"868a1ac112617fcd4ba04956bad00f80"},{url:"/_next/static/media/phone.8d4c6ace.png",revision:"6238e02514d2dc256823c9c4b041a9e4"},{url:"/_next/static/media/subheading.9d5d8228.png",revision:"72c4bf5ab123d49dbaf4028b36de4282"},{url:"/_next/static/media/tiktok.88b851bf.png",revision:"984965c48d8a12c9bdb318e99aff78c6"},{url:"/_next/static/media/twitter.51708049.png",revision:"a944f5730040605d8bf9d2a9f202845d"},{url:"/_next/static/nhFFeRkjlmYMXhhjNpXea/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/nhFFeRkjlmYMXhhjNpXea/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"adcbe2cde976f9307a5665cb3ce58fb7"},{url:"/icon-256x256.png",revision:"66498dfcbd3c0152d517ed1a5868eead"},{url:"/icon-384x384.png",revision:"57640fc83dae8684fda2032acbb8cd6a"},{url:"/icon-512x512.png",revision:"8609caa672c04e450cb56a9bd213fe3b"},{url:"/images/Greenland.png",revision:"b02d7d444dd6d4f7be28953fd028a77c"},{url:"/images/Members.png",revision:"9bfd95926611c4437f5101e29087a480"},{url:"/images/Sharon.png",revision:"ae777ea7f079e3f5e0b3369b7df939cc"},{url:"/images/Slider 1.png",revision:"10044f726c29ad2e5422b2c103750865"},{url:"/images/Slider 2.png",revision:"de2a72adf774bf687b6a037e3821c7cd"},{url:"/images/Slider 3.png",revision:"9f47f5b0f648fd13c6c44698160c44d1"},{url:"/images/Slider 4.png",revision:"387e9f358113ef179c5dd62cbb508c6c"},{url:"/images/SoloParent.png",revision:"b8d8921849cea10987db68d8145d1300"},{url:"/images/Sun.png",revision:"00108f08876978802e01037fdc10565e"},{url:"/images/Vector.png",revision:"efe389b8023d8868f1eb257fd4ba7ee0"},{url:"/images/about.png",revision:"440d650a7c1f9632dcfdb516f4f5f83e"},{url:"/images/arrowRight.png",revision:"744d6d74d8bb230ff431343500e405a7"},{url:"/images/avatar-placeholder.jpg",revision:"35975c8078fbc7111ae9b9252293d710"},{url:"/images/bannerbg.png",revision:"b062ba2035fedc9f83e5ddfcbdd41f80"},{url:"/images/curve.png",revision:"347e41a87785c8134adf3920bda84503"},{url:"/images/default-user.jpg",revision:"4aa4dc7ee7e3f768154414f8e5dd38e7"},{url:"/images/deliveryIcon.png",revision:"ef250e4f70984dcbc6d1e7dab7bc2635"},{url:"/images/discover.png",revision:"efb0eb0433a5461a700d3d0508c33a94"},{url:"/images/email.png",revision:"1129c19e60ceb2adce5dd6906242e262"},{url:"/images/employee/done_upload.svg",revision:"e09807a7409403d5a1baf0f1c4f1f223"},{url:"/images/employee/not_paid.svg",revision:"5ac995978f632de7fc66d9583d07e6ff"},{url:"/images/employee/review.svg",revision:"8a931bdd820e4d3634902f745a913c2d"},{url:"/images/facebook.png",revision:"06d49edf684582b281bacd4ba83b7c6a"},{url:"/images/features.png",revision:"4ec21422321b17be693ed9a0bdcfd5e3"},{url:"/images/gcash.jpg",revision:"bbfaf86d95d31fe6f6b8c271a6b6e2dc"},{url:"/images/growthIcon.png",revision:"53660b7c5c238770954c16e8558e2436"},{url:"/images/healthIcon.png",revision:"04fd067566190258031d343abc71d2b2"},{url:"/images/image 1.png",revision:"09ccdbf820c23a95afe6a3c77be7b87a"},{url:"/images/image 2.png",revision:"ad7c799acacdc95da660b18de5e5fd3f"},{url:"/images/image 3.png",revision:"52e1c4d4ec2c23e10c1e60a4f2bab287"},{url:"/images/imagepost2.png",revision:"8c097f3a71c609c85f8f9c46ba9eae2e"},{url:"/images/information-section/articles.png",revision:"d0c895054e6501351d65729547041ad9"},{url:"/images/information-section/blogs.png",revision:"1f9a507d08a5b4c558528dc75e75726b"},{url:"/images/information-section/learning-materials.png",revision:"af7b6df43fde0b3e88cb064cb671e91d"},{url:"/images/information-section/video-thumbnail.jpg",revision:"9ebbb9319a9482ffb76a1ff1feba738a"},{url:"/images/information-section/video-tutorial.png",revision:"ef927d3bd374f64a867326f9c567c227"},{url:"/images/instagram.png",revision:"938ea70301e5267c6d099b07d74b7a12"},{url:"/images/knowledgeIcon.png",revision:"7130adbecd05588225118ae65dacb4a9"},{url:"/images/leaf.png",revision:"fc3d233cb7a0abd215b04f733a3490f9"},{url:"/images/lightbulbIcon.png",revision:"6bded421f0648c7fcf4c7e5f1082bee8"},{url:"/images/location.png",revision:"7f9c204ecaad87b0a58afa9cf3019f5f"},{url:"/images/phone.png",revision:"6238e02514d2dc256823c9c4b041a9e4"},{url:"/images/subheading.png",revision:"72c4bf5ab123d49dbaf4028b36de4282"},{url:"/images/tiktok.png",revision:"984965c48d8a12c9bdb318e99aff78c6"},{url:"/images/twitter.png",revision:"a944f5730040605d8bf9d2a9f202845d"},{url:"/logo.png",revision:"868a1ac112617fcd4ba04956bad00f80"},{url:"/manifest.json",revision:"4f60f449706fa6ea5f0885700d8cf9be"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/undraw/no-result-found.svg",revision:"c82afcfcfcfab9cc81802eac6bcc92a5"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
