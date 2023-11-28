import React from 'react'
import CreateProduct from './_components/CreateProduct'

const CreateProductsPage = () => {
  return (
    <section className='flex flex-col justify-center p-12 md:max-w-2xl mx-auto gap-5'>
    <div className='text-lg border-b font-bold'>
        Create Product
    </div>

    <CreateProduct />
</section>
  )
}

export default CreateProductsPage