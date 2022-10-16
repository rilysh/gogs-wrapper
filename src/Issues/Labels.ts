import { request } from "undici";
import {
    addLabelsToIssueURL,
    editLabelURL,
    listAllLabelsURL,
    listLabelsOnIssueURL,
    listSingleLabelURL,
    removeAllLabelsFromIssueURL,
    removeLabelFromIssueURL,
} from "../Constants";
import type { listSingleLabelResp } from "../types/types";

export default class Labels {
    public api: string;

    constructor(options: {
        api: string
    }) {
        this.api = options.api;
    }

    public async listAllLabels(
        username: string,
        reponame: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${listAllLabelsURL(username, reponame)}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json();
        return json;
    }

    public async listSingleLabel(
        username: string,
        reponame: string,
        id: number,
    ): Promise<listSingleLabelResp | string | undefined> {
        const data = await request(`${this.api}${listSingleLabelURL(username, reponame, id)}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as listSingleLabelResp;
        return json;
    }

    public async createLabel(
        username: string,
        reponame: string,
        name: string,
        color: string,
    ): Promise<listSingleLabelResp | string | undefined> {
        const data = await request(`${this.api}${listAllLabelsURL(username, reponame)}`, {
            method: "POST",
            headers: {
                accpet: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                color,
            }),
        });

        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as listSingleLabelResp;
        return json;
    }

    public async editLabel(
        username: string,
        reponame: string,
        id: number,
        name: string,
        color: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${editLabelURL(username, reponame, id)}`, {
            method: "PATCH",
            headers: {
                accpet: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name,
                color,
            }),
        });
        
        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async deleteLabel(
        username: string,
        reponame: string,
        id: number,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${editLabelURL(username, reponame, id)}`, {
            method: "DELETE",
        });
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async listLabelOnIssue(
        username: string,
        reponame: string,
        index: number,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${listLabelsOnIssueURL(username, reponame, index)}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json();
        return json;
    }

    public async addLabelsToIssue(
        username: string,
        reponame: string,
        index: number,
        labels: Array<number>,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${addLabelsToIssueURL(username, reponame, index)}`, {
            method: "POST",
            headers: {
                accpet: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                labels,
            }),
        });
        
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json();
        return json;
    }

    public async removeLabelFromIssue(
        username: string,
        reponame: string,
        index: number,
        id: number,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${removeLabelFromIssueURL(username, reponame, index, id)}`, {
            method: "DELETE",
        });
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.text();
        return text;
    }

    public async replaceLablesOnIssue(
        username: string,
        reponame: string,
        index: number,
        labels: Array<number>,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${addLabelsToIssueURL(username, reponame, index)}`, {
            method: "POST",
            headers: {
                accpet: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                labels,
            }),
        });
        
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json();
        return json;
    }

    public async removeAllLabelsFromIssue(
        username: string,
        reponame: string,
        index: number,
    ) {
        const data = await request(`${this.api}${removeAllLabelsFromIssueURL(username, reponame, index)}`, {
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
