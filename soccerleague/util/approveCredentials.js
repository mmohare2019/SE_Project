import CredentialsProvider from "next-auth/providers/credentials";

provider: [
    CredentialsProvider({
        name: "User Credentials",
        credentials: {
            email: {label: "Email", type: "text"},
            password: {label: "Password", type: "password"}
        },
        aysnc authorize(credentials, req) {
            const user= {email: "example@gmail.com", password: "mypassword1234"}

            if (user) {
                return user
            },
            credentials: {
                email: {label: "Email", type: "text"}, "2fa-key": {label: "2FA Key"},
            },
    }),
]
