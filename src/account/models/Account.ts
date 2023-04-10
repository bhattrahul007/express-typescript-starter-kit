import { TAccount, TAccountModel, TAccountType } from './types';
import generateHash from './../../utils/generateHash';
import { configurations } from './../../common';
import { Schema, model } from 'mongoose';

const { accounts: accountConfig } = configurations.app;

const AccountSchema = new Schema<TAccount, TAccountModel>(
    {
        firstName: {
            type: String,
            required: true,
            minlength: accountConfig.name.minLength,
            maxlength: accountConfig.name.maxLength,
            trim: true,
            lowercase: true,
        },

        lastName: {
            type: String,
            minlength: accountConfig.name.minLength,
            maxlength: accountConfig.name.maxLength,
            trim: true,
            lowercase: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            minlength: accountConfig.password.minLength,
            match: new RegExp(accountConfig.password.regexp),
        },

        type: {
            type: String,
            enum: [TAccountType.ADMIN, TAccountType.USER],
            default: TAccountType.USER,
        },

        enabled: {
            type: Boolean,
            default: false,
        },

        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

AccountSchema.pre('save', async function (next) {
    const self = this;
    if (!self.isModified('confirmPassword')) {
        return next();
    }
    self.password = await generateHash(self.password, accountConfig.password.saltRounds);
    return next();
});

const AccountModel = model<TAccount, TAccountModel>('accounts', AccountSchema);

export default AccountModel;
