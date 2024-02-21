import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/metabase_dashboard_react/')
      .then(response => {
        setIframeUrl(response.data.iframe_url);
      })
      .catch(error => {
        console.error('Error fetching iframe URL:', error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9">

          <div>
            {iframeUrl && (
              <iframe title="Metabase Dashboard" src={iframeUrl} width="100%" height="600" frameBorder="0"></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
