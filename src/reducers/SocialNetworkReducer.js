const INITIAL_STATE = {
    socialNetwork: [
    {
        name: "telegram",
        href: "https://example.com"
    },{
        name: "twitter",
        href: "https://example.com"
    },{
        name: "bitcoin",
        href: "https://example.com"
    },{
        name: "facebook f",
        href: "https://example.com"
    },{
        name: "reddit alien",
        href: "https://example.com"
    },{
        name: "medium",
        href: "https://example.com"
    }]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}
