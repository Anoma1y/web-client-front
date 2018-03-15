import {
    setUserKYC,
    setUserSingle
} from 'actions/admin';

import AdminLib from "libs/ApiLib/AdminLib";


export const handleSetUserByID = value => {
    return dispatch => {
        AdminLib.getUsersById(value)
            .then((userData) => {
                const singleUser = {
                    CreatedAt: userData.data.CreatedAt,
                    ID: userData.data.ID,
                    email: userData.data.email,
                    is_kyc_passed: userData.data.is_kyc_passed,
                    is_verified: userData.data.is_verified,
                    kyc_type: userData.data.kyc_type,
                    kyc_id: userData.data.kyc_id,
                    roles: userData.data.roles,
                }
                AdminLib.getKYCById(userData.data.kyc_id)
                    .then((kycData) => {
                        const singleUserKYC = {
                            CreatedAt: kycData.data.CreatedAt,
                            ID: kycData.data.ID,
                            content: kycData.data.content,
                            profile_id: kycData.data.profile_id,
                            status: kycData.data.status,
                            type: kycData.data.type
                        }
                        dispatch(setUserKYC(singleUserKYC));
                        dispatch(setUserSingle(singleUser));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }
};
