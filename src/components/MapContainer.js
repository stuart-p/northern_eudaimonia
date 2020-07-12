import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import iceCream from "../images/ice-cream.png";

const Tag = ({ text }) => (
  <div style={{ display: "flex", marginLeft: "-20px", marginTop: "-30px" }}>
    <img src={iceCream} style={{ height: "40px", width: "40px" }} />
    <a href="https://www.google.com/maps/place/Northern+Eudaimonia/@53.48353,-2.2265463,17z/data=!3m1!4b1!4m8!1m2!3m1!2sNorthern+Eudaimonia!3m4!1s0x487bb1ca60166f37:0xd1ed0b06967a48f1!8m2!3d53.4835268!4d-2.2243576">
      <h6 className="font-styled font-Pink">{text}</h6>
    </a>
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
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_API_KEY }}
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
