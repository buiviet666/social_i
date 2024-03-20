import * as React from 'react';

export interface HomeProps {
}

export default function Home(HomeProps) {
    return (
        <div>
            trang chủ
            {
                // indicates very long content
                Array.from({ length: 100 }, (_, index) => (
                    <React.Fragment key={index}>
                        {index % 20 === 0 && index ? 'more' : '...'}
                        <br />
                    </React.Fragment>
                ))
            }
        </div>
    );
}
