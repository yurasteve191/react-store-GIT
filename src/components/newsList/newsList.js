import './newsList.css'
import { useState, useEffect } from "react"
import Galary from '../galary/galary'
import NewsItem from '../newsItem/newsItem'

function NewsList(props){
    const {functions, variables} = props

    const newsListUrl = 'shop-api/get-shop-news/'
    const [newsListEls, setNewsListEls] = useState([])

    useEffect(()=>{
        async function getNewsList(){
            const response = await fetch(newsListUrl);
            const result = await response.json()
            if ("result" in result){
                setNewsListEls(Array.from(result.result).map((newsItem)=>{
                    return (
                        <NewsItem variables={{imgSrc: newsItem.newsImage}} />
                    )
                }));
            }
            console.log();
        }
        getNewsList()
    },[])

    return (
        <>
            {newsListEls.length >0 && (
                <Galary variables={{itemsCount: newsListEls.length}}>
                    {newsListEls}
                </Galary>
            )}
        </>
    )
}

export default NewsList