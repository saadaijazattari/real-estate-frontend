// UploadWidget.jsx
import { useEffect, useState } from "react";

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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

  const handleOpenWidget = () => {
    if (loaded && window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Upload success:", result.info.secure_url);
            
            // ✅ Check if multiple images allowed
            if (uwConfig.multiple) {
              // Multiple: array mein add karo
              setState((prev) => {
                const current = Array.isArray(prev) ? prev : [];
                return [...current, result.info.secure_url];
              });
            } else {
              // Single: direct URL set karo
              setState(result.info.secure_url);
            }
          }
        }
      );
      myWidget.open();
    } else {
      alert("Cloudinary script is loading, please wait a moment!");
    }
  };

  return (
    <button
      type="button"
      className="cloudinary-button"
      onClick={handleOpenWidget}
      disabled={!loaded}
    >
      {loaded ? "Upload Image" : "Loading..."}
    </button>
  );
}

export default UploadWidget;