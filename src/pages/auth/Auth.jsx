import { HelpdeskLogoPrimary } from "../../assets/icons/Logo";
import { PatternImg } from "../../assets/images/Images";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth() {
  const [activeForm, setActiveForm] = useState("login");


  const switchPage = (formName) => {
    setActiveForm(formName);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-5 w-full bg-muted">
      <div className="flex w-[70rem] max-h-[90vh] bg-white overflow-hidden">
        {/* LEFT SIDE: Content */}
        <div className="flex flex-col w-1/2 py-8 px-10 overflow-y-auto">
          {/* Tab Selection */}
          <div className="border-b border-gray-300 text-sm flex justify-between mb-6">
            <div className="flex gap-5">
              <button
                onClick={() => switchPage("login")}
                className={`font-semibold transition-colors ${
                  activeForm === "login"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => switchPage("signup")}
                className={`font-semibold transition-colors ${
                  activeForm === "signup"
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Signup
              </button>
            </div>

            <HelpdeskLogoPrimary />
          </div>

          {/* --FORM-- */}
          <div
            className="flex flex-col gap-6"
          >
            {activeForm === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>

        {/* RIGHT SIDE: Pattern */}
        <div className="w-1/2 bg-primary/5 flex items-center justify-center">
          <PatternImg />
        </div>
      </div>
    </div>
  );
}
