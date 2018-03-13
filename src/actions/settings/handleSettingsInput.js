// import {changeSettingsInput}  from './changeSettingsInput';
//
// export const handleSettingsInput = value => {
//     return (dispatch, getState) => {
//         const {
//             individualUserInformation
//         } = getState().settings;
//         const newObj = {
//             ...individualUserInformation
//         };
//         newObj[value.key] = value.value;
//         dispatch(changeSettingsInput(newObj));
//     }
// };