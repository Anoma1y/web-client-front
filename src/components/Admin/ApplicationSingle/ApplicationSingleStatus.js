import React from 'react';
import {
    Form,
    Radio
} from 'semantic-ui-react'

const ApplicationSingleStatus = ({singleApplication, applicationStatus, handleChange}) => {
    return (
        <Form>
            <Form.Field>
                Current status: <b>{singleApplication.status === 0 ? "Awaiting" : singleApplication.status === 1 ? "Approved" : singleApplication.status === 2 ? "Rejected" : "Paid"}</b>
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Awaiting'
                    name='applicationStatusGroup'
                    value='0'
                    checked={applicationStatus === 0}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Approved'
                    name='applicationStatusGroup'
                    value='1'
                    checked={applicationStatus === 1}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Rejected'
                    name='applicationStatusGroup'
                    value='2'
                    checked={applicationStatus === 2}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Paid'
                    name='applicationStatusGroup'
                    value='3'
                    checked={applicationStatus === 3}
                    onChange={handleChange}
                />
            </Form.Field>
        </Form>
    )   
};
export default ApplicationSingleStatus;