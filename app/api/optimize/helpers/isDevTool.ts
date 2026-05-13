import { DEV_TOOLS } from "../constants/devTools";

//dev tool check
export default function isDevTool(
  name: string
) {
  return DEV_TOOLS.includes(name);
}