import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "react-leaflet";
import L from "leaflet";
import { TooltipStyle } from "../styled";
import { defaultMessages, linterIgnoreTheseProps } from "../../../utils";
import FormattedDurationWithSeconds from "../../../utils/formatted-duration-with-seconds";
/** will show a (leaflet) map tooltip on a vehicle, showing route and update recency */

export default function VehicleTooltip(props) {
  var vehicle = props.vehicle,
      isTracked = props.isTracked,
      direction = props.direction,
      permanent = props.permanent,
      offset = props.offset;
  linterIgnoreTheseProps(isTracked);
  var routeShortName = vehicle.routeShortName,
      routeType = vehicle.routeType,
      seconds = vehicle.seconds;
  var name = routeShortName; // This condition avoids processing long route names such as "Portland Streetcar".

  if ((routeShortName === null || routeShortName === void 0 ? void 0 : routeShortName.length) <= 5) {
    name = routeType ? // This produces text such as "MAX Green", so don't localize.
    "".concat(routeType, " ").concat(routeShortName) : /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.genericRouteFormat"],
      description: "Formats a route label",
      id: "otpUi.TransitVehicleOverlay.genericRouteFormat",
      values: {
        route: routeShortName
      }
    });
  }

  return /*#__PURE__*/React.createElement(Tooltip, {
    permanent: permanent,
    direction: direction,
    offset: offset
  }, /*#__PURE__*/React.createElement(TooltipStyle, null, /*#__PURE__*/React.createElement(TooltipStyle.Title, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.tooltipRouteLabel"],
    description: "Displays a route label in a tooltip",
    id: "otpUi.TransitVehicleOverlay.tooltipRouteLabel",
    values: {
      routeLabel: name
    }
  })), /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.durationAgo"],
    description: "Text describing a past duration",
    id: "otpUi.TransitVehicleOverlay.durationAgo",
    values: {
      duration: /*#__PURE__*/React.createElement(FormattedDurationWithSeconds, {
        seconds: seconds
      })
    }
  })));
}
VehicleTooltip.propTypes = {
  /** vehicle record - @see: core-utils/types/transitVehicleType */
  vehicle: coreUtils.types.transitVehicleType,

  /** indicate if this vehicle is being tracked, */
  isTracked: PropTypes.bool,

  /** is the tip always shown, or just shown on mouse hover */
  permanent: PropTypes.bool,

  /** tip placement (side(s), top, bottom) */
  direction: PropTypes.string,

  /** center of the marker, or some X,Y position in relation to the marker's center */
  offset: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
VehicleTooltip.defaultProps = {
  vehicle: null,
  isTracked: false,
  permanent: false,
  direction: "auto",
  offset: new L.Point(0, 0)
};
//# sourceMappingURL=index.js.map