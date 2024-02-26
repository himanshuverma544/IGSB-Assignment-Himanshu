export const TASK = {
  title: "Task",
  pathname: "/"
};

export const PAGE404 = {
  pathname: "*"
};


export const COMPANY = {
  name: "IGSB ",
  pathname: "https://www.igeeksquadbay.com/"
};

export const DEVELOPER = {
  name: " Himanshu Verma",
  pathname: "https://www.linktr.ee/himanshuverma544"
};

export const SOURCE_CODE = {
  title: "Source Code ^",
  pathname: "https://www.github.com/himanshuverma544/IGSB-Assignment-Himanshu/"
}


export const DEFAULT_USER = {
  username: "default",
  password: null,
  securityQue: null,
  securityQueAns: null
};


const AUTHENTICATION = {
  signInTitle: "Sign In",
  signUpTitle: "Sign Up",
  signOutTitle: "Sign Out",
};

const GREETING = "Hello,";

export const SIGN_IN = {
  name: AUTHENTICATION.signInTitle,
  heading: "Sign In Yourself",
  switchMsg: "Don't have an account?",
  switchTitle: AUTHENTICATION.signUpTitle,
  show: false
};

export const SIGN_UP = {
  name: AUTHENTICATION.signUpTitle,
  heading: "Sign Up Yourself",
  switchMsg: "Already have an account?",
  switchTitle: AUTHENTICATION.signInTitle,
  show: true
};

export const SIGN_OUT = {
  name: AUTHENTICATION.signOutTitle,
  heading: GREETING,
  switchMsg: "Have a Good Day.",
};

// export const FORGET_PASSWORD = {
//   name: "Confirm Your Username",
//   heading: "Forget Password",
//   switchTitle: "Forget Password"
// }

export const AS_PER = {
  [SIGN_UP.name]: SIGN_UP,
  [SIGN_IN.name]: SIGN_IN,
  [SIGN_OUT.name]: SIGN_OUT
};


export const DEFAULT_DROPDOWN_TOGGLE_TEXT = "Select Your Security Question";
export const DEFAULT_TEXT_COLOR = "#000";
export const PLACEHOLDER_TEXT_COLOR = "#6e6b6b";
export const BACKGROUND_COLOR = "#FFF";
export const BACKGROUND_SELECTED_COLOR = "#E8F0FE";
export const SECURITY_QUES_OPTIONS = [
  "What is the motto or quote you live by?",
  "What was the first concert or live event you attended?",
  "What was the name of your best teacher in high school?",
  "What was the name of your favorite childhood pet?",
  "What was the theme of your most memorable birthday party?"
];


export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;


export const CNAME_SIGNED_IN_USER = "signedInUser";