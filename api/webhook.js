export default async function handler(req, res) {
  try {

    const data = req.body;
    console.log("DATA:", data);

    // جلب الرابط من رمز
    const link =
      data?.meta?.link ||
      data?.link ||
      data?.custom_fields?.link ||
      data?.note;

    // الكمية (ثابتة حالياً)
    const quantity = 100;

    if (!link) {
      console.log("❌ ما فيه رابط");
      return res.status(200).json({ message: "no link" });
    }

    await fetch("https://drd3m.me/api/v2", {
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

    console.log("✅ تم إرسال الطلب");

    res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
}
