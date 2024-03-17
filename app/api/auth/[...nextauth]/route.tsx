import NextAuth, { type NextAuthOptions } from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    // EmailProvider({

    // }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req): Promise<any> {
        const user = await prisma.test.findFirst({
          /* add function to get user */
          where: {
            email: credentials.email,
            pass: credentials.password,
          },
        });

        console.log(user);
        if (user) {
          console.log('PASSED');
          return { ...user, username: user.username };
        } else {
          console.log('FAILED');
          return null;
        }
      },
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'name@example.com' },
        password: { label: 'Password', type: 'password' },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (user && user.username) {
        session.user = {
          ...session.user,
          name: user.username,
        };
      }
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
