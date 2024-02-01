const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    disable: prod ? false : true,
    skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    //To be be replace...
    domains: [ 'firebasestorage.googleapis.com','uploadthing.com','tse2.mm.bing.net', 'lh3.googleusercontent.com', 'images.genius.com', 'wallpapercave.com','www.celebritynetworth123.com','utfs.io'],
  },
}

module.exports = withPWA(nextConfig);