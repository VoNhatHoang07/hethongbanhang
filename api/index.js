
export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "API hệ thống bán hàng đang hoạt động",
      data: {
        products: [],
        customers: [],
        orders: []
      }
    });
  }

  return res.status(405).json({
    success: false,
    message: "Phương thức không được hỗ trợ"
  });
}
