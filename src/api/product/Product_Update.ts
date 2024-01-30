import { Product, ResponseToProduct } from '@/lib/types/Product'
import axios from 'axios'

export type Product_Update_Req = {
    id: string
    payload: {
        name: string
        images: string[]
        category: string
        description: string
    }
}

export type Product_Update_Res = Product

export function Product_Update(payload: Product_Update_Req) {
    return axios.put<Product_Update_Res>(
        'product/update/' + encodeURIComponent(payload.id),
        payload.payload,
        {
            responseType: 'json',
            transformResponse: [
                (data: any) => {
                    const parsedData = JSON.parse(data)
                    return parsedData ? ResponseToProduct(parsedData) : null
                },
            ],
        },
    )
}
