export interface IPasswordEncoder {
    // Dummy encoded password for timing attack prevention
    readonly dummyEncodedPassword: string

    encode(rawPassword: string): Promise<string>
    match(encodedPassword: string, rawPassword: string): Promise<boolean>
}

export class PasswordEncoderPlaceholder implements IPasswordEncoder {
    readonly dummyEncodedPassword: string = ''

    async encode(rawPassword: string): Promise<string> {
        return rawPassword
    }

    async match(encodedPassword: string, rawPassword: string): Promise<boolean> {
        return encodedPassword === rawPassword
    }
}

export class Argon2idPasswordEncoder implements IPasswordEncoder {
    readonly dummyEncodedPassword: string
    readonly algorithmParameter: Bun.Password.Argon2Algorithm

    constructor(param?: Bun.Password.Argon2Algorithm, dummy?: string) {
        this.dummyEncodedPassword = dummy || '$argon2id$v=19$m=65536,t=3,p=4$WVpZRHRRQ0dJRlpuMGp3VUZON3l3Q3BIS3BZQ0llbkNzQnJhL0p0NlJucz0$MoVPGUJxYU8S5MAQf52SBv6Wscotq/It3y0rbWmetXE'
        this.algorithmParameter = param || {
            algorithm: 'argon2id',
            memoryCost: 65536,
            timeCost: 3,
        }
    }

    async encode(rawPassword: string): Promise<string> {
        return Bun.password.hash(rawPassword, this.algorithmParameter)
    }

    async match(encodedPassword: string, rawPassword: string): Promise<boolean> {
        return Bun.password.verify(rawPassword, encodedPassword)
    }
}
