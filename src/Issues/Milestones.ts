import { request } from "undici";
import {
    createAMilestoneURL,
    deleteMilestoneURL,
    editAMilestoneURL,
    getASingleMilestoneURL,
    listMilestonesRepoURL,
} from "../Constants";
import type { createdAMilestoneResp, getASingleMilestoneResp } from "../types/types";

export default class Milestones {
    public api: string;

    constructor(options: {
        api: string
    }) {
        this.api = options.api;
    }

    public async listMilestonesRepo(
        owner: string,
        repo: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${listMilestonesRepoURL(owner, repo)}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json();
        return json;
    }

    public async getASingleMilestone(
        owner: string,
        repo: string,
        id: string,
    ): Promise<getASingleMilestoneResp | string | undefined> {
        const data = await request(`${this.api}${getASingleMilestoneURL(owner, repo, id)}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as getASingleMilestoneResp;
        return json;
    }

    public async createAMilestone(
        owner: string,
        repo: string,
        title: string,
        description: string,
        due_on: Date,
    ): Promise<createdAMilestoneResp | string | undefined> {
        const data = await request(`${this.api}${createAMilestoneURL(owner, repo)}`, {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                due_on,
            }),
        });
        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as createdAMilestoneResp;
        return json;
    }

    public async editAMilestone(
        owner: string,
        repo: string,
        id: string,
        title: string,
        description: string,
        due_on: Date,
        state: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${editAMilestoneURL(owner, repo, id)}`, {
            method: "PATCH",
            body: JSON.stringify({
                title,
                description,
                due_on,
                state,
            }),
        });
        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async deleteAMilestone(
        owner: string,
        repo: string,
        id: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${deleteMilestoneURL(owner, repo, id)}`, {
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
