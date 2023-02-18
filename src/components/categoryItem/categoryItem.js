import './categoryItem.css'

function CategoryItem(props){
    const {functions, variables} = props
    const {categoryData} = variables
    const {onClickCategory} = functions
    
    return (
        <div onClick={()=>{onClickCategory(categoryData.id)}} className="categoryItem">
            <img src={categoryData.goodCategoryImage} alt='C-Item'></img>
            <h3>{categoryData.goodCategoryTitle}</h3>
        </div>
    )
}

export default CategoryItem