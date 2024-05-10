import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "../ui/button";

import Modal from "../Modal";
import useMultistepForm from "@/hooks/useMultistepForm";
import RegisterModalS1 from "./RegisterModalS1";
import RegisterModalS2 from "./RegisterModalS2";
import RegisterModalS3 from "./RegisterModalS3";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string(),
    username: z.string().min(2).max(50),
    firstName: z.string(),
    lastName: z.string(),
    resetPasswordQuestion: z.string(),
    resetPasswordAnswer: z.string(),
  })
  .required()
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

type SetToggleMenuType = (
  value: boolean | ((prev: boolean) => boolean)
) => void;

interface Props {
  setShowRegisterModal: SetToggleMenuType;
}

export default function RegisterModal({ setShowRegisterModal }: Props) {
  // Define your form.
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      firstName: "",
      lastName: "",
      resetPasswordQuestion: "",
      resetPasswordAnswer: "",
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/users/register",
        values
      );
      console.log(response.data); // Log the response for debugging purposes
      // Optionally, you can provide feedback to the user upon successful registration
      alert("Registration successful!");
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Registration failed:", error);
      // Optionally, you can provide feedback to the user about the error
      alert("Registration failed. Please try again later.");
    }
  };

  // Multistep form handling (assuming this is already implemented correctly)
  const { currentStepIndex, steps, isFirstStep, isLastStep, back, next, step } =
    useMultistepForm([
      <RegisterModalS1 key={0} form={handleSubmit(onSubmit)} />, // Pass handleSubmit(onSubmit) as form
      <RegisterModalS2 key={1} form={handleSubmit(onSubmit)} />, // Pass handleSubmit(onSubmit) as form
      <RegisterModalS3 key={2} form={handleSubmit(onSubmit)} />, // Pass handleSubmit(onSubmit) as form
    ]);

  return (
    <Modal setShowModal={setShowRegisterModal}>
      <div className="p-6">
        <h2>
          {currentStepIndex + 1} / {steps.length}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {step}
          <div className="flex justify-between">
            {!isFirstStep ? (
              <Button type="button" onClick={back}>
                Back
              </Button>
            ) : (
              <Button type="button" onClick={back} disabled>
                Back
              </Button>
            )}
            {isLastStep ? (
              <Button className="bg-red-500 hover:bg-red-600" type="submit">
                Submit
              </Button>
            ) : (
              <Button type="button" onClick={next}>
                Next
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
