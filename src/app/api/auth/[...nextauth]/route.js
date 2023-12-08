import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CrednetialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        CrednetialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "jsmith"},
                password: {label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials) {
                const user = {id: 1, username: "aaa", password: "aaa", email: "", image: "", role: "admin"};

                if (user && user.password === credentials.password && user.username === credentials.username) {
                    return user
                }

                return null;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,

            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: "user"
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            return token;
        },
        async session({session, token}) {
            session.user.id = token.id;
            session.user.role = token.role;

            return session;
        }
    }
});

export {handler as GET, handler as POST}