import React, { useState } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import PersonalDataPage from "pages/PersonalDataPage";
import AddressesDataPage from "pages/AddressesDataPage";
import { IPersonData } from "interfaces";
import LoanCalculator from "pages/LoanCalculator";

const clearPerson: IPersonData = {
  address: "",
  home: "",
  lastName: "",
  loanAmount: 200,
  loanTerm: 1,
  name: "",
  gender: "Мужской",
  phone: "",
  work: "",
};

function App() {
  const color = blueGrey[200];
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [personalData, setPersonalData] = useState<IPersonData>(clearPerson);

  return (
    <Stack
      justifyContent="center"
      className={`h-screen p-${matches ? "16" : "8"}`}
      sx={{ bgcolor: color }}
    >
      <Routes>
        <Route path="*" element={<Navigate to="/person" replace={true} />} />
        <Route index path="/" element={<HomePage />} />
        <Route
          index
          path="/person"
          element={
            <PersonalDataPage
              personalData={personalData}
              setPersonalData={setPersonalData}
            />
          }
        />
        <Route
          index
          path="/addresses"
          element={
            <AddressesDataPage
              personalData={personalData}
              setPersonalData={setPersonalData}
            />
          }
        />
        <Route
          index
          path="/calculator"
          element={
            <LoanCalculator
              personalData={personalData}
              setPersonalData={setPersonalData}
            />
          }
        />
      </Routes>
    </Stack>
  );
}

export default App;
