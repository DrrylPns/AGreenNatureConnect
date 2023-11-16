/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },

  images:{
    //To be be replace...
<<<<<<< HEAD
    domains: [ 'uploadthing.com','tse2.mm.bing.net', 'lh3.googleusercontent.com', 'images.genius.com', 'wallpapercave.com','www.celebritynetworth123.com'],
=======
    domains: [ 'uploadthing.com','tse2.mm.bing.net', 'lh3.googleusercontent.com', 'images.genius.com', 'wallpapercave.com','www.celebritynetworth123.com','utfs.io'],
>>>>>>> 41155b53a9e126fc82710a8367a953d39098d8ab
  },
}

module.exports = nextConfig