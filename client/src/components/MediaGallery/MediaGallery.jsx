import React from "react";
import "./MediaGallery.css";

const MediaGallery = ({ mediaData, isLoading }) => {
  return (
    <div className="gallery">
      {(isLoading && mediaData.length==0) ?  <div> Loading... </div> : 
      mediaData.length>0 ? mediaData?.map((item) => (
        <div className="card" key={item.key}>
          {item.attachment.match(/\.(jpeg|jpg|png|gif|svg|heif|heic)$/) ? (
            <img src={item.mediaUrl} alt={item.title} className="media" />
          ) : (
            <video controls className="media">
              <source src={item.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="card-content">
            <h3 className="title">{item.title}</h3>
            {/* <p className="info">Uploaded by: {item.userName}</p> */}
            <p className="info">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))
      : 
      <div className="nothingContainer">
          <img className="nothingImage" src="https://ssl.gstatic.com/docs/doclist/images/empty_state_empty_folder.svg" alt="Nothing here"/>
          <div>Nothing is here</div>
          <div>Please upload something</div>
      </div>
    }
    </div>
  );
};

export default MediaGallery;