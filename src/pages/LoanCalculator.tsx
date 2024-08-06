import { Box, Slider, Typography } from "@mui/material";
import WrapperForm from "components/WrapperForm";
import { IDataPages } from "interfaces";
import React, { FC, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LoanCalculator: FC<IDataPages> = ({ personalData, setPersonalData }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogText, setDialogText] = useState<string>("");

  const navigate = useNavigate();
  const prevStep = () => {
    navigate("/addresses");
  };
  function valueAmount(value: number) {
    return `$${value}`;
  }
  const amountChange = (event: Event, newValue: number | number[]) => {
    setPersonalData((prev: any) => ({
      ...prev,
      loanAmount: newValue as number,
    }));
  };
  function valueTerm(value: number) {
    return `${value}`;
  }
  const termChange = (event: Event, newValue: number | number[]) => {
    setPersonalData((prev: any) => ({
      ...prev,
      loanTerm: newValue as number,
    }));
  };
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
      <button onClick={() => console.log(personalData)}>but</button>
      <Box sx={{ width: "100%", maxWidth: "450px" }}>
        <Typography variant="subtitle1" align="center">
          Суммы займа:{" "}
          <Typography variant="h6" component="span">
            ${personalData.loanAmount}
          </Typography>
        </Typography>
        <Box>
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
        </Box>
      </Box>
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
        <Box>
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
        </Box>
      </Box>
    </WrapperForm>
  );
};

export default LoanCalculator;
