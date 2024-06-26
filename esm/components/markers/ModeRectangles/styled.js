import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import styled, { css } from "styled-components";
import { Bus, Rail, BusRect, RailRect } from "./images";
import * as utils from "../../../utils";
var blue = "#28639c";
var defColor = blue;
export var tracked = css([".rail_blue,.bus_blue{fill:", ";}"], function (props) {
  return props.colorselected;
});
export var normal = css([".rail_blue,.bus_blue{fill:", ";}background-color:transparent;:hover{.rail_blue,.bus_blue{fill:", ";}}"], function (props) {
  return props.color || defColor;
}, function (props) {
  return props.colorselected;
});
export var Shape = styled(BusRect).withConfig({
  displayName: "styled__Shape",
  componentId: "b21hpy-0"
})(["", ""], normal);
export var TrackedShape = styled(Shape).withConfig({
  displayName: "styled__TrackedShape",
  componentId: "b21hpy-1"
})(["", ""], tracked);
export var LgShape = styled(RailRect).withConfig({
  displayName: "styled__LgShape",
  componentId: "b21hpy-2"
})(["", ""], normal);
export var LgTrackedShape = styled(LgShape).withConfig({
  displayName: "styled__LgTrackedShape",
  componentId: "b21hpy-3"
})(["", ""], tracked);

var _utils$makeModeStyles = utils.makeModeStyles(normal, tracked, Bus, Rail),
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