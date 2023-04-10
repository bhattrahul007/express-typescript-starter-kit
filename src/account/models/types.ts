import { Model } from 'mongoose';

export const enum TAccountType {
    USER = 'user',
    ADMIN = 'admin',
}

export type TAccount = {
    firstName: string;

    lastName: string;

    email: string;

    password: string;

    type: TAccountType;

    enabled: boolean;

    verified: boolean;

    createdAt: Date;

    updatedAt: Date;
};

export type TAccountMethods = {};

export type TAccountModel = {} & Model<TAccount, {}, TAccountMethods>;
