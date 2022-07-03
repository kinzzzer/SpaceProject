import React, {useEffect, useState} from 'react';
import getData from "../API/getData";
import MediaCard from "./MediaCard";


export default function ServerPosts() {

    const [state, setState] = useState([]) // Єто все
    const [favorite, setFavorite] = useState([]) // Єто что нрав ( когда добовлять + убрать)
    const [watchFavorite, setWatchFavorite] = useState (false) // Вижу не вижу
        // подгружаем данні (от момент запароса до момента ответа)
        // номер страницы


        useEffect(() => {
            const fetchData = async () => {
                const res = await getData()
                setState(res)
            }
            fetchData()
        }, []);

        
        const scrollHandler = (e) => {
            if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
                getData()
            }
        }

        useEffect(() => {
            getData();
            window.addEventListener("scroll", scrollHandler)
        }, []);


    // console.log('scrollHeight', e.target.documentElement.scrollHeight) Общая высота страницы с учетом скрола
    //   console.log('scrollTop', e.target.documentElement.scrollTop) Текущае положение скрола от верха страницы
    //   console.log('innerHeight', window.innerHeight) Высота видимой области страницы (высота браузера)




    const list = watchFavorite ? favorite :  state // Показать списки
    const handleClick = (value) => setWatchFavorite(value)
    const handelAddFavorite = (id) => () => {
        const result = state.find((elem) => elem.id === id);
        const copyPage = JSON.stringify(JSON.parse(favorite));
        copyPage.push(result);
        setFavorite(copyPage);
        console.log(favorite)
    };


    // const removeFavorite = () => {
    //     setFavorite(prevState => )
    // }



    return (
        <div>


            <button onClick={() => handleClick(!watchFavorite)}>only Favorites</button>



            <div>{list && list.map((rocket) => {
                return <MediaCard key={rocket.id}
                                  name={rocket.name}
                                  image={rocket.image}
                                  windowEnd={rocket.window_end}
                                  windowStart ={rocket.window_start}
                                  list={list}
                                  setFavorite={setFavorite}
                                  handelAddFavorite ={handelAddFavorite}/>

            })}

            </div>
        </div>
    )
}
