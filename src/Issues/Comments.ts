import { request } from "undici";
import {
    createCommentURL,
    editCommentURL,
    listCommentsOnIssueIndexURL,
    listCommentsOnIssueURL,
} from "../Constants";
import type { createdCommentResp } from "../types/types";

export default class Comments {
    public api: string;

    constructor(options: {
        api: string
    }) {
        this.api = options.api;
    }

    public async listCommentsOnIssueIndex(
        username: string,
        reponame: string,
        index: number,
        since?: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${listCommentsOnIssueIndexURL(username, reponame, index)}${since ? `?since=${since}` : ""}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json();
        return json;
    }

    public async listCommentsOnIssue(
        username: string,
        reponame: string,
        since?: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${listCommentsOnIssueURL(username, reponame)}${since ? `?since=${since}` : ""}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json();
        return json;
    }

    public async createComment(
        username: string,
        reponame: string,
        index: number,
        message: string,
    ): Promise<createdCommentResp | string | undefined> {
        const data = await request(`${this.api}${createCommentURL(username, reponame, index)}`, {
            method: "POST",
            headers: {
                accpet: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "body": message,
            }),
        });
        
        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as createdCommentResp;
        return json;
    }

    public async editComment(
        username: string,
        reponame: string,
        index: number,
        id: string,
        message: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${editCommentURL(username, reponame, index, id)}`, {
            method: "PATCH",
            headers: {
                accpet: "text/plain",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                "body": message,
            }),
        });

        if (data.statusCode !== 201) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.json();
        return text;
    }

    public async deleteIssueComment(
        username: string,
        reponame: string,
        index: number,
        id: string,
    ): Promise<string | undefined> {
        const data = await request(`${this.api}${editCommentURL(username, reponame, index, id)}`, {
            method: "DELETE",
        });
        if (data.statusCode !== 204) {
            const text = await data.body.text();
            return text;
        }
        const text = await data.body.json();
        return text;
    }
}
