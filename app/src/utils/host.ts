import { Platform } from "react-native";

export default function host() {
  let hostString = "localhost";
  
  if (Platform.OS === "android") {
    hostString = "http://10.0.2.2"
  }

  if (Platform.OS === "ios") {
    hostString = "http://localhost:3000"
  }

  return hostString;
}
