import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import './productDisplay.css'
import AllProducts from '../../SchemaSamples/AllProducts'
import AllUsers from '../../SchemaSamples/AllUsers'
import AllCategories from '../../SchemaSamples/AllCategories'

const ProductDisplay = props => {
  const getCategoryID = useParams()
  const [categoryy, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [hover, setHover] = useState('')
  
  useEffect(() => {
    const findCategory=()=>{
      const ID = getCategoryID.categoryID
      const foundCategory = AllCategories.find(category => category._id == ID)
      const productsOfCategory = AllProducts.filter(product => foundCategory.products_id.includes(product._id))
      setCategory(foundCategory)
      setProducts(productsOfCategory)
    }
    findCategory()
  }, [])

  // for responsive styling
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    600: 1
  };

  const handleSearch = (e) => {
    if(e.target.value == ''){
        setProducts(categoryy[0].products)
    }
    else{
        const SearchResult = products.filter(item => item.productName.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(SearchResult)
    }
    setSearchValue(e.target.value)
  }

  const handleMouseHover = (name) => {
    setHover(name)
  }

  return (
    <div>
      <div className="container searchArtwork__Container">
        <Link to="/CustomerHome" className='categoryBack_button categoryBack_button-Primary'>Back</Link>
        <input className='searchArtworkTextField' placeholder='Search Artwork' value={searchValue} onInput={(e) => handleSearch(e)}/>
      </div>
      <div className="container displayArtworks__Container">
        {categoryy && (
          <div className="">
            <div className="categoryComponent">
              <h1 className='catTitle'>{categoryy.name} Artworks</h1>
              {products && (
                <Masonry 
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {products.map((product) =>
                    <div className='artworkCard' onMouseOver={() => handleMouseHover(product.name)} onMouseLeave={() => setHover('')}>
                      <Link to={`/ViewItem/${product._id}`} >
                        <img className='artworkImagee' src={product.thumbnailURL} alt={product.name} />
                      </Link>
                      
                    </div>
                  )}
                </Masonry>
              )}
              {hover && (
                <div className="popup_productName"><h4>"{hover}"</h4></div>
              )}
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDisplay