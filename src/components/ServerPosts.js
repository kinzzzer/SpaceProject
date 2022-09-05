import React, { useEffect, useState } from 'react';
import MediaCard from "./MediaCard";
import getLaunchList from "../API/launch";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, getListItemIconUtilityClass } from "@mui/material";
import Button from '@mui/material/Button';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from "../app/slices/rocketSlice";
import TextField from '@mui/material/TextField';
import useDebounce from '../hooks/useDebounce';
import searchCharacters from '../API/serch';


const ServerPosts = (props) => {

    const [state, setState] = useState([]) // all info
    const [watchFavorite, setWatchFavorite] = useState(false) // (one of)
    const [link, setLink] = useState('https://lldev.thespacedevs.com/2.2.0/launch')

    // Состояние и сеттер состояния для поискового запроса
    const [searchInputValue, setSearchInputValue] = useState('');
    // Состояние и сеттер состояния для результатов поиска
    const [searchResults, setSearchResults] = useState([]);
    const [searchNext, setSearchNext] = useState(null)

    const debouncedSearchInputValue = useDebounce(searchInputValue, 500);

    useEffect(
        () => {
            // Убедиться что у нас есть значение (пользователь ввел что-то)
            if (debouncedSearchInputValue) {

                // Сделать запрос к АПИ
                searchCharacters(debouncedSearchInputValue).then(results => {
                    console.log({ results })
                    // Выставит состояние с результатом
                    setSearchNext(results.next)
                    setSearchResults(results.results);
                });
            } else {
                setSearchResults([]);
            }
        },
        // Это массив зависимостей useEffect
        // Хук useEffect сработает только если отложенное значение изменится ...
        // ... и спасибо нашему хуку, что оно изменится только тогда ...
        // когда значение searchInputValue не менялось на протяжении 500ms.
        [debouncedSearchInputValue]
    );

    const favorites = useSelector((state) => state.rockets.favorites)
    console.log(favorites)

    const dispatch = useDispatch()

    const fetchData = () => {
        console.log({searchInputValue})
        
        if (searchInputValue) {
            searchCharacters(searchInputValue, searchNext).then(results => {
                console.log({ results })
                // Выставит состояние с результатом
                setSearchResults([...searchResults, ...results.results]);
            });
        } else {
            getLaunchList(link).then((resolve, reject) => {
                try {
                    setState([...state, ...resolve.results])
                    setLink(resolve.next)
                } catch {
                    console.log(reject)
                }
            })
        }
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
                <h1><RocketLaunchIcon />Space</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField onChange={e => setSearchInputValue(e.target.value)} id="outlined-basic" label="Searching" variant="outlined" />
                </Box>
                <Button color="inherit" onClick={() => handleClick(!watchFavorite)} variant="outlined"
                    startIcon={
                        <BookmarksIcon />}>{watchFavorite ? 'Show All' : 'Only Favorites'} {favorites.length}
                </Button>

            </Box>

            <InfiniteScroll
                next={fetchData}
                hasMore={searchInputValue ? searchNext : !!link}
                loader={<h4>Loading...</h4>}
                dataLength={list.length}
            >
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {searchInputValue ?
                        searchResults.map(result => (
                            <MediaCard
                                list={list}
                                handleAddFavorite={handleAddFavorite}
                                rocketInfo={result}
                                favorites={favorites}
                            />
                        ))
                        :
                        list && list.map((rocket) => {
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
