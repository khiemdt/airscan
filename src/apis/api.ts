import * as httpRequest from '../helpers/api';

export const search = async (params: any) => {
    try {
        const res = await httpRequest.get('market', {
            params: params,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const fetAccount = async (params: any, add: string) => {
    try {
        const res = await httpRequest.get(`address/${add}/balances/fungibles`, {
            params: params,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const fetChainsSp = async () => {
    try {
        const res = await httpRequest.get(`blockchains`, {});
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const tokenPriceDetail = async (params: any) => {
    try {
        const res = await httpRequest.get('account/v2/tokenaccounts', {
            params: params,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
