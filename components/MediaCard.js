import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function MediaCard(props){
    const {name, windowEnd, windowStart, image, key, handelAddFavorite} = props
    return (
        <Card sx={{ maxWidth: 500,
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
                    Window start: {windowStart}
                    <br/>
                    Window end: {windowEnd}
                </Typography>
            </CardContent>
            <CardActions>
                <button onClick={() =>  handelAddFavorite(key) }>Add in favorite </button>
            </CardActions>
        </Card>
    );
}