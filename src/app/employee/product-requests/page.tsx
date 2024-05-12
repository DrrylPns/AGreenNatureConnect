import React from 'react'
import { ProductRequestTable } from './_component/ProductRequestTable'
import { fetchAllRequestByCommunity } from '../../../../actions/community'

const ProductRequestsPage = async () => {
    const productReqs = await fetchAllRequestByCommunity()
    return (
        <div>
            <ProductRequestTable requests={productReqs} />
        </div>
    )
}

export default ProductRequestsPage