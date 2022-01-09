import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import ModalJobs from './ModelJobs';
import SendIcon from '@mui/icons-material/Send';
const options = [
  'Send CV',
  // 'Atria',
  // 'Callisto',
];
const ITEM_HEIGHT = 48;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function JobsList(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [modelJob, setModelJob] = React.useState(false);
  const [, setUserTakeTest] = useRecoilState(State.userTakeTest);
  const [userInfo] = useRecoilState(State.userInfo);

  let history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickSendCV = () =>{
    if(userInfo.meta_data.file_path){
      history.push("/userTakeTest");
      setUserTakeTest(props.item);
    }else{
      setModelJob(true)
    }
    
  }

  const convertDate = moment(new Date(props.item.date)).format("dddd, MMMM Do YYYY, h:mm:ss a");
  const ModelJob =  modelJob ? <ModalJobs/> : null;
  return (
    <>
    <Card style={{ margin: '10px', backgroundColor: '#FFFFFF' }} sx={{  maxWidth: 1000 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.item.userId.name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <div>
            <IconButton aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick} 
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={onClickSendCV}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        }
        title={props.item.headLines}
        subheader={convertDate}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography  variant="subtitle1" gutterBottom component="span">
          <span style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(props.item.userId.name)}</span> | {props.item.type} | {props.item.location} | {props.item.scope}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">

          <Typography style={{ fontWeight: 'bold' }} variant="subtitle1" gutterBottom component="div">
            Job description:
            <Typography variant="body2" gutterBottom component="div">
              {props.item.jobDescription}
            </Typography>
          </Typography>

          <Typography style={{ fontWeight: 'bold' }} variant="subtitle1" gutterBottom component="div">
            Job requirements:
            <Typography variant="body2" gutterBottom component="div">
            {props.item.jobRequirements}
            </Typography>
          </Typography>


        </Typography> */}

{/* <div style={{display:'flex', justifyContent:'right'}}>
<Button onClick={onClickSendCV} variant="contained">Send CV</Button>

</div> */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={onClickSendCV} aria-label="send cv">
          <SendIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography style={{ fontWeight: 'bold' }} paragraph>Job description:</Typography>
          <Typography paragraph>
          {props.item.jobDescription}
          </Typography>
          <Typography style={{ fontWeight: 'bold' }} paragraph>Job requirements:</Typography>
          <Typography paragraph>
          {props.item.jobRequirements}
          </Typography>
          {/* <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
    {ModelJob}
    </>
  );
}
