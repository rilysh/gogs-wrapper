const createOrgURL = (username: string) => `/admin/users/${username}/orgs`;
const createOrgTeamURL = (orgname: string) => `/admin/orgs/${orgname}/teams`;
const createRepoURL = (username: string) => `/admin/users/${username}/repos`;
const listTeamMembersURL = (teamId: string) => `/admin/teams/${teamId}/members`;
const addTeamMembershipURL = (teamId: string, username: string) => `/admin/teams/${teamId}/members/${username}`;
const addOrUpTeamRepoURL = (teamId: string, reponame: string) => `/admin/teams/${teamId}/repos/${reponame}`;
const removeTeamRepoURL = (teamId: string, reponame: string) => `/admin/teams/${teamId}/repos/${reponame}`;
const createdNewUserURL = () => "/admin/users";
const editUserURL = (username: string) => `/admin/users/${username}`;
const deleteUserURL = (username: string) => `/admin/users/${username}`;
const createdPublicUserKeyURL = (username: string) => `/admin/users/${username}/keys`;
const getTreeURL = (owner: string, repo: string, sha: string) => `/repos/${owner}/${repo}/git/trees/${sha}`;
const listCommentsOnIssueIndexURL = (username: string, reponame: string, index: number) => `/repos/${username}/${reponame}/issues/${index}/comments`;
const listCommentsOnIssueURL = (username: string, reponame: string) => `/repos/${username}/${reponame}/issues/comments`;
const createCommentURL = (username: string, reponame: string, index: number) => `/repos/${username}/${reponame}/issues/${index}/comments`;
const editCommentURL = (username: string, reponame: string, index: number, id: string) => `/repos/${username}/${reponame}/issues/${index}/comments/${id}`;
const listAllLabelsURL = (username: string, reponame: string) => `/repos/${username}/${reponame}/labels`;
const listSingleLabelURL = (username: string, reponame: string, id: number) => `/repos/${username}/${reponame}/labels/${id}`;
const editLabelURL = (username: string, reponame: string, id: number) => `/repos/${username}/${reponame}/labels/${id}`;
const listLabelsOnIssueURL = (username: string, reponame: string, index: number) => `/repos/${username}/${reponame}/issues/${index}/labels`;
const addLabelsToIssueURL = (username: string, reponame: string, index: number) => `/repos/${username}/${reponame}/issues/${index}/labels`;
const removeLabelFromIssueURL = (username: string, reponame: string, index: number, id: number) => `/repos/${username}/${reponame}/issues/${index}/labels/${id}`;
const removeAllLabelsFromIssueURL = (username: string, reponame: string, index: number) => `/repos/${username}/${reponame}/issues/${index}/labels`;

export {
    createOrgURL,
    createOrgTeamURL,
    createRepoURL,
    listTeamMembersURL,
    addTeamMembershipURL,
    addOrUpTeamRepoURL,
    removeTeamRepoURL,
    createdNewUserURL,
    editUserURL,
    deleteUserURL,
    createdPublicUserKeyURL,
    getTreeURL,
    listCommentsOnIssueIndexURL,
    listCommentsOnIssueURL,
    createCommentURL,
    editCommentURL,
    listAllLabelsURL,
    listSingleLabelURL,
    editLabelURL,
    listLabelsOnIssueURL,
    addLabelsToIssueURL,
    removeLabelFromIssueURL,
    removeAllLabelsFromIssueURL,
};
