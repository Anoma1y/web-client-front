const INITIAL_STATE = {
    socialNetwork: [{
        name: "facebook f",
        href: "https://www.facebook.com/tsrpay/"
    },{
        name: "vk",
        href: "https://vk.com/tsrpay"
    },{
        name: "telegram",
        href: "https://t.me/tsrpay"

    },{
        name: "twitter",
        href: "https://twitter.com/tsrpay"
    },{
        name: "medium",
        href: "https://medium.com/@tsrpay"
    },{
        name: "reddit alien",
        href: "https://www.reddit.com/user/TSRPAY/"
    }]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}