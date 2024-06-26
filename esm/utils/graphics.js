import coreUtils from "@opentripplanner/core-utils";
import PropTypes from "prop-types";
import React from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import L from "leaflet";
import cloneDeep from "lodash.clonedeep";
import RotatedMarker from "../components/markers/RotatedMarker";
import { linterIgnoreTheseProps } from "./data";
/**
 * helper to render a React .svg structure, ala icons/Bus.js as a leaflet marker
 *
 * @param icon
 * @param size
 * @param anchor
 * @param pop
 * @param tt
 * @param cls
 */

export function renderAsImage(icon) {
  var size =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : [22, 22];
  var anchor =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var pop =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var tt =
    arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var cls =
    arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
  var x = size[0];
  var y = size[1]; // debugger;

  if (!pop) pop = [0, 0];
  if (!tt) tt = [0, 0];
  if (!anchor) anchor = [Math.round(x / 2), Math.round(y / 2)];
  var retVal = L.divIcon({
    html: ReactDOMServer.renderToString(icon),
    className: cls,
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: pop,
    tooltipAnchor: tt,
  });
  return retVal;
}
/**
 * will take an input object (e.g., probably a defaultProp representing a leaflet style),
 * deep copy that object, and return back a new obj with the .color set
 *
 * @param color
 * @param obj
 * @return deep copied object with color set
 */

export function setColor(color, obj) {
  var retVal = cloneDeep(obj);
  retVal.color = color;
  return retVal;
}
/**
 * Associates two shapes, one for rendering tracked vehicles, and one for untracked vehicles,
 * and optionally renders a size (number) prop determined by the optional getSize function argument.
 */

export var makeBasicVehicleShape = function makeBasicVehicleShape(
  NormalShape,
  TrackedShape,
  getSize
) {
  var Shape = function Shape(_ref) {
    var specialPaths = ["/route/", "/vehicle/", "/planner-trip", "/stop/"];
    var pathname = window.location.pathname;
    let isSpecialPath = specialPaths.some((path) => pathname.includes(path));

    var color = isSpecialPath ? "#5cc3ff" : _ref.color,
      highlightColor = _ref.highlightColor,
      isTracked = _ref.isTracked,
      zoom = _ref.zoom;
    var size = getSize && getSize(zoom);
    return isTracked
      ? /*#__PURE__*/ React.createElement(TrackedShape, {
          color: color,
          size: size,
        })
      : /*#__PURE__*/ React.createElement(NormalShape, {
          color: color,
          size: size,
        });
  };

  Shape.propTypes = {
    /** fill color (#AABBCC format) for all (non-tracked) map vehicle markers */
    color: PropTypes.string,

    /** fill color of tracked vehicle */
    highlightColor: PropTypes.string,

    /** tracking boolean + colors all work to color the marker */
    isTracked: PropTypes.bool,

    /** map zoom: is part of the props due to redrawing this layer on map zoom */
    zoom: PropTypes.number,
  };
  Shape.defaultProps = {
    color: "",
    highlightColor: "",
    isTracked: false,
    zoom: null,
  };
  return Shape;
};
/**
 * makes a circular marker icon with a vehicle image based on mode
 *
 * @param Styled
 * @param mode
 * @param color
 * @param highlightColor
 * @param isTracked
 * @return marker object
 */

export function makeVehicleIcon(
  Styled,
  mode,
  color,
  highlightColor,
  isTracked
) {
  var icon;

  switch (mode) {
    case "TRAM":
      icon = isTracked
        ? /*#__PURE__*/ React.createElement(Styled.TrackedTram, {
            color: color,
          })
        : /*#__PURE__*/ React.createElement(Styled.NormTram, {
            color: color,
          });
      break;

    case "SC":
      icon = isTracked
        ? /*#__PURE__*/ React.createElement(Styled.TrackedSC, {
            color: color,
          })
        : /*#__PURE__*/ React.createElement(Styled.NormSC, {
            color: color,
          });
      break;

    case "GONDOLA":
      icon = isTracked
        ? /*#__PURE__*/ React.createElement(Styled.TrackedGond, {
            color: color,
          })
        : /*#__PURE__*/ React.createElement(Styled.NormGond, {
            color: color,
          });
      break;

    case "RAIL":
    case "SUBWAY":
      icon = isTracked
        ? /*#__PURE__*/ React.createElement(Styled.TrackedRail, {
            color: color,
          })
        : /*#__PURE__*/ React.createElement(Styled.NormRail, {
            color: color,
          });
      break;

    case "BUS":
      icon = isTracked
        ? /*#__PURE__*/ React.createElement(Styled.TrackedBus, {
            color: color,
          })
        : /*#__PURE__*/ React.createElement(Styled.NormBus, {
            color: color,
          });
      break;

    default:
      icon = isTracked
        ? /*#__PURE__*/ React.createElement(Styled.TrackedShape, {
            color: color,
          })
        : /*#__PURE__*/ React.createElement(Styled.Shape, {
            color: color,
          });
      break;
  }

  return icon;
}
/**
 * different icons per mode is repeated in multiple places. This helper function is reused
 * in multiple places to apply a normal and tracked style, based on various transit modes
 *
 * @param normal
 * @param tracked
 * @param busIcon
 * @param railIcon
 * @param tramIcon
 * @param streetcarIcon
 * @param gondolaIcon
 * @return {array} - styled icon objects (two for each mode, ala tracked and normal styles)
 */

export function makeModeStyles(
  normal,
  tracked,
  busIcon,
  railIcon,
  tramIcon,
  streetcarIcon,
  gondolaIcon
) {
  if (!railIcon) railIcon = busIcon;
  if (!tramIcon) tramIcon = railIcon;
  if (!streetcarIcon) streetcarIcon = railIcon;
  if (!gondolaIcon) gondolaIcon = busIcon;
  var NormBus = styled(busIcon).withConfig({
    displayName: "graphics__NormBus",
    componentId: "sc-1q2itqx-0",
  })(["", ""], normal);
  var TrackedBus = styled(NormBus).withConfig({
    displayName: "graphics__TrackedBus",
    componentId: "sc-1q2itqx-1",
  })(["", ""], tracked);
  var NormRail = styled(railIcon).withConfig({
    displayName: "graphics__NormRail",
    componentId: "sc-1q2itqx-2",
  })(["", ""], normal);
  var TrackedRail = styled(NormRail).withConfig({
    displayName: "graphics__TrackedRail",
    componentId: "sc-1q2itqx-3",
  })(["", ""], tracked);
  var NormTram = styled(tramIcon).withConfig({
    displayName: "graphics__NormTram",
    componentId: "sc-1q2itqx-4",
  })(["", ""], normal);
  var TrackedTram = styled(NormTram).withConfig({
    displayName: "graphics__TrackedTram",
    componentId: "sc-1q2itqx-5",
  })(["", ""], tracked);
  var NormSC = styled(streetcarIcon).withConfig({
    displayName: "graphics__NormSC",
    componentId: "sc-1q2itqx-6",
  })(["", ""], normal);
  var TrackedSC = styled(NormSC).withConfig({
    displayName: "graphics__TrackedSC",
    componentId: "sc-1q2itqx-7",
  })(["", ""], tracked);
  var NormGond = styled(gondolaIcon).withConfig({
    displayName: "graphics__NormGond",
    componentId: "sc-1q2itqx-8",
  })(["", ""], normal);
  var TrackedGond = styled(NormGond).withConfig({
    displayName: "graphics__TrackedGond",
    componentId: "sc-1q2itqx-9",
  })(["", ""], tracked);
  return [
    NormBus,
    TrackedBus,
    NormRail,
    TrackedRail,
    NormTram,
    TrackedTram,
    NormSC,
    TrackedSC,
    NormGond,
    TrackedGond,
  ];
}
/**
 * Renders the provided Icon with a RotatedMarker component (for rendering rotated vehicle symbols)
 * and make the component render the icon with the size returned by the optional getSize function argument.
 */

export var makeRotatedMarker = function makeRotatedMarker(Icon, getSize) {
  var VehicleMarker = function VehicleMarker(_ref2) {
    var children = _ref2.children,
      color = _ref2.color,
      highlightColor = _ref2.highlightColor,
      isTracked = _ref2.isTracked,
      onVehicleClicked = _ref2.onVehicleClicked,
      vehicle = _ref2.vehicle,
      zoom = _ref2.zoom;

    if (!vehicle) {
      return null;
    }

    var lat = vehicle.lat,
      lon = vehicle.lon,
      heading = vehicle.heading;
    var icon = /*#__PURE__*/ React.createElement(Icon, {
      color: color,
      highlightColor: highlightColor,
      isTracked: isTracked,
      routeType: vehicle.routeType,
      zoom: zoom,
    });
    return /*#__PURE__*/ React.createElement(
      RotatedMarker,
      {
        icon: renderAsImage(icon, getSize && getSize(zoom)),
        position: [lat, lon],
        rotationAngle: heading,
        rotationOrigin: "center center",
        onClick: function onClick() {
          return onVehicleClicked(vehicle, isTracked);
        },
        zIndexOffset: isTracked ? 1000 : 0,
      },
      children
    );
  };

  VehicleMarker.propTypes = {
    /** React children */
    children: PropTypes.arrayOf(PropTypes.element),

    /** fill color (#AABBCC format) for all (non-tracked) map vehicle markers */
    color: PropTypes.string,

    /** fill color of tracked vehicle */
    highlightColor: PropTypes.string,

    /** tracking boolean + colors all work to color the marker */
    isTracked: PropTypes.bool,

    /** Callback fired when the vehicle marker is clicked (vehicle: object) => {} */
    onVehicleClicked: PropTypes.func,

    /** vehicle record  - @see: core-utils/types/transitVehicleType */
    vehicle: coreUtils.types.transitVehicleType.isRequired,

    /** map zoom: is part of the props due to redrawing this layer on map zoom */
    zoom: PropTypes.number,
  };
  VehicleMarker.defaultProps = {
    children: null,
    color: "",
    highlightColor: "",
    isTracked: false,
    onVehicleClicked: function onVehicleClicked(vehicle, isTracked) {
      linterIgnoreTheseProps(vehicle, isTracked);
    },
    zoom: null,
  };
  return VehicleMarker;
};
//# sourceMappingURL=graphics.js.map
