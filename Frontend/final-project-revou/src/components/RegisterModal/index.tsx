import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Modal from "../Modal";
import useMultistepForm from "@/hooks/useMultistepForm";
import RegisterModalS1 from "../RegisterModalS1";
import RegisterModalS2 from "../RegisterModalS2";
import RegisterModalS3 from "../RegisterModalS3";

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
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

// type FormFields = {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   resetPasswordQuestion: string;
//   resetPasswordAnswer: string;
// };

type SetToggleMenuType = (
  value: boolean | ((prev: boolean) => boolean)
) => void;

interface Props {
  setShowRegisterModal: SetToggleMenuType;
}

export default function RegisterModal({ setShowRegisterModal }: Props) {
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

  const { currentStepIndex, steps, isFirstStep, isLastStep, back, next, step } =
    useMultistepForm([
      <RegisterModalS1 key={1} form={form} />,
      <RegisterModalS2 key={2} form={form} />,
      <RegisterModalS3 key={3} form={form} />,
    ]);

  // 1. Define your form.

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
                <Button onClick={back}>Back</Button>
              ) : (
                <Button onClick={back} disabled>
                  Back
                </Button>
              )}
              {isLastStep ? (
                <Button className="bg-red-500 hover:bg-red-600" onClick={next}>
                  Submit
                </Button>
              ) : (
                <Button onClick={next} type={"submit"}>
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
