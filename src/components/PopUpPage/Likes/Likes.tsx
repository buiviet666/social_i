import { Avatar, List } from "antd";
import { DocumentResponse } from "../../../pages/Types";
import { useEffect, useState } from "react";


export interface LikesProps {
    data: DocumentResponse;
}

interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

export default function Likes({ data }: LikesProps) {

    console.log("in ra user id: ", data.userlikes);

    const [datatest, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...datatest, ...body.results]);
            })
            .catch((err) => {
                console.log(err);

            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div style={{ height: 400, overflow: 'auto' }}>
            <List
                dataSource={datatest}
                renderItem={(item) => (
                    <List.Item key={item.email}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description={item.email}
                        />
                        <div>Content</div>
                    </List.Item>
                )}
            />
        </div>
    );
}
