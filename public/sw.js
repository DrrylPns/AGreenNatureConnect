if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let t={};const r=e=>s(e,c),b={module:{uri:c},exports:t,require:r};a[c]=Promise.all(i.map((e=>b[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1b52d3802a2eef87f44a5ab9a433daf5"},{url:"/_next/static/VbOjxzaF2-WMIPxel8NX_/_buildManifest.js",revision:"75740cacd3ef418c900cdf5afc2f6581"},{url:"/_next/static/VbOjxzaF2-WMIPxel8NX_/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/00cbbcb7-a9da04b82330f3d0.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/12038df7-cd47af045c72ed9a.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/1524-ac993e30e0d675dc.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/1529-606dbf8ce82b7f18.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/1588-8f59ea9e4353aba0.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/199-71d88c208a54d98c.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/2356-5777b2551c955471.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/243dde97.52c4e935e95cf377.js",revision:"52c4e935e95cf377"},{url:"/_next/static/chunks/2609-9f2bb0e4fcabbb72.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/2650-9abc8e1c1e94ab9c.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/270-7388e309556c7d49.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/2749-6fec7401e46d29b2.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/2794-a2075252e77a6660.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/2932-1ac30a1be25f555e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/3338.20fe4a787c712d44.js",revision:"20fe4a787c712d44"},{url:"/_next/static/chunks/3410-5744e46876dfb4c5.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/3627521c-6f4e9a88740eecf9.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/3844.5c324058310da7e5.js",revision:"5c324058310da7e5"},{url:"/_next/static/chunks/3891-09763f667fa906a1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/39209d7c-5d413ae764a24e89.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/4247-5598d8194fcc7775.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/4500.8314045ce4ad6148.js",revision:"8314045ce4ad6148"},{url:"/_next/static/chunks/4522-17cd450065350a40.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/4528.5b6f81b88654f759.js",revision:"5b6f81b88654f759"},{url:"/_next/static/chunks/4578-5ab544472c124aaf.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/4724-290c23a677b5865e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/4b494101-41d97202e3b7b9e1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/4f9d9cd8-293c172921753594.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/5221-885dd1a1a3914d5c.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/5387-dae444587a3b404e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/541-07ba465602b82455.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/5513.78951b0fd09a25c7.js",revision:"78951b0fd09a25c7"},{url:"/_next/static/chunks/5542-56b1fdf7e493582e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/558-9ddea4927cac38dd.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/6144.abdb7942b5731d55.js",revision:"abdb7942b5731d55"},{url:"/_next/static/chunks/6236-a838efad706c6a82.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/6312-3fdab013007bfb96.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/6321-76f6acbf692d4a5e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/6466-bd574ea159783df3.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/6622-a2e150073358fd9c.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/6964-86c4203eeb3ebc94.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/7016-3314492269a1c6fe.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/707-b0595d19f88ba47b.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/7167-604ad79947fdea88.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/737dfa3e-59d73bf13236be3a.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/7746.be7f7b2b75a72279.js",revision:"be7f7b2b75a72279"},{url:"/_next/static/chunks/7815.ffe8bac09c19c5f4.js",revision:"ffe8bac09c19c5f4"},{url:"/_next/static/chunks/7864-c100a6abbfb4d0f0.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/7870-eaa1f9a50ffa6b4d.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8110-96c3dbba4a25fc93.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8245-4a05c39e8478ef23.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8321.3dbc1c63ab6bf078.js",revision:"3dbc1c63ab6bf078"},{url:"/_next/static/chunks/8393-3248f25dc1245d14.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8553.9561e4f6cd5d1428.js",revision:"9561e4f6cd5d1428"},{url:"/_next/static/chunks/8669-c40db4a0a312fc76.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8691-72fb6aa8c53e2662.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8712-8aee016a8aac334e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8903-4f42c1fd5aee5037.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/8dc5345f-02df9c8c457759bd.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/9081a741-0ba990a5bf284b0a.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/920-40a80715debffd1f.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/9222-ac4192b7efe07316.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/9711-b727af58c070716c.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/9844.f31295e09527876a.js",revision:"f31295e09527876a"},{url:"/_next/static/chunks/9862-12729fc5284d222e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/9887-7bd891df97f9923a.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/98916abf-f133dbc2f5a4aed3.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(auth)/changepassword/page-79fea4fdaccbb16b.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(auth)/forgetpassword/page-019e42a98cb6ff48.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(auth)/layout-a5b17b080efe8161.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(landing-page)/layout-b5ecd1935d42f38f.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(landing-page)/page-062b5181d66b3ae1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(landing-page)/termsPolicy/page-0a0eb508e881d8fc.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/page-221ee24a99981ff1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(markethub)/cart/checkout/success/page-32d3fa110e10bb6f.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(markethub)/cart/page-969f7e7d3bb63b63.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(markethub)/error-8d73a34dd2b94088.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(markethub)/layout-dc16d43a4cfabf5d.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(markethub)/loading-c5d9c798cec3ccf0.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(markethub)/order-status/page-a4672dd50595dd66.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/(read&learn)/article/page-535e61da63131123.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/(read&learn)/blogs/%5Bslug%5D/page-82cf096334914d77.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/(read&learn)/blogs/page-d089623b5bbdeab9.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/(read&learn)/learningMaterials/page-695ee52abdbaced8.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/(read&learn)/videotutorial/page-dfa33a93bdfeabef.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/discussion/%5Btopic%5D/%5BpostId%5D/page-f05d37136608c46f.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/discussion/%5Btopic%5D/page-977d7a3282efa866.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/discussion/create-post/page-b78dd666cef3387a.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/discussion/page-dce6cf1167f67dad.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/layout-11c99363a7314006.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/markethub/page-b0d761491faec9b1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/profile/edit/page-5b223785e6d667a1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/profile/page-ddbc572168f64be2.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/(user)/settings/page-fecc07f738ef111c.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/_not-found-bf0cf5dac4d50a37.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/add-employee/page-740046f91a333483.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/article-requests/page-51c0224e8ce26755.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/blog-requests/page-6b98f819b63a57f6.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/community/page-d6807cb007264599.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/create-community/page-0863952445a59795.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/inventory/page-4796b003351179a0.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/layout-1b4fd598f77e19ff.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/manage-employees/%5Bslug%5D/page-c3fc28ec5c05782e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/manage-employees/page-4c3103a391196e54.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/material-requests/page-032c49dc176dd9ff.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/page-4eed5a63f2ba2899.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/products/page-2777e6e7353031f4.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/admin/reports/page-20be6520ab4fc17b.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/create-blog/page-ebcacdc2230a4724.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/create-materials/page-f0fff16d68bb6035.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/create-products/page-83c91d8e150b6c78.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/create-topic/page-8ead44db0ade2489.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/edit-blog/%5Bslug%5D/page-3a952f6594a654b0.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/inventory/%5Bslug%5D/page-59cd26b10e39e2d1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/inventory/addstocks/%5Bslug%5D/page-d3169ccbe74f63b4.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/inventory/page-daa784b91367f893.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/layout-a02aa132157483e0.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/app/employee/page-ddcf2cf5176db0a9.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/bc9c3264-9387488e10dac2a8.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/d52199b0-046eeaad36cdf62e.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/d622d42c-33d35c7c54ad33c5.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/fd9d1056-7fd2d4be0dc1ec06.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/main-184555eed5497cf1.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/main-app-209545e6169dab43.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/pages/_app-7bb460e314c5f602.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/pages/_error-8aa332dfaf8ff0ba.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-45763dc354c061c8.js",revision:"VbOjxzaF2-WMIPxel8NX_"},{url:"/_next/static/css/36840340f3f01bb9.css",revision:"36840340f3f01bb9"},{url:"/_next/static/css/b3010cc00e7383ae.css",revision:"b3010cc00e7383ae"},{url:"/_next/static/css/c1b248dfcdc8bb3a.css",revision:"c1b248dfcdc8bb3a"},{url:"/_next/static/css/c9a3b95e60d92791.css",revision:"c9a3b95e60d92791"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/Free vegetables.55a1e331.png",revision:"e603eafc7652822213330143a653df37"},{url:"/_next/static/media/Image2.83b6d420.png",revision:"2e557171d999247305dd03031aa3f547"},{url:"/_next/static/media/Image3.57a63e78.png",revision:"968769e31832a0de7eb1587ab8781266"},{url:"/_next/static/media/Image4.32f9d102.png",revision:"174e9ec2bde057d4ff5d56d99c9c4403"},{url:"/_next/static/media/Vector.030f4364.png",revision:"efe389b8023d8868f1eb257fd4ba7ee0"},{url:"/_next/static/media/arrowRight.c92f530d.png",revision:"744d6d74d8bb230ff431343500e405a7"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/curve.2204bd11.png",revision:"347e41a87785c8134adf3920bda84503"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/default-user.20579340.jpg",revision:"4aa4dc7ee7e3f768154414f8e5dd38e7"},{url:"/_next/static/media/deliveryIcon.a3789315.png",revision:"ef250e4f70984dcbc6d1e7dab7bc2635"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/email.fb026695.png",revision:"1129c19e60ceb2adce5dd6906242e262"},{url:"/_next/static/media/facebook.96459d2e.png",revision:"06d49edf684582b281bacd4ba83b7c6a"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/features.4b9804b8.png",revision:"4ec21422321b17be693ed9a0bdcfd5e3"},{url:"/_next/static/media/growthIcon.96b5cbe7.png",revision:"53660b7c5c238770954c16e8558e2436"},{url:"/_next/static/media/healthIcon.b46f2070.png",revision:"04fd067566190258031d343abc71d2b2"},{url:"/_next/static/media/instagram.7169a408.png",revision:"938ea70301e5267c6d099b07d74b7a12"},{url:"/_next/static/media/knowledgeIcon.21d0cc32.png",revision:"7130adbecd05588225118ae65dacb4a9"},{url:"/_next/static/media/lightbulbIcon.c36e9a85.png",revision:"6bded421f0648c7fcf4c7e5f1082bee8"},{url:"/_next/static/media/location.b5e2fde8.png",revision:"7f9c204ecaad87b0a58afa9cf3019f5f"},{url:"/_next/static/media/logo.5572697d.png",revision:"868a1ac112617fcd4ba04956bad00f80"},{url:"/_next/static/media/phone.8d4c6ace.png",revision:"6238e02514d2dc256823c9c4b041a9e4"},{url:"/_next/static/media/subheading.9d5d8228.png",revision:"72c4bf5ab123d49dbaf4028b36de4282"},{url:"/_next/static/media/tiktok.88b851bf.png",revision:"984965c48d8a12c9bdb318e99aff78c6"},{url:"/_next/static/media/twitter.51708049.png",revision:"a944f5730040605d8bf9d2a9f202845d"},{url:"/icon-192x192.png",revision:"adcbe2cde976f9307a5665cb3ce58fb7"},{url:"/icon-256x256.png",revision:"66498dfcbd3c0152d517ed1a5868eead"},{url:"/icon-384x384.png",revision:"57640fc83dae8684fda2032acbb8cd6a"},{url:"/icon-512x512.png",revision:"8609caa672c04e450cb56a9bd213fe3b"},{url:"/images/Vector.png",revision:"efe389b8023d8868f1eb257fd4ba7ee0"},{url:"/images/about.png",revision:"440d650a7c1f9632dcfdb516f4f5f83e"},{url:"/images/arrowRight.png",revision:"744d6d74d8bb230ff431343500e405a7"},{url:"/images/avatar-placeholder.jpg",revision:"35975c8078fbc7111ae9b9252293d710"},{url:"/images/bannerbg.png",revision:"b062ba2035fedc9f83e5ddfcbdd41f80"},{url:"/images/curve.png",revision:"347e41a87785c8134adf3920bda84503"},{url:"/images/default-user.jpg",revision:"4aa4dc7ee7e3f768154414f8e5dd38e7"},{url:"/images/deliveryIcon.png",revision:"ef250e4f70984dcbc6d1e7dab7bc2635"},{url:"/images/discover.png",revision:"efb0eb0433a5461a700d3d0508c33a94"},{url:"/images/email.png",revision:"1129c19e60ceb2adce5dd6906242e262"},{url:"/images/employee/done_upload.svg",revision:"e09807a7409403d5a1baf0f1c4f1f223"},{url:"/images/facebook.png",revision:"06d49edf684582b281bacd4ba83b7c6a"},{url:"/images/features.png",revision:"4ec21422321b17be693ed9a0bdcfd5e3"},{url:"/images/growthIcon.png",revision:"53660b7c5c238770954c16e8558e2436"},{url:"/images/healthIcon.png",revision:"04fd067566190258031d343abc71d2b2"},{url:"/images/information-section/articles.png",revision:"d0c895054e6501351d65729547041ad9"},{url:"/images/information-section/blogs.png",revision:"1f9a507d08a5b4c558528dc75e75726b"},{url:"/images/information-section/learning-materials.png",revision:"af7b6df43fde0b3e88cb064cb671e91d"},{url:"/images/information-section/video-tutorial.png",revision:"ef927d3bd374f64a867326f9c567c227"},{url:"/images/instagram.png",revision:"938ea70301e5267c6d099b07d74b7a12"},{url:"/images/knowledgeIcon.png",revision:"7130adbecd05588225118ae65dacb4a9"},{url:"/images/leaf.png",revision:"fc3d233cb7a0abd215b04f733a3490f9"},{url:"/images/lightbulbIcon.png",revision:"6bded421f0648c7fcf4c7e5f1082bee8"},{url:"/images/location.png",revision:"7f9c204ecaad87b0a58afa9cf3019f5f"},{url:"/images/phone.png",revision:"6238e02514d2dc256823c9c4b041a9e4"},{url:"/images/subheading.png",revision:"72c4bf5ab123d49dbaf4028b36de4282"},{url:"/images/tiktok.png",revision:"984965c48d8a12c9bdb318e99aff78c6"},{url:"/images/twitter.png",revision:"a944f5730040605d8bf9d2a9f202845d"},{url:"/logo.png",revision:"868a1ac112617fcd4ba04956bad00f80"},{url:"/manifest.json",revision:"4f60f449706fa6ea5f0885700d8cf9be"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
