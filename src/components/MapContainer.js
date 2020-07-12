import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import iceCream from "../images/ice-cream.png";

const Tag = ({ text }) => (
  <div style={{ display: "flex", marginLeft: "-20px", marginTop: "-30px" }}>
    <img src={iceCream} style={{ height: "40px", width: "40px" }} />
    <h6 className="font-styled font-Pink">{text}</h6>
  </div>
);

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 53.483516,
      lng: -2.224383,
    },
    zoom: 16,
  };

  render() {
    return (
      <section style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Tag lat={53.483552} lng={-2.224476} text="Northern Eudaimonia" />
        </GoogleMapReact>
      </section>
    );
  }
}

export default MapContainer;
