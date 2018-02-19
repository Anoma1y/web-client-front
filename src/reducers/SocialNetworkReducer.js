const INITIAL_STATE = {
    socialNetwork: [{
        name: "facebook f",
        href: "http://www.google.com"
    },{
        name: "vk",
        href: "http://www.google.com"
    },{
        name: "twitter",
        href: "http://www.google.com"
    },{
        name: "telegram",
        href: "http://www.google.com"
    },{
        name: "medium",
        href: "http://www.google.com"
    },{
        name: "reddit alien",
        href: "http://www.google.com"
    }]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}