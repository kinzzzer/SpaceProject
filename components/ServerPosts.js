import React, {useEffect, useState} from 'react';
import launch from "../API/launch";
import MediaCard from "./MediaCard";
import getLaunchList from "../API/launch";


const ServerPosts = (props) => {

    const [state, setState] = useState([]) // all info
    const [favorites, setFavorites] = useState([]) // fav (when add and delete)
    const [watchFavorite, setWatchFavorite] = useState (false) // (one of)
    const [pagination, setPagination] = useState({limit: 10, offset: 0}) // limit: amount, offset: skip

        useEffect(() => {
            const fetchData = async () => {
                const res = await getLaunchList()
                setState(res)
            }
            fetchData()
        }, []);


        useEffect(() => {
            getLaunchList();
            window.addEventListener("scroll", scrollHandler)
            const items = getLaunchList();
            setState(items);
        }, []);


        useEffect(async() => {
            const items = await getLaunchList(pagination)
            setState(items)
        }, [pagination])


    const scrollHandler = (e) => {
            const isScrolled = window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight;
            if(isScrolled){
                const {offset,limit} = pagination
                setPaginatio({offset: offset + limit, limit})
        }
    }


    // 'scrollHeight', e.target.documentElement.scrollHeight)
    // Total page height including scroll

    //  'scrollTop', e.target.documentElement.scrollTop) Current
    //  scroll position from the top of the page

    //  'innerHeight', window.innerHeight)
    // Height of the visible area of the page (browser height)Высота видимой области страницы (высота браузера)


    const list = watchFavorite ? favorites :  state // show list
    const handleClick = (value) => setWatchFavorite(value)

    const data = localStorage.getItem("favorites") || "[]"; //take info or create new array
        const favorite = JSON.parse(data); // transform JSON in array
        favorite.push(givenID);//add

        localStorage.setItem("favorites",JSON.stringify(favorite))//packed in and save


    // const removeFavorite = () => {
    //     setFavorite(prevState => )
    // }



    return (
        <div>
            <button onClick={() => handleClick(!watchFavorite)}>only Favorites</button>
            <div>{list && list.map(rocket => {
                 return <MediaCard key={rocket.id}
                                   name={rocket.name}
                                   image={rocket.image}
                                   windowEnd={rocket.window_end}
                                   windowStart ={rocket.window_start}
                                   list={list} />
             })}
            </div>
        </div>
    )
}
export default ServerPosts;






//                 {list && list.map((rocket) => {
//                 return <MediaCard key={rocket.id}
//                                   name={rocket.name}
//                                   image={rocket.image}
//                                   windowEnd={rocket.window_end}
//                                   windowStart ={rocket.window_start}
//                                   list={list}
//                                   setFavorite={setFavorite}
//                                   handelAddFavorite ={handelAddFavorite}/>
//
//             })}
//                 {
//                  list.map(rocket =>
//                     return <MediaCard = {rocket.id, rocket.name} />
//                  )}

//const handelAddFavorite = (id) => () => {
//     const result = state.find((elem) => elem.id === id);
//     const copyPage = JSON.stringify(JSON.parse(favorite));
//     copyPage.push(result);
//     setFavorite(copyPage);
//     console.log(favorite)
// };    Try with function