export default {
	port: process.env.PORT || 2222,
	mysql_host: process.env.MYSQL_HOST,
	mysql_port: parseInt(process.env.MYSQL_PORT),
	mysql_username: process.env.MYSQL_USERNAME,
 	mysql_password: process.env.MYSQL_PASSWORD,
	mysql_database: process.env.MYSQL_DATABASE,
	secret_key: process.env.SECRET_KEY,
	expires_in: process.env.EXPIRESIN,
	mail_setting: {
		service: 'gmail',
		auth: {
			user: process.env.MAIL_EMAIL,
			pass: process.env.MAIL_PASSWORD
		}
	},
	qr_code_base_url: process.env.QR_CODE_BASE_URL,
	casso_base_url: process.env.CASSO_BASE_URL,
	casso_api_key: process.env.CASSO_API_KEY,
	bank_acc_number: process.env.BANK_ACC_NUMBER
};
