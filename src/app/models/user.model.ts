export class User {
    constructor(
        public email: string,
        public userId: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date()) {
            return null;
        }
        return this._token;
    }
}
// class User has 3 public properties: email, userId, token