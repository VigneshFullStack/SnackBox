export interface User {
	id: string;
	username: string;
	email: string | null;
	password: string;
	confirmpassword: string;
	companycode: string
}


export interface Login {
	username: string | null;
	password: string;
	role: string
}

export interface MailRequest {
	toEmail: string
	, subject: string
	, body: string
	, companyCode: string
	, userName: string
	, email: string
	, password: string
}

