import NextAuth from "next-auth";
import {NextAuthOptions} from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials){
        const user = { id: "7", name: "Quenede", email: "quenede.in@gmail.com", password:'123',role:'admin' }
        if (user.email === credentials?.email && user.password === credentials?.password) {
          return user
        } else {
          return null
        }
      }
  })],
  callbacks: {
    jwt: async ({ token, user }) => {
      const customUser = user as unknown as any;
      if(user){
        return {
          ...token,
          role:customUser.role
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
     
      return {...session,
        user: {
            name:token.name,
            email:token.email,
            role: token.role
        }
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  pages: {
    signIn: '/login'
  }

}

// Exporta o manipulador de rota para cada método HTTP necessário
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };