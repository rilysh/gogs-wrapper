export interface createdOrgResp {
    id: number;
    username: string;
    full_name?: string;
    avatar_url: string;
    description?: string;
    website?: string;
    location?: string;
}

export interface createdOrgTeamResp {
    id: number;
    name: string;
    description?: string;
    permission: "read" | "write" | "admin" | string;
}

export interface createdNewRepoResp {
    id: number;
    owner: {
        id: number;
        username: string;
        full_name: string;
        email: string;
        avatar_url: string;
    },
    full_name: string;
    private: boolean;
    fork: boolean;
    html_url: string;
    clone_url: string;
    ssh_url: string;
    permissions: {
        admin: boolean;
        push: boolean;
        pull: boolean;
    }
}

export interface createdNewUserResp {
    id: number,
    username: string;
    full_name?: string;
    email: string;
    avatar_url: string;
}

export interface getTreeResp {
    sha: string;
    url: string;
    tree: [];
}

export interface createdCommentResp {
    id: number;
    user: {
        id: number;
        username: string;
        full_name: string;
        email: string;
        avatar_url: string;
    },
    body: string;
    created_at: string;
    updated_at: string;
}

export interface listedSingleLabelResp {
    id: number;
    name: string;
    color: string;
}

export interface getASingleMilestoneResp {
    id: number;
    state: string;
    title: string;
    description: string;
    open_issues: number;
    closed_issues: number;
    closed_at: string | null;
    due_on: string;
}

export interface createdAMilestoneResp {
    id:4,
    state: string;
    title: string;
    description: string;
    open_issues: number;
    closed_issues: number;
    closed_at: string | null;
    due_on: string;
}
