import { request } from "undici";
import { getTreeURL } from "../Constants";
import { getTreeResp } from "../types/types";

export default class Trees {
    public api: string;

    constructor(options: {
        api: string
    }) {
        this.api = options.api;
    }

    public async getTree(
        owner: string,
        repo: string,
        sha: string,
    ): Promise<getTreeResp | string | undefined> {
        const data = await request(`${this.api}${getTreeURL(owner, repo, sha)}`);
        if (data.statusCode !== 200) {
            const text = await data.body.text();
            return text;
        }
        const json = await data.body.json() as getTreeResp;
        return json;
    }
}
