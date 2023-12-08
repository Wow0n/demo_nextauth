'use client';

import {signIn, signOut, useSession} from "next-auth/react";

export default function Buttons() {
    const {data: session, status} = useSession();

    if (status !== "loading") {
        if (session) {
            return <button onClick={() => signOut()}>Sign out</button>
        } else {
            return <button onClick={() => signIn()}>Sign in</button>
        }
    }

    if (status === "loading") {
        return <div>Loading...</div>
    }
}
