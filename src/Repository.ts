import { request } from "undici";
import { createRepoURL } from "./Constants";
import type { createdNewRepoResp } from "./types/types";

export default class Repository {
    public api: string;

    constructor(options: {
        api: string;
    }) {
        this.api = options.api;
    }

    public async createNewRepo(
        name: string,
        description?: string,
        repo_private?: boolean,
        auto_init?: boolean,
        gitignores?: string,
        license?: string,
        readme?: string,
    ): Promise<createdNewRepoResp | string | undefined> {
        const data = await request(`${this.api}${createRepoURL(name)}`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                private: repo_private ?? false,
                auto_init,
                gitignores,
                license,
                readme,
            }),
        });

        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as createdNewRepoResp;
        return json;
    }
}
