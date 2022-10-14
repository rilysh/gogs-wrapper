import { request } from "undici";
import { createOrgTeamURL, createOrgURL } from "./Constants";
import type { createdOrgResp, createdOrgTeamResp } from "./types/types";

export default class Organization {
    public api: string;

    constructor(options: {
        api: string;
    }) {
        this.api = options.api;
    }

    public async createOrgs(
        username: string,
        full_name: string,
        description: string,
        website: string,
        location: string,
    ): Promise<createdOrgResp | string | undefined> {
        const data = await request(`${this.api}${createOrgURL(username)}`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                full_name,
                description,
                website,
                location,
            }),
        });

        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as createdOrgResp;
        return json;
    }

    public async createOrgsTeams(
        name: string,
        description: string,
        permission: string,
    ): Promise<createdOrgTeamResp | string | undefined> {
        const data = await request(`${this.api}${createOrgTeamURL(name)}`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                permission,
            }),
        });

        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as createdOrgTeamResp;
        return json;
    }
}
