import axios from "axios";

const baseUrl = 'http://localhost:5554/users';

export interface Users {
    userSeq: number;
    userId: string;
    userPw: string;
    email: string;
    phone: string;
    name: string;
    isLogin: boolean;
    status: string;
    authority: string;
}

export async function joinUser<T extends Users>(dto: Partial<T>) {
    const url = `${baseUrl}/join`

    try {
        await axios.post(url, dto);
    } catch(e: any) {
        console.log(e);
    }
}