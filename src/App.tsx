import { Card, Row, Tag } from 'antd';
import Drawer from 'antd/es/drawer';
import { Col } from 'antd/es/grid';
import Input from 'antd/es/input';
import Table from 'antd/es/table';
import { useEffect, useState } from 'react';
import './App.css';
import SolListForm from './SolListForm';
import { fetAccount, fetChainsSp } from './apis/api';
import { formatHexString } from './constants/constant';
import DetailTabs from './detail/DetailTabs';
let solListLocal: any = undefined;
let CHAIN_SP: any = [];
function App() {
    solListLocal = localStorage.getItem('solListLocal')
        ? localStorage.getItem('solListLocal')
        : '[]';

    const [solList, setSolList] = useState<any[]>(JSON.parse(solListLocal));
    const [solPrice, setSolPrice] = useState<any>({});
    const [account, setAccount] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const { Search } = Input;
    const { Meta } = Card;
    const [modal, setModal] = useState<any>({
        item: [],
        open: false,
        title: null,
        des: null,
    });

    const onSearch = (value: string) => {
        getAccount([value]);
    };
    const handleSolList = (value: any) => {
        if (value.index != undefined) {
            setSolList(solList.splice(value.index, 1, value));
        } else {
            solList.push(value);
        }
        setSolList(solList);
        localStorage.setItem('solListLocal', JSON.stringify(solList));
        onClose();
    };

    const getListChainsSp = async () => {
        try {
            const data = await fetChainsSp();
            CHAIN_SP = data?.map((el: any) => el.shortName);
        } catch (error) {
            console.log(error);
        }
    };

    const getAccount = async (arr: string[]) => {
        setLoading(true);
        const result: any[] = [];

        for (let i = 0; i < CHAIN_SP.length; i += 6) {
            const promises = [];

            for (let j = 0; j < 6; j++) {
                const index = i + j;
                if (index < CHAIN_SP.length) {
                    const params = {
                        chainID: CHAIN_SP[index],
                        filterDust: true,
                        filterSpam: true,
                        includeMetadata: true,
                    };
                    const promise = fetAccount(params, arr[0])
                        .then((data) => {
                            if (data) {
                                if (data.length) {
                                    result.push({
                                        chain: CHAIN_SP[index],
                                        data: data,
                                    });
                                }
                            } else {
                                console.log(data.message);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    promises.push(promise);
                }
            }

            await new Promise((resolve) => setTimeout(resolve, 1200));

            try {
                await Promise.all(promises);
            } catch (error) {
                console.log(error);
            }
        }

        setAccount(result);
        setLoading(false);
    };

    const getValueOnchain = (data: any[]): number => {
        if (!data || !data.length) {
            return 0;
        }

        const result: number = data.reduce(
            (accumulator: number, currentElement: any): number => {
                const sum: number = currentElement
                    ? Number(currentElement?.fiat?.[0].value || 0) /
                      Math.pow(10, currentElement?.fiat?.[0]?.decimals ?? 1)
                    : 0;

                return accumulator + sum;
            },
            0
        );

        return parseFloat(result.toFixed(2));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'chain',
            with: 100,
        },
        {
            title: '$',
            dataIndex: 'data',
            key: 'data',
            render: (text: any) => {
                return <span>{getValueOnchain(text)}</span>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'isErr',
            key: 'isErr',
            render: (text: string) => {
                return (
                    <Tag color={text ? 'error' : 'success'}>
                        {text ? 'Error' : 'Success'}
                    </Tag>
                );
            },
        },
    ];

    const onClose = () => {
        setModal({
            item: [],
            open: false,
            title: null,
            des: null,
        });
    };
    useEffect(() => {
        getListChainsSp();
    }, []);

    return (
        <div className="container">
            <h1>Scan EVM wallets</h1>
            <Row style={{ marginTop: '10px' }}>
                <Col span={24}>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                        loading={loading}
                    />
                </Col>
            </Row>
            <Row gutter={10}>
                {solList?.map((el: any, inx: number) => (
                    <Col key={inx}>
                        <Tag
                            style={{ cursor: 'pointer' }}
                            color="processing"
                            onClick={() => {
                                getAccount(el.item);
                            }}
                        >
                            {formatHexString(el.item[0])}
                        </Tag>
                    </Col>
                ))}
            </Row>
            <Row style={{ marginTop: '24px' }}>
                <Table
                    size="small"
                    style={{ width: '100%' }}
                    pagination={false}
                    dataSource={account || []}
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record: any) => (
                            <DetailTabs record={record?.data} />
                        ),
                    }}
                />
            </Row>
            <Drawer
                title="Add Sol list"
                placement="right"
                onClose={onClose}
                open={modal.open}
            >
                <SolListForm modal={modal} handleSolList={handleSolList} />
            </Drawer>
        </div>
    );
}

export default App;
