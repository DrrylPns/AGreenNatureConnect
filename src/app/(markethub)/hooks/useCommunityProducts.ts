'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export function useCommunityProducts(communityId: string) {
  return useQuery({
    queryKey: ['communityProducts', communityId],
    queryFn: async () => {
      try {
        const [allProducts, fruits, vegetables, others] = await Promise.all([
          axios.get(`/api/markethub/community/products?communityId=${communityId}`),
          axios.get(`/api/markethub/community/fruits?communityId=${communityId}`),
          axios.get(`/api/markethub/community/vegetables?communityId=${communityId}`),
          axios.get(`/api/markethub/community/others?communityId=${communityId}`),
        ]);

        return {
          allProducts: allProducts.data,
          fruits: fruits.data,
          vegetables: vegetables.data,
          others: others.data,
        };
      } catch (error: any) {
        throw new Error('Error fetching products: ' + error.message);
      }
    },
  });
};
