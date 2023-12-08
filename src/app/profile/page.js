"use client";
import {useSession} from "next-auth/react";

export default function Profile() {
    const {data: session} = useSession();

    return (
        <>
            <h1>Profile</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </>
    )
}