import { Box, Slider, TextField, Typography } from "@mui/material";
import WrapperForm from "components/WrapperForm";
import { IDataPages } from "interfaces";
import React, { FC, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// форма займа
const LoanCalculator: FC<IDataPages> = ({ personalData, setPersonalData }) => {
  // Состояние диалогового окна
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>("");

  // переход между формама
  const navigate = useNavigate();
  const prevStep = () => {
    navigate("/addresses");
  };
  //сумма займа вывод значения
  function valueAmount(value: number) {
    return `$${value}`;
  }
  // изменение суммы займа
  const amountChange = (event: Event, newValue: number | number[]) => {
    setPersonalData((prev: any) => ({
      ...prev,
      loanAmount: newValue as number,
    }));
  };

  //срок займа вывод значения
  function valueTerm(value: number) {
    return `${value}`;
  }
  // изменение срока займа
  const termChange = (event: Event, newValue: number | number[]) => {
    setPersonalData((prev: any) => ({
      ...prev,
      loanTerm: newValue as number,
    }));
  };

  // отправка формы
  const sendData = () => {
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `${personalData.name} ${personalData.lastName}`,
      }),
    })
      .then(async (res) => {
        const result = await res.json();
        if (result?.id) {
          setDialogOpen(true);
          setDialogText(
            `Поздравляем, ${personalData.lastName} ${personalData.name}. Вам одобрено $${personalData.loanAmount} на ${personalData.loanTerm} дней`
          );
        }
      })
      .catch(console.error);
  };
  // проверка заполнения пред. формы
  if (!personalData.work || !personalData.address)
    return <Navigate to="/addresses" />;
  return (
    <WrapperForm
      title="Калькулятор займа"
      stepIndex={2}
      prevStep={prevStep}
      finishStep={sendData}
      dialogOpen={dialogOpen}
      dialogSetOpen={setDialogOpen}
      dialogText={dialogText}
    >
      {/* сумма займа */}
      <Box sx={{ width: "100%", maxWidth: "450px" }}>
        <Typography variant="subtitle1" align="center">
          Суммы займа:{" "}
          <Typography variant="h6" component="span">
            ${personalData.loanAmount}
          </Typography>
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Slider
            aria-label="Сумма займа"
            value={personalData.loanAmount}
            getAriaValueText={valueAmount}
            valueLabelDisplay="auto"
            step={100}
            marks
            min={200}
            max={1000}
            onChange={amountChange}
          />
          <TextField
            value={personalData.loanAmount}
            size="small"
            required
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: -1,
              width: "100%",
              height: "100%",
              opacity: 0,
            }}
          />
        </Box>
      </Box>
      {/* срок займа */}
      <Box sx={{ width: "100%", maxWidth: "450px" }}>
        <Typography variant="subtitle1" align="center">
          Срок займа:{" "}
          <Typography variant="h6" component="span">
            {personalData.loanTerm}
            <Typography variant="caption" component="span">
              (дней)
            </Typography>
          </Typography>
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Slider
            aria-label="Срок займа"
            value={personalData.loanTerm}
            getAriaValueText={valueTerm}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={30}
            onChange={termChange}
          />
          <TextField
            value={personalData.loanTerm}
            size="small"
            required
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: -1,
              width: "100%",
              height: "100%",
              opacity: 0,
            }}
          />
        </Box>
      </Box>
    </WrapperForm>
  );
};

export default LoanCalculator;
