import { useState } from "react";
import axios from "axios";

export default function Modal2() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    category: "",
    balance: "",
  });

  const [emailValid, setEmailValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [emailInvalidMessage, setemailInvalidMessage] = useState("");
  const [passwordInvalidMessage, setPasswordInvalidMessage] = useState("");
  const [confirmPasswordInvalidMessage, setConfirmPasswordInvalidMessage] =
    useState("");
  const [firstNameInvalidMessage, setFirstNameInvalidMessage] = useState("");
  const [lastNasmeInvalidMessage, setLastNasmeInvalidMessage] = useState("");

  const [policyChecked, setPolicyChecked] = useState(false);
  const [policyUncheckedMassage, setPolicyUncheckedMassage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleFirstNameChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setFirstNameInvalidMessage("");
  };

  const handleLastNameChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setLastNasmeInvalidMessage("");
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setEmailValid(validateEmail(value));
    setemailInvalidMessage("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setPasswordStrength(validatePassword(value));
    setPasswordInvalidMessage("");
    setConfirmPasswordInvalidMessage("");
  };

  const signUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(user.email + "" + user.password);
      axios
        .post("http://localhost:4000/api/users", {
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
          email: user.email,
          phone: "user_phone",
          category: "user_categoty",
          balance: 1,
        })
        .then((response) => {
          console.log("Success:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log("log in OK");
    } else {
      console.log("log in error");
    }
  };

  const validateForm = () => {
    if (user.email === "") {
      setemailInvalidMessage("Please enter email.");
    }
    if (user.password === "") {
      setPasswordInvalidMessage("Please enter password.");
    }
    if (user.confirmPassword === "") {
      setConfirmPasswordInvalidMessage("Please enter password again.");
    }
    if (user.first_name === "") {
      setFirstNameInvalidMessage("First name required.");
    }
    if (user.last_name === "") {
      setLastNasmeInvalidMessage("Last name required.");
    }
    if (policyChecked === false) {
      setPolicyUncheckedMassage(
        <p style={{ margin: "0" }}>
          Please read and agree to the private policy.
        </p>
      );
    }
    validateEmail(user.email);
    validatePassword(user.password);
    if (emailValid === false) {
      setemailInvalidMessage("Email address is invalid.");
    }
    if (user.password !== user.confirmPassword) {
      setPasswordInvalidMessage("Password do not match.");
      setConfirmPasswordInvalidMessage("Password do not match.");
    }
    if (user.password === user.confirmPassword && passwordStrength === false) {
      setPasswordInvalidMessage("Password is too weak.");
      setConfirmPasswordInvalidMessage("Password is too weak.");
    }
    if (
      emailValid === true &&
      passwordStrength === true &&
      user.password === user.confirmPassword &&
      policyChecked === true
    ) {
      console.log("Validate OK");
      return true;
    } else {
      console.log("Validate Error");
      return false;
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="tabs-listing">
                {/*Log in and Sign up button uphead*/}
                <nav>
                  <div
                    className="nav nav-tabs d-flex justify-content-center border-0"
                    id="nav-tab2"
                    role="tablist"
                  >
                    <button
                      className="btn btn-outline-primary text-uppercase me-3"
                      id="nav-sign-in-tab"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      type="button"
                    >
                      Log In
                    </button>
                    <button
                      className="btn btn-outline-primary text-uppercase active"
                      id="nav-register-tab"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </div>
                </nav>
                {/*Log in and Sign up button uphead*/}

                {/*Sign up modal body*/}
                <div
                  className="tab-pane fade active show"
                  id="nav-register2"
                  role="tabpanel"
                  aria-labelledby="nav-register-tab2"
                >
                  <form id="form4" className="form-group flex-wrap p-3">
                    <div className="form-label">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="input1"
                              className="fs-6 text-uppercase fw-bold text-black"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="input1"
                              name="first_name"
                              placeholder="first name"
                              onChange={handleFirstNameChange}
                              style={{
                                borderColor:
                                  user.first_name === "" ? "" : "green",
                              }}
                            />
                            <small style={{ color: "red" }}>
                              {firstNameInvalidMessage}
                            </small>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              htmlFor="input2"
                              className="fs-6 text-uppercase fw-bold text-black"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="input2"
                              name="last_name"
                              placeholder="last name"
                              onChange={handleLastNameChange}
                              style={{
                                borderColor:
                                  user.last_name === "" ? "" : "green",
                              }}
                            />
                            <small style={{ color: "red" }}>
                              {lastNasmeInvalidMessage}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*Form to write email*/}
                    <div className="form-input col-lg-12 my-4">
                      <label
                        htmlFor="exampleInputEmail4"
                        className="form-label fs-6 text-uppercase fw-bold text-black"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="exampleInputEmail4"
                        name="email"
                        placeholder="Email"
                        className="form-control ps-3"
                        onChange={handleEmailChange}
                        style={{
                          borderColor:
                            emailValid === null
                              ? ""
                              : emailValid
                              ? "green"
                              : "red",
                        }}
                      />
                      <small style={{ color: "red" }}>
                        {emailInvalidMessage}
                      </small>
                    </div>
                    {/*Form to write password*/}
                    <div className="form-input col-lg-12 my-4">
                      <label
                        htmlFor="inputPassword2"
                        className="form-label fs-6 text-uppercase fw-bold text-black"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="inputPassword2"
                        name="password"
                        placeholder="Password"
                        className="form-control ps-3"
                        aria-describedby="passwordHelpBlock"
                        autoComplete="off"
                        onChange={handlePasswordChange}
                        style={{
                          borderColor:
                            passwordStrength === null
                              ? ""
                              : passwordStrength
                              ? "green"
                              : "red",
                        }}
                      />
                      <small style={{ color: "red" }}>
                        {passwordInvalidMessage}
                      </small>
                    </div>
                    {/*Form to write confirm password*/}
                    <div className="form-input col-lg-12 my-4">
                      <label
                        htmlFor="inputPassword3"
                        className="form-label fs-6 text-uppercase fw-bold text-black"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="inputPassword3"
                        name="confirmPassword"
                        placeholder="Password"
                        className="form-control ps-3"
                        aria-describedby="passwordHelpBlock"
                        autoComplete="off"
                        onChange={handlePasswordChange}
                        style={{
                          borderColor:
                            passwordStrength === null
                              ? ""
                              : passwordStrength
                              ? "green"
                              : "red",
                        }}
                      />
                      <small style={{ color: "red" }}>
                        {confirmPasswordInvalidMessage}
                      </small>
                    </div>

                    {/*Form to select identity*/}
                    <div className="container text-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          I'm a passenger
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          I'm a driver
                        </label>
                      </div>
                    </div>

                    {/*Policy and other things, should be down to the bottom*/}
                    <label className="py-3">
                      <input
                        type="checkbox"
                        required=""
                        className="d-inline"
                        checked={policyChecked}
                        onChange={() => {
                          setPolicyChecked(!policyChecked);
                          setPolicyUncheckedMassage("");
                        }}
                      />
                      <span className="label-body text-black">
                        I agree to the
                        <a
                          href="#"
                          className="text-black password border-bottom"
                          data-bs-toggle="modal"
                          data-bs-target="#privacyPolicy"
                        >
                          Privacy Policy
                        </a>
                      </span>
                      <small style={{ color: "red" }}>
                        {policyUncheckedMassage}
                      </small>
                    </label>

                    <div className="d-grid my-3">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
                        onClick={signUp}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="privacyPolicy"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="privacyPolicyTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="privacyPolicyTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              WECHAT PRIVACY POLICY Last Updated: 2024-04-12 SUMMARY Thank you
              for using WeChat! We respect your concerns about privacy and
              appreciate your trust and confidence in us. Here is a summary of
              the information contained in this privacy policy ("Privacy
              Policy"). This summary is to help you navigate the Privacy Policy
              and it is not a substitute for reading everything! You can use the
              hyperlinks below to jump directly to particular sections in the
              Privacy Policy. DOES THIS PRIVACY POLICY APPLY TO YOU? This
              Privacy Policy only applies to you if you are a WeChat user,
              meaning that you have registered by linking a mobile number that
              uses an international dialing code other than +86 ("non-Chinese
              Mainland mobile number"). This Privacy Policy does not apply to
              you if you are a Weixin user. You are a Weixin user if you have
              either: registered by linking a mobile number that uses
              international dialing code +86 ("Chinese Mainland mobile number");
              or contracted with 深圳市腾讯计算机系统有限公司(Shenzhen Tencent
              Computer Systems Company Limited) for Weixin. If you are a Weixin
              user, you are subject to the Weixin Agreement on Software License
              and Service of Tencent Weixin and Weixin Privacy Protection
              Guidelines and not this Privacy Policy. You can check whether you
              are a WeChat or Weixin user by clicking "Me" "Settings" "About"
              and then clicking the link to the "Terms of Service". If you see
              the WeChat – Terms of Service then you are a WeChat user. If you
              see the Agreement on Software License and Service of Tencent
              Weixin then you are a Weixin user. Alternatively, if you are using
              the latest version of WeChat, you can also check whether you are a
              WeChat or Weixin user by verifying the service name listed in the
              header at the top of the "Chats" screen. If you see "WeChat" in
              the header then you are a WeChat user, whereas a Weixin user will
              see "Weixin" (or "微信" for users viewing in a Chinese language
              interface). If you subsequently change your phone number (either
              from a Chinese Mainland mobile number to a non-Chinese Mainland
              mobile number, or vice versa) you will be required to convert your
              account (to either a WeChat or Weixin account, depending on your
              new phone number). If you convert your Weixin account to a WeChat
              account, this Privacy Policy applies to you from the date our
              system records such conversion. If you convert your WeChat account
              to a Weixin account, this Privacy Policy ceases to apply to you
              from the date our system records such conversion. WHAT INFORMATION
              DO YOU NEED TO PROVIDE WECHAT? When you register for a WeChat
              account, we will need your mobile number and an alias. You can
              further refine and populate your profile with additional
              information. If you use certain functions available within WeChat
              (such as posting photos to your Moments), we will process your
              information to provide these functions. More Information HOW DO WE
              USE YOUR INFORMATION? We use your information to provide WeChat to
              you, allow you to communicate with other users, allow you to use
              the features available on WeChat, and to improve and support your
              WeChat experience. If you are a parent or guardian who has granted
              permission for your child to use WeChat then we retain the contact
              information you have provided to ensure we can validate any
              requests or queries you may have in relation to your child's
              WeChat account. More Information WHO DO WE SHARE YOUR DATA WITH?
              We do not share your information with third parties, except where
              we need to in order to provide the service (e.g., SMS service
              providers) or if we are instructed to by a court, authority or
              compelled by law. We use these third party services solely to
              process or store your information for the purposes described in
              this Privacy Policy . Any third party with whom we share user data
              is required to provide the same or equal protection of user data
              as stated in this Privacy Policy. More Information WHERE DO WE
              PROCESS YOUR DATA? Our servers are located in Singapore and the
              Hong Kong Special Administrative Region ("Hong Kong SAR"). We also
              have support, engineering and other teams that support the
              provision of WeChat to you, located around the world (including
              Singapore and the Netherlands), who will have access to your
              information. Rigorous internal control measures are in place to
              strictly limit access to your data by designated personnel. More
              Information HOW LONG DO WE KEEP HOLD OF YOUR DATA? How long we
              retain information for depends on the type of information – for
              example, log-in data is retained for up to 90 days from the date
              the data is collected. We do not retain your information for
              longer than the time period prescribed by law. More Information
              HOW CAN YOU EXERCISE YOUR RIGHTS OVER YOUR DATA? Depending on
              where you live, you may have special rights over your data and how
              we can use it. These include how you can access the data, erase
              the data, restrict how your data can be used, object to our use,
              and get a copy of your information. More Information
              JURISDICTION-SPECIFIC ADDENDA If you are a user located (as
              determined by your currently registered mobile number) in
              Australia, Brazil, California, Canada, Chinese Taiwan, Hong Kong
              SAR, Indonesia, Japan, Macau SAR, Malaysia, Mexico, Philippines,
              Russia, Serbia, Singapore, South Korea, Sri Lanka, Thailand,
              Türkiye, United Arab Emirates, United Kingdom or Vietnam, there
              are additional jurisdictional-specific terms that apply to you.
              You can see these by visiting this page. HOW WILL WE NOTIFY YOU OF
              CHANGES? If there are any significant changes to this Privacy
              Policy, we will update it here and notify you before the change
              becomes effective. More Information DATA CONTROLLER If you are a
              WeChat user located in the European Economic Area ("the EEA"), the
              United Kingdom of Great Britain and Northern Ireland ("the UK") or
              Switzerland: Tencent International Service Europe B.V., a Dutch
              company, located at Buitenveldertselaan 1-5, 1082 VA, Amsterdam,
              the Netherlands; and If you are a WeChat user located outside of
              the EEA, the UK, Switzerland or the Chinese Mainland: WeChat
              International Pte. Ltd., a Singaporean company located at 10 Anson
              Road, #21-07 International Plaza, Singapore 079903. CONTACT US If
              you have any questions or complaints regarding this Privacy Policy
              or the use of your Personal Information, please contact our Data
              Protection Officer via email at dataprotection@wechat.com or via
              postal mail at Buitenveldertselaan 1-5, 1082 VA, Amsterdam, the
              Netherlands (Attention: Data Protection Officer, Legal
              Department). Please note that if you are a resident in the EEA,
              the UK or Switzerland you have the right to lodge a complaint with
              your country's data protection authority. If you have an
              unresolved privacy or data use concern that we have not addressed
              satisfactorily, please contact our third party dispute resolution
              provider (free of charge) at
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
