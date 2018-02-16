const INITIAL_STATE = {
    socialNetwork: [{
        name: "facebook f",
        href: "#"
    },{
        name: "vk",
        href: "#"
    },{
        name: "twitter",
        href: "#"
    },{
        name: "telegram",
        href: "#"
    },{
        name: "medium",
        href: "#"
    },{
        name: "reddit alien",
        href: "#"
    }]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}