import JobsNavBar from "./JobsNavBar"
import JobsTabs from "./JobsTabs"
import JobsList from "./JobsList"
import {
    useRecoilState,
} from 'recoil';
import { State } from '../State/State';
import { SpinnerDotted } from 'spinners-react';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";

export const Jobs = () => {

    const [allJobs] = useRecoilState(State.allJobs);

    
    const [jobsTabsBtn] = useRecoilState(State.jobsTabsBtn);
    const [jobsState] = useRecoilState(State.jobs);
    const [locationState] = useRecoilState(State.location);
    const [scopeState] = useRecoilState(State.scope);
    const [userInfo] = useRecoilState(State.userInfo);

    const [loading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
            
    }, []);

    const Posts = ({ posts, loading }) => {
        if (loading) {
          return <h2>Loading...</h2>;
        }

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignContent: 'center', justifyContent:'center'}}>

            {/* {posts.map(post => (
                <div style={{minWidth: '70%'}}><JobsList item={post} key={posts._id} /></div>
                
            ))} */}
            
            {/* {posts.map(function (post) {
                    let flag = true;
                    post.usersTakeTest.forEach(element => {
                        if(element === userInfo._id){
                            flag = false;
                        }
                    });
                    if(flag)
                    return <div key={post._id} style={{minWidth: '70%'}}><JobsList item={post}/></div>
                })} */}
                {/* <div key={posts._id} style={{minWidth: '70%'}}><JobsList item={posts}/></div> */}
                {posts.map(function (post) {
                    return <div key={post._id} style={{minWidth: '70%'}}><JobsList item={post}/></div>
                })}
          </div>
        );
      };
    
    
    const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
      const pageNumbers = [];
    
      for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
      }
    
      return (
        <nav style={{display:"flex", justifyContent:'center'}}>
          <ul className='pagination'>
            {pageNumbers.forEach(number => (
              <li key={number} className='page-item'>
                <div onClick={() => paginate(number)} className='page-link'>
                  {number}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      );
    };
    



    const ListJobs = () => {

        let posts = []

        allJobs.forEach(function (post) {
            let flag = true;
            post.usersTakeTest.forEach(element => {
                if(element._id === userInfo._id){
                    flag = false;
                }
            });
            if(flag)
                posts.push(post)
        })



        if(allJobs.length > 0) {
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
            const paginate = pageNumber => setCurrentPage(pageNumber);
            return (
                <div className='container mt-5'>
                <Posts posts={currentPosts} loading={loading} />
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={allJobs.length}
                  paginate={paginate}
                />
                </div>
            )
        }
        }
    



    let resultSearch = allJobs.map(function (item, i) {
        if (item.location === locationState && item.scope === scopeState && item.type === jobsState)
            return <div key={item._id} style={{minWidth: '70%'}}><JobsList item={item}/> </div> 
        else
            return null
    })
    

    let i = 0;
    resultSearch.forEach(element => {
        if(element === undefined)      
        i++;
        
    });
    if( i === resultSearch.length)
    resultSearch = <Div>{"Sorry, there are currently no results, hope the next time you search will be :)"}</Div>;

    
    if (jobsTabsBtn) {
        return (
            <>
                <JobsNavBar />
                <JobsTabs ButtonIsNeed={true} />
                <div style={{ display: 'flex',flexWrap: 'wrap', flexDirection: 'column', alignContent: 'center', justifyContent:'center'}}>
                    {resultSearch}
                </div>
            
            </>
        )
    }

    const isLoading = () => {
        if(allJobs.length>0){
            return(
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignContent: 'center', justifyContent:'center'}}>

        {/* {allJobs.map(function (item, i) {
            let flag = true;
            item.usersTakeTest.forEach(element => {
                if(element === userInfo._id){
                    flag = false;
                }
            });
            
            if(flag)
            return <div style={{minWidth: '70%'}}><JobsList item={item} key={i} /></div>
        })} */}
        
         {ListJobs()}
</div>
            )
        }else{
            return(
<div style={{display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
<SpinnerDotted size={50} thickness={150} speed={100} color="#36ad47" />   
                <p>loading...</p>
 </div>
            )
    
        }
    }


    return (
        <>
            <JobsNavBar />
            <JobsTabs ButtonIsNeed={true} />

      

            {isLoading()}
            {/* <div style={{display:'flex', justifyContent:'left' ,margin:'10px'}}>
            <Button onClick={onClickBtn} style={{backgroundColor:'#8A2BE2', color:'white'}} color="inherit">{"<Publish New Job>"}</Button>

            </div> */}
           
        </>
    )
}

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

