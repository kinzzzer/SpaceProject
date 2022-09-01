import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import moment from "moment";


export default function MediaCard(props) {
    const {handleAddFavorite, rocketInfo, favorites} = props
    const {name, window_end, window_start, image, id} = rocketInfo

    return (
        <Card sx={{
            ":hover": {
                cursor: "pointer",
                boxShadow: 15,
            },
            width: '46%',
            boxShadow: 3,
            borderRadius: 2,
            m: 2,

        }}>
            <CardMedia
                component="img"
                height="640"
                image={image}
                alt="Future rocket"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Window start: {moment(window_start).format('MMMM Do YYYY, h:mm:ss a')}
                    <br/>
                    Window end: {moment(window_end).format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
            </CardContent>
            <CardActions sx={{
                display: "flex",
                justifyContent: "space-around",
            }}>
                <Button
                    onClick={() => handleAddFavorite(rocketInfo)} color="inherit"
                    variant="outlined"><BookmarkAddRoundedIcon/>
                    {favorites.find((item) => item.id === rocketInfo.id) ? "Remove" : "Add"}
                </Button>
            </CardActions>
        </Card>
    );
}