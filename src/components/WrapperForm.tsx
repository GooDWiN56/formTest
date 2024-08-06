import {
  Button,
  Card,
  CardContent,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconSend,
} from "@tabler/icons-react";
import React, { FC } from "react";
import DialogSuccess from "./DialogSuccess";

interface IWrapperForm {
  children: React.ReactNode;
  finishStep?: () => void;
  nextStep?: () => void;
  prevStep?: () => void;
  stepIndex: 0 | 1 | 2;
  title?: string;
  dialogOpen?: boolean;
  dialogSetOpen?: (prop?: any) => void;
  dialogText?: string;
}

const WrapperForm: FC<IWrapperForm> = ({
  children,
  finishStep,
  nextStep,
  prevStep,
  stepIndex,
  title = "Heading",
  dialogOpen = false,
  dialogSetOpen = () => console.log,
  dialogText = "",
}) => {
  const steps = ["Личные данные", "Адреса", "Калькулятор займа"];

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    nextStep && nextStep();
    finishStep && finishStep();
  };
  const styleIcon = {
    size: 20,
    stroke: 2,
  };
  return (
    <>
      <Card className="h-[100%]">
        <CardContent className="h-[100%]">
          <form
            onSubmit={handlerSubmit}
            className="h-[100%] flex flex-col items-center space-y-4 pt-4"
          >
            <Stepper
              activeStep={stepIndex}
              alternativeLabel
              className="w-[100%]"
            >
              {steps.map((label) => (
                <Step key={label}>
                  <Tooltip arrow title={label}>
                    <StepLabel />
                  </Tooltip>
                </Step>
              ))}
            </Stepper>

            <Stack
              className="flex-grow w-[100%] items-center justify-center"
              spacing={2}
            >
              <Typography variant="h4" align="center">
                {title}
              </Typography>
              {children}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-around"
              sx={{ mt: "auto", width: "100%" }}
            >
              {prevStep && (
                <Button
                  onClick={prevStep}
                  startIcon={<IconArrowNarrowLeft {...styleIcon} />}
                >
                  Назад
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                endIcon={
                  nextStep ? (
                    <IconArrowNarrowRight {...styleIcon} />
                  ) : (
                    <IconSend {...styleIcon} />
                  )
                }
              >
                {nextStep ? "Далее" : "Отправить"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <DialogSuccess
        open={dialogOpen}
        setOpen={dialogSetOpen}
        text={dialogText}
      />
    </>
  );
};

export default WrapperForm;
