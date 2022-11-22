import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePicker(props: any) {
  const { label, value, error = null, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        inputFormat='dd/MM/yyyy'
        value={value}
        onChange={onChange}
        renderInput={
          (params) =>
            <TextField
              variant='standard'
              InputLabelProps={{
                style: {
                  color: error != '' && error != null ? '#E74C3C' : ''
                }
              }}
              sx={{
                '& p': { color: '#E74C3C', position: 'absolute', bottom: -22 },
                mt: '8px'
              }}
              {...(error && { error: true, helperText: error, color: 'error' })}
              {...params}
            />
        }
      />
    </LocalizationProvider>
  );
}