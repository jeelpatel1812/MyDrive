import React, {useState, useEffect, useRef} from 'react'
import {MediaUploader} from '../MediaUploader/mediaUploader.jsx'
import { MdAdd } from "react-icons/md";
import Button from '../Button/button.jsx';
import api from '../../api.js'
import MediaGallery from '../MediaGallery/MediaGallery.jsx';
import Header from '../Header/Header.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css"

const Dashboard = () => {

  const [isUploadModelOpen, setIsUploadModelOpen] = useState(false);
  const [mediaData, setMediaData] = useState([]);
  const isFirstRender = useRef(true); 
  const [isLoading, setIsLoading] = useState(true);


  const handleCloseUploadModal = () => {
    setIsUploadModelOpen(false);
  }

  const handleClickUploadToggle = () => {
      setIsUploadModelOpen(isUploadModelOpen => !isUploadModelOpen);
      console.log("check upload media modal", isUploadModelOpen)
  }

  
  const handleFetchMediaData = async() =>{
    const token = localStorage.getItem('google_token');
    try {
      const response = await api.get('/media/getMedia',
      {
        params:{
          page: 1,
          limit: 20,
        },
        headers: {
            Authorization: `Bearer ${token}`
        },
      });
      
      setMediaData(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.log("Error: ",error);
    }
  }

  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setTimeout(() => {
      setIsLoading(true);
      handleFetchMediaData();
    }, 1500);
    
  },[isUploadModelOpen])

  useEffect(() => {
    console.log("Updated mediaData:", mediaData);
  }, [mediaData]); 

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header/>

      <Button >Upload Media</Button>
      <div className="uploadButtonContainer" >
        <MdAdd className="uploadButton" onClick={handleClickUploadToggle} />
      </div>
      <ul style={{padding: "16px"}}>
        {
           <MediaGallery mediaData={mediaData} isLoading={isLoading} />
        }
      </ul>

      {
        isUploadModelOpen && <MediaUploader handleClickUploadToggle={handleClickUploadToggle} handleCloseUploadModal={handleCloseUploadModal}/>
      }

    </div>
  );
};

export default Dashboard;
