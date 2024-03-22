import NextAuth, { type NextAuthOptions } from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    // EmailProvider({

    // }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req): Promise<any> {
        const user = await prisma.users.findFirst({
          /* add function to get user */
          where: {
            email: credentials?.email,
            password_hash: credentials?.password,
          },
        });
        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.username,
          };
          return userData;
        } else {
          return null;
        }
      },
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'name@example.com' },
        password_hash: { label: 'Password', type: 'password' },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (user) {
        session.user = { ...session.user, ...user };
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
