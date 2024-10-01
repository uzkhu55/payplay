import fs from "fs/promises";

export const Mail = async (req, res) => {
  try {
    const { mungu } = req.body;
    console.log(mungu);

    const resultJSON = await fs.readFile("./db.json", "utf-8");
    const result = JSON.parse(resultJSON);

    const check = result.users.find((el) => el.mungu === mungu);

    if (!check) {
      result.users.push(mungu);
      await fs.writeFile("./db.json", JSON.stringify(result, null, 2));
      res.send("success");
    } else {
      res.status(400).send("Бүртгэлтэй");
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).send("Server error");
  }
};
