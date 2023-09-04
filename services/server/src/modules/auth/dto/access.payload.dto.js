export class AccessPayloadDto {
    accountId;
    roles;
    isActivated;

    constructor(account) {
      this.accountId = account.id;
      this.roles = account.roles;
      this.isActivated = account.isActivated;
    }
}
