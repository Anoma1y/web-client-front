const INITIAL_STATE = {
    socialNetwork: [
    {
        name: "telegram",
        href: "https://t.me/tsrpay"
    },{
        name: "twitter",
        href: "https://twitter.com/tsrpay"
    },{
        name: "bitcoin",
        href: "https://bitcointalk.org/index.php?topic=3070065.0"
    },{
        name: "facebook f",
        href: "https://www.facebook.com/tsrpay/"
    },{
        name: "reddit alien",
        href: "https://www.reddit.com/user/TSRPAY/"
    },{
        name: "medium",
        href: "https://medium.com/@tsrpay"
    }]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}