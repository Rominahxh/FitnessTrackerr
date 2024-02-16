import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Videos = () => {
const [videos, setVideos] = useState([]);
const [videoUrl, setVideoUrl] = useState('');
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(true);
const [update,setUpdate]= useState(false)
const token = localStorage.getItem('token');

useEffect(() => {
    axios
    .get('http://localhost:8001/api/v1/videos', {
        withCredentials: true
    })
    .then(response => {
        setVideos(response.data.videos);
        console.log(response.data)
    })
    .catch(error => {
        console.error('Error fetching videos:', error);
    })
    .finally(() => {
        setLoading(false);
    });
}, [update]);



const handleVideoUpload = event => {
    event.preventDefault();

    const videoId = getYoutubeVideoId(videoUrl);

    if (videoId) {
      // Send the video data to the backend to create a new video
    axios
        .post(
        'http://localhost:8001/api/v1/videos',
        { videoUrl: videoUrl },
        {
            withCredentials: true
        }
        )
        .then(response => {
        setVideos([...videos, response.data.video]);
        setVideoUrl('');
        setErrors(prevErrors => ({ ...prevErrors, [response.data.video.id]: '' }));
        setUpdate(!update)
        })
        .catch(error => {
        console.error('Error creating video:', error);
        setErrors(prevErrors => ({ ...prevErrors, [new Date().getTime()]: 'Failed to create video' }));
        });
    } else {
    setErrors(prevErrors => ({ ...prevErrors, [new Date().getTime()]: 'Invalid YouTube URL' }));
    }
};

const handleVideoDelete = videoId => {
    // Send a request to the backend to delete the video
    axios
    .delete(`http://localhost:8001/api/v1/videos/${videoId}`,  {
        withCredentials: true
    })
    .then(response => {
        const updatedVideos = videos.filter(video => video.id !== videoId);
        setVideos(updatedVideos);
        setErrors(prevErrors => ({ ...prevErrors, [videoId]: '' }));
        setUpdate(!update)
    })
    .catch(error => {
        console.error('Error deleting video:', error);
        setErrors(prevErrors => ({ ...prevErrors, [videoId]: 'Failed to delete video' }));
    });
};
function getYoutubeVideoId(url) {
    // Match the YouTube video ID using a regular expression
    const regex = /[?&]v=([^#&?]+)|youtu\.be\/([^#&?]+)/;
    const match = url.match(regex);

    // Check if there is a match and return the video ID
    if (match && match[1]) {
        return match[1];
    } else if (match && match[2]) {
        return match[2];
    } else {
        // If no match found, return null or handle accordingly
        return null;
    }
}

return (
    <div>
    <h2 className='white'>Video Demonstration</h2>

      {/* Video Input Form */}
    <form onSubmit={handleVideoUpload}>
        <label>
        <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="Enter YouTube URL" />
        </label>
        <button type="submit">Upload Video</button>
    </form>

      {/* Display Uploaded Videos */}
    {loading ? (
        <p>Loading...</p>
    ) : (
        <div>
        <h3 className='white'>Exercises:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {videos.map((video,index) => {
                const idYou= getYoutubeVideoId(video.videoUrl) 
                return (
            <div key={index} style={{ margin: '10px',display: 'flex', flexDirection: 'column' }}>
                
                <iframe
                width="250"
                height="200"
                src={`https://www.youtube.com/embed/${idYou}`}
                title={`YouTube Video ${video._id}`}
                frameBorder="0"
                allowFullScreen
                onError={() => handleVideoDelete(video._id)}
                ></iframe>
                {errors[video._id] &&   <p>{errors[video._id]} {video._id}</p>}
                <button onClick={() => handleVideoDelete(video._id)}>Delete</button>
            </div>
            )})}
        </div>
        </div>
    )}

      {/* Go Home Button */}
    <Link to="/" className="btn btn-dark">
        Go Home
    </Link>
    </div>
);
};

export default Videos;
