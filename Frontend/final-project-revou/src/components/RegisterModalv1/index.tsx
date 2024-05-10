import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Modal from "../Modal";
import axios from "axios";

type SetToggleMenuType = (
  value: boolean | ((prev: boolean) => boolean)
) => void;

interface Props {
  setShowLoginModal: SetToggleMenuType;
  setShowRegisterModal: SetToggleMenuType;
}
const RegisterModalv1 = ({ setShowRegisterModal }: Props) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    reset_password_question: "",
    reset_password_answer: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", registerData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/users/register",
        registerData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    setStep((nextsStep) => nextsStep + 1);
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const closeModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <div>
      <Modal setShowModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <div className="p-5" style={{ width: "400px" }}>
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <div className="p-2">
              {step === 1 && (
                <div>
                  <div className="mb-4">
                    <Label>Username</Label>
                    <Input
                      type="text"
                      name="username"
                      value={registerData.username}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="mb-4">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      name="first_name"
                      value={registerData.first_name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={registerData.last_name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className="mb-4">
                    <Label>Reset Password Question</Label>
                    <Input
                      type="text"
                      name="resetPasswordQuestion"
                      value={registerData.reset_password_question}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          reset_password_question: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Reset Password Answer</Label>
                    <Input
                      type="text"
                      name="resetPasswordAnswer"
                      value={registerData.reset_password_answer}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          reset_password_answer: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end items-end gap-2">
              <Button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                onClick={handleBack}
              >
                {step > 1 && "Previous"}
              </Button>
              <Button
                type={step === totalSteps ? "submit" : "button"}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                onClick={step === totalSteps ? undefined : handleNext}
              >
                {step === totalSteps ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RegisterModalv1;
