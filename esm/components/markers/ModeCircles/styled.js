import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import styled, { css } from "styled-components";
import { Circle } from "@styled-icons/fa-solid/Circle";
import { AerialTram, Bus, Streetcar, Max, Wes } from "@opentripplanner/icons";
import * as utils from "../../../utils"; // note: want to make these props of styled, so props.colorselected
// BTW, 'props.color' works, since that's an established prop of styled
// https://stackoverflow.com/questions/52321539/react-passing-props-with-styled-components

var white = "#fff";
var black = "#000";
var defColor = black;
var defSelected = "#00bfff";
export var normal = css(["color:", ";fill:", ";border:1px solid ", ";background-color:", ";:hover{fill:", " !important;color:", ";background-color:", ";border:1px solid ", ";}border-radius:50%;display:block;margin-left:auto;margin-right:auto;"], function (props) {
  return props.color || defColor;
}, function (props) {
  return props.color || defColor;
}, function (props) {
  return props.color || defColor;
}, white, black, function (props) {
  return props.colorselected || defSelected;
}, function (props) {
  return props.colorselected || defSelected;
}, black);
export var tracked = css(["fill:", " !important;color:", ";border:1px solid ", ";background-color:", ";"], black, function (props) {
  return props.colorselected || defSelected;
}, black, function (props) {
  return props.colorselected || defSelected;
});
export var Shape = styled(Circle).withConfig({
  displayName: "styled__Shape",
  componentId: "qbpsr0-0"
})(["", " background-color:", ";"], normal, function (props) {
  return props.color || defColor;
});
export var TrackedShape = styled(Shape).withConfig({
  displayName: "styled__TrackedShape",
  componentId: "qbpsr0-1"
})(["", ""], tracked);

var _utils$makeModeStyles = utils.makeModeStyles(normal, tracked, Bus, Wes, Max, Streetcar, AerialTram),
    _utils$makeModeStyles2 = _slicedToArray(_utils$makeModeStyles, 10),
    NormBus = _utils$makeModeStyles2[0],
    TrackedBus = _utils$makeModeStyles2[1],
    NormRail = _utils$makeModeStyles2[2],
    TrackedRail = _utils$makeModeStyles2[3],
    NormTram = _utils$makeModeStyles2[4],
    TrackedTram = _utils$makeModeStyles2[5],
    NormSC = _utils$makeModeStyles2[6],
    TrackedSC = _utils$makeModeStyles2[7],
    NormGond = _utils$makeModeStyles2[8],
    TrackedGond = _utils$makeModeStyles2[9];

export { NormBus, TrackedBus, NormRail, TrackedRail, NormTram, TrackedTram, NormSC, TrackedSC, NormGond, TrackedGond };
//# sourceMappingURL=styled.js.map