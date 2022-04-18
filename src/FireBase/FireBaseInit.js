import { initializeApp } from "firebase/app";
import FireBaseConfig from "./FireBaseConfig";

const InitializeAuthentication = () => {
    initializeApp(FireBaseConfig)
}
export default InitializeAuthentication;