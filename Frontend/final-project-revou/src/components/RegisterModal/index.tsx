import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axios from "axios";

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
  // 1. Define your form.
  const registerForm = async (values: z.infer<typeof formSchema>) => {
    try {
      // console.log("first");
      const response = await axios.post(
        "http://127.0.0.1:5000/users/register",
        values
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
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

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log("Form submitted!");
    // console.log(values);

    try {
      await registerForm(values);
    } catch (error) {
      console.log(error);
    }

    form.reset();
  }

  const { currentStepIndex, steps, isFirstStep, isLastStep, back, next, step } =
    useMultistepForm([
      <RegisterModalS1 key={0} form={form} />,
      <RegisterModalS2 key={1} form={form} />,
      <RegisterModalS3 key={2} form={form} />,
    ]);

  return (
    <Modal setShowModal={setShowRegisterModal}>
      <div className="p-6">
        <h2>
          {currentStepIndex + 1} / {steps.length}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              ) : (
                <Button type="button" onClick={next}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
