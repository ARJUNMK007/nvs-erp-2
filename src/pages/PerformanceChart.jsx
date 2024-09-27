import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart,
    ResponsiveContainer,
    BarChart,
    Bar,
    Rectangle,
  } from "recharts";
  const data = [
    { name: "Jan", sch: 50, month: 10, amt: 100 },
    { name: "Feb", sch: 10, month: 30, amt: 20 },
    { name: "Mar", sch: 20, month: 40, amt: 30 },
    { name: "Apr", sch: 40, month: 30, amt: 40 },
    { name: "Jun", sch: 30, month: 50, amt: 50 },
    { name: "Jul", sch: 20, month: 20, amt: 30 },
    { name: "Aug", sch: 50, month: 10, amt: 20 },
    { name: "Sep", sch: 70, month: 50, amt: 70 },
    { name: "Oct", sch: 20, month: 70, amt: 90 },
    { name: "Nov", sch: 90, month: 90, amt: 20 },
    { name: "Dec", sch: 30, month: 40, amt: 50 },
  ];
  
  // eslint-disable-next-line react/prop-types
  export const PerformanceChart = ({ performance = "performance" }) => {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center p-2">
          <div className="text-[blue] text-[19px] font-bold">{performance === "performance " ? "School Performance":"Finance"} </div>
          <div className="flex items-center gap-4 justify-end text-center ">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[yellow] rounded-full"></div>
                <p className="text-[grey] text-[13px] font-normal">This Week</p>
              </div>
              <p className="text-[blue] text-[19px] font-bold">1.245</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-[orange] rounded-full"></div>
                <p className="text-[grey] text-[13px] font-normal">Last Week</p>
              </div>
              <p className="text-[blue] text-[19px] font-bold">1.245</p>
            </div>
          </div>
        </div>
        {performance === "performance" && (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              width={300}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="yellow" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="yellow" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSch" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="orange" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickCount={5} domain={[0, "dataMax"]} />
              <Tooltip />
  
              <Area type="monotone" dataKey="month" stroke="yellow" fill="url(#colorMonth)" />
              <Area type="monotone" dataKey="sch" stroke="orange" fill="url(#colorSch)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {performance === "finance" && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={300}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip animationEasing="ease-in-out"/>
              <Bar dataKey="month" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="sch" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  };
  