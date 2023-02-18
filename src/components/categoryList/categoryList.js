import './categoryList.css'
import { useState, useEffect } from 'react'

import CategoryItem from '../categoryItem/categoryItem'



function CategoryList(props){
    const {functions, variables} = props
    const {onClickCategory} = functions
    const {update, shopObj} = variables

    const [categoryListEls, setCategoryListEls] = useState([])
    const changeCategoryListEls = () => {
        setCategoryListEls(shopObj.shopCategoryiesListObjs.map((obj)=>{
            return (<CategoryItem key={obj.id} functions={{onClickCategory:onClickCategory}} variables={{categoryData:obj}}/>)
        }))
    }

    useEffect(()=>{
        changeCategoryListEls()
    },[update])

    return (
        <div className={`categoryList ${categoryListEls.length<6?'center':''}`}>
            {categoryListEls}
        </div>
    )
}

export default CategoryList