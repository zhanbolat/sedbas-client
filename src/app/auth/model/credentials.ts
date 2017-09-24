export class Credentials {

    constructor(
        public username: string,
        public password: string,
        public navigateTo?: string,
        public secret?: string
    ) {  }

}
