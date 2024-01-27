import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercises = () => {
const [videos, setVideos] = useState([]);
const [videoUrl, setVideoUrl] = useState('');
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(true);
const token = localStorage.getItem('token');

useEffect(() => {
    // Fetch all videos when the component mounts
    axios
    .get('http://localhost:8001/api/video', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        setVideos(response.data.videos);
    })
    .catch(error => {
        console.error('Error fetching videos:', error);
    })
    .finally(() => {
        setLoading(false);
    });
}, [token]);

const getYoutubeVideoId = url => {
    const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const handleVideoUpload = event => {
    event.preventDefault();

    const videoId = getYoutubeVideoId(videoUrl);

    if (videoId) {
      // Send the video data to the backend to create a new video
    axios
        .post(
        'http://localhost:8001/api/video',
        { youtubeId: videoId },
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        )
        .then(response => {
        setVideos([...videos, response.data.video]);
        setVideoUrl('');
        setErrors(prevErrors => ({ ...prevErrors, [response.data.video.id]: '' }));
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
    .delete(`http://localhost:8001/api/video/${videoId}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        const updatedVideos = videos.filter(video => video.id !== videoId);
        setVideos(updatedVideos);
        setErrors(prevErrors => ({ ...prevErrors, [videoId]: '' }));
    })
    .catch(error => {
        console.error('Error deleting video:', error);
        setErrors(prevErrors => ({ ...prevErrors, [videoId]: 'Failed to delete video' }));
    });
};

return (
    <div>
    <h2>Video Demonstration</h2>

      {/* Video Input Form */}
    <form onSubmit={handleVideoUpload}>
        <label>
        YouTube URL:
        <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
        </label>
        <button type="submit">Upload Video</button>
    </form>

      {/* Display Uploaded Videos */}
    {loading ? (
        <p>Loading...</p>
    ) : (
        <div>
        <h3>Uploaded Videos:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {videos.map(video => (
            <div key={video.id} style={{ margin: '10px' }}>
                <iframe
                width="200"
                height="150"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={`YouTube Video ${video.id}`}
                frameBorder="0"
                allowFullScreen
                onError={() => handleVideoDelete(video.id)}
                ></iframe>
                {errors[video.id] && <p>{errors[video.id]}</p>}
                <button onClick={() => handleVideoDelete(video.id)}>Delete</button>
            </div>
            ))}
        </div>
        </div>
    )}

      {/* Go Home Button */}
    <Link to="/" className="btn btn-primary">
        Go Home
    </Link>
    </div>
);
};

export default Exercises;
