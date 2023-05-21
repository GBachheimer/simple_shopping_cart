import { ReactElement, createContext, useState, useEffect } from "react"

export type ProductType = {
  sku: string,
  name: string,
  price: number,
}

const initState: ProductType[] = []

// const initState: ProductType[] = [
//   {
//       "sku": "item0001",
//       "name": "Widget",
//       "price": 9.99
//   },
//   {
//       "sku": "item0002",
//       "name": "Premium Widget",
//       "price": 19.99
//   },
//   {
//       "sku": "item0003",
//       "name": "Deluxe Widget",
//       "price": 29.99
//   }
// ]

export type UseProductsContextType = { products: ProductType[] }

const initContextState: UseProductsContextType = { products: [] }

const ProductContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ( {children}: ChildrenType ): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState)

  useEffect(() => {
    const getProducts = async (): Promise<ProductType[]> => {
      const data = await fetch('http://loaclhost:3500/products').then(response => {
        return response.json()
      }).catch(error => {
        if (error instanceof Error) {
          console.log(error.message)
        }
      })
      return data
    }
    getProducts().then(products => setProducts(products))
  }, [])

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext

