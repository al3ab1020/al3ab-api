export default async function handler(req, res) {
  try {

    const data = req.body;

    // طباعة كل البيانات
    console.log("🔥 FULL DATA:", JSON.stringify(data));

    // استخراج الرابط من كل الاحتمالات
    const link =
      data?.meta?.link ||
      data?.link ||
      data?.custom_fields?.link ||
      data?.note ||
      data?.options?.link ||
      data?.fields?.link;

    console.log("🔗 LINK:", link);

    // كمية ثابتة (تقدر تغيرها)
    const quantity = 1000;

    if (!link) {
      console.log("❌ ما وصل الرابط");
      return res.status(200).json({ message: "no link" });
    }

    // إرسال الطلب لـ drd3m
    const response = await fetch("https://drd3m.me/api/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: "71b3dc3bb5c30df01628722729f22a0d", // 🔑 حط API حق drd3m هنا
        action: "add",
        service: 9489, // 🎯 حط رقم الخدمة هنا
        link: link,
        quantity: quantity
      })
    });

    const result = await response.json();
    console.log("📦 DRD3M RESPONSE:", result);

    console.log("✅ تم إرسال الطلب");

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "error" });
  }
}
