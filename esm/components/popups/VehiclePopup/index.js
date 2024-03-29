import coreUtils from "@opentripplanner/core-utils";
import React from "react";
import PropTypes from "prop-types";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Popup } from "react-leaflet";
import { PopupStyle } from "../styled";
import VehicleTracker from "../vehicle-tracker";
import { defaultMessages, linterIgnoreTheseProps } from "../../../utils";
import FormattedDurationWithSeconds from "../../../utils/formatted-duration-with-seconds";
/**
 * view component for vehicle marker popup
 * content is derived from the vehicle record
 */

export default function VehiclePopup(_ref) {
  var isTracked = _ref.isTracked,
      setTracked = _ref.setTracked,
      vehicle = _ref.vehicle;
  var blockId = vehicle.blockId,
      reportDate = vehicle.reportDate,
      routeLongName = vehicle.routeLongName,
      seconds = vehicle.seconds,
      status = vehicle.status,
      stopId = vehicle.stopId,
      stopSequence = vehicle.stopSequence,
      tripId = vehicle.tripId,
      vehicleId = vehicle.vehicleId;
  var displayedStatus;

  if (status === "IN_TRANSIT_TO") {
    displayedStatus = /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.statusEnRoute"],
      description: "Text shown for a moving transit vehicle",
      id: "otpUi.TransitVehicleOverlay.statusEnRoute",
      values: {
        stopId: stopId
      }
    });
  } else if (status === "STOPPED_AT") {
    if (stopSequence === 1) {
      displayedStatus = /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.statusAtStart"],
        description: "Text shown for a transit vehicle at the beginning of the line",
        id: "otpUi.TransitVehicleOverlay.statusAtStart",
        values: {
          stopId: stopId
        }
      });
    } else {
      displayedStatus = /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.statusAtStop"],
        description: "Text shown for a transit vehicle stopped at a stop",
        id: "otpUi.TransitVehicleOverlay.statusAtStop",
        values: {
          stopId: stopId
        }
      });
    }
  } else {
    displayedStatus = /*#__PURE__*/React.createElement(FormattedMessage, {
      defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.statusUnknown"],
      description: "Text shown for an unknown status",
      id: "otpUi.TransitVehicleOverlay.statusUnknown"
    });
  }

  var isMultipleVehicles = vehicleId.indexOf("+") > 0;
  var vehicleMessageValues = isMultipleVehicles ? {
    count: 2,
    // TODO: ideally you would want to use the equivalent of the comma of the desired language.
    vehicleIds: vehicleId.replace(/\+/g, ", ")
  } : {
    count: 1,
    vehicleIds: vehicleId
  };
  return /*#__PURE__*/React.createElement(Popup, null, /*#__PURE__*/React.createElement(PopupStyle, null, /*#__PURE__*/React.createElement(PopupStyle.Title, null, routeLongName), /*#__PURE__*/React.createElement(PopupStyle.Span, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.lastSeen"],
    description: "Text describing how long ago a transit vehicle last reported its status",
    id: "otpUi.TransitVehicleOverlay.lastSeen",
    values: {
      durationText: /*#__PURE__*/React.createElement(FormattedMessage, {
        defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.durationAgo"],
        description: "Text describing a past duration",
        id: "otpUi.TransitVehicleOverlay.durationAgo",
        values: {
          duration: /*#__PURE__*/React.createElement(FormattedDurationWithSeconds, {
            seconds: seconds
          })
        }
      })
    }
  })), /*#__PURE__*/React.createElement(PopupStyle.Span, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.date"],
    description: "Text describing when a transit vehicle last reported its status",
    id: "otpUi.TransitVehicleOverlay.date",
    values: {
      date: /*#__PURE__*/React.createElement(FormattedDate, {
        value: reportDate
      })
    }
  })), /*#__PURE__*/React.createElement(PopupStyle.Span, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.status"],
    description: "Text describing the status of a transit vehicle",
    id: "otpUi.TransitVehicleOverlay.status",
    values: {
      status: displayedStatus
    }
  })), /*#__PURE__*/React.createElement(PopupStyle.Span, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.tripAndBlockIds"],
    description: "Text showing a transit vehicle trip and block ids",
    id: "otpUi.TransitVehicleOverlay.tripAndBlockIds",
    values: {
      blockId: blockId,
      tripId: tripId
    }
  })), /*#__PURE__*/React.createElement(PopupStyle.Span, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: defaultMessages["otpUi.TransitVehicleOverlay.vehicleIds"],
    description: "Displays transit vehicle numbers",
    id: "otpUi.TransitVehicleOverlay.vehicleIds",
    values: vehicleMessageValues
  })), /*#__PURE__*/React.createElement(VehicleTracker, {
    isTracked: isTracked,
    setTracked: setTracked,
    vehicle: vehicle
  })));
}
VehiclePopup.propTypes = {
  /** indicate if this vehicle is being tracked, */
  isTracked: PropTypes.bool,

  /** callback which forwards the vehicle and tracking status from track button */
  setTracked: PropTypes.func,

  /** vehicle record - @see: core-utils/src/types/transitVehicleType */
  vehicle: coreUtils.types.transitVehicleType
};
VehiclePopup.defaultProps = {
  isTracked: false,
  setTracked: function setTracked(vehicle, isTracked) {
    linterIgnoreTheseProps(vehicle, isTracked);
  },
  vehicle: null
};
//# sourceMappingURL=index.js.map