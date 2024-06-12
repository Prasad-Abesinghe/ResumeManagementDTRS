import { useState } from "react";
import "./companies.scss";
import { ICreateCompanyDto } from "../../types/global.typing";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddCompany = () => {
  const [company, setCompany] = useState<ICreateCompanyDto>({
    name: "",
    size: "",
  });
  const redirect = useNavigate();
  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      alert("Fill All Fields");
      return;
    }
    httpModule
      .post("/Company/Create", company)
      .then((responst) => redirect("/companies"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/companies");
  };

  return (
    <div className="content">
      <div className="add-company">
        <h2>Add New Company</h2>
        <TextField
          autoComplete="off"
          label="Company Name"
          variant="outlined"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Company Size</InputLabel>
          <Select
            value={company.size}
            label="Company Size"
            onChange={(e) => setCompany({ ...company, size: e.target.value })}
          >
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </Select>
        </FormControl>
        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            SAVE
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            BACK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
