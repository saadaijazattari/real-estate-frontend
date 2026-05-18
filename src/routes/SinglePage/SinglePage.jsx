// routes/SinglePage/SinglePage.jsx

import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Map from "../../components/Map/Map";
import Slider from "../../components/Slider/Slider";
import "./singlePage.scss";

export default function SinglePage() {
  const loaderData = useLoaderData();

  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Loader data:", loaderData);

    // ✅ Agar error hai to
    if (loaderData?.error) {
      setError(loaderData.error);
      setLoading(false);
      return;
    }

    // ✅ Agar post direct hai (backend ne wrapper nahi kiya)
    if (loaderData?.post && loaderData.post.id) {
      console.log("Post found (direct):", loaderData.post);
      setPostData(loaderData.post);
      setLoading(false);
      return;
    }
    
    // ✅ Agar post.post structure hai (purana wrapper)
    if (loaderData?.post?.post && loaderData.post.post.id) {
      console.log("Post found (nested):", loaderData.post.post);
      setPostData(loaderData.post.post);
      setLoading(false);
      return;
    }
    
    // ✅ Agar loaderData hi post hai
    if (loaderData?.id) {
      console.log("LoaderData is post:", loaderData);
      setPostData(loaderData);
      setLoading(false);
      return;
    }

    // ✅ Agar kuch nahi mila
    console.log("No post found in loaderData");
    setError("Post not found");
    setLoading(false);
    
  }, [loaderData]);

  // ✅ Loading State
  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="error">
        Error: {error}
      </div>
    );
  }

  // ✅ No data state
  if (!postData) {
    return (
      <div className="not-found">
        Post not found
      </div>
    );
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          
          {/* Images Slider */}
          <Slider images={postData.images || []} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{postData.title}</h1>

                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>
                    {postData.address}, {postData.city}
                  </span>
                </div>

                <div className="price">
                  ${postData.price}
                </div>
              </div>

              <div className="user">
                <img
                  src={postData.user?.avatar || "/noavatar.jpg"}
                  alt=""
                />

                <span>
                  {postData.user?.userName || "Unknown"}
                </span>
              </div>
            </div>

            <div className="bottom">
              {postData.postDetail?.desc ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: postData.postDetail.desc,
                  }}
                />
              ) : (
                <p>No description available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">

          {/* General */}
          <p className="title">General</p>

          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />

              <div className="featureText">
                <span>Utilities</span>
                <p>
                  {postData.postDetail?.utilities || "Not specified"}
                </p>
              </div>
            </div>

            <div className="feature">
              <img src="/pet.png" alt="" />

              <div className="featureText">
                <span>Pet Policy</span>
                <p>
                  {postData.postDetail?.pet || "Not specified"}
                </p>
              </div>
            </div>

            <div className="feature">
              <img src="/fee.png" alt="" />

              <div className="featureText">
                <span>Income Policy</span>
                <p>
                  {postData.postDetail?.income || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <p className="title">Sizes</p>

          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>
                {postData.postDetail?.size || "N/A"} sqft
              </span>
            </div>

            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{postData.bedroom} beds</span>
            </div>

            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{postData.bathroom} bathroom</span>
            </div>
          </div>

          {/* Nearby Places */}
          <p className="title">Nearby Places</p>

          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <span>School</span>
              <p>
                {postData.postDetail?.school || "N/A"} m away
              </p>
            </div>

            <div className="feature">
              <img src="/bus.png" alt="" />
              <span>Bus Stop</span>
              <p>
                {postData.postDetail?.bus || "N/A"} m away
              </p>
            </div>

            <div className="feature">
              <img src="/restaurant.png" alt="" />
              <span>Restaurants</span>
              <p>
                {postData.postDetail?.restaurant || "N/A"} m away
              </p>
            </div>
          </div>

          {/* Map */}
          <p className="title">Location</p>

          <div className="mapContainer">
            {postData.latitude && postData.longitude ? (
              <Map items={[postData]} />
            ) : (
              <p>Location not available</p>
            )}
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>

            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}