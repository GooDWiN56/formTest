import React, { FC } from "react";
import WrapperForm from "components/WrapperForm";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { IDataPages } from "interfaces";
import InputMask from "react-input-mask";

// форма персональных данныых
const PersonalDataPage: FC<IDataPages> = ({
  personalData,
  setPersonalData,
}) => {
  const navigate = useNavigate();
  const nextStep = () => {
    navigate("/addresses");
  };
  const genderOption = ["Мужской", "Женский"];
  return (
    <WrapperForm title="Личные данные" stepIndex={0} nextStep={nextStep}>
      <InputMask
        mask="0999 999 999"
        value={personalData.phone}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPersonalData((prev: any) => ({
            ...prev,
            phone: event.target.value,
          }));
        }}
        disabled={false}
        maskChar="_"
        alwaysShowMask
      >
        <TextField
          fullWidth
          sx={{ maxWidth: "320px" }}
          type="tel"
          id="input-phone"
          label="Телефон"
          variant="outlined"
          size="small"
          required
        />
      </InputMask>

      <TextField
        autoFocus
        fullWidth
        sx={{ maxWidth: "320px" }}
        id="input-name"
        label="Имя"
        variant="outlined"
        size="small"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPersonalData((prev: any) => ({
            ...prev,
            name: event.target.value,
          }));
        }}
        required
        value={personalData.name}
      />
      <TextField
        autoFocus
        fullWidth
        sx={{ maxWidth: "320px" }}
        id="input-lastName"
        label="Фамилия"
        variant="outlined"
        size="small"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPersonalData((prev: any) => ({
            ...prev,
            lastName: event.target.value,
          }));
        }}
        required
        value={personalData.lastName}
      />
      <FormControl fullWidth sx={{ maxWidth: "320px" }}>
        <InputLabel id="gender-label">Пол</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={personalData.gender}
          label="Пол"
          onChange={(event: SelectChangeEvent) => {
            setPersonalData((prev: any) => ({
              ...prev,
              gender: event.target.value,
            }));
          }}
          size="small"
        >
          {genderOption.map((i: string, k: number) => (
            <MenuItem value={i} key={k}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </WrapperForm>
  );
};

export default PersonalDataPage;
