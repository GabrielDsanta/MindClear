import React, { FC } from "react";

import { TitledContainer, Button } from "components/index";
import { Brain, LogOut, Mail } from "lucide-react-native";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Local } from "services/Local";
import { useNavigation } from "@react-navigation/native";
import { InitialRoutesAppNavigationType } from "routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@redux/store/configureStore";
import { setUser } from "@redux/actions";

import colors from "styles/colors";
import fonts from "styles/fonts";

export const Options: FC = () => {
  const user = useSelector((state: State) => state.userReducer.user);

  const navigation = useNavigation<InitialRoutesAppNavigationType>();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    Local.logout();
    navigation.navigate("SignIn");
  };

  return (
    <TitledContainer disableArrow>
      <ImageBackground source={require("../../../assets/BackgroundPNG.png")} style={styles.container}>
        <Brain size={150} strokeWidth={0.3} color={colors.primary} />
        {user && user.email ? (
          <View style={styles.signOutContainer}>
            <View>
              <Text style={styles.fontBold}>{user.name}</Text>
              <Text style={styles.mediumFont}>{user.email}</Text>
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <LogOut color="white" size={28} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.notAuthenticatedUserContainer}>
            <Button
              onPress={() => navigation.navigate("SignIn")}
              title="Fazer Login"
              icon={<Mail color="white" size={24} />}
              backgroundColor={colors.blue100}
              iconPosition="right"
            />
            <Button onPress={() => navigation.navigate("SignIn")} iconPosition="right" title="Cadastrar no App" icon={<Mail color="white" size={24} />} />
          </View>
        )}
      </ImageBackground>
    </TitledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  signOutContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    paddingHorizontal: 20
  },
  notAuthenticatedUserContainer: {
    width: "90%",
    marginTop: 20
  },
  logoutButton: {
    width: 40,
    height: 40,
    backgroundColor: "#DC2626",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  fontBold: {
    ...fonts.boldFont,
    fontSize: 18
  },
  mediumFont: {
    ...fonts.MediumFont,
    fontSize: 12
  }
});
