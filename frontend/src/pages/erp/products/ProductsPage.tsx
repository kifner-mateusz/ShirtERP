import { FC } from "react"
import DefaultPage from "../../../components/DefaultPage"
import ProductListItem from "./ProductListItem"

import template from "../../../models/product.model.json"

const ProductsPage: FC = () => {
  return (
    <DefaultPage
      template={template}
      ListElement={ProductListItem}
      entryName="products"
    />
  )
}

export default ProductsPage
