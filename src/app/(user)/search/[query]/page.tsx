'use client'
import ProductModal from '../../markethub/components/ProductModal'
import { Post, Product } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import DisplayPhoto from "@/../public/images/default-user.jpg";
import RelativeDate from '@/app/components/RelativeDate'
import { FaEllipsis } from 'react-icons/fa6'
import PostButtons from '../../discussion/components/postButtons'
import EditorOutput from '@/app/components/(user)/EditorOutput'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

function page({
    params
}:{
    params:{
        query: string
    }
}) {
   const [posts, setPosts] = useState<Post[]>()
   const [products, setProducts] = useState<Product[]>()
   const {data:session} = useSession();
   useEffect(()=>{
    const getProducts = async()=>{
        const res = (await axios.get(`/api/user/search/getProducts?query=${params.query}`)).data;
        setProducts(res)
    }
    const getPosts = async()=>{
        const res = (await axios.get(`/api/user/search/getPosts?query=${params.query}`)).data;
        setPosts(res)
    }
    getProducts()
    getPosts()
   },[params.query])
  return (
    <div>
        {products && products.length > 0 ?(
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 border-x-[1px]  border-t-2 p-5 border-gray-300 font-poppins font-medium ">
            {products.map((product)=>{
                const prices = product.variants.map((variant) => variant.price);
                const lowestPrice = Math.min(...prices);
                const highestPrice = Math.max(...prices);
                if (product.variants.length < 1) {
                    return null
                }
                if (product.kilograms < 1 && product.grams < 1 && product.pounds < 1 && product.packs < 1 && product.pieces < 1) {
                    return null
                } else {
                    return (
                    <div key={product.id} className=''>
                        <ProductModal  product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                    </div>
                    )
                }
            })}
        </div>
        ):(
            <></>
        )}
        
        <div className=''>
            {posts && posts.map((post)=>{
              // PALITAN 5 PAG TAPUS NA TESTING
              const showPost = post.reports < 5;

              return showPost ? (
                <Link
                  href={{
                    pathname: `/discussion/${post.topic.name}/${post.id}`,
                    query: { postId: post.id },
                  }}
                  key={post.id}
                >
                  <div
                    key={post.id}
                    className="bg-gray-50 border-gray-200 border-2 dark:bg-[#242526] dark:border-none w-full rounded-xl p-5 mt-3 drop-shadow-md shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center overflow-hidden justify-center  rounded-full border w-userImage h-[2.5rem] border-black">
                          {/*User Image, add default image if the user doesn't have DP user image will comes from the backend*/}
                          <Image
                            src={post.author.image || DisplayPhoto}
                            alt="User Image"
                            width={40}
                            height={40}
                          />
                        </div>

                        <div className="flex items-baseline gap-3">
                          {/*Username*/}
                          <h1 className="text-lg font-poppins font-medium">
                            {post.author.username}
                          </h1>
                          {/*Time created display in hours forx ex. just now, 10m ago, 7h ago */}
                          <h3 className="text-[0.7rem] font-poppins">
                            <RelativeDate dateString={post.createdAt.toString()} />
                          </h3>
                        </div>
                      </div>
                      {post.authorId === session?.user?.id && (
                        <button type="button" onClick={() => { }}>
                          <FaEllipsis />
                        </button>
                      )}
                    </div>
                    {/**Description & Images */}
                    <h1 className="text-[1.5rem] px-5 font-poppins font-extrabold">
                      {post.title}
                    </h1>
                    <div className="flex items-center px-5 font-poppins font-semibold gap-3 text-[0.5rem]">
                      <span>Topic:</span>
                      <span className="text-[0.7rem px-2 py-1 rounded-full bg-muted-green text-white">
                        {post.topic.name}
                      </span>
                    </div>
                    <div
                      className="relative text-sm px-5 max-h-40 w-full overflow-clip"
                    >
                      <EditorOutput content={post.content} />
                     
                    </div>
                    {/**Like, Comment, Share(if there is any) Section*/}
                    <PostButtons
                      comments={post.comments.length}
                      postId={post.id}
                    />
                  </div>
                </Link>
              ) : null;
            })}
        </div>
    </div>
  )
}

export default page