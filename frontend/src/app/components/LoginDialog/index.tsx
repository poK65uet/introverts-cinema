import React from 'react'
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	Typography
} from '@mui/material';
import { Copyright } from '@mui/icons-material';
import useStyles from './styles';


export default function LoginDialog() {
	const classes = useStyles();

	return (
		<Dialog open={true}>
			{/*<Box
				className={classes.loginBox}
				component="form"
				onKeyDown={(event: React.KeyboardEvent) => {
					if (event.code === "Enter") {
						handleClickSubmit();
					}
				}}
			>
				<Typography
					sx={{
						textAlign: "center",
						mb: 2,
					}}
					variant="h5"
				>
					Chào mừng đến với NTN
				</Typography>
				<div>
					<CustomInput.TextField
						required
						label="Tài khoản"
						name="username"
						value={values.username}
						error={errors.username}
						onChange={handleInputChange}
						autoFocus
						autoComplete="username"
						inputProps={{ maxLength: "64" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start"><Person /></InputAdornment>
							),
						}}
					/>
				</div>
				<div>
					<CustomInput.TextField
						required
						type={showPassword ? "text" : "password"}
						label="Mật khẩu"
						name="password"
						value={values.password}
						error={errors.password}
						onChange={handleInputChange}
						inputProps={{ maxLength: "64" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start"><Lock /></InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<Grid container>
					<Grid item xs>
						<FormControlLabel
							control={<Checkbox />}
							label="Duy trì đăng nhập"
						/>
					</Grid>
					<Grid item marginY="auto">
						<LinkMUI variant="body1">Quên mật khẩu ?</LinkMUI>
					</Grid>
				</Grid>
				<Button
					fullWidth
					variant="contained"
					sx={{ my: 2, p: 1, fontWeight: "bold" }}
					className={styles.loginBtn}
					onClick={handleClickSubmit}
				>Đăng nhập</Button>
				<Typography
					sx={{
						textAlign: "center",
					}}
					variant="body1"
				>
					Bạn chưa có tài khoản ?
				</Typography>
				<Button
					fullWidth
					variant="outlined"
					sx={{ my: 2, p: 1, fontWeight: "bold", borderWidth: "2px" }}
					className={styles.loginBtn}
					component={Link} to="/registration"
				>
					Tạo tài khoản mới
				</Button>
				<Copyright sx={{ mt: 4, mb: 1 }} />
			</Box>*/}
		</Dialog>
	)
}
