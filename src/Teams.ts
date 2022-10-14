import { request } from "undici";
import {
    addOrUpTeamRepoURL,
    addTeamMembershipURL,
    listTeamMembersURL,
    removeTeamRepoURL,
} from "./Constants";

export default class Teams {
    public api: string;

    constructor(options: {
        api: string;
    }) {
        this.api = options.api;
    }

    public async listTeamMembers(teamId: string): Promise<string | undefined> {
        const data = await request(`${this.api}${listTeamMembersURL(teamId)}`);
        if (data.statusCode !== 200) {
            throw new Error(`Error: Status code ${data.statusCode}, message: ${await data.body.text() === "" ? "none" : await data.body.text()}`);
        }
        const text = await data.body.text();
        return text;
    }

    public async addTeamMembership(
        teamId: string,
        username: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${addTeamMembershipURL(teamId, username)}`, {
            method: "PUT",
        });
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async removeTeamMembership(
        teamId: string,
        username: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${addTeamMembershipURL(teamId, username)}`, {
            method: "DELETE",
        });
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async addOrUpdateTeamRepo(
        teamId: string,
        reponame: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${addOrUpTeamRepoURL(teamId, reponame)}`, {
            method: "PUT",
        });
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async removeTeamRepo(
        teamId: string,
        reponame: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${removeTeamRepoURL(teamId, reponame)}`, {
            method: "DELETE",
        });
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }
}
