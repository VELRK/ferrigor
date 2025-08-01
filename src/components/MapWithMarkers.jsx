"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ContactMapWithSlider = () => {
  const markers = [
    {
      name: "Dubai, UAE",
      address: "FERRIGOR PRESTRESSED CONCRETE CONTRACTING L.L.C S.O.C",
      tel: "+971 45761193",
      email: "info@ferrigor.com",
      position: { top: "42%", left: "58%" },
    },
    {
      name: "Coimbatore, India",
      address: "FERRIGOR PRESTRESSED CONCRETE CONTRACTING L.L.C S.O.C",
      tel: "+971 45761193",
      email: "cbe@ferrigor.com",
      position: { top: "50%", left: "66%" },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!Array.isArray(markers) || markers.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % markers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [markers.length]);

  // Guard for empty markers
  if (!Array.isArray(markers) || markers.length === 0) return null;

  // Prevent out-of-bounds index
  const safeIndex = Math.min(activeIndex, markers.length - 1);

  return (
    <div style={{ display: "flex", height: "500px", width: "100%", backgroundColor: "#222", color: "#fff" }}>
      {/* Left Panel */}
      <div className="mapaddress" style={{ flex: 1, padding: "40px" }}>
        <h2 className="maptitle">{markers[safeIndex].name}</h2>
        <p className="white-bg">
          <strong>Address: </strong>{markers[safeIndex].address}<br />
          <strong>Tel:</strong> {markers[safeIndex].tel} <br />
          <strong>Email:</strong> {markers[safeIndex].email}
        </p>
      </div>

      {/* Right Panel - Map with markers */}
      <div className="hide-map" style={{ flex: 2, position: "relative", backgroundColor: "#222" }}>
        <Image
          src="/img/world-map-white_123.png"
          alt="World Map"
          fill
          style={{ objectFit: "contain", opacity: 0.9 }}
        />
        {/* {markers.map((marker, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            style={{
              position: "absolute",
              width: activeIndex === idx ? "14px" : "10px",
              height: activeIndex === idx ? "14px" : "10px",
              backgroundColor: "rgb(3, 163, 227)",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              top: marker.position.top,
              left: marker.position.left,
              transform: "translate(-50%, -50%)",
              outline: activeIndex === idx ? "2px solid #fff" : "none",
            }}
            aria-label={marker.name}
          />
        ))} */}
      </div>
    </div>
  );
};

export default ContactMapWithSlider;