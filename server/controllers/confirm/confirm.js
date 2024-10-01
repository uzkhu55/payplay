import fs from "fs/promises";

export const Confirm = async (req, res) => {
  try {
    const { currency, userId } = req.body;

    const resultJSON = await fs.readFile("./db.json", "utf-8");
    const result = JSON.parse(resultJSON);

    const check = result.currencies.find((el) => el.userId === userId);
    if (!check) {
      result.currencies.push({ currency, userId });
      await fs.writeFile("./db.json", JSON.stringify(result, null, 2));

      res.send("success");
    } else {
      res.status(400).send("Бүртгэлгүй байна");
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).send("Server error");
  }
};
