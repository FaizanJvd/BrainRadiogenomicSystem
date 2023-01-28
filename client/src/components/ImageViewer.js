import React, { useState,useEffect } from "react";
import * as markerjs2 from "markerjs2";
import { useRef } from "react";
import Magnifier from "react-magnifier";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useLocation} from "react-router-dom";
import ErrorPage from "./ErrorPage";

const ImageViewer = () => {

  const location = useLocation();
  const imgRef = useRef(null);
  const [t1,setT1] = useState("");
  const [t1Gd,setT1Gd] = useState("");
  const [t2,setT2] = useState("");
  const [flair,setFlair] = useState("");
  const [options, setOptions] = useState("none");
  const [mainImg,setMainImg] = useState("");
  const [error,setError] = useState(false);
  function showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(target.current);
    // markerArea.render((event) => (target.current.src = event.dataUrl));
    markerArea.addEventListener("render", (event) => {
      if (imgRef.current) {
        imgRef.current.src = event.dataUrl;
        // c1 = event.dataUrl;
      }
    });
    markerArea.show();
  }
  const handleMarker = () => {
    setOptions("markers");
    showMarkerArea(imgRef);
  };
useEffect(()=>{
    getScans();
},[])
 const getScans = async ()=>{
    const res = await fetch("http://localhost:4000/scans/getScans",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify({
                patient:location.state.id
                })
            });
    const data = await res.json();
    if(res.status === 201){
        setT1(data.t1);
        setT1Gd(data.t1Gd);
        setT2(data.t2);
        setFlair(data.flair);
        setMainImg(data.t1);
    }
    if (res.status === 422) {
      setError(true);
    }
  };
  if(error){
    return <ErrorPage msg="No Scans found"/>
  }

  return (
    <>
      <div className="d-flex  ms-5">
        <div
          style={{
            width: "16.5em",
            height: "38.5em",
            position: "fixed",
            overflowY: "scroll",
            padding: "1em",
            // borderRadius: "22px",
            // backgroundColor: "gray",
            marginTop: "1em",
            border: "solid black 1px",
          }}
        >
          <div>
            <img
              style={{ width: "220px", height: "220px", padding: "2px" }}
              src={t1}
              onClick={() => setMainImg(t1)}
              alt="image"
            />
          </div>
          <div>
            <img
              style={{ width: "220px", height: "220px", padding: "2px" }}
              src={t1Gd}
              onClick={() => setMainImg(t1Gd)}
              alt="image"
            />
          </div>
          <div>
            <img
              style={{ width: "220px", height: "220px", padding: "2px" }}
              src={t2}
                onClick={() => setMainImg(t2)}
              alt="image"
            />
          </div>
          <div>
            <img
              style={{ width: "220px", height: "220px", padding: "2px" }}
              src={flair}
                onClick={() => setMainImg(flair)}
              alt="image"
            />
          </div>
        </div>

        <div
          style={{
            marginLeft: "20em",
            width: "55%",
            height: "40.5em",
            marginTop: "1em",
            padding: "5px",
            border: "solid black 1px",
            borderRadius: "22px",
            backgroundColor: "rgb(68, 0,83)",
          }}
        >
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-danger"
              onClick={() => setOptions("magnifier")}
            >
              Magnifier
            </button>
            <button className="btn btn-info" onClick={() => setOptions("zoom")}>
              Zoom
            </button>
            <button className="btn btn-info" onClick={handleMarker}>
              Markers
            </button>
          </div>
          <div className="mt-4 ms-4 p-2">
            {options === "none" ? (
              <div>
                <img
                  style={{ width: "480px", height: "480px",marginLeft:"5em",marginBottom:"10px",marginTop:"30px" }}
                  src={mainImg}
                  alt="image"
                />
              </div>
            ) : options === "magnifier" ? (
              <Magnifier
                src={mainImg}
                // width={480}
                // height={480}
                style={{ width: 480, height: 480,marginLeft:"5em",marginBottom:"10px",marginTop:"20px"}}
                // mgWidth={150}
                // mgHeight={150}
                mgShape="square"
                mgShowOverflow={false}
                mgBorderWidth={2}
                mgBorderColor="black"
                mgBorderRadius={5}
                zoomFactor={2}
              />
            ) : options === "zoom" ? (
              <TransformWrapper initialScale={1}>
                {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
                  <React.Fragment>
                    <TransformComponent>
                      <img
                        alt="img"
                        src={mainImg}
                        style={{ width: 480, height: 480,marginLeft:"5em",marginBottom:"10px",marginTop:"20px" }}
                      />
                    </TransformComponent>
                    <div
                      className="d-flex justify-content-around"
                      style={{ position: "absolute",marginLeft:"12.5em" }}
                    >
                      <button
                        className="btn btn-success"
                        onClick={() => zoomIn()}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-info ms-2"
                        onClick={() => zoomOut()}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => centerView()}
                      >
                        centre
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => resetTransform()}
                      >
                        reset
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </TransformWrapper>
            ) : options === "markers" ? (
              <img
                style={{ width: 480, height: 480,marginLeft:"5em",marginBottom:"10px",marginTop:"20px" }}
                id="sampleImage"
                ref={imgRef}
                src={mainImg}
                alt="sample"
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageViewer;
