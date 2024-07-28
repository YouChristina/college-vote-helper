// src/components/UsMap.js
import React, { useEffect, useRef, useCallback } from 'react';
import './UsMap.css';
import stateValues from '../stateValues';

const stateColors = {
  0: '#2D4894',
  1: '#5F7BC6',
  2: '#91AEF9',
  3: '#C7C09F',
  4: '#F0919A',
  5: '#EC6469',
  6: '#C13839',
  vote: 'yellow' // Color for states to be voted
};

const UsMap = ({ homeState, collegeState, voteState }) => {
  const objectRef = useRef();

  const handleSvgLoad = useCallback(() => {
    const svgDocument = objectRef.current.contentDocument || objectRef.current.getSVGDocument();
    if (!svgDocument) {
      console.error('SVG document not found');
      return;
    }

    const resetColors = () => {
      Array.from(svgDocument.querySelectorAll('path')).forEach(path => {
        path.style.fill = '#f9f9f9';
      });
    };

    const setColor = (state, colorKey) => {
      const formattedState = state.charAt(0).toUpperCase() + state.slice(1);
      const stateElement = svgDocument.querySelector(`[data-name="${formattedState}"]`);
      if (stateElement) {
        stateElement.style.fill = stateColors[colorKey];
      }
    };

    resetColors();

    if (homeState) {
      setColor(homeState.toLowerCase(), homeState.toLowerCase() === voteState.toLowerCase() ? 'vote' : stateValues[homeState.toLowerCase()]);
    }

    if (collegeState) {
      setColor(collegeState.toLowerCase(), collegeState.toLowerCase() === voteState.toLowerCase() ? 'vote' : stateValues[collegeState.toLowerCase()]);
    }

    if (voteState) {
      if (voteState.includes('-')) {
        voteState.split('-').forEach(state => {
          setColor(state, 'vote');
        });
      } else {
        setColor(voteState, 'vote');
      }
    }
  }, [homeState, collegeState, voteState]);

  useEffect(() => {
    if (objectRef.current && objectRef.current.contentDocument) {
      handleSvgLoad();
    }
  }, [homeState, collegeState, voteState, handleSvgLoad]);

  return (
    <div className="map-container">
      <object
        ref={objectRef}
        type="image/svg+xml"
        data="/us.svg"
        className="us-map"
        onLoad={handleSvgLoad}
      >
        Your browser does not support SVG
      </object>
    </div>
  );
};

export default UsMap;
