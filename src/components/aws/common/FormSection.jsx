import { Box } from "@mui/joy";
import { InputField } from "../../form";

const FormSection = ({ fields, form, errors, onFieldChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {fields.map((field) => (
        <Box
          key={field.name}
          sx={{ flex: field.flex || 1, minWidth: field.minWidth || "250px" }}
        >
          <InputField
            label={field.label}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={(e) => onFieldChange(field.name, e.target.value)}
            error={errors[field.name]}
            type={field.type || "text"}
          />
        </Box>
      ))}
    </Box>
  );
};

export default FormSection;
