import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import PropTypes from "prop-types";
import { FeatureGroup } from "react-leaflet";
import * as utils from "../../utils";
var _coreUtils$types = coreUtils.types,
    leafletPathType = _coreUtils$types.leafletPathType,
    transitVehicleType = _coreUtils$types.transitVehicleType;
/**
 * vehicle geometry presentational component that creates a map overlay for the line
 * geometry showing the travel pattern of a vehicle
 */

export default function RouteGeometry(props) {
  var pattern = props.pattern,
      zoom = props.zoom,
      selectedVehicle = props.selectedVehicle;
  var highlightColor = props.highlightColor,
      lowlightColor = props.lowlightColor;
  var highlight = props.highlight,
      lowlight = props.lowlight;
  utils.linterIgnoreTheseProps(zoom);
  if (highlightColor) highlight = utils.setColor(highlightColor, highlight);
  if (lowlightColor) lowlight = utils.setColor(lowlightColor, lowlight);
  var splitCoord = selectedVehicle && utils.getVehicleCoordinates(selectedVehicle);
  var pt = utils.findPointOnLine(splitCoord, pattern.data);
  var geom = utils.splitLineGeometry(pattern.data, pt, pattern.id);
  var segments = utils.makeSplitLine(geom, highlight, lowlight);
  var retVal = /*#__PURE__*/React.createElement(FeatureGroup, null);

  if (segments && segments.length === 2) {
    retVal = /*#__PURE__*/React.createElement(FeatureGroup, null, segments);
  }

  return retVal;
}
RouteGeometry.propTypes = {
  /** map zoom: is part of the props due to redrawing this layer on map zoom */
  zoom: PropTypes.number,

  /** optional vehicle record for the (tracked) vehicle */
  selectedVehicle: transitVehicleType,

  /** line geometry, ala { id: <tripId>, data: [[lat, lon], [45.50,-122.41], etc..] } */
  pattern: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }),

  /** color of the *to be travelled* portion of tracked route geom */
  highlightColor: PropTypes.string,

  /** color of the *already travelled* tracked vehicle route (see highlightColor) */
  lowlightColor: PropTypes.string,

  /** line styling options for the to be traveled part of the line geom */
  highlight: leafletPathType,

  /** line styling options for the already traveled portion of the line geom */
  lowlight: leafletPathType
};
RouteGeometry.defaultProps = {
  zoom: 13,
  pattern: null,
  selectedVehicle: null,
  highlightColor: null,
  lowlightColor: null,
  highlight: {
    color: "#00bfff",
    weight: 5.0,
    opacity: 0.85
  },
  lowlight: {
    color: "#777",
    weight: 5.0,
    opacity: 0.7,
    dashArray: "1, 10, 1, 10"
  }
};
//# sourceMappingURL=index.js.map