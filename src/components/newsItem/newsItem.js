import './newsItem.css'

function NewsItem(props){
    const {functions, variables} = props
    const {imgSrc, link} = variables

    return (
        <div onClick={()=>{alert('This is one of the news item!')}} className='galaryItem'>
            <img src={imgSrc}></img>
        </div>
    )
}

export default NewsItem