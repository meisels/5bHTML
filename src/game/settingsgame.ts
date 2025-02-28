// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const nodeEnv = (import.meta.env.NODE_ENV === "development")
const settingsBuffer = localStorage.getItem("settings");
export const VERSION_NAME = nodeEnv ? "dev-21w29a" : "v5 Alpha";
export const LAST_UPDATE = new Date(2021, 7, 21);
export const EXPLORE_SEVRER_URL = nodeEnv ? "http://localhost:3000" : "https://5beam.zelo.dev"

let Settings = {
    IS_DEBUG: nodeEnv,
    MENU_OLD: false,
}

if (settingsBuffer !== null) Settings = JSON.parse(settingsBuffer)
console.log(Settings)

export default Settings