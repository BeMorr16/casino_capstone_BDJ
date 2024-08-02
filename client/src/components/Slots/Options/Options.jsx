import React from "react";
import audioOff from '../assets/icons/audioOff.png'; 
import audioOn from '../assets/icons/audioOn.png';  

const Options = ({ toggleAudio, audio }) => {
  return (
    <div id="options">
      <button className="SLMSoundOnOff" onClick={toggleAudio} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <img 
          src={audio ? audioOn : audioOff}
          alt={audio ? "Sound On" : "Sound Off"}
          style={{ width: '40px', height: '40px' }}
        />
      </button>
    </div>
  );
};

export default Options;