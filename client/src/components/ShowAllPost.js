import React, { useState, useEffect ,useRef,Fragment, useContext} from 'react';
import AddNewPost from './AddNewPost';
import EditNewPost from './EditNewPost';import './ShowAllPost.css';
import { useHistory } from 'react-router-dom';
import client from '../api';
import { BlogsContext } from '../Contex/BlogsContext';
import Card from './Card';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import container from '@material-ui/core/Container';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import CreateBlogButton from './CreateBlogButton';
import { AuthContext } from '../App';





const ShowAllPost = (props) => {

    let history = useHistory();
  const { blogs, setBlogs, addBlogs } = useContext(BlogsContext);
  const { state, dispatch } = useContext(AuthContext);
  
  // const userName = state.user.login;
  // console.log(userName);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const response = await client.get("/getall");
                response.data.data.blogs.forEach(p => p.create_on_date != null ? p.create_on_date = new Date(p.create_on_date).toLocaleDateString("en-GB", options) : p.create_on_date = 'no date')
                console.log(response.data.data);
                setBlogs(response.data.data.blogs);
            }
            catch (error) {
                console.log(error)
            }
            
        }
        fetchData();
    }, [])
    

  const handleUpadte = (id) => {
    
    if (!state.isLoggedIn) {
      history.push(`/login`);
    }
    else {
      history.push(`/ShowAllPost/${id}/EditNewPost`)
    }
    }
    const handleGoToDetailsPage = (id) => {
        history.push(`/ShowAllPost/${id}`)
    }
    
  const deletePost = async (id) => {
    if (!state.isLoggedIn) {
      history.push(`/login`);
    }
    else {
      try {
        const response = await client.delete(`/deleteblog/${id}`)
        setBlogs(blogs.filter(blog => blog.id !== id))
        history.push('/ShowAllPost');
        console.log(response)
            
      } catch (error) {
        console.log(error.message);
      }
    }
    }
    const useStyles = makeStyles((theme) => ({
        buttonColor: {
      color:'#ed4343',
        },
        alignHeader: {
            display: "flex",
            alignContent:'space-evenly',
        },
         buttonMargin: {    
            margin: '30px',   
  },
    }));
    const classes = useStyles();
    return (
      <Container>
        <div className={classes.root}>
          <CreateBlogButton />
          {blogs.map((tile) => (
            <Card
              id={tile.id}
              title={tile.title}
              subTitle={tile.sub_title}
              mainContent={tile.main_content}
              createdOnDate={tile.create_on_date}f
              averageRating={tile.average_rating}
              userName={tile.user_id}
              count={tile.count}
              deletePost={deletePost}
              handleUpdate={handleUpadte}
              handleGoToDetailsPage={handleGoToDetailsPage}
            />
          ))}
        </div>
      </Container>
    );
}
 
export default ShowAllPost;