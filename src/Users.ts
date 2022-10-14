import { request } from "undici";
import {
    createdNewUserURL,
    createdPublicUserKeyURL,
    deleteUserURL,
    editUserURL,
} from "./Constants";
import type { createdNewUserResp } from "./types/types";

export default class Users {
    public api: string;

    constructor(options: {
        api: string;
    }) {
        this.api = options.api;
    }

    public async createNewUser(
        source_id: number,
        login_name: string,
        username: string,
        email: string,
        password: string,
        send_notify: boolean = false,
    ): Promise<createdNewUserResp | string | undefined> {
        const data = await request(`${this.api}${createdNewUserURL()}`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                source_id: source_id ?? 1,
                login_name,
                username,
                email,
                password,
                send_notify,
            }),
        });
        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as createdNewUserResp;
        return json;
    }

    public async editUser(
        username: string,
        source_id: number,
        login_name: string,
        full_name: string | undefined,
        email: string,
        password?: string,
        website?: string,
        location?: string,
        active?: boolean,
        admin?: boolean,
        allow_git_hook?: boolean,
        allow_import_local?: boolean,
    ): Promise<createdNewUserResp | string | undefined> {
        const data = await request(`${this.api}${editUserURL(username)}`, {
            method: "PATCH",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                source_id: source_id ?? 1,
                login_name,
                full_name,
                email,
                password,
                website,
                location,
                active,
                admin,
                allow_git_hook,
                allow_import_local,
            }),
        });

        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as createdNewUserResp;
        return json;
    }

    public async deleteUser(username: string): Promise<string | undefined> {
        const data = await request(`${this.api}${deleteUserURL(username)}`);
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async createPublicUserKey(
        username: string,
        title: string,
        key: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${createdPublicUserKeyURL(username)}`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title,
                key,
            }),
        });

        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }
}
