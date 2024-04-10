import { Button, Result } from 'antd';
import * as React from 'react';

export interface Page404Props {
}

export default function Page404() {
    // props: Page404Props
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    );
}
