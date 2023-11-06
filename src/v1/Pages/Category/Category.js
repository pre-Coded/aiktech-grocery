// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../Api";
import { ProductCard } from "../../Components";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import "./Category.scss";
// import { toast } from "react-toastify";
// import get from "lodash/get";
import { CategoryCard } from "../../Components";
import SubCategoryCard from './SubCategory/SubCategoryCard'

const mapStateToProps = ({ auth = {}, categories = {} }) => ({
  auth,
  categories,
});

const Category = () => {
  const {
    auth = {},
    categories: { list: categoryList },
  } = useSelector(mapStateToProps);
  const { isLoggedIn } = auth;
  const [categoryName, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState(null)
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryId, setSubcategoryId] = useState(null)
  const [productsList, setProductsList] = useState(null);
  const { category = "" } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let color_generator = 0;
  
  const subtabhandler = (subcategory, id) => {
    // history.replace(subcategory);
    setSubCategoryName(subcategory)
    setSubcategoryId(id)
  };

  const tabhandler = (category) => {
    history.replace(category);
    setCategory(category)

  };
 

  useEffect(() => {
    // fetchProducts(categoryName);
    // setCategory(categoryName);
    categoryList
      && categoryList.map((item) => {
        if(item.name===categoryName){
          let subcategory_all = {
            id: item.id,
            image: item.image,
            name: item.name,
          }

          // let all_category = item.sub_categories.unshift(subcategory_all)
          
          
          if (item.sub_categories.length>0){
            setSubCategoryName(item.name)
            setSubcategoryId(item.id)
            setCategoryId(null)
          } 
          else{
            setCategory(categoryName);
            setSubCategoryName(categoryName)
            setCategoryId(item.id)
            setSubcategoryId(item.id)

          }
        }
        return 0
      })
        
  }, [categoryName]);

  useEffect(() => {
    fetchProducts(subCategoryName, subCategoryId);
    setSubCategoryName(subCategoryName);
  }, [subCategoryName]);

  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      if (category) {
        setCategory(category);
      } else {
        let firstCategory = categoryList[0]["name"];
        setCategory(firstCategory);
        setCategoryId(categoryList[0]["id"])
        // fetchProducts(firstCategory);
      }
    }
  }, [categoryList]);

  const fetchCategories = async () => {
    dispatch(actionsCreator.FETCH_CATEGORIES());
  };

  const fetchProducts = async (name, id) => {
    try {
      const response = await productAPI.fetchProducts({ name, id });
      setProductsList(response.data.data);
    } catch (error) { }
  };

  useEffect(() => {
    fetchCategories();
    if (isLoggedIn) {
      fetchCartDetails();
      fetchFavouriteProducts();
    }
  }, [isLoggedIn]);

  const fetchFavouriteProducts = () => {
    dispatch(actionsCreator.FETCH_FAVOURITE_PRODUCTS());
  };

  const fetchCartDetails = () => {
    dispatch(actionsCreator.FETCH_CART_DETAILS());
  };

  return (
    <div>
      
      <div className="tab-container">
        <div className="category-name">{categoryName}</div>
        <div className="tab-wrapper">
          {categoryList
            ? categoryList.map((item, index) => {
              
              return (
                <CategoryCard
                  active={item.name===categoryName}
                  title={item.name}
                  key={item.name}
                  image={item.image}
                  onClick={() => tabhandler(item.name)}
                  color={(index)} 
                  
                  />
              );
            })
            : null}
        </div> 
      </div>
      <div className="tab-wrapper">
          {categoryList && categoryList.map((item, index) => (
              item.sub_categories.length>0 && item.name===categoryName? 
              <SubCategoryCard
                active={item.name===subCategoryName}
                title={"All"}
                key={item.name}
                image={item.image}
                onClick={() => subtabhandler(item.name, item.id)}
                color={(index)} 
              />: null
          ))}
          {categoryList && categoryList.map((item) => (
              item.name===categoryName? 
              item.sub_categories.length>0 && item.sub_categories.map((subitem, index)=>{
                return (
                  
                    <SubCategoryCard
                      active={subitem.name===subCategoryName}
                      title={subitem.name}
                      key={subitem.name}
                      image={subitem.image}
                      onClick={() => subtabhandler(subitem.name, subitem.id)}
                      color={(index)} 
                    />
                );
              }): null  
          ))}
        </div> 
      

      <div className="tab-products">
        {productsList && productsList.length > 0 ? (
          productsList.sort((a, b) => b.quantity_remaining - a.quantity_remaining).map((item) => {
            return (
              <ProductCard
                title={item.product_name}
                quantity={item.description}
                price={item.price}
                image={item.photo}
                id={item.id}
                description={item.description}
                oldprice={item.market_price}
                outofstock={item.out_of_stock}
                quantity_remaining={item.quantity_remaining}
              />
            );
          })
        ) : (
          <div>Products are coming soon!</div>
        )}
      </div>
    </div>
  );
};

export default Category;
