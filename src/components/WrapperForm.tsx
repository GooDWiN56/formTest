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
import { IWrapperForm } from "interfaces";

// оформление формы
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
  // шапка формы
  const steps = ["Личные данные", "Адреса", "Калькулятор займа"];

  // onSubmit формы
  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    nextStep && nextStep();
    finishStep && finishStep();
  };
  // стилизация иконок
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
            {/* Шапка формы с нумерацие этапа формы */}
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
              {/* заголовок */}
              <Typography variant="h4" align="center">
                {title}
              </Typography>
              {/* Форма */}
              {children}
            </Stack>
            {/* кнопки назад/вперед/отправить */}
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
      {/* Диалоговое онко */}
      <DialogSuccess
        open={dialogOpen}
        setOpen={dialogSetOpen}
        text={dialogText}
      />
    </>
  );
};

export default WrapperForm;
