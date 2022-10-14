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
};
