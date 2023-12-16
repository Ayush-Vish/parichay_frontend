import React from 'react'
import ReactPlayer from 'react-player/file'

function Player( {emailId , url , muted , playing}   ) {
  return (
    <div>
        <ReactPlayer key={emailId} url={url} muted={muted} playing={playing} height="400px" width="400px"  />
    </div>
  )
}

export default Player