import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Router from "next/router";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        //database look up
        if (
          credentials.username === "drakinyemi" &&
          credentials.password === "ece504"
        ) {
          return {
            id: 2,
            name: "drakinyemi",
          };
        }
        //login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
