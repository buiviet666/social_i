import { AntDesignOutlined, LoadingOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, GetProp, Layout, message, Tabs, Upload, UploadProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import Layouts from '../../components/Layout/Layouts';
import './index.scss'
import Footers from '../../components/Footers/Footers';
import { Link } from 'react-router-dom';

export interface ProfileProps {
}

export default function Profile() {
    // props: ProfileProps

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Layouts>
            <Content className='profile__main'>
                <Layout className='profile__main__container'>
                    <Header className='profile__main__header'>
                        <div className='profile__main__header__avatar'>
                            <div className='profile__main__header__avaContainer'>
                                <Avatar
                                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                    icon={<AntDesignOutlined />}
                                />
                            </div>
                        </div>
                        <div className='profile__main__header__title'>
                            <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '20px' }}>
                                <div className='profile__fix'>
                                    <Link to='#'><strong>Name</strong></Link>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className='profile__fix'>
                                        <Link to='#'>Setting</Link>
                                    </div>
                                    <div>
                                        <SettingOutlined />
                                    </div>
                                </div>
                            </div>
                            <ul className='profile__info-data'>
                                <li>
                                    <span><strong>0 </strong>Post</span>
                                </li>
                                <li>
                                    <span><strong>0 </strong>followers</span>
                                </li>
                                <li>
                                    <span><strong>0</strong> following</span>
                                </li>
                            </ul>
                            <div className='profile__info-display'>
                                <span><strong>name real</strong></span>
                                <div>Tiểu sử</div>
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <div>
                            <div>
                                <Upload
                                    name="avatar"
                                    listType="picture-circle"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div>
                                <Tabs
                                    defaultActiveKey="1"
                                    centered
                                    items={new Array(3).fill(null).map((_, i) => {
                                        const id = String(i + 1);
                                        return {
                                            label: `Tab ${id}`,
                                            key: id,
                                            children: `Content of Tab Pane ${id}`,
                                        };
                                    })}
                                />
                            </div>
                        </div>
                    </Content>
                </Layout>
                <Footer className='profile__footer__main'>
                    <Footers />
                </Footer>
            </Content>
        </Layouts>
    );
}
