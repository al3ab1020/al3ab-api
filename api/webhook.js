export default async function handler(req, res) {
  try {

    // قراءة البيانات من كل المصادر
    const body = req.body || {};
    const query = req.query || {};

    console.log("🔥 BODY:", body);
    console.log("🔥 QUERY:", query);

    // استخراج الرابط
    const link =
      body.link ||
      body?.meta?.link ||
      body?.custom_fields?.link ||
      query.link ||
      query?.meta?.link;

    console.log("🔗 LINK:", link);

    const quantity = 1000;

    if (!link) {
      console.log("❌ ما فيه رابط");
      return res.status(200).json({ message: "no link" });
    }

    // إرسال الطلب
    const response = await fetch("https://drd3m.me/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: "71b3dc3bb5c30df01628722729f22a0d",
        action: "add",
        service: 9489,
        link: link,
        quantity: quantity
      })
    });

    const result = await response.json();
    console.log("📦 RESPONSE:", result);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "error" });
  }
}
