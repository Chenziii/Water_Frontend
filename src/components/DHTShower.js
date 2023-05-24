import { useEffect, useState } from "react";
import axios from 'axios'
import "./DHTShower.css"


const DHTShower = () => {
    const [wendu, setWendu] = useState()
    const [wenduArray, setWenduArray] = useState([])

    const [Airshidu, setAirShidu] = useState()
    const [AirshiduArray, setAirShiduArray] = useState([])

    const [Guangzhao, setGuangzhao] = useState()
    const [GuangzhaoArray, setGuangzhaoArray] = useState([])

    const [Soilshidu, setSoilshidu] = useState()
    const [SoilshiduArray, setSoilshiduArray] = useState([])

    const [Action, setAction] = useState([])

    const [myTime, setmyTime] = useState([])

    const [show, isshow] = useState(true);

    const [imageSrc, setImageSrc] = useState('');

    // 效果钩子 当从服务器获取数据时，效果钩子正是正确的工具。
    useEffect(() => {
        const fetchData = () => {
            axios.get('http://106.15.41.125:3001/wendu')
                .then(response => {
                    const data = response.data;
                    const Guangzhao = data["Sensors"]['light'];
                    const Wendu = data["Sensors"]['temperature'];
                    const AirShidu = data["Sensors"]['air_humidity'];
                    const SoilShidu = data["Sensors"]['soil_humidity'];
                    setWendu(Wendu);
                    setGuangzhao(Guangzhao);
                    setAirShidu(AirShidu);
                    setSoilshidu(SoilShidu);
                });

            axios.get('http://106.15.41.125:3001/logs')
                .then(response => {
                    const data = response.data;
                    const myTime = data.slice(-10).reverse().map(item => item.Timestamp);
                    setmyTime(myTime);
                    const wenduArray = data.slice(-10).reverse().map(item => item.Sensors.temperature);
                    setWenduArray(wenduArray);
                    const Action = data.slice(-10).reverse().map(item => item.Action);
                    setAction(Action);
                    const SoilshiduArray = data.slice(-10).reverse().map(item => item.Sensors.soil_humidity);
                    setSoilshiduArray(SoilshiduArray);
                    const AirshiduArray = data.slice(-10).reverse().map(item => item.Sensors.air_humidity);
                    setAirShiduArray(AirshiduArray);
                    const GuangzhaoArray = data.slice(-10).reverse().map(item => item.Sensors.light);
                    setGuangzhaoArray(GuangzhaoArray);

                    const a = Action.slice(-10)
                    console.log(a)
                });

            axios.get('http://106.15.41.125:3001/lyzhu.jpg', { responseType: 'blob' })
                .then(response => {
                    const imageUrl = URL.createObjectURL(response.data);
                    setImageSrc(imageUrl);
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                });
        };

        fetchData(); // 首次加载数据

        const interval = setInterval(fetchData, 1200); // 每隔5秒刷新数据

        return () => {
            clearInterval(interval); // 组件卸载时清除定时器
        };
    }, []);

    return (
        <>
            <header>
                <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
                <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
            </header>
            <div className="parent nes-container  with-title" id="box">
                <div className="div1">
                    <div id="my_header">
                        <div id="h_word">智能浇花系统</div>
                        <div id="logo">
                            <i className="nes-octocat animate"></i>
                        </div>
                    </div>
                    <div id='rizhi_b'>
                        <button type="button" className="nes-btn is-primary" onClick={() => isshow(!show)}>日志</button>
                    </div>
                </div>

                <div className="div2 nes-container   with-title is-rounded">
                    <div>
                        <img src={imageSrc} alt="My Image" />
                    </div>
                </div>

                <div className="div3 nes-container is-dark is-centered with-title ">
                    <div className="title">
                        <div className="t_word">室内温度</div>
                    </div>
                    <p className="p_word">{wendu}℃</p>
                </div>

                <div className="div4 nes-container with-title is-rounded is-centered">
                    <div className="title">
                        <div className="t_word_b">空气湿度</div>
                    </div>
                    <p className="p_word_b">{Airshidu}%</p>
                </div>

                <div className="div5 nes-container with-title is-centered is-rounded">
                    <div className="title">
                        <div className="t_word_b">土壤湿度</div>
                    </div>
                    <p className="p_word_b">{Soilshidu}%</p>
                </div>

                <div className="div6 nes-container is-dark with-title is-centered ">
                    <div className="title">
                        <div className="t_word">光照强度</div>
                    </div>
                    <p className="p_word_s">{Guangzhao}<br></br>Lux</p>
                    
                </div>

                <div className="div7">
                    <div
                        style={{}}
                        hidden={show}>
                        <div id="rizhi">
                            <div className="nes-table-responsive">
                                <table className="nes-table is-bordered is-centered">
                                    <thead>
                                        <tr>
                                            <th>时间</th>
                                            <th>动作</th>
                                            <th>室内温度</th>
                                            <th>空气湿度</th>
                                            <th>土壤湿度</th>
                                            <th>光照强度</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wenduArray.map((item, index) => (
                                            <tr key={index}>
                                                <td>{myTime[index]}</td>
                                                <td>{Action[index]}</td>
                                                <td>{wenduArray[index]}℃</td>
                                                <td>{AirshiduArray[index]}%</td>
                                                <td>{SoilshiduArray[index]}%</td>
                                                <td>{GuangzhaoArray[index]}</td>
                                            </tr>
                                        )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DHTShower