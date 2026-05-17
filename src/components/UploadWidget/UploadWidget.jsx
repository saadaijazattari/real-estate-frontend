import { useEffect, useState } from "react";

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);

  // 1. Script ko background mein load karne ke liye
  useEffect(() => {
    // Agar script pehle se window par hai toh directly load set karein
    if (window.cloudinary) {
      setLoaded(true);
      return;
    }

    const uwScript = document.getElementById("uw");
    if (!uwScript) {
      const script = document.createElement("script");
      script.async = true;
      script.id = "uw";
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  // 2. Button click hote hi widget create hoga aur turant open hoga
  const handleOpenWidget = () => {
    if (loaded && window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Image URL: ", result.info);
            
            // Profile Update ke liye array ki jagah direct string set karein
            setState(result.info.secure_url); 
          }
        }
      );
      
      // Widget create hote hi usse open kar do
      myWidget.open();
    } else {
      alert("Cloudinary script abhi load ho rahi hai, kripya 1-2 second rukiye!");
    }
  };

  return (
    <button
      type="button" // Form submit hone se rokne ke liye type="button" zaroori hai
      className="cloudinary-button"
      onClick={handleOpenWidget}
      disabled={!loaded}
    >
      {loaded ? "Upload Image" : "Loading..."}
    </button>
  );
}

export default UploadWidget;
