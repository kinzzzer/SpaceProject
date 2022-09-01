import React, {useEffect, useState} from 'react';
import MediaCard from "./MediaCard";
import getLaunchList from "../API/launch";
import InfiniteScroll from "react-infinite-scroll-component";
import {Box} from "@mui/material";
import Button from '@mui/material/Button';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {useDispatch, useSelector} from "react-redux";
import {addFavorites, removeFavorites} from "../app/slices/rocketSlice";
import TextField from '@mui/material/TextField';


const ServerPosts = (props) => {

    const [state, setState] = useState([]) // all info
    const [watchFavorite, setWatchFavorite] = useState(false) // (one of)
    const [link, setLink] = useState('https://lldev.thespacedevs.com/2.2.0/launch')

     // Состояние и сеттер состояния для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');
  // Состояние и сеттер состояния для результатов поиска
  const [results, setResults] = useState([]);
  // Состояние для статуса поиска (есть ли ожидающий запрос API)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        // Выставить состояние isSearching
        setIsSearching(true);
        // Сделать запрос к АПИ
        searchCharacters(debouncedSearchTerm).then(results => {
          // Выставить состояние в false, так-как запрос завершен
          setIsSearching(false);
          // Выставит состояние с результатом
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    // Это массив зависимостей useEffect
    // Хук useEffect сработает только если отложенное значение изменится ...
    // ... и спасибо нашему хуку, что оно изменится только тогда ...
    // когда значение searchTerm не менялось на протяжении 500ms.
    [debouncedSearchTerm]
  );

    const favorites = useSelector((state) => state.rockets.favorites)
    console.log(favorites)

    const dispatch = useDispatch()

    const fetchData = () => {
        const res = getLaunchList(link).then((resolve, reject) => {
            console.log(resolve)
            try {
                setState([...state, ...resolve.results])
                setLink(resolve.next)
            } catch {
                console.log(reject)
            }
        })
    }

    //
    //

    useEffect(() => {
        fetchData()
    }, []);

    const list = watchFavorite ? favorites : state // show list
    const handleClick = (value) => setWatchFavorite(value)

    const handleAddFavorite = (rocket) => {
        if (favorites.find((item) => item.id === rocket.id)) {
            dispatch(removeFavorites(rocket))
        } else {
            dispatch(addFavorites(rocket))
        }
    }


    return (
        <Box sx={{
            width: "55%",
        }}>
            <Box sx={{
                display: "flex",
                width: "100%",
                margin: "10px",
                justifyContent: "space-between",
            }}>
                <h1><RocketLaunchIcon/>Space</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { width: '50ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField onChange={e => setSearchTerm(e.target.value)} color="inherit"  id="outlined-basic" label="Serching" variant="outlined"/>
                </Box>
                <Button color="inherit" onClick={() => handleClick(!watchFavorite)} variant="outlined"
                        startIcon={
                            <BookmarksIcon/>}>{watchFavorite ? 'Show All' : 'Only Favorites'} {favorites.length}
                </Button>

            </Box>

            <InfiniteScroll
                next={fetchData}
                hasMore={!!link}
                loader={<h4>Loading...</h4>}
                dataLength={list.length}
            >
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {list && list.map((rocket) => {
                        return <MediaCard
                            list={list}
                            handleAddFavorite={handleAddFavorite}
                            rocketInfo={rocket}
                            favorites={favorites}
                        />

                    })}
                </Box>
            </InfiniteScroll>
        </Box>
    )
}
export default ServerPosts;
