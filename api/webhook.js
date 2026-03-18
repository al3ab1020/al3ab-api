export default async function handler(req, res) {
  try {

    const body = req.body;

    console.log("🔥 FULL DATA:", JSON.stringify(body, null, 2));

    // استخراج الرابط من items
    let link = null;

    if (body?.data?.items?.length > 0) {
      const item = body.data.items[0];

      // جرّب كل الاحتمالات
      link =
        item?.fields?.link ||
        item?.custom_fields?.link ||
        item?.options?.link ||
        item?.name ||
        null;
    }

    console.log("🔗 LINK:", link);

    if (!link) {
      console.log("❌ ما حصلنا الرابط");
      return res.status(200).json({ message: "no link" });
    }

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
        quantity: 100
      })
    });

    const result = await response.json();
    console.log("📦 RESULT:", result);

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: "fail" });
  }
}
