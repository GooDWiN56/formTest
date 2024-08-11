import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
} from "@mui/material";
import WrapperForm from "components/WrapperForm";
import { IDataPages } from "interfaces";
import React, { FC, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// форма адреса и работы
const AddressesDataPage: FC<IDataPages> = ({
  personalData,
  setPersonalData,
}) => {
  // навигация по формам
  const navigate = useNavigate();
  const prevStep = () => {
    navigate("/person");
  };
  const nextStep = () => {
    navigate("/calculator");
  };
  // получение options места работы
  const [workOption, setWorkOption] = useState<string[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then(async (res) => setWorkOption(await res.json()))
      .catch(console.error);
    // setWorkOption(result);
  }, []);

  // проверка пред. формы
  if (
    !personalData.name ||
    !personalData.lastName ||
    !personalData.phone ||
    !personalData.gender
  )
    return <Navigate to="/person" />;

  return (
    <WrapperForm
      title="Адреса"
      stepIndex={1}
      nextStep={nextStep}
      prevStep={prevStep}
    >
      {workOption.length > 0 ? (
        <FormControl fullWidth size="small" sx={{ maxWidth: "320px" }}>
          <InputLabel id="work-label">Место работы *</InputLabel>
          <Select
            labelId="work-label"
            id="work"
            value={personalData.work}
            label="Место работы *"
            onChange={(event: SelectChangeEvent) => {
              setPersonalData((prev: any) => ({
                ...prev,
                work: event.target.value,
              }));
            }}
            required
            autoFocus
          >
            {workOption.map((i: string, k: number) => (
              <MenuItem value={i} key={k}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Skeleton
          variant="rounded"
          sx={{ width: "100%", maxWidth: "320px" }}
          height={56}
        />
      )}

      <TextField
        fullWidth
        sx={{ maxWidth: "320px" }}
        id="input-address"
        label="Адрес проживания"
        variant="outlined"
        size="small"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPersonalData((prev: any) => ({
            ...prev,
            address: event.target.value,
          }));
        }}
        required
        value={personalData.address}
      />
    </WrapperForm>
  );
};

export default AddressesDataPage;
