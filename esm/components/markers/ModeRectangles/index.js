import * as StyledRectangle from "./styled";
import * as utils from "../../../utils";
/**
 * Gets a marker size ([width, height]) for a given zoom level.
 * Used with rectangular vehicle shapes.
 */

function getRectangleSize(zoom) {
  console.log("getRectangleSize here for duty", window.location);

  var zoomToCorrectedWidth = {
    9: 2.7,
    10: 3.59,
    11: 4.49,
    12: 6,
    13: 7.19,
    14: 17.07,
    15: 22.46,
    16: 31.44,
    17: 40,
    18: 67.38,
    19: 89.84,
    20: 116.79,
  };

  var specialPaths = ["/route/", "/vehicle/", "/planner-trip", "/stop/"];
  var pathname = window.location.pathname;
  var isSpecialPath = specialPaths.some((path) => pathname.includes(path));
  console.log("isSpecialPath...?", isSpecialPath);
  var spriteWidth = zoomToCorrectedWidth[zoom] || zoom;

  if (isSpecialPath) {
    spriteWidth *= 12;
  }

  if (zoom >= 13 && isSpecialPath) {
    spriteWidth = 60;
  }

  return [spriteWidth, spriteWidth];
}

export var LightRailVehicleRectangle = utils.makeRotatedMarker(
  utils.makeBasicVehicleShape(
    StyledRectangle.LgShape,
    StyledRectangle.LgTrackedShape
  ),
  getRectangleSize
);
export var BusRectangle = utils.makeRotatedMarker(
  utils.makeBasicVehicleShape(
    StyledRectangle.Shape,
    StyledRectangle.TrackedShape
  ),
  getRectangleSize
);
export var DetailedRectangle = utils.makeRotatedMarker(function (_ref) {
  var color = _ref.color,
    highlightColor = _ref.highlightColor,
    isTracked = _ref.isTracked,
    routeType = _ref.routeType;
  return utils.makeVehicleIcon(
    StyledRectangle,
    routeType,
    color,
    highlightColor,
    isTracked
  );
}, getRectangleSize); // Rename styled components for export

export { StyledRectangle as Styled };
//# sourceMappingURL=index.js.map
