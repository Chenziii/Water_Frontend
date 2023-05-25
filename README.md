## 功能需求：
1. 传感器数据监测：系统能够实时监测土壤湿度和环境温度，并将数据反馈给用户。
2. 数据记录和报表：系统能够记录和存储浇水历史数据，并生成报表以供用户查看。
## 非功能性需求：
1. 响应时间：系统应具备快速响应用户操作的能力，避免用户长时间等待。
2. 用户界面友好性：系统的用户界面应简洁、直观，并提供良好的用户体验。

## 前端界面设计
1. 我们秉持极简风格的像素设计，在一个页面上显示植物实时图像检测，实时温度、空气湿度。土壤湿度、光照强度检测。
2. 在页面右上方布置了一个查看日志按钮，点击按钮，显示10条最近的浇水或检测记录。有时间、动作、室内温度、室内湿度、土壤湿度、光照强度。通过记录这些信息，用户可以查看系统执行的浇水操作或传感器数据，了解浇水计划的执行情况以及环境参数的变化。
    * 时间：格式为：x年x月x日，x时x分x秒。
    * 动作：自动浇水/定时记录
    * 室内温度：以摄氏度为单位，表示当前的室内温度。
    * 空气湿度：以百分比形式表示的空气湿度
    * 土壤湿度：以百分比形式表示的土壤湿度
    * 光照强度：以Lux为单位，衡量当前的光照强度
