import React, {useState} from 'react'
import api from '../../api'
import './mediaUploader.css'
import Modal from '../Modal/Modal';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const MediaUploader = (props) => {
  
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [attachment,  setAttachment] = useState(props.mailDetails?.attachment || {});

  const handleUploadMedia = async() =>{
    const token = localStorage.getItem('google_token');
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", attachment);
    if (!title || !attachment.name) {
      toast.error("Title and file are required!");
      return;
    }
    try {
      const response = await api.post('/media/upload',
      formData,
      {
        headers: {
            Authorization: `Bearer ${token}`
        },
      });
      if(response) {
        toast.success("Upload successful!", { autoClose: 2000 });
        navigate("/loading");
        setTimeout(() => {
          navigate("/dashboard");
        }, 400);
      }

    } catch (error) {
      console.log("Error: ", error);
    } finally {
      handleToClose();
    }
  }

  const handleToClose = () =>{
      setTitle("");
      setAttachment("");
      
      props.handleCloseUploadModal();
  }

  const handleFileUpload = (file) => {
    setAttachment(file)
    console.log("check file", file)
  }

  return (
    <div>
      {<ToastContainer className='toast' position="top-right" autoClose={1000} />}
      <Modal isOpen={true} onClose={() => handleToClose()}>
          <h2>Upload Media</h2>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={title}
              placeholder="Title"
              required={true}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "none",
                borderBottom: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>
          <input
              type="file"
              id="media_asset"
              name="media_asset"
              required={true}
              accept=".png, .jpg, .jpeg, .svg, .heif, .heic, .mp4, .avi, .mov, .wmv, .webm, .mkv " 
              multiple
              onChange={(e) => handleFileUpload(e.target.files[0])}
              />
          <button onClick={handleUploadMedia}>Upload</button>
        </Modal>
    </div>

  )
}
