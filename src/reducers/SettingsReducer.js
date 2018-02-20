const INITIAL_STATE = {
    individualUser: [
        {
            description: 'A scanned copy of your official photo ID' +
            '(passport) in good quality and high resolution',
            id: 'one_passport'
        },
        {
            description: 'Proof of address (a recent utility bill,' +
            'with your name indicated, or other' +
            'official document verifying your address)',
            id: 'one_address'
        },
    ],
    legalEntity: [
        {
            description: 'Certificate of Incorporation',
            id: 'many_certificate'
        },
        {
            description: 'Articles of Association',
            id: 'many_association'
        },
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Sed vestibulum tincidunt imperdiet. Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit. Proin non vulputate nisi.',
            id: 'many_director_power'
        },
        {
            description: 'Vivamus interdum elit nisi, a vehicula dolor ' +
            'dictum id. Curabitur nec odio ligula.',
            id: 'many_shareholders_rights'
        },
        {
            description: 'Vestibulum pharetra eros eget arcu suscipit suscipit. ' +
            'Cras luctus felis ut lacus maximus fermentum. ',
            id: 'many_shareholders_register'
        },
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Sed vestibulum tincidunt imperdiet. Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit. Proin non vulputate nisi.',
            id: 'many_are_owned_by'
        },
        {
            description: 'Vivamus interdum elit nisi, a vehicula dolor ' +
            'dictum id. Curabitur nec odio ligula.',
            id: 'many_are_held_via'
        },
        {
            description: 'Vestibulum pharetra eros eget arcu suscipit suscipit. ' +
            'Cras luctus felis ut lacus maximus fermentum. ',
            id: 'many_are_held_via_two'
        },
    ],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}