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
  name: "",
  gender: "Мужской",
  phone: "",
  work: "",
};

function App() {
  // оформление
  const color = blueGrey[200];
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  // сотсояние данных форм
  const [personalData, setPersonalData] = useState<IPersonData>(clearPerson);

  return (
    <Stack
      justifyContent="center"
      className={`h-screen ${matches ? "p-16" : "p-4"}`}
      sx={{ bgcolor: color }}
    >
      <Routes>
        {/* переход к первой форме с неизвестных страниц */}
        <Route path="*" element={<Navigate to="/person" replace={true} />} />

        {/* главная  */}
        <Route index path="/" element={<HomePage />} />
        {/* персональные данные */}
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
        {/* адрес и работа */}
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
        {/* калькулятор займа */}
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
