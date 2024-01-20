import React from "react";
import {
  mainBlue,
  backgroundColor,
  white,
  black,
  greyish,
} from "../../Assets/colors/colors";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Text1, Text2 } from "../../Components/TextComponent/TextComponent";
import TextField from "../../Components/TextFieldComponent/TextField";
import ButtonNormal from "../../Components/ButtonComponent/ButtonNormal";
import Activity from "../../Components/ActivityIndicator/ActivityIndicator";
import Spinner from "react-native-loading-spinner-overlay";
import { devBaseURL } from "../../Config/networkModule";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { logIn } from "../../Redux/Actions/authActions";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
const axios = require("axios");

const Login = (props) => {
  const { navigation, logIn } = props;
  const [isEmailValid, setEmailValid] = React.useState(true);
  const [email, setEmail] = React.useState("app.dev@sitescube.com");
  const [password, setPassword] = React.useState("zJcUa@Fz67sBHK2K");
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const [spinner, setSpinner] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [incorrectCredentials, setIncorrectCredentials] = React.useState(false);
  // const passwordRef = React.useRef();
  // useEffect(() => {}, []);
  const renderLogo = () => {
    return (
      <View
        style={{
          width: undefined,
          height: hp("20"),
          width: wp(60),
          // aspectRatio: 1,
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "100%",
          }}
          source={require("../../Assets/images/AutoBunny.png")}
        ></Image>
      </View>
    );
  };

  const renderEmailField = () => {
    return (
      <TextField
        isFieldValid={isEmailValid}
        length={40}
        returnKeyType="next"
        autoCapitalize="none"
        placeholder="example@gmail.com"
        fieldValue={email}
        keyboardType={"default"}
        // onSubmitEditing={() => onSubmitEmailEditingFunction()}
        // autoFocus={true}
        keyboardType={"email-address"}
        blurOnSubmit={false}
        onChangeField={(text) => {setIncorrectCredentials(false); setEmail(text);}}
      />
    );
  };
  function ValidateEmail(inputText) {
    //Validate Email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      setEmailValid(true);
      return true;
    } else {
      setEmailValid(false);
      return false;
    }
  }

  const onLogin = async () => {
    setSpinner(true);
    setEmailValid(true);
    setIsPasswordValid(true);
    const isEmailValid = ValidateEmail(email);
    const isPasswordValid = password.length !== 0;
    setIsPasswordValid(isPasswordValid);
    setEmailValid(isEmailValid);
    if (isEmailValid == true && isPasswordValid == true) {
      const body = {
        email: email,
        password: password,
      };
      const link = `${devBaseURL}/applogin`;
      console.log(link);
      
      await axios
        .post(link, body, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((response) => {
          console.log(response.data);
          const { access_token, DealershipName, message, status } = response.data;
          if (status == "200") {
            logIn(access_token, DealershipName);
            console.log(access_token, DealershipName);
          }
          setSpinner(false);
        })
        .catch((e) => {
          setSpinner(false);
          console.log(e);
          //show eror
          setIncorrectCredentials(true)
        });
    } else {
      setSpinner(false);
    }
  };

  const onSubmitEmailEditingFunction = () => {
    // passwordRef.current.focus();
  };

  const onSubmitPasswordEditingFunction = () => {
    Keyboard.dismiss();
    console.log("print");
    // onLogin();
  };

  return (
    <>
      <Spinner visible={spinner} customIndicator={<Activity />} />

      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={120}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ height: hp("8") }}></View>
            {renderLogo()}
            <View style={{ height: hp("5") }}></View>
            <Text1>Login</Text1>

            <View style={{ height: 10 }}></View>
            <View style={{ height: 10 }}></View>
            {renderEmailField()}
            <View style={{ height: 8 }}></View>
            <TextField
              // ref={passwordRef}
              isFieldValid={isPasswordValid}
              returnKeyType="next"
              autoCapitalize="none"
              placeholder={"Password"}
              fieldValue={password}
              keyboardType={"default"}
              onSubmitEditing={() => {
                onSubmitPasswordEditingFunction();
              }}
              secureTextEntry={true}
              // autoFocus={true}
              // keyboardType={'email-address'}
              blurOnSubmit={false}
              onChangeField={(text) => {setIncorrectCredentials(false); setPassword(text);}}
            />
            <View style={{ height: 20 }}></View>
            {/* <Text2>Forget Password?</Text2> */}

            <View style={{ height: 20 }}>
            <Text2 style={{color: "red"}}>{incorrectCredentials? 'These credentials do not match our records.' : ''}</Text2></View>
            <ButtonNormal
              onPress={() => {
                onLogin();
                // navigation.navigate('Home');
              }}
              style={{ marginBottom: hp("2") }}
              color={mainBlue}
            >
              Login
            </ButtonNormal>
            {/* <View style={{ flexDirection: "row" }}>
              <Text2 style={{ color: greyish, fontSize: 15 }}>
                Don’t have an account?
              </Text2>
              <Text> </Text>
              <Text style={{ fontWeight: "500", color: mainBlue }}>
                Sign Up
              </Text>
            </View> */}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    logIn: (token, dealer) => dispatch(logIn(token, dealer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
