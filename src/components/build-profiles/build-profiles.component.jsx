import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import separatorFrame from "../../assets/frames/separator-frame-2.webp";

import "./build-profiles.styles.scss";

const BuildProfiles = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [buildProfiles, setBuildProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // TODO implement "click outside" functionality to close
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const loadBuildProfiles = () => {
    const profiles = JSON.parse(localStorage.getItem("buildProfiles")) || [];
    setBuildProfiles(profiles);
  };

  const handleSave = () => {
    // Check if a build with the same name already exists
    const existingBuild = buildProfiles.find(
      (profile) => profile.name === inputValue
    );

    if (existingBuild) {
      // Show an error message or prompt the user to confirm the overwrite
      alert(
        "A build with the same name already exists. Please choose a different name."
      );
    } else {
      // TODO need to fix the path navigating, until that a full url link will do
      //   const path = window.location.pathname + window.location.search;
      const newProfiles = [
        ...buildProfiles,
        { name: inputValue, url: window.location.href },
      ];
      localStorage.setItem("buildProfiles", JSON.stringify(newProfiles));
      setInputValue("");
      // Update the buildProfiles state with the new build
      setBuildProfiles(newProfiles);
    }
  };

  const handleClearName = () => {
    setInputValue("");
  };

  const handleLoad = (url) => {
    // navigate
    // console.log("navigated to ", url);
    // navigate(url);
    // TODO need to fix the path navigating later, right now a default link will be good
  };

  const handleDelete = (profileToDelete) => {
    const updatedProfiles = buildProfiles.filter(
      (profile) => profile.name !== profileToDelete.name
    );
    localStorage.setItem("buildProfiles", JSON.stringify(updatedProfiles));
    setBuildProfiles(updatedProfiles);
  };

  useEffect(() => {
    loadBuildProfiles();
  }, []);

  return (
    <div className="build-profiles">
      <button className="build-profiles-button" onClick={toggleIsOpen}>
        Builds
      </button>
      <CSSTransition
        in={isOpen}
        timeout={350}
        classNames="build-profiles-content-animation"
        unmountOnExit
      >
        <div className="build-profiles-content">
          <button
            className="build-profiles-close-button"
            onClick={toggleIsOpen}
          >
            X
          </button>
          <div className="build-profiles-title-container">
            <h2>Save/Load Builds</h2>
          </div>
          <div className="build-profiles-inner-content">
            <div className="build-profiles-name-container">
              <input
                className="build-profiles-name-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter build name"
                list="buildProfiles"
                maxLength={30}
              />
              {inputValue && (
                <button className="clear-search" onClick={handleClearName}>
                  &times;
                </button>
              )}
              {/* <datalist id="buildProfiles">
                {buildProfiles.map((profile) => (
                  <option key={profile.name} value={profile.name} />
                ))}
              </datalist> */}
            </div>
            <button className="save-build-button" onClick={handleSave}>
              Save
            </button>
            <div className="build-profiles-saved-builds-title-container">
              <h3>Saved Builds</h3>
              <div className="build-profiles-separator">
                <img src={separatorFrame} alt="" />
              </div>
            </div>
            <div className="build-profiles-list-container">
              <ul className="build-profiles-list">
                {buildProfiles.map((profile) => (
                  <li key={profile.name}>
                    <div className="list-item-container">
                      <a
                        href={profile.url}
                        onClick={(e) => {
                          // TODO need to fix the path navigating, until that a normal link navigate will do
                          //   e.preventDefault();
                          //   handleLoad(profile.url);
                        }}
                      >
                        {profile.name}
                      </a>
                      <button
                        className="delete-build-button"
                        onClick={() => handleDelete(profile)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="build-profiles-content-bg-container"></div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default BuildProfiles;
