export const items = [
  {
    id: 1,
    name: "Pyshky.net",
    status: "green",
    type: "TRST",
    conditions: "x2,6 months",
    volume: 120000,
    roi: 4,
    free: 20,
    hedge: 20,
  },
  {
    id: 2,
    name: "NFT-Flowershop",
    status: "yellow",
    type: "THT",
    conditions: "x4,2 years",
    volume: 80000,
    roi: 23,
    free: 12,
    hedge: 0,
  },
  {
    id: 3,
    name: "Tokenhunt.club",
    status: "green",
    type: "THC",
    conditions: "x2,1 year",
    volume: 120000,
    roi: 23,
    free: 2,
    hedge: 20,
  },
  {
    id: 4,
    name: "Web3 P2P University",
    status: "red",
    type: "TRST",
    conditions: "x2,1 years",
    volume: 200000,
    roi: 6,
    free: 1,
    hedge: 0,
  },
];

export const colorMap = {
  yellow: "#fafad2",
  green: "#90EE90",
  red: "#fa8072",
};

const colorDotMap = {
  yellow: "#FFD700",
  green: "#7CFC00",
  red: "#B22222",
};

export const columns = [
  {
    key: "name",
    title: "Project",
    render: (data) => (
      <>
        <span
          style={{
            borderRadius: "50%",
            border: "1px solid black",
            backgroundColor: colorDotMap[data.status],
            display: "inline-block",
            width: "10px",
            height: "10px",
            marginRight: "8px",
          }}
        ></span>
        {data.name}
      </>
    ),
  },
  {
    key: "type",
    title: "Token Type",
    render: (data) => data.type,
  },
  {
    key: "conditions",
    title: "Conditions",
    render: (data) => data.conditions,
  },
  {
    key: "volume",
    title: "Volume",
    render: (data) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 1,
      }).format(data.volume),
  },
  {
    key: "roi",
    title: "ROI",
    render: (data) =>
      new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(data.roi / 100),
  },
  {
    key: "free",
    title: "Free float",
    render: (data) => data.free,
  },
  {
    key: "hedge",
    title: "Insurence hedge",
    render: (data) =>
      new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(data.hedge / 100),
  },
];
