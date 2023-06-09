import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import db from "../../../lib/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        try {
          const user = await fetch("/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: Object.entries(credentials)
              .map((e) => e.join("="))
              .join("&"),
          })
            .then((res) => res.json())
            .catch((err) => null);
          if (user) {
            return {
              id: user.id,
              name: user.name,
              lastname: user.lastname,
              email: user.email,
              phone: user.phone,
            }; // Credenciais válidas e usuário autorizado
          } else {
            return null;
          }
        } catch (error) {
          console.error("Erro ao logar com as credentials", error);
          return null; // Ocorreu um erro ao verificar as credenciais
        }
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  secret: process.env.SECRET,

  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },

  session: { strategy: "jwt" },

  adapter: PrismaAdapter(db),

  pages: {
    signIn: "/Login",
    signOut: "/",
    error: "/Login",
  },
});
